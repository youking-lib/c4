import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteCode, RelatedCodeModel, CompleteFile, RelatedFileModel } from "./index"

export const ProjectModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ownerId: z.string(),
})

export interface CompleteProject extends z.infer<typeof ProjectModel> {
  owner: CompleteUser
  codes: CompleteCode[]
  File: CompleteFile[]
  Partners: CompleteUser[]
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() => ProjectModel.extend({
  owner: RelatedUserModel,
  codes: RelatedCodeModel.array(),
  File: RelatedFileModel.array(),
  Partners: RelatedUserModel.array(),
}))
