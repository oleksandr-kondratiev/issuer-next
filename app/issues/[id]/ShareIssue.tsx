"use client";

import { Issue } from "@prisma/client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

interface Props {
  issue: Issue;
}

const ShareIssue = ({ issue }: Props) => {
  const shareUrl = window.location.href || "";

  const title = `Get more information about the issue${
    issue?.title ? ` - ${issue.title}` : ""
  }`;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <CaretDownIcon />
          Share via
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="w-full h-full flex items-center justify-start"
          >
            Share on Facebook
          </FacebookShareButton>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="w-full h-full flex items-center justify-start"
          >
            Share on Twitter
          </TwitterShareButton>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            className="w-full h-full flex items-center justify-start"
          >
            Share on Linkedin
          </LinkedinShareButton>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ShareIssue;
