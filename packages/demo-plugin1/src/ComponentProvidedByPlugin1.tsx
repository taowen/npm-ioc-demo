import * as plugin1 from '@plugin1';
import * as React from 'react';

export const ComponentProvidedByPlugin1: typeof plugin1.ComponentProvidedByPlugin1 = (props) => {
    return <div>ComponentProvidedByPlugin1 { props.msg }</div>
}