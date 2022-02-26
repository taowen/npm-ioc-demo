import { ComponentProvidedByPlugin1 } from '@plugin1'
import { ComponentProvidedByPlugin2 } from '@plugin2'

export function SomePage() {
    return <div>
        ===
        <ComponentProvidedByPlugin1 msg="hello" />
        ===
        <ComponentProvidedByPlugin2 position="world" />
    </div>
}