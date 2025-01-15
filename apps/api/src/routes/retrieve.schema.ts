import { createRoute, z } from '@hono/zod-openapi';
import { FileModel } from './dto';

export const retrieveRoute = createRoute({
  tags: ['retrieve'],
  method: 'post',
  path: '/retrieve',
  request: {
    query: z.object({
      code: z.string()
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
});
