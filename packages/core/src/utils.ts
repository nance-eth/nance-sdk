import YAML from "yaml";
import { Action } from "./types";

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
  return body.replace(new RegExp(`(${actionsHeader}[\\s\\S]*?${actionsFooter})`, "g"), "");
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
