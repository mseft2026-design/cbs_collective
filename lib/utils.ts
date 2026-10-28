import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStorageUrl(bucket: string, path: string | null): string | null {
  if (!path) return null
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

export function generateFilename(originalName: string, prefix: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'bin'
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}.${ext}`
}

export function formatInterests(interests: string[] | null): string {
  if (!interests || interests.length === 0) return ''
  return interests.join(' · ')
}
