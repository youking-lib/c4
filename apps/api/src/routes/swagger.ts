import { swaggerUI } from '@hono/swagger-ui';
import { route } from './api';

route.doc('/swagger/doc', {
  openapi: '3.1.0',
  info: {
    title: 'An API',
    version: 'v1'
  },
  security: [
    {
      Authorization: []
    }
  ]
});

route.get('/swagger', swaggerUI({ url: '/api/swagger/doc' }));

route.openAPIRegistry.registerComponent('securitySchemes', 'Authorization', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT'
});
