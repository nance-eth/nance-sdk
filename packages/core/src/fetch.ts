import {
  APIResponse,
  ProposalPacket,
  ProposalRequest,
  ProposalsPacket,
  ProposalsRequest,
  SpaceConfig,
  SpaceInfo,
  ActionsQueryResponse,
} from "./types";

const DEFAULT_API_GATEWAY = "https://api.nance.app";

async function genericFetchAndThrowIfError<T>(
  route: string,
  gateway: string,
): Promise<T> {
  const res = await fetch(gateway + route);
  const json: APIResponse<T> = await res.json();
  // TODO: handle HTTP status code?
  if (!json?.success || json?.error) {
    throw new Error(
      `An error occurred while fetching the data: ${json?.error}`,
    );
  }
  return json.data;
}

/**
 * Get infos of all spaces
 * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
 */
export async function getAllSpaces(gateway: string = DEFAULT_API_GATEWAY) {
  return genericFetchAndThrowIfError<SpaceInfo[]>("/ish/all", gateway);
}

/**
 * Get info of single space
 * @param spaceName - the name of space you want to query
 * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
 */
export async function getSpace(
  spaceName: string,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  return genericFetchAndThrowIfError<SpaceInfo>(`/${spaceName}`, gateway);
}

/**
 * Get config of single space
 * @param spaceName - the name of space you want to query
 * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
 */
export async function getSpaceConfig(
  spaceName: string,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  return genericFetchAndThrowIfError<SpaceConfig>(
    `/ish/config/${spaceName}`,
    gateway,
  );
}

/**
 * Query proposals of single space
 * @param args - filter args for proposals
 * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
 */
export async function getProposals(
  args: ProposalsRequest,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  const urlParams = new URLSearchParams();
  if (args.cycle) {
    urlParams.set("cycle", args.cycle);
  }
  if (args.keyword) {
    urlParams.set("keyword", args.keyword);
  }
  if (args.limit) {
    urlParams.set("limit", args.limit.toString());
  }
  if (args.page) {
    urlParams.set("page", args.page.toString());
  }

  return genericFetchAndThrowIfError<ProposalsPacket>(
    `/${args.space}/proposals?${urlParams.toString()}`,
    gateway,
  );
}

/**
 * Get single proposal
 * @param args - filter args for proposal
 * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
 */
export function getProposal(
  args: ProposalRequest,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  return genericFetchAndThrowIfError<ProposalPacket>(
    `/${args.space}/proposal/${args.uuid}`,
    gateway,
  );
}

/**
  * Get actions of single space
  * @param spaceName - the name of space you want to query
  * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
  */
export async function getActions(
  spaceName: string,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  return genericFetchAndThrowIfError<ActionsQueryResponse>(
    `/${spaceName}/actions`,
    gateway,
  );
}

/**
  * Start or refresh Discord Discussion message
  * @param spaceName - the name of space you want to query
  * @param uuid - proposal uuid
  * @param gateway - gateway url to send request, defaults to DEFAULT_API_GATEWAY
*/
export async function getOrRefreshProposalDiscussion(
  spaceName: string,
  uuid: string,
  gateway: string = DEFAULT_API_GATEWAY,
) {
  return genericFetchAndThrowIfError<void>(
    `/${spaceName}/proposal/${uuid}/discussion`,
    gateway,
  );
}
