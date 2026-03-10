import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { sendClientConfirmation, sendStudioNotification } from '@/lib/email'

const schema = z.object({
  services:         z.array(z.string()),
  isSaasProject:    z.boolean().default(false),
  saasType:         z.string().optional(),
  saasUsers:        z.string().optional(),
  saasFeatures:     z.array(z.string()).optional(),
  projectName:      z.string().min(2),
  description:      z.string().min(20),
  budget:           z.string().min(1),
  timeline:         z.string().min(1),
  priority:         z.string().optional(),
  firstName:        z.string().min(1),
  lastName:         z.string().min(1),
  email:            z.string().email(),
  phone:            z.string().min(7),
  company:          z.string().optional(),
  source:           z.string().optional(),
  uploadedFileIds:  z.array(z.string()).optional(),
})

function makeRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'MNK-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
async function sendToGoogleSheet(data: any) {
  try {

    console.log("Sending data to Google Sheet:", data)

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const text = await res.text()

    console.log("Google Sheet response status:", res.status)
    console.log("Google Sheet response body:", text)

  } catch (err) {
    console.error("Google Sheet error:", err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Validate: must have at least one service or SaaS
    if (data.services.length === 0 && !data.isSaasProject) {
      return NextResponse.json({ success: false, error: 'Select at least one service' }, { status: 400 })
    }

    const refCode = makeRef()

    const booking = await prisma.booking.create({
      data: {
        refCode,
        firstName:   data.firstName,
        lastName:    data.lastName,
        email:       data.email,
        phone:       data.phone,
        company:     data.company,
        source:      data.source,
        projectName: data.projectName,
        description: data.description,
        budget:      data.budget,
        timeline:    data.timeline,
        priority:    data.priority,
        services:    data.services,
        isSaas:      data.isSaasProject,
        saasDetails: data.isSaasProject
          ? { type: data.saasType, users: data.saasUsers, features: data.saasFeatures }
          : undefined,
        status: 'NEW',
      },
    })

  await sendToGoogleSheet({
  refCode,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone,
  company: data.company,
  projectName: data.projectName,
  services: data.services.join(', '),
  budget: data.budget,
  timeline: data.timeline,
  priority: data.priority,
  source: data.source
})

    // Link pre-uploaded files
    if (data.uploadedFileIds && data.uploadedFileIds.length > 0) {
      await prisma.projectFile.updateMany({
        where: { id: { in: data.uploadedFileIds } },
        data:  { bookingId: booking.id },
      })
    }

    // Emails — non-blocking
    Promise.all([
      sendClientConfirmation({
        refCode, firstName: data.firstName, lastName: data.lastName,
        email: data.email, phone: data.phone, company: data.company,
        services: data.services, projectName: data.projectName,
        budget: data.budget, timeline: data.timeline,
      }),
      sendStudioNotification({
        refCode, firstName: data.firstName, lastName: data.lastName,
        email: data.email, phone: data.phone, company: data.company,
        services: data.services, projectName: data.projectName,
        budget: data.budget, timeline: data.timeline,
      }),
    ]).catch(console.error)

    return NextResponse.json({ success: true, refCode, bookingId: booking.id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', issues: err.errors }, { status: 400 })
    }
    console.error('Booking error:', err)
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit  = Number(searchParams.get('limit') || '50')
  const page   = Number(searchParams.get('page')  || '1')

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: status ? { status: status as any } : undefined,
      include: { files: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.booking.count({ where: status ? { status: status as any } : undefined }),
  ])

  return NextResponse.json({ bookings, total, page, limit })
}
