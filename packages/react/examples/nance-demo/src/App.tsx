import { NanceProvider } from '@nance/nance-hooks';
import SpaceInfo from './SpaceInfo';

const apiUrl = "https://api.nance.app"

function App() {
  return (
    <NanceProvider apiUrl={apiUrl}>
      <div className="App">
        <SpaceInfo />
      </div>
    </NanceProvider>
  );
}



export default App;
