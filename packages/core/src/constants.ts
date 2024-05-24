export const GovernanceEventName = [
  "Temperature Check",
  "Snapshot Vote",
  "Execution",
  "Delay",
  "Unknown",
] as const;

export type GovernanceEvent = (typeof GovernanceEventName)[number];

export const ProposalStatusNames = [
  "Archived",
  "Draft",
  "Discussion",
  "Temperature Check",
  "Voting",
  "Approved",
  "Cancelled",
] as const;

export type ProposalStatus = (typeof ProposalStatusNames)[number];

// match snapshot ingestor
// https://github.com/snapshot-labs/snapshot-sequencer/blob/master/src/ingestor.ts#L17
export const domain = {
  name: "snapshot",
  version: "0.1.4"
} as const;

export const NanceSignatureTypesNames = [
  "SnapshotSubmitProposal",
  "SnapshotCancelProposal",
] as const;

export type NanceSignatureTypes = (typeof NanceSignatureTypesNames)[number];
