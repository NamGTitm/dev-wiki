"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, ChevronUp, Copy, Layers3, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { articleBadges, articles, collections, getCollectionGroups, getFeaturedArticles, type Article, type Collection } from "@/lib/content";
import { getGithubEditUrl } from "@/lib/github";

function Header({ onSearch, onMenu }: { onSearch: () => void; onMenu: () => void }) {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1500px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button onClick={onMenu} className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-muted)] lg:hidden" aria-label="Mở điều hướng"><Menu className="size-5" /></button>
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="DevHubs Wiki trang chủ"><span className="grid size-9 place-items-center rounded-xl bg-[var(--foreground)] font-mono text-sm font-bold text-[var(--background)] transition group-hover:bg-[var(--teal)]">&gt;_</span><span className="hidden text-sm font-bold tracking-tight sm:block">DevHubs <span className="text-[var(--teal)]">Wiki</span></span></Link>
        <nav className="hidden items-center gap-4 text-xs font-semibold text-[var(--muted)] md:flex" aria-label="Điều hướng chính"><Link href="/#collections" className="hover:text-[var(--teal)]">Collections</Link><Link href="/#popular" className="hover:text-[var(--teal)]">Topics</Link></nav>
        <div className="mx-auto flex min-w-0 flex-1 justify-center"><button onClick={onSearch} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-left text-sm text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--foreground)] sm:max-w-[360px]" aria-label="Mở tìm kiếm"><Search className="size-4" /><span className="flex-1 truncate">Tìm kiếm trong DevHubs Wiki...</span><kbd className="hidden rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 text-[11px] sm:inline">⌘ K</kbd></button></div>
        <button onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")} className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-muted)]" aria-label="Chuyển đổi giao diện sáng tối"><Sun className="hidden size-4 dark:block" /><Moon className="size-4 dark:hidden" /></button><a href="https://github.com/NamGTitm/dev-wiki" className="hidden rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--teal)] md:block">GitHub</a>
      </div>
    </header>
  );
}

