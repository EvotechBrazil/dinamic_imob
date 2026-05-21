"use client";

import * as React from "react";
import { ChatButton } from "./chat-button";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ChatButton open={open} onToggle={() => setOpen((o) => !o)} />
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
