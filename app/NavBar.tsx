import Link from "next/link";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-6 px-6 h-14 items-center">
      <Link href="/">
        <SiPivotaltracker />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }, index) => (
          <li key={index}>
            <Link
              href={href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
