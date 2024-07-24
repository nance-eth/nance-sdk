import YAML from "yaml";
import { Action, ActionV1, ActionV2, Proposal, SnapshotTypes } from "./types";

const actionsHeader = "```nance-actions\n--- nance-actions\n";
const actionsFooter = "\n```";

export const actionsToYaml = (actions?: Action[]): string => {
  if (!actions || actions.length === 0) return "";
  return `${actionsHeader}${YAML.stringify(actions, { keepUndefined: true })}${actionsFooter}`;
};

export const getActionsFromBody = (body?: string): Action[] | null => {
  if (!body) return null;
  const regex = new RegExp(`(?<=${actionsHeader})([\\s\\S]*?)(?=${actionsFooter})`, "g");
  const matches = body.match(regex);

  if (matches && matches.length > 0) {
    return YAML.parse(matches[0].trim());
  }
  return null;
};

export const trimActionsFromBody = (body?: string) => {
  if (!body) return "";
  return body.replace(new RegExp(`(${actionsHeader}[\\s\\S]*?${actionsFooter})`, "g"), "").trim();
}

export const getActionYamlFromBody = (body?: string): string | null => {
  if (!body) return null;
  const regex = new RegExp(`(${actionsHeader.split("\n")[1]})([\\s\\S]*?)(?=${actionsFooter})`, "g");
  const matches = body.match(regex);

  if (matches && matches.length > 0) {
    return matches[0].trim();
  }
  return null;
};

export const formatSnapshotProposalMessage = (
  address: string,
  proposal: Proposal,
  space: string,
  voteStart: Date,
  voteEnd: Date
): SnapshotTypes.Proposal => {
  return {
    from: address,
    space,
    timestamp: Math.floor(Date.now() / 1000),
    type: proposal.voteSetup?.type as SnapshotTypes.ProposalType || "basic",
    title: proposal.title,
    body: proposal.body,
    discussion: proposal.discussionThreadURL || "",
    choices: proposal.voteSetup?.choices || ["For", "Against", "Abstain"],
    start: Math.floor(voteStart.getTime() / 1000),
    end: Math.floor(voteEnd.getTime() / 1000),
    snapshot: 0, // TODO: snapshot block by date, maybe we just do it in client library since theres no provider in here
    plugins: JSON.stringify({}),
    app: "nance"
  };
}

export const formatSnapshotDeleteProposalMessage = (
  address: string,
  space: string,
  snapshotId: string
): SnapshotTypes.CancelProposal => {
  return {
    from: address,
    space,
    timestamp: Math.floor(Date.now() / 1000),
    proposal: snapshotId
  };
}

// Type guards to differentiate between ActionV1 and ActionV2
export function isActionV1(action: Action): action is ActionV1 {
  return 'name' in action && !('pollRequired' in action);
}

export function isActionV2(action: Action): action is ActionV2 {
  return 'pollRequired' in action && !('governanceCycles' in action);
}
