import useSWR, { Fetcher } from "swr";
import useSWRMutation from "swr/mutation";
import useSWRInfinite from "swr/infinite";
import {
  APIResponse,
  ProposalsRequest,
  SpaceInfoRequest,
  ProposalRequest,
  ProposalUploadRequest,
  SpaceInfo,
  Proposal,
  ProposalUploadPayload,
  ProposalsPacket,
  SQLPayout,
  ConfigSpacePayload,
  CreateFormValues,
  ProposalPacket,
} from "@nance/nance-sdk";
import { useContext } from "react";
import { NanceContext } from "../contexts/NanceContext";

function jsonFetcher(): Fetcher<APIResponse<any>, string> {
  return async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    if (json?.success === "false") {
      throw new Error(
        `An error occurred while fetching the data: ${json?.error}`,
      );
    }
    return json;
  };
}

export function useAllSpaceInfo(shouldFetch: boolean = true) {
  const { apiUrl } = useContext(NanceContext);
  return useSWR<APIResponse<SpaceInfo[]>>(
    shouldFetch ? `${apiUrl}/ish/all` : null,
    jsonFetcher(),
  );
}

export function useSpaceInfo(
  args: SpaceInfoRequest,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  return useSWR<APIResponse<SpaceInfo>, string>(
    shouldFetch ? `${apiUrl}/${args.space}` : null,
    jsonFetcher(),
  );
}

export function useCurrentPayouts(
  space: string,
  cycle: string | undefined,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  const urlParams = new URLSearchParams();
  if (cycle) {
    urlParams.set("cycle", cycle);
  }

  return useSWR<APIResponse<SQLPayout[]>, string>(
    shouldFetch ? `${apiUrl}/${space}/payouts?` + urlParams.toString() : null,
    jsonFetcher(),
  );
}

export function usePrivateProposals(
  space: string,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  return useSWR<APIResponse<Proposal[]>, string>(
    shouldFetch ? `${apiUrl}/${space}/privateProposals` : null,
    jsonFetcher(),
  );
}

export function useProposals(
  args: ProposalsRequest,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
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

  return useSWR<APIResponse<ProposalsPacket>, string>(
    shouldFetch
      ? `${apiUrl}/${args.space}/proposals?` + urlParams.toString()
      : null,
    jsonFetcher(),
  );
}

export function useProposalsInfinite(
  args: ProposalsRequest,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
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

  const getKey = (
    pageIndex: number,
    previousPageData: APIResponse<ProposalsPacket>,
  ) => {
    if (!shouldFetch || (previousPageData && !previousPageData.data.hasMore))
      return null; // reached the end
    urlParams.set("page", (pageIndex + 1).toString());
    return `${apiUrl}/${args.space}/proposals?` + urlParams.toString(); // SWR key
  };

  return useSWRInfinite<APIResponse<ProposalsPacket>, string>(
    getKey,
    jsonFetcher(),
  );
}

export function useProposal(
  args: ProposalRequest,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  return useSWR<APIResponse<ProposalPacket>, string>(
    shouldFetch ? `${apiUrl}/${args.space}/proposal/${args.uuid}` : null,
    jsonFetcher(),
  );
}

async function uploader(
  url: RequestInfo | URL,
  { arg }: { arg: ProposalUploadRequest },
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const json: APIResponse<ProposalUploadPayload> = await res.json();
  if (json.success === false) {
    throw new Error(
      `An error occurred while uploading the data: ${json?.error}`,
    );
  }

  return json;
}

async function creator(
  url: RequestInfo | URL,
  { arg }: { arg: CreateFormValues },
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const json: APIResponse<ConfigSpacePayload> = await res.json();
  if (json.success === false) {
    throw new Error(
      `An error occurred while uploading the data: ${json?.error}`,
    );
  }

  return json;
}

export function useProposalUpload(
  space: string,
  proposalId: string | undefined,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  let url = `${apiUrl}/${space}/proposals`;
  let fetcher = uploader;
  if (proposalId) {
    url = `${apiUrl}/${space}/proposal/${proposalId}`;
    fetcher = editor;
  }
  return useSWRMutation(shouldFetch ? url : null, fetcher);
}

export function useProposalDelete(
  space: string,
  uuid: string | undefined,
  shouldFetch: boolean = true,
) {
  const { apiUrl } = useContext(NanceContext);
  let url = `${apiUrl}/${space}/proposal/${uuid}`;
  let fetcher = deleter;
  return useSWRMutation(shouldFetch ? url : null, fetcher);
}

async function editor(
  url: RequestInfo | URL,
  { arg }: { arg: ProposalUploadRequest },
) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const json: APIResponse<ProposalUploadPayload> = await res.json();
  if (json.success === false) {
    throw new Error(
      `An error occurred while uploading the data: ${json?.error}`,
    );
  }

  return json;
}

async function deleter(url: RequestInfo | URL) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json: APIResponse<ProposalUploadPayload> = await res.json();
  if (json.success === false) {
    throw new Error(
      `An error occurred while deleting this proposal: ${json?.error}`,
    );
  }

  return json;
}

export function useCreateSpace(shouldFetch: boolean = true) {
  const { apiUrl } = useContext(NanceContext);
  const url = `${apiUrl}/ish/config`;
  let fetcher = creator;
  return useSWRMutation(shouldFetch ? url : null, fetcher);
}

export async function fetchCreatedProposals(
  apiUrl: string,
  space: string | undefined,
  author: string | undefined,
  prefix: string = "",
) {
  if (!space || !author) {
    return {
      success: true,
      data: {
        proposalInfo: {
          snapshotSpace: "",
          proposalIdPrefix: "",
          minTokenPassingAmount: 0,
          nextProposalId: 0,
        },
        proposals: [],
        privateProposals: [],
        hasMore: false,
      },
    } as APIResponse<ProposalsPacket>;
  }

  const url = `${apiUrl}/${space}/proposals/?author=${author}`;
  const res = await fetch(prefix + url);
  const json: APIResponse<ProposalsPacket> = await res.json();
  if (json.success === false) {
    console.warn("fetchCreatedProposals errors occurred: ", json.error);
  }

  return json;
}
