# tldr;

在 [vite-ioc-demo](https://github.com/taowen/vite-ioc-demo) 中，我们展示了如何用 typescript+pnpm+vite 来实现构建阶段的 Inversion of Control。
在这个仓库里，我们用 typescript+npm 来实现同样的效果。

# 手工搭建 monorepo

这里我们没有使用 pnpm 的现成解决方案，而使用手工建立软链接的方式。

```bash
#!/usr/bin/env bash

pushd packages/demo-app
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
ln -s ../../demo-plugin1 node_modules/demo-plugin1
ln -s ../../demo-plugin2 node_modules/demo-plugin2
popd

pushd packages/demo-motherboard
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
popd

pushd packages/demo-plugin1
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
popd

pushd packages/demo-plugin2
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
popd
```

这样就把 packages/* 下的四个包，互相的依赖关系建立好了。它们之间的依赖关系不用在 package.json 里定义了，只在这个 [linkMonorepo.sh](./linkMonorepo.sh) 里维护。

那么第三方包怎么引用呢？这些依赖都没有定义在 packages/* 下的包里，而是在最顶层模块的 [package.json](./package.json) 中统一定义。

# typescript 声明和引入 @plugin1 和 @plugin2

声明在 demo-motherboard 中

* [plugin1.abstract.ts](./packages/demo-motherboard/src/plugin1.abstract.ts)
* [plugin2.abstract.ts](./packages/demo-motherboard/src/plugin2.abstract.ts)

三个模块分别用自己的 tsconfig.json 把声明引入进来

* [demo-motherboard/tsconfig.json](./packages/demo-motherboard/tsconfig.json)
* [demo-plugin1/tsconfig.json](./packages/demo-plugin1/tsconfig.json)
* [demo-plugin2/tsconfig.json](./packages/demo-plugin2/tsconfig.json)

这些声明可以让 vscode 的代码提示正常

# 编译 ts,tsx 为 js

不依赖 vite 或者 webpack 等 bundler，这里我们用 typescript 来完成构建。

```bash
cd packages/demo-app
tsc -b --watch
```

这条命令就可以

* 构建 demo-app，以及关联的 demo-motherboard, demo-plugin1, demo-plugin2
* 如果 demo-plugin1 等项目中有文件被修改，也会因为 --watch 立即被重新构建
* 构建是增量的，--watch 到文件修改到重编译完成还是挺快的

这个是依赖于 demo-app 的 [tsconfig.json](./packages/demo-app/tsconfig.json) 中定义的:

```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "lib"
  },
  "references": [
    { "path": "../demo-motherboard" },
    { "path": "../demo-plugin1" },
    { "path": "../demo-plugin2" }
  ]
}
```

构建完成的结果在每个模块的 lib/src 目录下，ts 和 tsx 都变成 js 文件了。
typescript 这种一条命令管多个模块的[新构建模式](https://www.typescriptlang.org/docs/handbook/project-references.html)还是非常好使的。

# 用 webpack 把零散的 js 文件打包成一个

如果是用 node.js 执行，到前面一步就可以了。如果为了在浏览器里执行，还需要上 webpack 做一下 bundle 打包的工作。执行命令

```bash
webpack serve
```

启动 webpack 的 dev server。注意前面的 `tsc -b --watch` 的进程仍然存在。这两个进程负责的东西不同：

* tsc 负责把 ts,tsx => js
* webpack 负责 tsc 构建出来的 js 打包成一个，并提供 http://localhost:3000 给浏览器打开

所以 webpack 的配置就机器简单了，不需要 ts-loader 也不需要 babel-loader：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './lib/src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    })],
};
```

执行之后，我们会发现 webpack 在 bundle 的过程中遇到了困难。

```
Module not found: Error: Can't resolve '@plugin1' in '/home/taowen/npm-ioc-demo/packages/demo-motherboard/lib/src'
resolve '@plugin1' in '/home/taowen/npm-ioc-demo/packages/demo-motherboard/lib/src'
```

typescript 编译的过程中并没有完成 `@plugin1` 和 `demo-plugin1` 的链接关系。js 中仍然是 import from @plugin1。
为了避免配置 webpack，我们直接通过 node_modules 来链接。修改 `linkMonorepo.sh`:

```bash
#!/usr/bin/env bash

pushd packages/demo-app
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
ln -s ../../demo-plugin1 node_modules/demo-plugin1
ln -s ../../demo-plugin2 node_modules/demo-plugin2
popd

pushd packages/demo-motherboard
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-plugin1 node_modules/@plugin1
ln -s ../../demo-plugin2 node_modules/@plugin2
popd

pushd packages/demo-plugin1
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
ln -s ../../demo-plugin1 node_modules/@plugin1
ln -s ../../demo-plugin2 node_modules/@plugin2
popd

pushd packages/demo-plugin2
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
ln -s ../../demo-plugin1 node_modules/@plugin1
ln -s ../../demo-plugin2 node_modules/@plugin2
popd
```

这样 webpack 就可以正常工作了。可以看到 linkMonorepo.sh 虽然很低科技，但是非常简单可依赖。
比倒腾各种 vite.config.js 或者 webpack.config.js 要简单。
