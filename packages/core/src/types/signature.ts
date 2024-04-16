import { ProposalStatus } from "./common";

export const signatureTypes = {
  Proposal: [
    { type: "string", name: "uuid" },
    { type: "string", name: "title" },
    { type: "string", name: "body" },
    { type: "string", name: "status" },
  ],
  DeleteProposal: [
    { type: "string", name: "uuid" },
  ],
};

export type SignatureTypes = keyof typeof signatureTypes;

export const signatureDomain = {
  name: "Nance",
  version: "1",
}

export type SignNewProposal = {
  uuid: string;
  title: string;
  body: string;
  status: ProposalStatus;
};
