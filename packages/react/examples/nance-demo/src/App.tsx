import { NanceProvider } from '@nance/nance-hooks';
import Space from './components/space/Space';

const apiUrl = "https://api.nance.app"

function App() {
  return (
    <NanceProvider apiUrl={apiUrl}>
      <div style={{
        marginLeft: "1rem",
        marginRight: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem"
      }}>
        <h1>NanceSDK Demo</h1>
        <Space />
      </div>
    </NanceProvider>
  );
}



export default App;
