import { z } from 'zod';

export const dictionaryQuerySchema = z.object({
  q: z.string().trim().min(1, 'Search query cannot be empty.'),
  direction: z.enum(['ho-hi', 'hi-ho']).default('ho-hi'),
});

export const contributionSchema = z.object({
  hoText: z.string().trim().min(1, 'Ho text is required.'),
  hindiMeaning: z.string().trim().min(1, 'Hindi meaning is required.'),
  scriptUsed: z.string().trim().min(1, 'Script information is required.'),
  context: z.string().trim().max(500, 'Context is too long.').optional().or(z.literal('')),
  dialect: z.string().trim().max(200, 'Dialect is too long.').optional().or(z.literal('')),
  contributorName: z.string().trim().max(120, 'Contributor name is too long.').optional().or(z.literal('')),
  consent: z.boolean().refine((value) => value === true, 'Consent is required for review.'),
});

export type DictionaryQueryInput = z.infer<typeof dictionaryQuerySchema>;
export type ContributionInput = z.infer<typeof contributionSchema>;
