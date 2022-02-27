import * as plugin1 from '@plugin1';
import * as React from 'react';
export const ComponentProvidedByPlugin2 = (props) => {
    plugin1.spiExportedByPlugin1ForOtherPlugins();
    return React.createElement("div", null,
        "ComponentProvidedByPlugin2 ",
        props.position);
};
//# sourceMappingURL=ComponentProvidedByPlugin2.js.map