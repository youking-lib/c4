import * as z from "zod"
import { CompleteProject, RelatedProjectModel, CompleteUser, RelatedUserModel, CompleteCode, RelatedCodeModel } from "./index"

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
  codeId: z.string().nullish(),
})

export interface CompleteFile extends z.infer<typeof FileModel> {
  project?: CompleteProject | null
  owner?: CompleteUser | null
  code?: CompleteCode | null
}

/**
 * RelatedFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFileModel: z.ZodSchema<CompleteFile> = z.lazy(() => FileModel.extend({
  project: RelatedProjectModel.nullish(),
  owner: RelatedUserModel.nullish(),
  code: RelatedCodeModel.nullish(),
}))