function Sidebar({ activeCollectionSlug, mobile = false, onClose }: { activeCollectionSlug?: string; mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const activeCollection = collections.find((collection) => collection.slug === activeCollectionSlug);
  const groups = activeCollection ? getCollectionGroups(activeCollection) : [];

  return <aside className={mobile ? "h-full w-[min(86vw,340px)] overflow-y-auto overscroll-y-contain bg-[var(--surface)] p-5" : "hidden h-full min-h-0 w-[260px] shrink-0 overflow-y-auto overscroll-y-contain border-r border-[var(--border)] bg-[var(--sidebar)] px-4 py-7 lg:block"}>
    {mobile && <div className="mb-6 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">DevHubs Wiki</span><button onClick={onClose} aria-label="Đóng điều hướng"><X className="size-5" /></button></div>}
    <nav aria-label="Điều hướng tài liệu" className="space-y-6">
      <div role="group" aria-label="Chọn ngôn ngữ">
        <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Ngôn ngữ</p>
        <div className="flex flex-wrap gap-1.5">
          {collections.map((collection) => {
            const isActive = collection.slug === activeCollection?.slug;
            return <Link key={collection.slug} href={`/${collection.slug}`} onClick={onClose} aria-current={isActive ? "true" : undefined} className={`rounded-md px-2 py-1.5 text-xs font-semibold transition ${isActive ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"}`}>
              {collection.label}
            </Link>;
          })}
        </div>
      </div>
      {activeCollection ? <section aria-label={`Chủ đề ${activeCollection.label}`}>
        <Link href={`/${activeCollection.slug}`} onClick={onClose} className="mb-3 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--teal)]"><BookOpen className="size-4 text-[var(--teal)]" /> {activeCollection.label}</Link>
        <div className="space-y-5">{groups.map((group, index) => <div key={`${activeCollection.slug}-${group.key}`}>
          <div className="mb-1.5 flex items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]"><span className="font-mono text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>{group.label}</div>
          <div className="space-y-0.5">{group.items.map((article) => <Link key={article.slug} onClick={onClose} href={article.slug} aria-current={pathname === article.slug ? "page" : undefined} className={`group flex items-start gap-2 rounded-md px-2 py-1.5 text-[13px] leading-5 transition ${pathname === article.slug ? "bg-[var(--surface)] font-semibold text-[var(--teal)] shadow-sm" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"}`}><span className={`mt-2 size-1.5 shrink-0 rounded-full ${pathname === article.slug ? "bg-[var(--accent)]" : "bg-[var(--border)] group-hover:bg-[var(--teal)]"}`} />{article.title}</Link>)}</div>
        </div>)}</div>
      </section> : <p className="px-2 text-sm text-[var(--muted)]">Chọn một ngôn ngữ để xem các chủ đề.</p>}
    </nav>
  </aside>;
}

function MobileNav({ activeCollectionSlug, open, onClose }: { activeCollectionSlug?: string; open: boolean; onClose: () => void }) { if (!open) return null; return <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-slate-950/40" onClick={onClose} aria-label="Đóng điều hướng" /><div className="relative h-full"><Sidebar activeCollectionSlug={activeCollectionSlug} mobile onClose={onClose} /></div></div>; }

function SearchResults({ router, onClose }: { router: ReturnType<typeof useRouter>; onClose: () => void }) { return <>{articles.map((article) => <CommandItem key={article.slug} value={`${article.title} ${article.description} ${article.keywords.join(" ")} ${article.collectionLabel}`} onSelect={() => { router.push(article.slug); onClose(); }}><div className="min-w-0"><p className="truncate font-medium">{article.title}</p><p className="truncate text-xs text-[var(--muted)]">{article.collectionLabel} · {article.categoryLabel} · {article.description}</p></div></CommandItem>)}</>; }

function SearchPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) { const router = useRouter(); return <CommandDialog open={open} onOpenChange={onOpenChange} title="Tìm kiếm DevHubs Wiki" description="Tìm bài viết trong toàn bộ wiki theo tiêu đề, từ khóa hoặc nội dung"><CommandInput placeholder="Ví dụ: Python, Git, HTTP, SQL, async..." /><CommandList><CommandEmpty>Không tìm thấy bài viết phù hợp.</CommandEmpty><CommandGroup heading="Bài viết trong Wiki"><SearchResults router={router} onClose={() => onOpenChange(false)} /></CommandGroup></CommandList></CommandDialog>; }

const cppKeywords = new Set("alignas alignof asm auto break case catch class co_await co_return co_yield concept const consteval constexpr constinit continue decltype default delete do else explicit export extern false for friend goto if inline namespace new noexcept nullptr operator private protected public register requires return sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union using virtual volatile while".split(" "));
const cppTypes = new Set("bool char char8_t char16_t char32_t double float int long short signed unsigned void wchar_t".split(" "));

function highlightCpp(code: string): ReactNode[] {
  const tokenPattern = /(?:u8|u|U|L)?R"([A-Za-z0-9_]*)\([\s\S]*?\)\1"|(?:u8|u|U|L)?"(?:\\.|[^"\\])*"|(?:u|U|L)?'(?:\\.|[^'\\])*'|\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|#\s*[A-Za-z_][A-Za-z_0-9]*|[A-Za-z_][A-Za-z_0-9]*|\b\d[\w'.]*\b/g;
  const nodes: ReactNode[] = [];
  let offset = 0;

  for (const match of code.matchAll(tokenPattern)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > offset) nodes.push(code.slice(offset, start));

    let kind: string | undefined;
    if (token.startsWith("//") || token.startsWith("/*")) kind = "comment";
    else if (/^(?:u8|u|U|L)?(?:R)?["']/.test(token)) kind = "string";
    else if (token.startsWith("#")) kind = "preprocessor";
    else if (cppKeywords.has(token)) kind = "keyword";
    else if (cppTypes.has(token)) kind = "type";
    else if (/^\d/.test(token)) kind = "number";

    nodes.push(kind ? <span key={start} className={`cpp-token-${kind}`}>{token}</span> : token);
    offset = start + token.length;
  }

  if (offset < code.length) nodes.push(code.slice(offset));
  return nodes;
}

