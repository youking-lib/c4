import { createRoute } from '@hono/zod-openapi';

export const uploadRoute = createRoute({
  tags: ['upload'],
  method: 'post',
  path: '/upload',
  responses: {
    200: {
      description: 'Upload successful'
    }
  }
});
