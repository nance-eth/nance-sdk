import { NanceConfig, JBSplitStruct, Action, ActionTracking } from "./common";

export type SQLProposal = {
  uuid: string;
  createdTime: Date;
  lastEditedTime: Date;
  title: string;
  body: string;
  authorAddress: string;
  coauthors: string[];
  authorDiscordId?: string;
  proposalStatus: string;
  actionTracking?: ActionTracking[][];
  proposalId?: number;
  temperatureCheckVotes: number[];
  snapshotId?: string;
  voteType: string;
  choices: string[];
  snapshotVotes: number[];
  voteAddressCount: number;
  governanceCycle: number;
  discussionURL?: string;
  ipfsCID?: string;
  actions: Action[];
  proposalSummary?: string;
  threadSummary?: string;
};

export type SQLSnapshotProposal = {
  snapshotSpace: string;
  snapshotId: string;
  title: string;
  body: string;
  authorAddress: string;
  discussionURL: string;
  startTimestamp: number;
  endTimestamp: number;
  voteType: string;
  proposalStatus: string;
  quorum: number;
  votes: number;
  choices: string[];
  scores: number[];
  scoresTotal: number;
  proposalSummary: string;
};

export type SQLPayout = {
  uuidOfPayout: string;
  uuidOfProposal: string;
  treasuryVersion: number;
  governanceCycleStart: number;
  numberOfPayouts: number;
  lockedUntil: number;
  amount: number;
  currency: string;
  payName?: string;
  payAddress?: string;
  payENS?: string;
  payProject?: number;
  payProjectHandle?: string;
  payStatus?: string;
  payAllocator?: string;
  authorDiscordId?: string;
  proposalId?: number;
  snapshotId?: string;
};

export type SQLReserve = {
  id: number;
  uuidOfReserve: string;
  uuidOfProposal: string;
  reserveGovernanceCycle: number;
  splits: JBSplitStruct[];
  reserveStatus: string;
};

export type DialogHandlerMessageIds = {
  temperatureCheckRollup: string;
  voteRollup: string;
  voteQuorumAlert: string;
  voteEndAlert: string;
  voteResultsRollup: string;
  temperatureCheckStartAlert: string;
  temperatureCheckEndAlert: string;
};

export type SQLSpaceConfig = {
  space: string;
  displayName?: string;
  avatar?: string;
  spaceOwners: string[];
  cid: string;
  config: NanceConfig;
  cycleStartReference: Date;
  lastUpdated: Date;
  cycleStageLengths?: number[];
  dialogHandlerMessageIds: DialogHandlerMessageIds;
  currentGovernanceCycle: number;
  autoEnable?: 0 | 1;
  template?: JSON;
};

export type SQLTransfer = {
  uuidOfTransfer: string;
  uuidOfProposal: string;
  transferGovernanceCycle: number;
  transferCount: number;
  transferName: string;
  transferAddress: string;
  transferTokenName: string;
  transferTokenAddress: string;
  transferAmount: string;
  transferDecimals: number;
  transferStatus: string;
};

export type SQLCustomTransaction = {
  uuidOfTransaction: string;
  uuidOfProposal: string;
  transactionGovernanceCycle: number;
  transactionCount: number;
  transactionName: string;
  transactionAddress: string;
  transactionValue: string;
  transactionFunctionName: string;
  transactionFunctionArgs: any[];
  transactionTenderlyId: string;
  transactionStatus: string;
};
