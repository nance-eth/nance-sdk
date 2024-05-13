import { useProposal } from '@nance/nance-hooks';

export default function ProposalInfoCard({ space, proposalHash }: { space: string, proposalHash: string }) {
  const shouldFetch = proposalHash !== "";
  const { data, isLoading, error } = useProposal({ space, uuid: proposalHash }, shouldFetch);

  if (!shouldFetch) {
    return null;
  } else if (isLoading) {
    return (
      <p>Loading Proposal...</p>
    )
  } else if (!data || error) {
    return (
      <p>Error loading Proposal...</p>
    )
  }

  const proposal = data?.data;

  return (
    <div>
      <h3>{proposal.title}</h3>
      <p>authored by {proposal.authorAddress || "Unknown"}</p>

      <h4>Proposal actions</h4>
      <p>{JSON.stringify(proposal.actions) || "No actions"}</p>

      <h4>Proposal content</h4>
      <p>{proposal.body}</p>
    </div>
  )
}
