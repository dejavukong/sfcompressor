import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendEmail } from "./email";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  contact: router({
    sendInquiry: publicProcedure
      .input(
        z.object({
          company: z.string().optional(),
          name: z.string().optional(),
          email: z.string().email(),
          phone: z.string().optional(),
          type: z.string().optional(),
          requirements: z.string(),
          productInterest: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const productContext = input.productInterest
          ? `Product of Interest: ${input.productInterest}\n`
          : "";

        const emailBody = `
Dear ${input.name || "Valued Customer"},

Thank you for contacting Shunfeng Compressor. We have received your inquiry and will respond within 24 hours.

Your Inquiry Summary:

Contact Information:
  Name: ${input.name || "N/A"}
  Company: ${input.company || "N/A"}
  Email: ${input.email}
  Phone: ${input.phone || "N/A"}

Inquiry Type: ${input.type || "General Inquiry"}

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
          subject: `Inquiry Confirmation - Shunfeng Compressor`,
          text: emailBody,
        });

        if (!success) {
          throw new Error("Failed to send email. Please try again later.");
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
