"use client";

import React, { useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { Messages } from "primereact/messages";

type CustomMessageProps = {
  id?: string;
  severity?: "success" | "info" | "warn" | "error";
  summary: string;
  detail: string;
  sticky?: boolean;
  closable?: boolean;
};

const CustomMessage: React.FC<CustomMessageProps> = ({
  id = "1",
  severity = "info",
  summary,
  detail,
  sticky = true,
  closable = false,
}) => {
  const msgs = useRef<Messages>(null);

  useMountEffect(() => {
    msgs.current?.clear();
    msgs.current?.show({
      id,
      sticky,
      severity,
      summary,
      detail,
      closable,
    });
  });

  return (
    <div className="card flex justify-content-center">
      <Messages ref={msgs} />
    </div>
  );
};

export default CustomMessage;
