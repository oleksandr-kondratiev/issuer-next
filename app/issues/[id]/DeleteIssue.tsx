"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Callout, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number | string;
}

const DeleteIssue = ({ issueId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError("");
  };

  const deleteIssue = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
      closeModal();
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="red" onClick={openModal}>
        Delete Issue
      </Button>
      <AlertDialog.Root open={isOpen}>
        <AlertDialog.Content>
          {error && (
            <Callout.Root color="red" className="mb-4">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete this issue. This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex justify="between" align="center" mt="4">
            <AlertDialog.Cancel>
              <Button onClick={closeModal} variant="outline">
                {error ? "Close" : "Cancel"}
              </Button>
            </AlertDialog.Cancel>
            {!error && (
              <AlertDialog.Action>
                <Button color="red" onClick={deleteIssue} disabled={isLoading}>
                  Delete Issue
                  <Spinner isLoading={isLoading} />
                </Button>
              </AlertDialog.Action>
            )}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssue;
