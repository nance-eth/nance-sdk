## Install

`yarn add @nance/nance-hooks`

## Usage

Wrap components with `NanceContext.Provider` and pass `apiUrl` as a prop. And then you can use nance hooks.
Check full example [here](./examples/nance-demo).

```typescript
import { NanceProvider, useSpaceInfo } from "@nance/nance-hooks";

const apiUrl = "https://api.nance.app";

export default function SpacePage() {
  return (
    <NanceProvider apiUrl={apiUrl}>
      <SpaceInfoCard />
    </NanceProvider>
  )
}

function SpaceInfoCard() {
  const { spaceInfo } = useSpaceInfo();
  return (
    <div>
      <h1>{spaceInfo.name}</h1>
      <p>{spaceInfo.description}</p>
    </div>
  )
}
```
