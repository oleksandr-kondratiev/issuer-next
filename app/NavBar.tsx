"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from "classnames";

const NAVBAR_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-6 px-6 h-14 items-center">
      <Link href="/">
        <SiPivotaltracker />
      </Link>
      <ul className="flex space-x-6">
        {NAVBAR_LINKS.map(({ href, label }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={classnames({
                "text-zinc-800": href === pathname,
                "text-zinc-500": href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
