import { createRoute, z } from '@hono/zod-openapi';

import { CodeModel, FileModel } from './dto';
import { errorSchema, PageSchema, successSchema } from './utils';

export const codeSchema = {
  listCodesRoute: createRoute({
    tags: ['code'],
    method: 'get',
    path: '/code',
    request: {
      query: PageSchema
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.object({
            list: z.array(
              CodeModel.merge(
                z.object({
                  files: z.number()
                })
              )
            ),
            total: z.number()
          })
        ),
        description: 'List codes successful'
      }
    }
  }),

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
            files: z.array(FileModel)
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
