import z from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.enum(['general', 'donation', 'media', 'other']),
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  privacy: z.boolean().refine(v => v === true, "Please confirm to continue")
});