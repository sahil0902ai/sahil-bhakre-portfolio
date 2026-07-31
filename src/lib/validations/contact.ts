import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().max(100).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  budget: z.string().optional().nullable(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(5000),
  // Honeypot field for anti-spam (must be empty)
  website_hp: z.string().max(0, { message: 'Bot detected' }).optional().or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
