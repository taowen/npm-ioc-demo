import { ComponentProvidedByPlugin1 } from '@plugin1'

export function SomePage() {
    return <div>
        ===
        <ComponentProvidedByPlugin1 msg="hello"/>
    </div>
}