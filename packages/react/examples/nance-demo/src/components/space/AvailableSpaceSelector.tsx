import { useAllSpaceInfo } from "@nance/nance-hooks";

export default function AvailableSpaceSelector(
  { selectedSpace, setSelectedSpace }: { selectedSpace: string, setSelectedSpace: (s: string) => void }) {
  const { data, isLoading, error } = useAllSpaceInfo();

  if (isLoading) {
    return (
      <p>Loading AllSpace...</p>
    )
  } else if (!data || error) {
    return (
      <p>Error loading AllSpace...</p>
    )
  }

  const spaceInfos = data?.data;

  return (
    <label>
      Choose a space to load: &nbsp;

      <select value={selectedSpace} onChange={(e) => setSelectedSpace(e.target.value)}>
        {spaceInfos.map(info => <option key={info.name} value={info.name}>{info.name}</option>)}
      </select>
    </label>
  )
}