function CodeBlock({ language, code, children }: { language: string; code: string; children: ReactNode }) { const [copied, setCopied] = useState(false); return <div className="my-7 overflow-hidden rounded-xl border border-white/10 bg-[var(--code)] shadow-[0_12px_30px_rgba(16,42,67,0.12)]"><div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/55"><span className="font-mono uppercase tracking-[0.12em]">{language}</span><button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }} className="inline-flex items-center gap-1.5 rounded px-2 py-1 hover:bg-white/10 hover:text-white">{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copied ? "Đã copy" : "Copy"}</button></div><pre className="overflow-x-auto p-5 text-[13px] leading-6 text-[var(--code-text)]"><code>{children}</code></pre></div>; }

function splitMarkdownTableRow(row: string): string[] {
  let source = row.trim();
  if (source.startsWith("|")) source = source.slice(1);

  const trailingPipe = source.length - 1;
  let trailingBackslashes = 0;
  for (let cursor = trailingPipe - 1; cursor >= 0 && source[cursor] === "\\"; cursor -= 1) {
    trailingBackslashes += 1;
  }
  if (source.endsWith("|") && trailingBackslashes % 2 === 0) {
    source = source.slice(0, -1);
  }

  const cells: string[] = [];
  let cell = "";
  let codeDelimiterLength = 0;

  for (let index = 0; index < source.length;) {
    if (source[index] === "`") {
      let end = index + 1;
      while (source[end] === "`") end += 1;
      const delimiterLength = end - index;
      if (codeDelimiterLength === 0) codeDelimiterLength = delimiterLength;
      else if (codeDelimiterLength === delimiterLength) codeDelimiterLength = 0;
      cell += source.slice(index, end);
      index = end;
      continue;
    }

    if (source[index] === "|" && codeDelimiterLength === 0) {
      let precedingBackslashes = 0;
      for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor -= 1) {
        precedingBackslashes += 1;
      }
      if (precedingBackslashes % 2 === 1) {
        cell = `${cell.slice(0, -1)}|`;
      } else {
        cells.push(cell.trim());
        cell = "";
      }
      index += 1;
      continue;
    }

    cell += source[index];
    index += 1;
  }

  cells.push(cell.trim());
  return cells;
}

type MarkdownTableAlignment = "left" | "center" | "right";

function parseMarkdownTableHeader(
  lines: string[],
  index: number,
): { headers: string[]; alignments: MarkdownTableAlignment[] } | undefined {
  const headerLine = lines[index];
  const separatorLine = lines[index + 1];
  if (!headerLine?.includes("|") || !separatorLine) return undefined;

  const headers = splitMarkdownTableRow(headerLine);
  const separators = splitMarkdownTableRow(separatorLine);
  if (
    headers.length < 2 ||
    headers.length !== separators.length ||
    !separators.every((cell) => /^:?-+:?$/.test(cell))
  ) {
    return undefined;
  }

  const alignments = separators.map((cell): MarkdownTableAlignment => {
    if (cell.startsWith(":") && cell.endsWith(":")) return "center";
    if (cell.endsWith(":")) return "right";
    return "left";
  });
  return { headers, alignments };
}

type SearchTextPart = { text: string; isMatch: boolean };

function splitSearchText(value: string, query: string): SearchTextPart[] {
  if (!query) return [{ text: value, isMatch: false }];

  const lowerValue = value.toLowerCase();
  const parts: SearchTextPart[] = [];
  let cursor = 0;

  while (cursor < value.length) {
    const matchStart = lowerValue.indexOf(query, cursor);
    if (matchStart === -1) break;
    if (matchStart > cursor) parts.push({ text: value.slice(cursor, matchStart), isMatch: false });
    parts.push({ text: value.slice(matchStart, matchStart + query.length), isMatch: true });
    cursor = matchStart + query.length;
  }

  if (cursor < value.length) parts.push({ text: value.slice(cursor), isMatch: false });
  return parts.length > 0 ? parts : [{ text: value, isMatch: false }];
}

