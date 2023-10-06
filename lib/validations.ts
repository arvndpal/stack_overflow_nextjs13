import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(300, { message: 'Title must be at most 300 characters' }),
  explaination: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
