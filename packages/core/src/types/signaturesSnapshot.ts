import * as Snapshot from "./snapshot"

// format Snapshot uses to send request to ingestor
export type SnapshotUploadProposalEnvelope = {
  address: string;
  sig: string;
  data: {
    domain: { name: string; version: string; }
    types: typeof Snapshot.proposalTypes;
    message: Snapshot.Proposal;
  }
}

// format Snapshot uses to send request to ingestor
export type SnapshotDeleteProposalEnvelope = {
  address: string;
  sig: string;
  data: {
    domain: { name: string; version: string; }
    types: typeof Snapshot.cancelProposal2Types;
    message: Snapshot.CancelProposal;
  }
}

export const SnapshotProposalPrimaryType = "Proposal" as const;
export const SnapshotCancelProposalPrimaryType = "CancelProposal" as const;
