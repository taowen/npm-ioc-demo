import { ComponentProvidedByPlugin1 } from '@plugin1';
import { ComponentProvidedByPlugin2 } from '@plugin2';
import * as React from 'react';
export function SomePage() {
    console.log('!!! called');
    return React.createElement("div", null,
        "===",
        React.createElement(ComponentProvidedByPlugin1, { msg: "hello" }),
        "===",
        React.createElement(ComponentProvidedByPlugin2, { position: "world" }));
}
//# sourceMappingURL=SomePage.js.map