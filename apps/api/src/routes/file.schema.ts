import { createRoute, z } from '@hono/zod-openapi';
import { FileModel } from './dto';

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
      200: {
        content: {
          'application/json': {
            schema: z.union([
              z.object({
                file: FileModel.nullable()
              }),
              z.object({
                key: z.string(),
                preSignedUrl: z.string()
              })
            ])
          }
        },
        description: 'Upload successful'
      }
    }
  }),

  downloadRoute: createRoute({
    tags: ['file'],
    method: 'get',
    path: '/file/download/{fileId}',
    request: {
      params: z.object({
        fileId: z.string()
      })
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              downloadUrl: z.string()
            })
          }
        },
        description: 'Download successful'
      }
    }
  })
};