function Markdown({ body, searchQuery = "", activeSearchIndex = 0 }: { body: string; searchQuery?: string; activeSearchIndex?: number }) {
  const lines = body.split("\n");
  const nodes: ReactNode[] = [];
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  let searchMatchIndex = 0;
  let index = 0;

  const renderSearchText = (value: string): ReactNode[] => splitSearchText(value, normalizedSearchQuery).map((part) => {
    if (!part.isMatch) return part.text;

    const matchIndex = searchMatchIndex++;
    const isActive = matchIndex === activeSearchIndex;
    return <mark
      key={matchIndex}
      data-article-search-match
      data-article-search-index={matchIndex}
      className={`rounded-sm px-0.5 text-zinc-950 ${isActive ? "bg-amber-400 font-semibold outline outline-2 outline-[var(--accent)]" : "bg-yellow-200 dark:bg-yellow-300"}`}
    >{part.text}</mark>;
  });

  const inline = (value: string): ReactNode[] => value
    .split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^\)]+\))/g)
    .filter(Boolean)
    .map((part, partIndex) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={partIndex}>{renderSearchText(part.slice(1, -1))}</code>;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={partIndex}>{renderSearchText(part.slice(2, -2))}</strong>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (link) return <Link key={partIndex} href={link[2]}>{renderSearchText(link[1])}</Link>;
      return renderSearchText(part);
    });

  while (index < lines.length) {
    const line = lines[index];
    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || "text";
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) code.push(lines[index++]);
      index += 1;
      const codeText = code.join("\n");
      const codeContent = normalizedSearchQuery
        ? splitSearchText(codeText, normalizedSearchQuery).map((part, partIndex) => <span key={partIndex}>
          {part.isMatch
            ? renderSearchText(part.text)
            : language.toLowerCase() === "cpp" ? highlightCpp(part.text) : part.text}
        </span>)
        : language.toLowerCase() === "cpp" ? highlightCpp(codeText) : codeText;
      nodes.push(<CodeBlock key={nodes.length} language={language} code={codeText}>{codeContent}</CodeBlock>);
      continue;
    }

    const table = parseMarkdownTableHeader(lines, index);
    if (table) {
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim() && lines[index].includes("|")) {
        const cells = splitMarkdownTableRow(lines[index]);
        if (cells.length < 2) break;
        rows.push(table.headers.map((_, columnIndex) => cells[columnIndex] ?? ""));
        index += 1;
      }

      nodes.push(<div key={nodes.length} className="my-7 w-full overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead className="bg-[var(--surface-muted)]">
            <tr>{table.headers.map((header, columnIndex) => <th
              key={columnIndex}
              scope="col"
              style={{ textAlign: table.alignments[columnIndex] }}
              className="border-b border-[var(--border)] px-4 py-3 font-semibold text-[var(--foreground)]"
            >{inline(header)}</th>)}</tr>
          </thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>
            {row.map((cell, columnIndex) => <td
              key={columnIndex}
              style={{ textAlign: table.alignments[columnIndex] }}
              className="border-b border-[var(--border)] px-4 py-3 align-top text-[color-mix(in_srgb,var(--foreground)_84%,var(--muted))] last:border-b-0"
            >{inline(cell)}</td>)}
          </tr>)}</tbody>
        </table>
      </div>);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length === 3 ? 3 : 2;
      const text = heading[2].trim().replace(/\s+#+\s*$/, "");
      const id = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      const Heading = level === 2 ? "h2" : "h3";
      nodes.push(<Heading key={nodes.length} id={id} className={level === 2 ? "mt-12 border-t border-[var(--border)] pt-8 text-2xl font-bold tracking-tight" : "mt-8 text-lg font-bold"}>{inline(text)}</Heading>);
      index += 1;
      continue;
    }

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      nodes.push(<blockquote key={nodes.length}>{inline(line.slice(2))}</blockquote>);
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) items.push(lines[index++].slice(2));
      nodes.push(<ul key={nodes.length}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>);
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,3}\s+/.test(lines[index]) &&
      !lines[index].startsWith("```") &&
      !lines[index].startsWith("> ") &&
      !lines[index].startsWith("- ") &&
      !parseMarkdownTableHeader(lines, index)
    ) {
      paragraph.push(lines[index++]);
    }
    nodes.push(<p key={nodes.length}>{inline(paragraph.join(" "))}</p>);
  }

  return <div className="prose-wiki text-[17px] leading-8 text-[color-mix(in_srgb,var(--foreground)_84%,var(--muted))]">{nodes}</div>;
}

function GithubEditLink({ sourcePath }: { sourcePath?: string }) {
  const href = getGithubEditUrl(sourcePath);
  if (!href) return null;

  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold normal-case tracking-normal text-[var(--foreground)] transition hover:border-[var(--teal)] hover:text-[var(--teal)]"><span className="truncate">Chỉnh sửa nội dung tại GitHub</span></a>;
}

