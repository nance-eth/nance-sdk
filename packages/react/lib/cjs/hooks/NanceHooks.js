"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCreatedProposals = exports.useCreateSpace = exports.useProposalDelete = exports.useProposalUpload = exports.useReconfigureRequest = exports.useProposal = exports.useProposalsInfinite = exports.useProposals = exports.usePrivateProposals = exports.useCurrentPayouts = exports.useSpaceInfo = exports.useAllSpaceInfo = void 0;
const swr_1 = __importDefault(require("swr"));
const mutation_1 = __importDefault(require("swr/mutation"));
const infinite_1 = __importDefault(require("swr/infinite"));
const react_1 = require("react");
const NanceContext_1 = require("../contexts/NanceContext");
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
function useAllSpaceInfo(shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/ish/all` : null, jsonFetcher());
}
exports.useAllSpaceInfo = useAllSpaceInfo;
function useSpaceInfo(args, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${args.space}` : null, jsonFetcher());
}
exports.useSpaceInfo = useSpaceInfo;
function useCurrentPayouts(space, cycle, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    const urlParams = new URLSearchParams();
    if (cycle) {
        urlParams.set('cycle', cycle);
    }
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${space}/payouts?` + urlParams.toString() : null, jsonFetcher());
}
exports.useCurrentPayouts = useCurrentPayouts;
function usePrivateProposals(space, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${space}/privateProposals` : null, jsonFetcher());
}
exports.usePrivateProposals = usePrivateProposals;
function useProposals(args, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
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
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${args.space}/proposals?` + urlParams.toString() : null, jsonFetcher());
}
exports.useProposals = useProposals;
function useProposalsInfinite(args, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
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
    return (0, infinite_1.default)(getKey, jsonFetcher());
}
exports.useProposalsInfinite = useProposalsInfinite;
function useProposal(args, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${args.space}/proposal/${args.hash}` : null, jsonFetcher());
}
exports.useProposal = useProposal;
function useReconfigureRequest(args, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    return (0, swr_1.default)(shouldFetch ? `${apiUrl}/${args.space}/reconfigure?version=${args.version}&address=${args.address}&datetime=${args.datetime}&network=${args.network}` : null, jsonFetcher());
}
exports.useReconfigureRequest = useReconfigureRequest;
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
function useProposalUpload(space, proposalId, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    let url = `${apiUrl}/${space}/proposals`;
    let fetcher = uploader;
    if (proposalId) {
        url = `${apiUrl}/${space}/proposal/${proposalId}`;
        fetcher = editor;
    }
    return (0, mutation_1.default)(shouldFetch ? url : null, fetcher);
}
exports.useProposalUpload = useProposalUpload;
function useProposalDelete(space, uuid, shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    let url = `${apiUrl}/${space}/proposal/${uuid}`;
    let fetcher = deleter;
    return (0, mutation_1.default)(shouldFetch ? url : null, fetcher);
}
exports.useProposalDelete = useProposalDelete;
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
function useCreateSpace(shouldFetch = true) {
    const { apiUrl } = (0, react_1.useContext)(NanceContext_1.NanceContext);
    const url = `${apiUrl}/ish/config`;
    let fetcher = creator;
    return (0, mutation_1.default)(shouldFetch ? url : null, fetcher);
}
exports.useCreateSpace = useCreateSpace;
async function fetchCreatedProposals(apiUrl, space, author, prefix = "") {
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
exports.fetchCreatedProposals = fetchCreatedProposals;
