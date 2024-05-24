import {
  SnapshotProposalPrimaryType,
  SnapshotCancelProposalPrimaryType
} from "./signaturesSnapshot";
import {
  Proposal as SnapshotProposal,
  proposalTypes as snapshotProposalTypes,
  CancelProposal as SnapshotCancelProposal,
  cancelProposal2Types as snapshotCancelProposal2Types,
} from "./snapshot";

// match snapshot ingestor
// https://github.com/snapshot-labs/snapshot-sequencer/blob/master/src/ingestor.ts#L17
export const domain = {
  name: "snapshot",
  version: "0.1.4"
} as const;

// ===============================================
// ================ OUR SIGNATURES ===============
// ===============================================

// ===== Archive Proposal =====
export const archiveTypes = {
  Archive: [
    { name: 'from', type: 'address' },
    { name: 'space', type: 'string' },
    { name: 'timestamp', type: 'uint64' },
    { name: 'proposal', type: 'string' }
  ]
}

export type ArchiveProposal = {
  from: string;
  space: string;
  timestamp: number;
  proposal: string;
}
// ============================

// MORE SIGNATURES HERE...

// ===============================================

export const nanceSignatureNames = [
  "SnapshotSubmitProposal",
  "SnapshotCancelProposal",
  "NanceArchiveProposal",
] as const;

export type NanceSignatureNames = (typeof nanceSignatureNames)[number];

const NancePrimaryTypeArchive = "Archive" as const;

interface TypedDataField {
  name: string;
  type: string;
};

export type NanceSignatureMap = {
  [key in NanceSignatureNames]: {
    primaryType: string;
    types: Record<string, Array<TypedDataField>>
  }
}

export const nanceSignatureMap: NanceSignatureMap = {
  SnapshotSubmitProposal: {
    primaryType: SnapshotProposalPrimaryType,
    types: snapshotProposalTypes
  },
  SnapshotCancelProposal: {
    primaryType: SnapshotCancelProposalPrimaryType,
    types: snapshotCancelProposal2Types
  },
  NanceArchiveProposal: {
    primaryType: NancePrimaryTypeArchive,
    types: archiveTypes
  },
} as const;

type SignatureToMessageMap = {
  SnapshotSubmitProposal: SnapshotProposal;
  SnapshotCancelProposal: SnapshotCancelProposal;
  NanceArchiveProposal: ArchiveProposal;
};

type MessageTypes = {
  [K in NanceSignatureNames]: SignatureToMessageMap[K];
};

export type BasicNanceSignature = {
  address: string;
  type: NanceSignatureNames;
  signature: string;
  message: MessageTypes[NanceSignatureNames];
}