function Breadcrumb({ article }: { article: Article }) { return <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]"><Link href="/" className="hover:text-[var(--teal)]">DevHubs Wiki</Link><ChevronRight className="size-3" /><Link href={`/${article.collection}`} className="hover:text-[var(--teal)]">{article.collectionLabel}</Link><ChevronRight className="size-3" /><span>{article.categoryLabel}</span><ChevronRight className="size-3" /><span className="text-[var(--teal)]">{article.title}</span></div><GithubEditLink sourcePath={article.sourcePath} /></div>; }
function TableOfContents({ article, mobile = false }: { article: Article; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedHeadingId, setSelectedHeadingId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const headings = article.headings as readonly { id: string; title: string }[];
  const selectedHeading = headings.find((heading) => heading.id === selectedHeadingId) ?? headings[0];

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-wiki-scroll-container]");
    if (!scrollContainer) return;

    const headingElements = article.headings
      .map(({ id }) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading instanceof HTMLElement);
    if (headingElements.length === 0) return;

    const scrollMarginTop = Number.parseFloat(window.getComputedStyle(headingElements[0]).scrollMarginTop);
    const activationOffset = Number.isFinite(scrollMarginTop) ? scrollMarginTop + 1 : 96;
    let animationFrame = 0;

    const updateActiveHeading = () => {
      animationFrame = 0;
      const activationLine = scrollContainer.getBoundingClientRect().top + activationOffset;
      let activeHeading = headingElements[0];

      for (const heading of headingElements) {
        if (heading.getBoundingClientRect().top > activationLine) break;
        activeHeading = heading;
      }

      const reachedBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2;
      if (reachedBottom) activeHeading = headingElements[headingElements.length - 1];
      setSelectedHeadingId(activeHeading.id);
    };

    const scheduleUpdate = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(updateActiveHeading);
    };

    scrollContainer.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [article.headings]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (headings.length === 0) return null;

  const menuClassName = mobile
    ? `mt-2 max-h-[min(55vh,22rem)] w-full overflow-y-auto overscroll-contain rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xl ${open ? "block" : "hidden"}`
    : `absolute right-0 top-full z-40 mt-2 max-h-[min(60vh,26rem)] w-[min(320px,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-2xl ${open ? "block" : "hidden"}`;
  const asideClassName = mobile ? `sticky top-14 ${open ? "z-50" : "z-30"} mb-8 w-full xl:hidden` : "hidden w-[190px] shrink-0 xl:block";
  const containerClassName = mobile
    ? collapsed
      ? "flex justify-end"
      : "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-md sm:p-4"
    : `sticky top-28 ${open ? "z-50" : ""} border-l border-[var(--border)] pl-5`;

  return <aside className={asideClassName}>
    <div className={containerClassName}>
      {mobile && collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Hiện mục lục Trong bài này"
          className="grid size-9 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-sm hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
        >
          <ChevronDown aria-hidden="true" className="size-4" />
        </button>
      ) : (
        <>
          {mobile ? <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Trong bài này</p>
            <button
              type="button"
              onClick={() => {
                setCollapsed(true);
                setOpen(false);
              }}
              aria-label="Thu gọn mục lục"
              className="grid size-8 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
            >
              <ChevronUp aria-hidden="true" className="size-4" />
            </button>
          </div> : <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Trong bài này</p>}
          <div ref={dropdownRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((isOpen) => !isOpen)}
              className="flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-left text-[13px] text-[var(--foreground)] shadow-sm transition hover:border-[var(--teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
            >
              <span className="min-w-0 flex-1 truncate">{selectedHeading?.title ?? "Chọn mục trong bài"}</span>
              <span className="shrink-0 font-mono text-[10px] text-[var(--muted)]">{headings.length}</span>
              <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div
              id={menuId}
              className={menuClassName}
            >
              <nav aria-label="Các tiêu đề trong bài">
                {headings.map((heading) => <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  aria-current={heading.id === selectedHeading?.id ? "location" : undefined}
                  onClick={() => {
                    setSelectedHeadingId(heading.id);
                    setOpen(false);
                  }}
                  className={`block rounded-lg px-3 py-2 text-[13px] leading-5 transition ${heading.id === selectedHeading?.id ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"}`}
                >{heading.title}</a>)}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  </aside>;
}

function ArticleMetadata({ article }: { article: Article }) {
  const badges = [
    ...(articleBadges.get(article.slug) ?? []),
    ...(article.difficulty === "advanced" ? ["Nội dung bậc cao"] : []),
    ...(article.category === "reference" ? ["Tra cứu nhanh"] : []),
  ].filter((badge, index, all) => all.indexOf(badge) === index);

  return <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)]">
    <span className="rounded bg-[var(--accent-soft)] px-2 py-1 uppercase tracking-[0.12em] text-[var(--accent)]">{article.difficulty}</span>
    {badges.map((badge) => <span key={badge} className={`rounded-full border px-2.5 py-1 normal-case tracking-normal ${badge === "Quan trọng" ? "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"}`}>
      {badge}
    </span>)}
    <span className="font-normal">· Cập nhật {article.updated}</span>
  </div>;
}

