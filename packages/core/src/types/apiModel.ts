import {
  Action,
  DateEvent,
  GovernanceCycleForm,
  NanceConfig,
  NewProposal,
  Proposal,
  ProposalSubmissionValidationSnapshot,
  UpdateProposal,
} from "./common";
import { DialogHandlerMessageIds, SQLSpaceConfig } from "./doltSchema";
import { BasicNanceSignature } from "./signaturesNance";

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data: T;
}

export type SpaceInfo = {
  name: string;
  displayName: string;
  avatarURL: string;
  currentCycle: number;
  currentCycleDay: number;
  cycleStartDate: string;
  currentEvent: DateEvent;
  nextEvents: DateEvent[];
  spaceOwners: string[];
  snapshotSpace: string;
  juiceboxProjectId: string;
  transactorAddress?: {
    type: "safe" | "governor";
    network: string;
    address: string;
  }
  dolthubLink: string;
  nextProposalId: number;
  proposalSubmissionValidation?: ProposalSubmissionValidationSnapshot;
};

export type SpaceInfoExtended = Omit<SpaceInfo, "nextProposalId" | "dolthubLink"> & {
  cycleTriggerTime: string;
  dialog: DialogHandlerMessageIds;
  config: NanceConfig;
};

type ProposalInfo = {
  snapshotSpace: string;
  proposalIdPrefix: string;
  minTokenPassingAmount: number;
  minVotingPowerSubmissionBalance?: number;
  nextProposalId: number;
};

export type SpaceConfig = Omit<SQLSpaceConfig, "cycleStartReference"> & { cycleStartReference: string; };

export type ProposalsPacket = {
  proposalInfo: ProposalInfo;
  proposals: Proposal[];
  hasMore: boolean;
};

export type ProposalPacket = Proposal & { proposalInfo: ProposalInfo };

export type ActionPacket = {
  action: Action;
  proposal: {
    id: number;
    title: string;
  }
}

export type ActionsQueryResponse = APIResponse<ActionPacket[]>;
export type ProposalsQueryResponse = APIResponse<ProposalsPacket>;
export type ProposalQueryResponse = APIResponse<ProposalPacket>;
export type SpaceInfoResponse = APIResponse<SpaceInfo>;
export type ProposalUploadResponse = APIResponse<{ uuid: string }>;
export type ProposalUpdateResponse = APIResponse<{ uuid: string }>;
export type ProposalDeleteResponse = APIResponse<{ affectedRows: number }>;
export type APIErrorResponse = APIResponse<undefined>;

export interface BaseRequest {
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
  uuid: string;
}

export interface ProposalUploadRequest {
  proposal: NewProposal;
  envelope?: BasicNanceSignature;
}

export interface ProposalUpdateRequest {
  proposal: UpdateProposal;
  envelope?: BasicNanceSignature;
}

export interface ConfigSpaceRequest extends BaseRequest {
  config: NanceConfig;
  network: string;
  spaceOwners: { address: string }[];
  cycleTriggerTime: string;
  cycleStageLengths: number[];
  governanceCycleForm: GovernanceCycleForm;
  dryrun?: boolean;
}

export type ProposalUploadPayload = {
  uuid: string;
};

export interface ProposalDeleteRequest {
  uuid: string;
  envelope?: BasicNanceSignature;
}

export type ConfigSpacePayload = {
  space: string;
  spaceOwners: string;
};

export type CreateFormValues = {
  config: {
    name: string;
    discord: DiscordConfig;
    proposalIdPrefix: string;
    juicebox: JuiceboxConfig;
    snapshot: SnapshotConfig;
  };
  spaceOwners: string[];
  governanceCycleForm: GovernanceCycleForm;
  dryRun: boolean;
};

export type DiscordConfig = {
  guildId: string;
  roles: DiscordConfigRoles;
  channelIds: DiscordConfigChannels;
  reminder: { channelIds: string[] };
};

export type DiscordConfigChannels = {
  proposals: string;
};

export type DiscordConfigRoles = {
  governance: string;
};

export type JuiceboxConfig = {
  projectId: string;
  gnosisSafeAddress: string;
};

export type SnapshotConfig = {
  space: string;
  minTokenPassingAmount: number;
  passingRatio: number;
};
