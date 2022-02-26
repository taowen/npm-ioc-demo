import './App.css';
import { SomePage } from 'demo-motherboard';
import * as plugin1_inf from '@plugin1';
import * as plugin1_impl from 'demo-plugin1';

function checkPlugin<A, B extends A>(a: A, b: B) {
}

// ensure all spi declared by @plugin1 has been implemented by demo-plugin1
checkPlugin(plugin1_inf, plugin1_impl);

function App() {
  return (
    <SomePage />
  );
}

export default App;
