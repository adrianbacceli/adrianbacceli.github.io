// lib/cn.ts
export function cn(...args: Array<string | undefined | false | null>) {
  return args.filter(Boolean).join(" ");
}