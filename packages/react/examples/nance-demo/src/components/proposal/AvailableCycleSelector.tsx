export default function AvailableCycleSelector(
  { maxCycle, selectedCycle, setSelectedCycle }:
    { maxCycle: number, selectedCycle: string, setSelectedCycle: (c: string) => void }) {

  const cycles = []
  for (let i = 1; i <= maxCycle; i++) {
    cycles.push(i);
  }

  return (
    <label>
      Choose a cycle to load: &nbsp;

      <select value={selectedCycle} onChange={(e) => setSelectedCycle(e.target.value)}>
        {cycles.map(cycle => <option key={cycle} value={cycle.toString()}>Cycle #{cycle}</option>)}
      </select>
    </label>
  )
}
