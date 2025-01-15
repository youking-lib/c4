import { z } from '@hono/zod-openapi';

// sync with prisma/zods/file.ts
// do not modify this file

export const FileModel = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().int(),
  type: z.string(),
  disabled: z.boolean(),
  key: z.string(),
  hash: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  downloads: z.number().int(),
  lastDownloadedAt: z.date().nullish(),
  projectId: z.string().nullish(),
  ownerId: z.string().nullish(),
  codeId: z.string().nullish()
});

export type File = z.infer<typeof FileModel>;
