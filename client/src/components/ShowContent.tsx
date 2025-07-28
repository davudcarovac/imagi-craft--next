"use client";

import React, { ReactNode } from "react";
import { Inplace, InplaceContent } from "primereact/inplace";

type ShowContentType = {
  children: ReactNode;
  label: string;
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowContent = ({ children, isShown, setIsShown }: ShowContentType) => {
  return (
    <Inplace active={isShown} onToggle={(e) => setIsShown(e.value)}>
      {/* <InplaceDisplay></InplaceDisplay> */}
      <InplaceContent>{children}</InplaceContent>
    </Inplace>
  );
};

export default ShowContent;
