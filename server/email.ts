import { Resend } from 'resend';

export interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required. Please sign up at https://resend.com and provide your API key.');
    }

    resend = new Resend(apiKey);
  }

  return resend;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  try {
    const resendClient = getResend();
    
    await resendClient.emails.send({
      from: 'Shunfeng Website <onboarding@resend.dev>', // Resend's verified sender for testing
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html || params.text.replace(/\n/g, '<br>'),
    });

    return true;
  } catch (error) {
    console.error('[Email] Failed to send email via Resend:', error);
    return false;
  }
}