function ArticleSearch({
  query,
  resultCount,
  activeResultIndex,
  onQueryChange,
  onPrevious,
  onNext,
}: {
  query: string;
  resultCount: number;
  activeResultIndex: number;
  onQueryChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const hasQuery = query.trim().length > 0;
  const hasResults = resultCount > 0;

  return <div role="search" aria-label="Tìm trong tài liệu" className="sticky top-0 z-40 mb-8 flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 shadow-sm sm:gap-2 sm:px-3">
    <Search aria-hidden="true" className="ml-1 size-4 shrink-0 text-[var(--muted)]" />
    <input
      type="text"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        if (event.shiftKey) onPrevious();
        else onNext();
      }}
      placeholder="Tìm trong tài liệu này..."
      aria-label="Tìm trong tài liệu này"
      className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
    />
    {hasQuery && <span aria-live="polite" aria-atomic="true" className="shrink-0 text-xs text-[var(--muted)]">
      {hasResults ? activeResultIndex < 0 ? `${resultCount} kết quả` : `${Math.min(activeResultIndex + 1, resultCount)} / ${resultCount}` : "0 kết quả"}
    </span>}
    {hasQuery && <button
      type="button"
      onClick={() => onQueryChange("")}
      aria-label="Xóa nội dung tìm kiếm"
      className="grid size-8 shrink-0 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
    ><X aria-hidden="true" className="size-4" /></button>}
    <button
      type="button"
      onClick={onPrevious}
      disabled={!hasResults}
      aria-label="Kết quả trước"
      className="grid size-8 shrink-0 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] disabled:pointer-events-none disabled:opacity-40"
    ><ChevronUp aria-hidden="true" className="size-4" /></button>
    <button
      type="button"
      onClick={onNext}
      disabled={!hasResults}
      aria-label="Kết quả tiếp theo"
      className="grid size-8 shrink-0 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] disabled:pointer-events-none disabled:opacity-40"
    ><ChevronDown aria-hidden="true" className="size-4" /></button>
  </div>;
}

function ArticlePage({ article }: { article: Article }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMatchIndex, setSearchMatchIndex] = useState(-1);
  const [searchMatchCount, setSearchMatchCount] = useState(0);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const index = articles.findIndex((item) => item.slug === article.slug);
  const previous = articles[index - 1];
  const next = articles[index + 1];
  const related = (article.related ?? [])
    .map((slug) => articles.find((item) => item.slug === slug))
    .filter(Boolean) as Article[];

  useEffect(() => {
    const matches = articleContentRef.current?.querySelectorAll<HTMLElement>("[data-article-search-match]") ?? [];
    setSearchMatchCount(matches.length);
    if (searchMatchIndex >= 0 && matches.length > 0) {
      matches[Math.min(searchMatchIndex, matches.length - 1)]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [article.body, searchMatchIndex, searchQuery]);

  return <main id="main-content" className="mx-auto flex w-full max-w-[1080px] gap-12 px-5 py-10 sm:px-8 lg:py-14">
    <article className="min-w-0 max-w-[780px] flex-1">
      <Breadcrumb article={article} />
      <div className="mb-3">
        <ArticleMetadata article={article} />
        <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl">{article.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{article.description}</p>
      </div>
      <ArticleSearch
        query={searchQuery}
        resultCount={searchMatchCount}
        activeResultIndex={searchMatchIndex}
        onQueryChange={(value) => {
          setSearchQuery(value);
          setSearchMatchIndex(-1);
          setSearchMatchCount(0);
        }}
        onPrevious={() => setSearchMatchIndex((current) => searchMatchCount > 0 ? (current < 0 ? searchMatchCount - 1 : (current - 1 + searchMatchCount) % searchMatchCount) : -1)}
        onNext={() => setSearchMatchIndex((current) => searchMatchCount > 0 ? (current + 1) % searchMatchCount : -1)}
      />
      <TableOfContents key={`${article.slug}-mobile`} article={article} mobile />
      <div ref={articleContentRef}>
        <Markdown body={article.body} searchQuery={searchQuery} activeSearchIndex={searchMatchIndex} />
      </div>
      <div className="mt-14 border-t border-[var(--border)] pt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Đọc tiếp</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {related.map((item) => <Link key={item.slug} href={item.slug} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--teal)]">
            <span className="text-xs font-semibold text-[var(--teal)]">{item.categoryLabel}</span>
            <p className="mt-1 font-semibold group-hover:text-[var(--teal)]">{item.title}</p>
          </Link>)}
        </div>
      </div>
      <div className="mt-10 grid gap-3 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
        {previous ? <Link href={previous.slug} className="group rounded-xl border border-[var(--border)] p-4">
          <span className="flex items-center gap-2 text-xs text-[var(--muted)]"><ArrowLeft className="size-3" /> Bài trước</span>
          <p className="mt-2 font-semibold group-hover:text-[var(--teal)]">{previous.title}</p>
        </Link> : <div />}
        {next && <Link href={next.slug} className="group rounded-xl border border-[var(--border)] p-4 text-right">
          <span className="flex items-center justify-end gap-2 text-xs text-[var(--muted)]">Bài tiếp theo <ArrowRight className="size-3" /></span>
          <p className="mt-2 font-semibold group-hover:text-[var(--teal)]">{next.title}</p>
        </Link>}
      </div>
    </article>
    <TableOfContents key={`${article.slug}-desktop`} article={article} />
  </main>;
}

