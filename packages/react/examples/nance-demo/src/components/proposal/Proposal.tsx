import { useState } from "react";
import AvailableProposalSelector from "./AvailableProposalSelector";
import ProposalInfoCard from "./ProposalInfoCard";
import AvailableCycleSelector from "./AvailableCycleSelector";

export default function Proposal({ space, currentCycle }: { space: string, currentCycle: number }) {
  const [cycle, setCycle] = useState<string>(currentCycle.toString());
  const [proposal, setProposal] = useState("");

  return (
    <div>
      <h2>Proposal</h2>
      <AvailableCycleSelector maxCycle={currentCycle + 1} selectedCycle={cycle} setSelectedCycle={setCycle} />
      <br />
      <AvailableProposalSelector space={space} cycle={cycle} selectedProposal={proposal} setSelectedProposal={setProposal} />
      <ProposalInfoCard space={space} proposalHash={proposal} />
    </div>
  )
}
