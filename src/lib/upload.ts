import path from 'path'

export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export const ALLOWED_MIME_TYPES: Record<string, string> = {
  'application/pdf': 'DOCUMENT',
  'application/msword': 'DOCUMENT',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
  'application/vnd.ms-powerpoint': 'DOCUMENT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'DOCUMENT',
  'image/jpeg': 'IMAGE',
  'image/png': 'IMAGE',
  'image/webp': 'IMAGE',
  'image/gif': 'IMAGE',
  'image/svg+xml': 'DESIGN',
  'application/zip': 'DESIGN',
  'text/plain': 'DOCUMENT',
}

export const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB
export const MAX_FILES = 10

export function getFileCategory(mimeType: string): string {
  return ALLOWED_MIME_TYPES[mimeType] || 'OTHER'
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return '🖼️'
  if (mimeType === 'application/pdf') return '📄'
  if (mimeType.includes('word')) return '📝'
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📊'
  if (mimeType === 'application/zip') return '📦'
  return '📎'
}
