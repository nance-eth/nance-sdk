import { NanceSignatureTypes } from "../constants";
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

export type GenericSignTypes = {
  name: string;
  type: string;
};

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
} as const as Record<NanceSignatureTypes, SnapshotSignatureNames>;
