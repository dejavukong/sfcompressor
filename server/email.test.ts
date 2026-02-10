import { describe, expect, it } from "vitest";
import { sendEmail } from "./email";

describe("email sending with Resend", () => {
  it("should successfully send a test email", async () => {
    const result = await sendEmail({
      to: "hammewang@gmail.com",
      subject: "Test Email from Shunfeng Website",
      text: "This is a test email to verify Resend API integration.",
    });

    expect(result).toBe(true);
  }, 15000); // 15 second timeout for API call
});
