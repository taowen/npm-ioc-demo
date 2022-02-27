import { ComponentProvidedByPlugin1 } from '@plugin1'
import { ComponentProvidedByPlugin2 } from '@plugin2'
import * as React from 'react';

export function SomePage() {
    console.log('!!! called');
    return <div>
        ===
        <ComponentProvidedByPlugin1 msg="hello" />
        ===
        <ComponentProvidedByPlugin2 position="world" />
    </div>
}