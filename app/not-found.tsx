import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[var(--background)] px-6 text-[var(--foreground)]"><div className="max-w-md text-center"><p className="font-mono text-sm font-bold text-[var(--accent)]">404 / NOT FOUND</p><h1 className="mt-4 text-4xl font-bold tracking-tight">Không tìm thấy bài viết này.</h1><p className="mt-4 leading-7 text-[var(--muted)]">Có thể URL đã thay đổi hoặc bài viết chưa được thêm vào Wiki.</p><Link href="/" className="mt-7 inline-flex rounded-lg bg-[var(--teal)] px-4 py-3 text-sm font-bold text-white">Về NamGT Python Wiki</Link></div></main>;
}
