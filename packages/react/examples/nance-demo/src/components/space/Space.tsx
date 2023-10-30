import { useState } from "react";
import AvailableSpaceSelector from "./AvailableSpaceSelector";
import SpaceInfoCard from "./SpaceInfoCard";

export default function Space() {
  const [space, setSpace] = useState("juicebox");

  return (
    <div>
      <h2>Space</h2>
      <AvailableSpaceSelector selectedSpace={space} setSelectedSpace={setSpace} />
      <SpaceInfoCard space={space} />
    </div>
  )
}
