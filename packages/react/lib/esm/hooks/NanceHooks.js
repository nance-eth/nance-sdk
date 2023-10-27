import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';
import { useContext } from 'react';
import { NanceContext } from '../contexts/NanceContext';
function jsonFetcher() {
    return async (url) => {
        const res = await fetch(url);
        const json = await res.json();
        if (json?.success === 'false') {
            throw new Error(`An error occurred while fetching the data: ${json?.error}`);
        }
        return json;
    };
}
export function useAllSpaceInfo(shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    return useSWR(shouldFetch ? `${apiUrl}/ish/all` : null, jsonFetcher());
}
export function useSpaceInfo(args, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    return useSWR(shouldFetch ? `${apiUrl}/${args.space}` : null, jsonFetcher());
}
export function useCurrentPayouts(space, cycle, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    const urlParams = new URLSearchParams();
    if (cycle) {
        urlParams.set('cycle', cycle);
    }
    return useSWR(shouldFetch ? `${apiUrl}/${space}/payouts?` + urlParams.toString() : null, jsonFetcher());
}
export function usePrivateProposals(space, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    return useSWR(shouldFetch ? `${apiUrl}/${space}/privateProposals` : null, jsonFetcher());
}
export function useProposals(args, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    const urlParams = new URLSearchParams();
    if (args.cycle) {
        urlParams.set('cycle', args.cycle);
    }
    if (args.keyword) {
        urlParams.set('keyword', args.keyword);
    }
    if (args.limit) {
        urlParams.set('limit', args.limit.toString());
    }
    if (args.page) {
        urlParams.set('page', args.page.toString());
    }
    return useSWR(shouldFetch ? `${apiUrl}/${args.space}/proposals?` + urlParams.toString() : null, jsonFetcher());
}
export function useProposalsInfinite(args, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    const urlParams = new URLSearchParams();
    if (args.cycle) {
        urlParams.set('cycle', args.cycle);
    }
    if (args.keyword) {
        urlParams.set('keyword', args.keyword);
    }
    if (args.limit) {
        urlParams.set('limit', args.limit.toString());
    }
    if (args.page) {
        urlParams.set('page', args.page.toString());
    }
    const getKey = (pageIndex, previousPageData) => {
        if (!shouldFetch || (previousPageData && !previousPageData.data.hasMore))
            return null; // reached the end
        urlParams.set('page', (pageIndex + 1).toString());
        return `${apiUrl}/${args.space}/proposals?` + urlParams.toString(); // SWR key
    };
    return useSWRInfinite(getKey, jsonFetcher());
}
export function useProposal(args, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    return useSWR(shouldFetch ? `${apiUrl}/${args.space}/proposal/${args.hash}` : null, jsonFetcher());
}
export function useReconfigureRequest(args, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    return useSWR(shouldFetch ? `${apiUrl}/${args.space}/reconfigure?version=${args.version}&address=${args.address}&datetime=${args.datetime}&network=${args.network}` : null, jsonFetcher());
}
async function uploader(url, { arg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg),
    });
    const json = await res.json();
    if (json.success === false) {
        throw new Error(`An error occurred while uploading the data: ${json?.error}`);
    }
    return json;
}
async function creator(url, { arg }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
    });
    const json = await res.json();
    if (json.success === false) {
        throw new Error(`An error occurred while uploading the data: ${json?.error}`);
    }
    return json;
}
export function useProposalUpload(space, proposalId, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    let url = `${apiUrl}/${space}/proposals`;
    let fetcher = uploader;
    if (proposalId) {
        url = `${apiUrl}/${space}/proposal/${proposalId}`;
        fetcher = editor;
    }
    return useSWRMutation(shouldFetch ? url : null, fetcher);
}
export function useProposalDelete(space, uuid, shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    let url = `${apiUrl}/${space}/proposal/${uuid}`;
    let fetcher = deleter;
    return useSWRMutation(shouldFetch ? url : null, fetcher);
}
async function editor(url, { arg }) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
    });
    const json = await res.json();
    if (json.success === false) {
        throw new Error(`An error occurred while uploading the data: ${json?.error}`);
    }
    return json;
}
async function deleter(url) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await res.json();
    if (json.success === false) {
        throw new Error(`An error occurred while deleting this proposal: ${json?.error}`);
    }
    return json;
}
export function useCreateSpace(shouldFetch = true) {
    const { apiUrl } = useContext(NanceContext);
    const url = `${apiUrl}/ish/config`;
    let fetcher = creator;
    return useSWRMutation(shouldFetch ? url : null, fetcher);
}
export async function fetchCreatedProposals(apiUrl, space, author, prefix = "") {
    if (!space || !author) {
        return {
            success: true,
            data: {
                proposalInfo: {
                    snapshotSpace: "",
                    proposalIdPrefix: "",
                    minTokenPassingAmount: 0
                },
                proposals: [],
                privateProposals: [],
                hasMore: false,
            }
        };
    }
    const url = `${apiUrl}/${space}/proposals/?author=${author}`;
    const res = await fetch(prefix + url);
    const json = await res.json();
    if (json.success === false) {
        console.warn("fetchCreatedProposals errors occurred: ", json.error);
    }
    return json;
}
