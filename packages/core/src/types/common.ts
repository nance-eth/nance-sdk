import {
  Proposal as SnapshotSignProposal,
  proposalTypes
} from "./snapshot";

export type JBSplitStruct = {
  preferClaimed: boolean;
  preferAddToBalance: boolean;
  percent: string;
  projectId: string;
  beneficiary: string;
  lockedUntil: string;
  allocator: string;
}

export interface Proposal {
  uuid: string;
  title: string;
  body: string;
  governanceCycle?: number;
  createdTime: string;
  lastEditedTime?: string;
  status: ProposalStatus;
  proposalId?: number;
  author?: string;
  coauthors?: string[];
  discussionThreadURL: string;
  ipfsURL?: string;
  voteURL?: string;
  voteSetup?: SnapshotVoteSetupOptions;
  voteResults?: VoteResults;
  authorAddress?: string;
  authorDiscordId?: string;
  temperatureCheckVotes?: number[];
  actions: Action[];
  proposalSummary?: string;
  threadSummary?: string;
}

export type NewProposal = Pick<Proposal,
  "title" | "body" | "status" | "authorDiscordId" | "actions">;

export type UpdateProposal = Pick<Proposal,
  "uuid" | "title" | "body" | "status" | "authorDiscordId">;

export type Action = {
  type: "Payout" | "Reserve" | "Transfer" | "Custom Transaction";
  name?: string;
  uuid?: string;
  payload: Payout | Reserve | Transfer | CustomTransaction;
};

export type SignProposalEnvelope = {
  address: string;
  sig: string;
  data: {
    domain: { name: string; version: string; }
    types: typeof proposalTypes;
    message: SnapshotSignProposal;
  }
}

// FUTURE
// export type Currency = "USD" | "ETH";

export type Payout = {
  address?: string;
  allocator?: string;
  project?: number;
  count: number;
  governanceCycleStart: number;
  amountUSD: number;
  // FUTURE
  // currency?: Currency;
  // chainId?: number;
  // amount?: string;
  // governanceCycleEnd: number;
};

export type Reserve = { splits: JBSplitStruct[] };

export type Transfer = {
  contract: string; // if doing native transfer, contract is recipient address
  chainId: number;
  to: string;
  amount: string;
  decimals: number;
};

export type CustomTransactionArg = {
  id: string;
  value: string;
  type: string;
  name: string;
};

export type CustomTransaction = {
  contract: string;
  chainId: number;
  value: string;
  // function approve(address guy, uint256 wad) returns (bool)
  // can pass as ABI
  // can have unnamed parameters
  functionName: string;
  args: CustomTransactionArg[];
  tenderlyId: string;
};

export type SnapshotProposal = {
  id: string;
  type: string;
  start: string;
  end: string;
  choices: string[];
  state: string;
  votes: number;
  scores: number[];
  scores_total: number;
  scores_state: string;
  title?: string;
  body?: string;
  author?: string;
  discussion?: string;
  ipfs?: string;
  space?: { id: string };
  quorum?: number;
};

export type SnapshotVoteResultsId = Pick<
  SnapshotProposal,
  "id" | "choices" | "scores" | "votes" | "scores_state" | "scores_total"
>;

export type SnapshotVoteSettings = {
  quorum: number;
  period: number;
  type: string;
  delay: number;
};

export type VoteResults = {
  choices: string[];
  scores: number[];
  votes: number;
  scoresState?: string;
  scoresTotal?: number;
  quorumMet?: boolean;
};

export type GovernanceCycleForm = {
  time: FormTime;
  startDate: Date;
  temperatureCheckLength: number;
  voteLength: number;
  delayLength: number;
  executionLength: number;
};

export type FormTime = {
  ampm: string;
  hour: number;
  minute: string;
  timezoneOffset: number;
};

export interface NanceConfig {
  name: string;
  juicebox: {
    network: string;
    projectId: string;
    gnosisSafeAddress: string;
    governorAddress: string;
  };
  discord: {
    API_KEY: string;
    guildId: string;
    roles: {
      governance: string;
    };
    channelIds: {
      proposals: string;
      bookkeeping: string;
      transactions: string;
    };
    poll: {
      minYesVotes: number;
      yesNoRatio: number;
      verifyRole: string;
    };
    reminder: {
      type: string;
      channelIds: string[];
      imagesCID: string;
      imageNames: string[];
    };
  };
  guildxyz?: GuildxyzConfig;
  proposalIdPrefix: string;
  dolt: DoltConfig;
  snapshot: {
    space: string;
    choices: string[];
    minTokenPassingAmount: number;
    passingRatio: number;
  };
  submitAsApproved?: boolean;
}

export type DoltConfig = {
  enabled: boolean;
  owner: string;
  repo: string;
};

export const GovernanceEventName = [
  "Temperature Check",
  "Snapshot Vote",
  "Execution",
  "Delay",
  "Unknown",
] as const;

export type GovernanceEvent = (typeof GovernanceEventName)[number];

export const ProposalStatusNames = [
  "Draft",
  "Discussion",
  "Temperature Check",
  "Voting",
  "Approved",
  "Cancelled",
  "Archived",
] as const;

export type ProposalStatus = (typeof ProposalStatusNames)[number];

export interface DateEvent {
  title: GovernanceEvent;
  start: string;
  end: string;
}

export interface InternalDateEvent {
  title: GovernanceEvent;
  start: Date;
  end: Date;
}

export interface PollResults {
  voteYesUsers: string[];
  voteNoUsers: string[];
  unverifiedUsers: string[];
}

export interface PollEmojis {
  voteYesEmoji: string;
  voteNoEmoji: string;
}

export type SnapshotVoteSetupOptions = {
  type: string;
  choices: string[];
};

export type GuildxyzConfig = {
  id: number;
  roles: number[];
};

// match snapshot ingestor
// https://github.com/snapshot-labs/snapshot-sequencer/blob/master/src/ingestor.ts#L17
export const domain = {
  name: "snapshot",
  version: "0.1.4"
}
