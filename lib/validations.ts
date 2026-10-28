// Form and file validation utilities

export function validateLinkedInUrl(url: string): boolean {
  if (!url) return true // Optional field
  try {
    const parsed = new URL(url)
    return (
      (parsed.hostname === 'linkedin.com' || parsed.hostname.endsWith('.linkedin.com')) &&
      (parsed.protocol === 'http:' || parsed.protocol === 'https:')
    )
  } catch {
    return false
  }
}

export function validateUrl(url: string): boolean {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateFileSize(file: File, maxMb: number): boolean {
  return file.size <= maxMb * 1024 * 1024
}

export function validateImageType(file: File): boolean {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  return allowed.includes(file.type)
}

export function validatePdfType(file: File): boolean {
  return file.type === 'application/pdf'
}

export const STUDENT_FORM_DEFAULTS = {
  full_name: '',
  interests: [] as string[],
  introduction: '',
  linkedin_url: '',
  display_order: 0,
  published: false,
}
