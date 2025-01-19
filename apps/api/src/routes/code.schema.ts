import { createRoute, z } from '@hono/zod-openapi';
import { FileModel } from './dto';

export const codeSchema = {
  retrieveRoute: createRoute({
    tags: ['code'],
    method: 'get',
    path: '/code/{codeId}',
    request: {
      params: z.object({
        projectId: z.string(),
        codeId: z.string()
      })
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              files: z.array(FileModel)
            })
          }
        },
        description: 'Retrieve code successful'
      }
    }
  })
};
