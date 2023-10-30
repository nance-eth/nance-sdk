import { useProposals } from "@nance/nance-hooks";

export default function AvailableProposalSelector(
  { space, cycle, selectedProposal, setSelectedProposal }:
    { space: string, cycle: string, selectedProposal: string, setSelectedProposal: (s: string) => void }) {
  const { data, isLoading, error } = useProposals({ space, cycle });

  if (isLoading) {
    return (
      <p>Loading Proposals...</p>
    )
  } else if (!data || error) {
    return (
      <p>Error loading Proposals...</p>
    )
  }

  const proposalPacket = data?.data;

  if (proposalPacket.proposals.length === 0) {
    return (
      <p>No proposals available</p>
    )
  }

  return (
    <label>
      Choose a proposal to load: &nbsp;
      <select value={selectedProposal} onChange={(e) => setSelectedProposal(e.target.value)}>
        <option value="">-- Please choose a proposal --</option>
        {proposalPacket.proposals.map(proposal => <option key={proposal.hash} value={proposal.hash}>{proposal.title}</option>)}
      </select>
    </label>
  )
}
