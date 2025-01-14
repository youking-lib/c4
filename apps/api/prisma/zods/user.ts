import * as z from "zod"
import { CompleteCode, RelatedCodeModel, CompleteProject, RelatedProjectModel, CompleteFile, RelatedFileModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Code: CompleteCode[]
  Projects: CompleteProject[]
  File: CompleteFile[]
  defaultProject?: CompleteProject | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Code: RelatedCodeModel.array(),
  Projects: RelatedProjectModel.array(),
  File: RelatedFileModel.array(),
  defaultProject: RelatedProjectModel.nullish(),
}))
