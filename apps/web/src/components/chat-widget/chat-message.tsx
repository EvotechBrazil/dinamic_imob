import { User } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

type Segment =
  | { type: "text"; value: string }
  | { type: "image"; alt: string; url: string };

const IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function splitSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        value: content.slice(lastIndex, match.index),
      });
    }
    segments.push({ type: "image", alt: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) });
  }

  return segments;
}

interface Token {
  start: number;
  end: number;
  node: ReactNode;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokens: Token[] = [];

  let m: RegExpExecArray | null;
  BOLD_RE.lastIndex = 0;
  while ((m = BOLD_RE.exec(text)) !== null) {
    tokens.push({
      start: m.index,
      end: m.index + m[0].length,
      node: (
        <strong
          key={`${keyPrefix}-b-${m.index}`}
          className="font-semibold text-ink"
        >
          {m[1]}
        </strong>
      ),
    });
  }

  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    // Skip image-style matches (preceded by '!'): handled earlier
    if (m.index > 0 && text[m.index - 1] === "!") continue;
    const start = m.index;
    const end = m.index + m[0].length;
    // Skip if overlaps an existing token
    if (tokens.some((t) => start < t.end && end > t.start)) continue;
    tokens.push({
      start,
      end,
      node: (
        <a
          key={`${keyPrefix}-a-${m.index}`}
          href={m[2]}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          {m[1]}
        </a>
      ),
    });
  }

  tokens.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  tokens.forEach((tok, i) => {
    if (tok.start < cursor) return;
    if (tok.start > cursor) {
      nodes.push(
        <span key={`${keyPrefix}-t-${i}`}>{text.slice(cursor, tok.start)}</span>
      );
    }
    nodes.push(tok.node);
    cursor = tok.end;
  });
  if (cursor < text.length) {
    nodes.push(
      <span key={`${keyPrefix}-tail`}>{text.slice(cursor)}</span>
    );
  }

  return nodes;
}

function renderAssistantContent(content: string): ReactNode[] {
  const segments = splitSegments(content);
  const nodes: ReactNode[] = [];

  segments.forEach((seg, i) => {
    if (seg.type === "image") {
      nodes.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`img-${i}`}
          src={seg.url}
          alt={seg.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="mt-2 h-[160px] max-w-[260px] rounded-lg border border-border object-cover"
        />
      );
    } else if (seg.value.length > 0) {
      nodes.push(
        <span key={`txt-${i}`} className="whitespace-pre-wrap">
          {renderInline(seg.value, `s${i}`)}
        </span>
      );
    }
  });

  return nodes;
}

export function ChatMessageBubble({
  role,
  content,
  streaming,
}: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex w-full items-start gap-2.5",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div
          className="relative mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-portal-gold-soft"
          role="img"
          aria-label="Dinamic"
        >
          <Image
            src="/logo-dinamic.png"
            alt=""
            aria-hidden="true"
            width={375}
            height={250}
            className="absolute top-1/2 left-[-32%] h-auto w-[290%] max-w-none -translate-y-1/2"
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "whitespace-pre-wrap rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm border border-border bg-white text-ink"
        )}
      >
        {isUser ? (
          <>{content}</>
        ) : (
          <div className="flex flex-col">
            {renderAssistantContent(content)}
          </div>
        )}
        {streaming && (
          <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-primary align-middle" />
        )}
      </div>
      {isUser && (
        <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-600">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
