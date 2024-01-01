import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  href: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