function scoreArticle(article: Article, query: string) { const q = query.trim().toLowerCase(); if (!q) return 0; return q.split(/\s+/).reduce((score, token) => score + (article.title.toLowerCase().includes(token) ? 100 : 0) + (article.description.toLowerCase().includes(token) ? 45 : 0) + (article.keywords.join(" ").toLowerCase().includes(token) ? 35 : 0) + (article.collectionLabel.toLowerCase().includes(token) ? 30 : 0) + (article.headings.some((heading) => heading.title.toLowerCase().includes(token)) ? 25 : 0) + (article.body.toLowerCase().includes(token) ? 5 : 0), 0); }

function CollectionPage({ collection }: { collection: Collection }) { const groups = getCollectionGroups(collection); return <main id="main-content" className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14"><div className="mb-10 max-w-3xl"><div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]"><Link href="/" className="hover:text-[var(--teal)]">DevHubs Wiki</Link><ChevronRight className="size-3" /><span className="text-[var(--teal)]">{collection.label}</span></div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Collection</p><h1 className="text-5xl font-bold tracking-[-0.06em] sm:text-6xl">{collection.label}</h1><p className="mt-5 text-lg leading-8 text-[var(--muted)]">{collection.description}</p><p className="mt-4 font-mono text-sm text-[var(--muted)]">{collection.articleCount} bài viết · {groups.length} topics</p></div><div className="grid gap-4 lg:grid-cols-2">{groups.map((group) => <section key={group.key} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Topic</p><h2 className="mt-1 text-xl font-bold">{group.label}</h2></div><span className="font-mono text-xs text-[var(--muted)]">{group.items.length} bài</span></div><div className="space-y-1">{group.items.map((article) => <Link key={article.slug} href={article.slug} className="group flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-[var(--surface-muted)]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" /><span className="min-w-0"><span className="block font-semibold group-hover:text-[var(--teal)]">{article.title}</span><span className="mt-1 block text-sm leading-5 text-[var(--muted)]">{article.description}</span></span></Link>)}</div></section>)}</div>{groups.length === 0 && <div className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">Collection này chưa có bài viết.</div>}</main>; }

function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const featured = getFeaturedArticles(6);
  const searchResults = useMemo(() => query ? articles.map((article) => ({ article, score: scoreArticle(article, query) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 6) : [], [query]);
  return <main id="main-content" className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 lg:py-16"><section className="grid gap-10 border-b border-[var(--border)] pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"><div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--teal)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" /> DevHubs · Developer Wiki</div><h1 className="max-w-3xl text-5xl font-bold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl">Kiến thức cho developer.<br /><span className="text-[var(--teal)]">Hiểu đến tận gốc.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">Kho kiến thức kỹ thuật dành cho developer: học từ nền tảng, tra cứu khi làm việc và hiểu rõ cách mọi thứ vận hành.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#collections" className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--foreground)]">Khám phá Wiki <ArrowRight className="size-4" /></Link><button onClick={() => document.getElementById("popular")?.scrollIntoView()} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--foreground)] hover:border-[var(--teal)]">Tra cứu nhanh</button></div></div><div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)]"><div className="mb-5 flex items-center justify-between"><span className="font-mono text-xs text-[var(--muted)]">$ devhubs --explore</span><span className="rounded bg-[var(--accent-soft)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">overview</span></div><div className="space-y-2">{collections.slice(0, 4).map((collection, index) => <Link key={collection.slug} href={`/${collection.slug}`} className="group flex items-start gap-3 rounded-lg p-2 transition hover:bg-[var(--surface-muted)]"><span className={`grid size-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${index === 0 ? "bg-[var(--teal)] text-white" : "bg-[var(--accent-soft)] text-[var(--accent)]"}`}>{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-3 text-sm font-semibold"><span className="truncate group-hover:text-[var(--teal)]">{collection.label}</span><span className="shrink-0 font-mono text-xs text-[var(--muted)]">{collection.articleCount} bài</span></span><span className="mt-1 block truncate text-xs text-[var(--muted)]">{getCollectionGroups(collection).slice(0, 3).map((group) => group.label).join(" · ")}</span></span></Link>)}{collections.length === 0 && <p className="py-5 text-sm text-[var(--muted)]">Chưa có collection nào.</p>}</div><div className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-5 text-[var(--muted)]">Nội dung được tổ chức từ metadata — thêm collection hoặc bài viết mới không cần sửa navigation.</div></div></section><section id="collections" className="scroll-mt-24 border-b border-[var(--border)] py-12"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Khám phá kiến thức</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Collections</h2></div><span className="font-mono text-xs text-[var(--muted)]">{collections.length} collections</span></div>{collections.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{collections.map((collection) => <Link key={collection.slug} href={`/${collection.slug}`} className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--teal)] hover:shadow-lg hover:shadow-orange-900/5"><div className="mb-7 flex items-start justify-between"><span className="grid size-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"><Layers3 className="size-5" /></span><ArrowRight className="size-4 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--teal)]" /></div><h3 className="text-xl font-bold group-hover:text-[var(--teal)]">{collection.label}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted)]">{collection.description}</p><div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4"><span className="font-mono text-xs text-[var(--muted)]">{collection.articleCount} bài viết</span><span className="text-xs font-semibold text-[var(--teal)]">Mở collection</span></div></Link>)}</div> : <div className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">Chưa có nội dung để khám phá.</div>}</section><section id="popular" className="scroll-mt-24 py-12"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Tra cứu nhanh</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Popular topics</h2></div><span className="font-mono text-xs text-[var(--muted)]">{articles.length} bài · {collections.length} collections</span></div><div className="relative mb-8 max-w-xl"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm Python, Git, HTTP, SQL, async..." aria-label="Tìm kiếm trong toàn bộ wiki" className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-10 text-sm outline-none ring-[var(--teal)] placeholder:text-[var(--muted)] focus:ring-2" />{query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-label="Xóa tìm kiếm"><X className="size-4" /></button>}{searchResults.length > 0 && <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl">{searchResults.map(({ article }) => <button key={article.slug} onClick={() => router.push(article.slug)} className="block w-full rounded-lg p-3 text-left hover:bg-[var(--surface-muted)]"><span className="text-xs font-bold text-[var(--teal)]">{article.collectionLabel} · {article.categoryLabel}</span><p className="mt-0.5 text-sm font-semibold">{article.title}</p></button>)}</div>}{query && searchResults.length === 0 && <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">Không tìm thấy bài viết phù hợp.</div>}</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featured.map((article) => <Link key={article.slug} href={article.slug} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--teal)] hover:shadow-lg hover:shadow-orange-900/5"><div className="mb-5 flex items-center justify-between"><span className="font-mono text-xs text-[var(--accent)]">{article.collectionLabel} / {article.categoryLabel}</span><ArrowRight className="size-4 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--teal)]" /></div><h3 className="font-bold group-hover:text-[var(--teal)]">{article.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{article.description}</p></Link>)}</div>{featured.length === 0 && <p className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">Chưa có topic nổi bật.</p>}<p className="mt-5 text-xs text-[var(--muted)]">Hiển thị theo metadata `featured` và `priority`; khi chưa có, dùng thứ tự bài viết làm fallback.</p></section></main>;
}

export function WikiShell({ article, collection }: { article?: Article; collection?: Collection }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCollectionSlug = article?.collection ?? collection?.slug;
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  return <div className="flex h-dvh flex-col overflow-hidden">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--teal)] focus:px-3 focus:py-2 focus:text-white">Bỏ qua đến nội dung</a>
    <Header onSearch={() => setSearchOpen(true)} onMenu={() => setMobileOpen(true)} />
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar activeCollectionSlug={activeCollectionSlug} />
      <div data-wiki-scroll-container className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain">
        {article ? <ArticlePage key={article.slug} article={article} /> : collection ? <CollectionPage collection={collection} /> : <HomePage />}
        <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-xs text-[var(--muted)]"><span className="font-semibold text-[var(--foreground)]">DevHubs Wiki</span> · Kiến thức kỹ thuật cho developer, được tổ chức từ metadata.</footer>
      </div>
    </div>
    <MobileNav activeCollectionSlug={activeCollectionSlug} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
  </div>;
}
