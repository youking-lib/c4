import { createRoute, z } from '@hono/zod-openapi';
import { FileModel } from './dto';

export const uploadCheckRoute = createRoute({
  tags: ['upload'],
  method: 'post',
  path: '/upload/check',
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
    200: {
      schema: z.union([
        z.object({
          file: FileModel.nullable()
        }),
        z.object({
          key: z.string(),
          preSignedUrl: z.string()
        })
      ]),
      description: 'Upload successful'
    }
  }
});
