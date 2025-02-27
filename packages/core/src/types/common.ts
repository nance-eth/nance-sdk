import { ProposalStatus, GovernanceEvent, ActionStatus } from "../constants";

export type JBSplitStruct = {
  preferClaimed: boolean;
  preferAddToBalance: boolean;
  percent: string;
  projectId: string;
  beneficiary: string;
  lockedUntil: string;
  allocator: string;
};

export interface Proposal {
  uuid: string;
  title: string;
  body: string;
  governanceCycle?: number;
  createdTime: string;
  lastEditedTime?: string;
  status: ProposalStatus;
  proposalId?: number;
  coauthors?: string[];
  discussionThreadURL?: string;
  ipfsURL?: string;
  voteURL?: string;
  voteSetup?: SnapshotVoteSetupOptions;
  voteResults?: VoteResults;
  authorAddress?: string;
  authorDiscordId?: string;
  temperatureCheckVotes?: number[];
  actions?: Action[];
  proposalSummary?: string;
  threadSummary?: string;
}

export type NewProposal = {
  title: string;
  body: string;
  status: ProposalStatus;
  voteSetup?: SnapshotVoteSetupOptions;
  authorDiscordId?: string;
}

export type UpdateProposal = {
  uuid: string;
  title?: string;
  body?: string;
  status: ProposalStatus;
  voteSetup?: SnapshotVoteSetupOptions;
  authorDiscordId?: string;
}

export type BodyAction = {
  type:
  | "Payout"
  | "Reserve"
  | "Transfer"
  | "Custom Transaction"
  | "Request Budget"
  | "Cancel";
  uuid: string;
  governanceCycles?: number[];
  pollRequired?: boolean;
  chainId: number;
  payload:
  | PayoutV1
  | Payout
  | Reserve
  | Transfer
  | CustomTransaction
  | RequestBudget
  | Cancel;
};

export type Action = BodyAction & { actionTracking?: ActionTracking[] };

export type ActionV1 = Omit<
  Action,
  "pollRequired" | "chainId" | "actionTracking"
>;

export type ActionTracking = {
  governanceCycle: number;
  status: ActionStatus;
  pollId?: string;
  pollResults?: number[];
  transactionHash?: string;
};

export type Payout = {
  address?: string;
  allocator?: string;
  project?: number;
  amount: number;
  currency: string;
};

export type PayoutV1 = {
  address?: string;
  allocator?: string;
  project?: number;
  governanceCycleStart: number;
  count: number;
  amountUSD: number;
};

export type Reserve = { splits: JBSplitStruct[] };

export type Transfer = {
  contract: string; // if doing native transfer, contract is recipient address
  to: string;
  amount: string;
  decimals: number;
};

export type CustomTransactionArg = {
  id?: string;
  value: string;
  type: string;
  name: string;
};

export type CustomTransaction = {
  contract: string;
  value: string;
  // function approve(address guy, uint256 wad) returns (bool)
  // can pass as ABI
  // can have unnamed parameters
  functionName: string;
  args: CustomTransactionArg[];
  tenderlyId: string;
};

export type RequestBudget = {
  budget: {
    token: string;
    amount: string;
    // justification is the reason/memo
    justification: string;
  }[];
};

export type Cancel = {
  targetActionUuid: string;
  targetActionDescription: string;
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
  customDomain?: string;
  allowCurrentCycleSubmission: boolean;
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
      ideas?: string;
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
  proposalSubmissionValidation?: ProposalSubmissionValidationSnapshot;
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

export type ProposalSubmissionValidationSnapshot = {
  type: "snapshot";
  minBalance: number;
  metStatus: ProposalStatus;
  notMetStatus: ProposalStatus;
};

export type DoltConfig = {
  enabled: boolean;
  owner: string;
  repo: string;
};

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
