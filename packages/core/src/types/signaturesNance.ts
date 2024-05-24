import { SnapshotSignatureNames } from "./signaturesSnapshot";
import {
  Proposal as SnapshotProposal,
  proposalTypes as snapshotProposalTypes,
  CancelProposal as SnapshotCancelProposal,
  cancelProposal2Types as snapshotCancelProposal2Types,
} from "./snapshot";

// we have our own proposal types since we will need to sign things that are not Snapshot related
export type BasicNanceSignature = {
  address: string;
  type: NanceSignatureTypes;
  signature: string;
  message: SnapshotProposal | SnapshotCancelProposal;
}

// ================ OUR SIGNATURES ===============
// match snapshot ingestor
// https://github.com/snapshot-labs/snapshot-sequencer/blob/master/src/ingestor.ts#L17
export const domain = {
  name: "snapshot",
  version: "0.1.4"
} as const;

export const NanceSignatureTypesNames = [
  "SnapshotSubmitProposal",
  "SnapshotCancelProposal",
  "NanceArchiveProposal",
] as const;

export type NanceSignatureTypes = (typeof NanceSignatureTypesNames)[number];

export type NanceSignatureNames = typeof NanceSignatureTypesNames[number];

type AllSignatureTypes = SnapshotSignatureNames & NanceSignatureNames;

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

// MORE SIGNATURES HERE

// ===============================================

export const NanceSignatureTypesMap = {
  SnapshotSubmitProposal: snapshotProposalTypes,
  SnapshotCancelProposal: snapshotCancelProposal2Types,
} as const as
  Record<NanceSignatureTypes,
    (typeof snapshotProposalTypes) |
    (typeof snapshotCancelProposal2Types)
  >;

export const NanceSignaturePrimaryTypesMap = {
  SnapshotSubmitProposal: "Proposal",
  SnapshotCancelProposal: "CancelProposal",
  NanceArchiveProposal: "Archive",
} as const as Record<NanceSignatureTypes, AllSignatureTypes>;
