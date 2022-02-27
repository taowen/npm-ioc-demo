import * as plugin1 from '@plugin1';
import * as plugin2 from '@plugin2';
import * as React from 'react';

export const ComponentProvidedByPlugin2: typeof plugin2.ComponentProvidedByPlugin2 = (props) => {
    plugin1.spiExportedByPlugin1ForOtherPlugins();
    return <div>ComponentProvidedByPlugin2 { props.position }</div>
}