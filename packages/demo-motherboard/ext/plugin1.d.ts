// spi declaration
// demo-plugin1 can not decide what is interface alone
// demo-motherboard tightly controls what is visible for other plugin
declare module "@plugin1" {
    export const ComponentProvidedByPlugin1: (props: {msg: string}) => any
    // plugin can export anything, of couse it can export a simple function
    export function spiExportedByPlugin1ForOtherPlugins(): string;
}