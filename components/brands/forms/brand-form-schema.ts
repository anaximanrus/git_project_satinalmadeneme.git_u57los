import * as z from 'zod';

export const brandFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['active', 'passive']),
});

export type BrandFormValues = z.infer<typeof brandFormSchema>;
