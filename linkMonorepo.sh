pushd packages/demo-app
rm -rf node_modules
mkdir node_modules
ln -s ../../../node_modules/.bin node_modules/.bin
ln -s ../../demo-motherboard node_modules/demo-motherboard
ln -s ../../demo-plugin1 node_modules/@plugin1