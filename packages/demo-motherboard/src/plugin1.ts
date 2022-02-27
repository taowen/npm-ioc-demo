import { TypeExportedByMotherboard } from "./TypeExportedByMotherboard";

export function ComponentProvidedByPlugin1(props: {msg: TypeExportedByMotherboard}): any {
    throw new Error('abstract');
}

export function spiExportedByPlugin1ForOtherPlugins(): string {
    throw new Error('abstract');
}