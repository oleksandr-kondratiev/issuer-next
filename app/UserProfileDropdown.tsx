"use client";

import { Avatar, DropdownMenu, Flex, Skeleton, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserProfileDropdown = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" gap="4">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-8 h-8" />
      </Flex>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Link href="api/auth/signin" className="nav-link">
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex
          justify="center"
          align="center"
          gap="4"
          className="cursor-pointer"
        >
          <Text>{session?.user?.name}</Text>
          <Avatar
            src={session?.user?.image as string}
            fallback={session?.user?.name?.charAt(0) || "?"}
            size="2"
            referrerPolicy="no-referrer"
          />
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="bottom" align="end">
        <DropdownMenu.Label>
          <Text size="2">{session?.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link
            href="api/auth/signout"
            className="w-full h-full flex justify-start items-center"
          >
            Sign Out
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserProfileDropdown;
