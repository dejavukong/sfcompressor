'use server';

import { z } from 'zod';
import { sendEmail } from '../server/email';

const inquirySchema = z.object({
  company: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.string().optional(),
  requirements: z.string(),
  productInterest: z.string().optional(),
});

export async function sendInquiry(formData: z.infer<typeof inquirySchema>) {
  const parsed = inquirySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' };
  }

  const input = parsed.data;

  const productContext = input.productInterest
    ? `Product of Interest: ${input.productInterest}\n`
    : '';

  const emailBody = `
Dear ${input.name || 'Valued Customer'},

Thank you for contacting Shunfeng Compressor. We have received your inquiry and will respond within 24 hours.

Your Inquiry Summary:

Contact Information:
  Name: ${input.name || 'N/A'}
  Company: ${input.company || 'N/A'}
  Email: ${input.email}
  Phone: ${input.phone || 'N/A'}

Inquiry Type: ${input.type || 'General Inquiry'}

${productContext}
Your Message:
${input.requirements}

---

Best regards,
Shunfeng Compressor Team
Website: www.shunfeng-compressor.com
Email: dev.cgmi@gmail.com
Phone: +86 025-52415588
  `.trim();

  const success = await sendEmail({
    to: input.email,
    subject: 'Inquiry Confirmation - Shunfeng Compressor',
    text: emailBody,
  });

  if (!success) {
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }

  return { success: true };
}
