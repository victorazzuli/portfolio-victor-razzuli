import { PROFILE } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-text/10 py-8">
      <div className="wrap flex flex-col gap-2 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {PROFILE.fullName}</span>
        <span>Next.js · React Three Fiber · Vercel</span>
      </div>
    </footer>
  );
}
