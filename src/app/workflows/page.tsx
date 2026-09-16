import { listWorkflows } from "@/lib/content";
import { WorkflowsBrowser } from "./WorkflowsBrowser";

export default function WorkflowsPage() {
  const items = listWorkflows({ includeDrafts: true });
  return <WorkflowsBrowser items={items} />;
}
