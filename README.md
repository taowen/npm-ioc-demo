# tldr;

在 [vite-ioc-demo](https://github.com/taowen/vite-ioc-demo) 中，我们展示了如何用 typescript+pnpm+vite 来实现构建阶段的 Inversion of Control。
在这个仓库里，我们用 typescript+npm 来实现同样的效果。

# 手工构建 monorepo

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