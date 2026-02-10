import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as emailModule from "./email";

// Mock the email module
vi.mock("./email", () => ({
  sendEmail: vi.fn(),
}));

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.sendInquiry", () => {
  it("sends email to the user's provided email address", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Mock sendEmail to return success
    vi.mocked(emailModule.sendEmail).mockResolvedValue(true);

    const userEmail = "test@example.com";
    const result = await caller.contact.sendInquiry({
      name: "Test User",
      company: "Test Company",
      email: userEmail,
      phone: "+86 123 4567 8900",
      type: "Marine Compressor",
      requirements: "I need a marine compressor for my ship",
    });

    expect(result).toEqual({ success: true });
    expect(emailModule.sendEmail).toHaveBeenCalledWith({
      to: userEmail,
      subject: "Inquiry Confirmation - Shunfeng Compressor",
      text: expect.stringContaining("Dear Test User"),
    });
  });

  it("includes product interest in email when provided", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    vi.mocked(emailModule.sendEmail).mockResolvedValue(true);

    const result = await caller.contact.sendInquiry({
      name: "Product Interested User",
      company: "ABC Corp",
      email: "user@abc.com",
      phone: "+86 123 4567 8900",
      type: "Marine Compressor",
      requirements: "Need pricing details",
      productInterest: "螺杆式船用压缩机",
    });

    expect(result).toEqual({ success: true });
    expect(emailModule.sendEmail).toHaveBeenCalledWith({
      to: "user@abc.com",
      subject: "Inquiry Confirmation - Shunfeng Compressor",
      text: expect.stringContaining("Product of Interest: 螺杆式船用压缩机"),
    });
  });

  it("throws error when email sending fails", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    vi.mocked(emailModule.sendEmail).mockResolvedValue(false);

    await expect(
      caller.contact.sendInquiry({
        name: "Test User",
        company: "Test Company",
        email: "test@example.com",
        phone: "+86 123 4567 8900",
        type: "Marine Compressor",
        requirements: "Test requirements",
      })
    ).rejects.toThrow("Failed to send email");
  });
});
