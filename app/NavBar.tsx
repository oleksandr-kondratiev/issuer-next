"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiPivotaltracker } from "react-icons/si";
import UserProfileDropdown from "./UserProfileDropdown";

const NAVBAR_LINKS = [
  { href: "/", label: <SiPivotaltracker className="w-6 h-6" />, active: true },
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b mb-6">
      <Container className="py-4 px-6">
        <Flex justify="between" align="center">
          <ul className="flex space-x-6">
            {NAVBAR_LINKS.map(({ href, label, active }, index) => (
              <li key={index}>
                <Link
                  href={href}
                  className={classnames({
                    "nav-link": true,
                    "!text-zinc-800": href === pathname || active,
                  })}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Box>
            <UserProfileDropdown />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
