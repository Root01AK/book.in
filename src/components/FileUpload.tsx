'use client'
import { useState, useRef, useCallback } from 'react'
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, formatFileSize, getFileIcon } from '@/lib/upload'

interface UploadedFile {
  id: string; filename: string; size: number; mimeType: string; url: string
}

export default function FileUpload({ onFilesUploaded }: { onFilesUploaded: (ids: string[]) => void }) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(async (newFiles: File[]) => {
    if (!newFiles.length) return
    setError(null)
    setUploading(true)
    try {
      const fd = new FormData()
      newFiles.forEach(f => fd.append('files', f))
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Upload failed')
      const next = [...files, ...data.files]
      setFiles(next)
      onFilesUploaded(next.map((f: UploadedFile) => f.id))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUploading(false)
    }
  }, [files, onFilesUploaded])

  const remove = (id: string) => {
    const next = files.filter(f => f.id !== id)
    setFiles(next)
    onFilesUploaded(next.map(f => f.id))
  }

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }
  const onDragLeave = () => setDragging(false)
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const dropped = Array.from(e.dataTransfer.files).filter(f => ALLOWED_MIME_TYPES[f.type] && f.size <= MAX_FILE_SIZE)
    if (dropped.length) upload(dropped)
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) upload(Array.from(e.target.files))
  }

  const disabled = uploading || files.length >= 10

  return (
    <div>
      {/* Dropzone */}
      <div
        className={`dropzone${dragging ? ' dropzone--active' : ''}${disabled ? ' dropzone--disabled' : ''}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={Object.keys(ALLOWED_MIME_TYPES).join(',')}
          style={{ display: 'none' }}
          onChange={onChange}
        />

        {uploading ? (
          <div className="dropzone__uploading">
            <div className="dropzone__spinner" />
            <p className="dropzone__hint">Uploading files…</p>
          </div>
        ) : dragging ? (
          <>
            <div className="dropzone__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="dropzone__title">Release to upload</p>
          </>
        ) : (
          <>
            <div className="dropzone__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warm)" strokeWidth="1.6">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="dropzone__title">
              Drop files here or <span>browse</span>
            </p>
            <p className="dropzone__hint">PDF, Word, PowerPoint, Images, ZIP · Max 25 MB · Up to 10 files</p>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="upload-error">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#c0392b">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          {error}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="file-list">
          <span className="file-list__label">Uploaded ({files.length}/10)</span>
          {files.map(f => (
            <div key={f.id} className="file-item">
              <div className="file-item__left">
                <span className="file-item__icon">{getFileIcon(f.mimeType)}</span>
                <div>
                  <span className="file-item__name">{f.filename}</span>
                  <span className="file-item__size">{formatFileSize(f.size)}</span>
                </div>
              </div>
              <button type="button" className="file-item__remove" onClick={() => remove(f.id)} title="Remove">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="upload-tips">
        <span className="upload-tips__title">What to upload</span>
        <ul className="upload-tips__list">
          <li>Brand guidelines, logo files, or existing designs</li>
          <li>Reference websites or app screenshots you love</li>
          <li>Project brief, PRD, or user stories document</li>
          <li>Mood board, wireframes, or rough sketches</li>
          <li>Any other context that helps us understand your vision</li>
        </ul>
      </div>
    </div>
  )
}
