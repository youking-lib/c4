import * as z from "zod"
import { CompleteFileWithCode, RelatedFileWithCodeModel, CompleteUser, RelatedUserModel, CompleteProject, RelatedProjectModel } from "./index"

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
  projectId: z.string().nullish(),
})

export interface CompleteCode extends z.infer<typeof CodeModel> {
  files: CompleteFileWithCode[]
  owner?: CompleteUser | null
  Project?: CompleteProject | null
}

/**
 * RelatedCodeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCodeModel: z.ZodSchema<CompleteCode> = z.lazy(() => CodeModel.extend({
  files: RelatedFileWithCodeModel.array(),
  owner: RelatedUserModel.nullish(),
  Project: RelatedProjectModel.nullish(),
}))
