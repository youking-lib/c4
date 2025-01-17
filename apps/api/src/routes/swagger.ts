import { swaggerUI } from '@hono/swagger-ui';
import { route } from './api';

route.doc('/swagger/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
});

route.get('/swagger', swaggerUI({ url: '/api/swagger/doc' }));
