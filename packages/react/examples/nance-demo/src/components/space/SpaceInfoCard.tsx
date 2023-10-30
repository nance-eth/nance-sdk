import { useSpaceInfo } from '@nance/nance-hooks';
import Proposal from '../proposal/Proposal';

export default function SpaceInfoCard({ space }: { space: string }) {
  const { data, isLoading, error } = useSpaceInfo({ space });

  if (isLoading) {
    return (
      <p>Loading SpaceInfo...</p>
    )
  } else if (!data || error) {
    return (
      <p>Error loading SpaceInfo...</p>
    )
  }

  const { name, spaceOwners, currentCycle, currentEvent } = data?.data;

  return (
    <>
      <div>
        <h3>{name}</h3>
        <p>owned by {spaceOwners.join(", ")}</p>
        <p>Cycle: {currentCycle}</p>
        <p>Event: {currentEvent.title} ({currentEvent.start.toString()} - {currentEvent.end.toString()})</p>
      </div>

      <Proposal space={space} currentCycle={currentCycle} />
    </>
  )
}
