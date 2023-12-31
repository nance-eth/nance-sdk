import { DateEvent, GovernanceCycleForm, NanceConfig, Proposal } from './common';
import { SQLPayout, DialogHandlerMessageIds } from './doltSchema';

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data: T;
}

export type SpaceInfo = {
  name: string;
  currentCycle: number;
  currentEvent: DateEvent;
  spaceOwners: string[];
  snapshotSpace: string;
  juiceboxProjectId: string;
  transactorAddress?: {
    type: 'safe' | 'governor';
    network: string;
    address: string;
  }
  dolthubLink: string;
};

export type SpaceInfoExtended = SpaceInfo & {
  currentDay: number;
  cycleTriggerTime: string;
  dialog: DialogHandlerMessageIds;
  config: NanceConfig;
};

type ProposalInfo = {
  snapshotSpace: string;
  proposalIdPrefix: string;
  minTokenPassingAmount: number;
};

export type ProposalsPacket = { proposalInfo: ProposalInfo; proposals: Proposal[]; hasMore: boolean; };

export type ProposalsQueryResponse = APIResponse<ProposalsPacket>;

export type ProposalMarkdownResponse = APIResponse<Proposal>;

export type PayoutsQueryResponse = APIResponse<SQLPayout[]>;

export type SpaceInfoResponse = APIResponse<SpaceInfo>;

export type APIErrorResponse = APIResponse<undefined>;

interface BaseRequest {
  space: string;
}

export interface SpaceProposalRequest extends BaseRequest {
  cycle: number | undefined;
}

export type SpaceInfoRequest = BaseRequest;

export interface ProposalsRequest extends BaseRequest {
  cycle?: string | null | undefined;
  keyword?: string | null | undefined;
  limit?: number | null | undefined;
  page?: number | null | undefined;
  author?: string | null | undefined;
}

export interface ProposalRequest extends BaseRequest {
  hash: string;
}

export interface ProposalUploadRequest extends BaseRequest {
  proposal: Proposal;
}

export interface FetchReconfigureRequest extends BaseRequest {
  version: string;
  address: string;
  datetime: string;
  network: string;
}

export interface ConfigSpaceRequest extends BaseRequest {
  config: NanceConfig;
  owners: string[];
  cycleTriggerTime: string;
  cycleStageLengths: number[];
  governanceCycleForm: GovernanceCycleForm
  dryrun?: boolean;
}

export interface EditPayoutsRequest extends BaseRequest {
  payouts: SQLPayout[];
}

export interface FetchReconfigureData {
  transaction: NanceBasicTransaction;
  nonce: string;
  safe: string;
}

export interface NanceBasicTransaction {
  address: string;
  bytes: string;
}

export type ProposalUploadPayload = {
  hash: string;
}

export interface ProposalDeleteRequest {
  hash: string;
}

export type ConfigSpacePayload = {
  space: string;
  spaceOwner: string;
}

export type CreateFormValues = {
  config: {
    name: string;
    discord: DiscordConfig;
    proposalIdPrefix: string;
    juicebox: JuiceboxConfig;
    snapshot: SnapshotConfig;
  }
  governanceCycleForm: GovernanceCycleForm
  dryRun: boolean;
}

export type DiscordConfig = {
  guildId: string;
  roles: DiscordConfigRoles;
  channelIds: DiscordConfigChannels;
  reminder: { channelIds: string[]; }
}

export type DiscordConfigChannels = {
  proposals: string;
}

export type DiscordConfigRoles = {
  governance: string;
}

export type JuiceboxConfig = {
  projectId: string;
  gnosisSafeAddress: string;
}

export type SnapshotConfig = {
  space: string;
  minTokenPassingAmount: number;
  passingRatio: number;
}
