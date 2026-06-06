import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  topic: z.string().min(1, { message: "Please select a topic." }),
  message: z.string().min(1, { message: "Message cannot be empty." }),
  newsletterOptIn: z.boolean().optional(),
  _gotcha: z.string().optional(),
  jobRole: z.string().optional(),
  jobCompensation: z.string().optional(),
  jobWhyMe: z.string().optional(),
  jobFile: z.instanceof(File).optional(),
  freelanceOverview: z.string().optional(),
  freelanceTimeline: z.string().optional(),
  freelanceBudget: z.string().optional(),
  pressEventName: z.string().optional(),
  pressTopic: z.string().optional(),
  pressTiming: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
