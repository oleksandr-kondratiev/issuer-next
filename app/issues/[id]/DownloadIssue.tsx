"use client";

import { Issue } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

interface Props {
  issue: Issue;
}

const DownloadIssue = ({ issue }: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const worker = new Worker(new URL("../../workers/pdfWorker.js", import.meta.url));

      worker.onmessage = (e) => {
        const pdfBlob = new Blob([e.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      };

      document
        .getElementById("download-button")
        ?.addEventListener("click", () => {
          worker.postMessage({ issue });
        });

      return () => {
        worker.terminate();
      };
    }
  }, [issue]);

  return (
    <Button id="download-button" className="w-full" variant="outline">
      <DownloadIcon />
      Download Issue
    </Button>
  );
};

export default DownloadIssue;
