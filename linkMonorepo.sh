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