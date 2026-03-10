import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/prisma'
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, MAX_FILES, getFileCategory } from '@/lib/upload'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0)
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 })
    if (files.length > MAX_FILES)
      return NextResponse.json({ success: false, error: `Maximum ${MAX_FILES} files allowed` }, { status: 400 })

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const saved = []

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES[file.type])
        return NextResponse.json({ success: false, error: `File type not allowed: ${file.type}` }, { status: 400 })
      if (file.size > MAX_FILE_SIZE)
        return NextResponse.json({ success: false, error: `${file.name} exceeds 25 MB limit` }, { status: 400 })

      const ext        = path.extname(file.name)
      const storedName = `${uuidv4()}${ext}`
      const filePath   = path.join(uploadsDir, storedName)

      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      const dbFile = await prisma.projectFile.create({
        data: {
          bookingId:  'PENDING',
          filename:   file.name,
          storedName,
          mimeType:   file.type,
          size:       file.size,
          category:   getFileCategory(file.type) as any,
          url:        `/uploads/${storedName}`,
        },
      })

      saved.push({ id: dbFile.id, filename: file.name, size: file.size, mimeType: file.type, url: dbFile.url })
    }

    return NextResponse.json({ success: true, files: saved })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ success: false, error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
