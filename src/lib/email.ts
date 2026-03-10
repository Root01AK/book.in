import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export interface BookingEmailData {
  refCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  services: string[]
  projectName: string
  budget: string
  timeline: string
}

export async function sendClientConfirmation(data: BookingEmailData) {
  if (!process.env.SMTP_USER) return
  await transporter.sendMail({
    from: `"Monakin Studio" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Booking Confirmed — ${data.refCode} | Monakin Studio`,
    html: `
    <div style="font-family:Georgia,serif;max-width:580px;margin:0 auto;background:#FAF7F2;padding:40px;border-radius:12px;">
      <h1 style="font-size:26px;color:#1A1208;font-weight:400;margin-bottom:8px;">You're booked in, ${data.firstName}.</h1>
      <p style="font-family:sans-serif;font-size:14px;color:#5C5040;line-height:1.7;margin-bottom:28px;">
        Thank you for reaching out to Monakin Studio. We've received your project brief and will be in touch within <strong>24 hours</strong>.
      </p>
      <div style="background:#fff;border:1px solid #E8DFD0;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <div style="font-family:monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C97B3A;margin-bottom:8px;">Your Booking Reference</div>
        <div style="font-family:monospace;font-size:22px;color:#1A1208;letter-spacing:4px;">${data.refCode}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:13px;">
        ${[
          ['Project', data.projectName],
          ['Services', data.services.join(', ')],
          ['Budget', data.budget],
          ['Timeline', data.timeline],
        ].map(([k, v]) => `
          <tr style="border-bottom:1px solid #E8DFD0;">
            <td style="padding:10px 0;color:#9E9285;width:100px;">${k}</td>
            <td style="padding:10px 0;color:#2C2416;">${v}</td>
          </tr>`).join('')}
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#5C5040;margin-top:28px;line-height:1.7;">
        Questions? Reply here or email <a href="mailto:hello@monakin.studio" style="color:#C97B3A;">hello@monakin.studio</a>
      </p>
      <div style="border-top:1px solid #E8DFD0;margin-top:36px;padding-top:20px;">
        <div style="font-family:Georgia,serif;font-size:15px;color:#1A1208;">Monakin<span style="color:#C97B3A;">.</span>Studio</div>
        <div style="font-family:monospace;font-size:10px;color:#9E9285;margin-top:3px;letter-spacing:1px;text-transform:uppercase;">Premium Digital Studio</div>
      </div>
    </div>`,
  })
}

export async function sendStudioNotification(data: BookingEmailData) {
  if (!process.env.SMTP_USER || !process.env.STUDIO_EMAIL) return
  await transporter.sendMail({
    from: `"Monakin Booking" <${process.env.SMTP_USER}>`,
    to: process.env.STUDIO_EMAIL,
    subject: `🆕 New Booking: ${data.refCode} — ${data.projectName}`,
    html: `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:28px;background:#1A1208;color:#FAF7F2;border-radius:10px;">
      <h2 style="font-size:18px;margin-bottom:4px;">New Project Booking</h2>
      <p style="font-family:monospace;font-size:11px;color:#C9A87C;letter-spacing:2px;margin-bottom:20px;">${data.refCode}</p>
      <div style="font-size:13px;line-height:2.2;">
        ${[
          ['Name', `${data.firstName} ${data.lastName}`],
          ['Email', data.email],
          ['Phone', data.phone],
          ...(data.company ? [['Company', data.company]] : []),
          ['Services', data.services.join(', ')],
          ['Project', data.projectName],
          ['Budget', data.budget],
          ['Timeline', data.timeline],
        ].map(([k, v]) => `<div><span style="color:#9E9285;">${k}: </span>${v}</div>`).join('')}
      </div>
    </div>`,
  })
}
