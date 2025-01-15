import { createRoute, z } from '@hono/zod-openapi';

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
      description: 'Retrieve code successful'
    }
  }
});
