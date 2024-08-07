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

export const ActionStatusNames = [
  "Future",
  "Poll Required",
  "Polling",
  "Active",
  "Queued",
  "Executed",
  "Cancelled",
] as const;

export type ActionStatus = (typeof ActionStatusNames)[number];
