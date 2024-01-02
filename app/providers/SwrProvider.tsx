"use client";

import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const SWRProvider = ({ children }: PropsWithChildren) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default SWRProvider;
