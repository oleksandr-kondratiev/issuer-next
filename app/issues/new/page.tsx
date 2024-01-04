import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export const metadata: Metadata = {
  title: "Issue Tracker - New Issue",
  description: "Issue Tracker Dashboard. Track your issues easily.",
};

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
