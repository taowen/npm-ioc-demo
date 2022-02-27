import { spiExportedByMotherboard } from 'demo-motherboard';
export function spiExportedByPlugin1ForOtherPlugins() {
    spiExportedByMotherboard();
    return 'plugin2 can call plugin1, as long as motherboard declare a spi';
}
//# sourceMappingURL=spiExportedByPlugin1ForOtherPlugins.js.map