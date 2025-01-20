import * as z from "zod"
import { CompleteCode, RelatedCodeModel, CompleteFile, RelatedFileModel, CompleteUser, RelatedUserModel } from "./index"

export const FileWithCodeModel = z.object({
  id: z.string(),
  codeId: z.string(),
  fileId: z.string(),
  createdAt: z.date(),
  ownerId: z.string().nullish(),
})

export interface CompleteFileWithCode extends z.infer<typeof FileWithCodeModel> {
  code: CompleteCode
  file: CompleteFile
  owner?: CompleteUser | null
}

/**
 * RelatedFileWithCodeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFileWithCodeModel: z.ZodSchema<CompleteFileWithCode> = z.lazy(() => FileWithCodeModel.extend({
  code: RelatedCodeModel,
  file: RelatedFileModel,
  owner: RelatedUserModel.nullish(),
}))
