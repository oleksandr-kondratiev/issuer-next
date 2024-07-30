"use client";

import { Share2Icon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const ShareIssue = () => {
  const pathname = usePathname();

  const shareUrl = `${process.env.NEXT_APP_URL}${pathname}`;
  const title = "Get more information about the issue";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">
          <Share2Icon />
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
