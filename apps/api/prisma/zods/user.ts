import * as z from "zod"
import { CompleteProject, RelatedProjectModel, CompleteCode, RelatedCodeModel, CompleteFile, RelatedFileModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  defaultProjectId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  defaultProject?: CompleteProject | null
  Code: CompleteCode[]
  Projects: CompleteProject[]
  File: CompleteFile[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  defaultProject: RelatedProjectModel.nullish(),
  Code: RelatedCodeModel.array(),
  Projects: RelatedProjectModel.array(),
  File: RelatedFileModel.array(),
}))
