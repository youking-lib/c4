import { createRoute, z } from '@hono/zod-openapi';
import { CodeModel, FileModel, FileWithCodeModel } from './dto';
import { errorSchema, successSchema } from './utils';

export const codeSchema = {
  retrieveRoute: createRoute({
    tags: ['code'],
    method: 'get',
    path: '/code/{codeId}',
    request: {
      params: z.object({
        codeId: z.string()
      })
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.object({
            code: CodeModel,
            files: z.array(FileWithCodeModel)
          })
        ),
        description: 'Retrieve code successful'
      }
    }
  }),

  createCodeRoute: createRoute({
    tags: ['code'],
    method: 'post',
    path: '/code',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              fileIds: z.string().array()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.object({
            code: CodeModel
          })
        ),
        description: 'Create code successful'
      }
    }
  })
};
