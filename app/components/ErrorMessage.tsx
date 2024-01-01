import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) {
    return null;
  }

  return (
    <Text as="p" size={"2"} color="red">
      {children}
    </Text>
  );
};

export default ErrorMessage;