import { z } from '@hono/zod-openapi';

// sync with prisma/zods/file.ts
// do not modify this file

export const FileModel = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().int(),
  type: z.string(),
  disabled: z.boolean(),
  // key: z.string(),
  // hash: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  downloads: z.number().int(),
  lastDownloadedAt: z.date().nullish(),
  projectId: z.string().nullish(),
  ownerId: z.string().nullish()
});

export type File = z.infer<typeof FileModel>;

export const CodeModel = z.object({
  id: z.string(),
  code: z.string(),
  slug: z.string().nullish(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  retrieves: z.number().int(),
  lastRetrievedAt: z.date().nullish(),
  ownerId: z.string().nullish(),
  projectId: z.string().nullish()
});

export type Code = z.infer<typeof CodeModel>;

export const FileWithCodeModel = z.object({
  id: z.string(),
  codeId: z.string(),
  fileId: z.string(),
  createdAt: z.date(),
  ownerId: z.string().nullish()
});

export type FileWithCode = z.infer<typeof FileWithCodeModel>;
