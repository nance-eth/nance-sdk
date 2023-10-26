## Install

`yarn add @nance/nance-hooks`

## Usage

Wrap components with `NanceContext.Provider` and pass `apiUrl` as a prop. And then you can use nance hooks.

```typescript
import { NanceConetxt, useSpaceInfo } from "@nance/nance-hooks";

const apiUrl = "https://api.nance.app";

export default function SpacePage() {
  return (
    <NanceConetxt.Provider value={{apiUrl}}>
      <SpaceInfoCard />
    </NanceConetxt.Provider>
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
