import { createRoute, z } from '@hono/zod-openapi';
import { FileModel } from './dto';
import { errorSchema, successSchema } from './utils';

export const fileSchema = {
  uploadCheckRoute: createRoute({
    tags: ['file'],
    method: 'post',
    path: '/file/upload/check',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              filename: z.string(),
              type: z.string(),
              size: z.number(),
              hash: z.string()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        description: 'Upload check successful',
        ...successSchema(
          z.union([
            z.object({
              file: FileModel
            }),
            z.object({
              file: z.literal(null),
              key: z.string(),
              preSignedUrl: z.string()
            })
          ])
        )
      }
    }
  }),

  uploadFileRoute: createRoute({
    tags: ['file'],
    method: 'post',
    path: '/file/upload',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              key: z.string(),
              filename: z.string(),
              type: z.string(),
              size: z.number(),
              hash: z.string()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        description: 'Upload file successful',
        ...successSchema(FileModel)
      }
    }
  }),

  downloadRoute: createRoute({
    tags: ['file'],
    method: 'post',
    path: '/file/download',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              fileIds: z.array(z.string()).max(10)
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.array(
            z.object({
              id: z.string(),
              downloadUrl: z.string()
            })
          )
        ),
        description: 'Download successful'
      }
    }
  })
};
