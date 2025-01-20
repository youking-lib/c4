import { Env } from '@/ctx/interface';
import { OpenAPIHono } from '@hono/zod-openapi';
import { useJwtSession } from '@/middlewares/use-session';

import { handleError } from './utils';

const route = new OpenAPIHono<Env>({
  defaultHook(res, c) {
    if (!res.success) {
      const error = handleError(res.error);

      return c.json(error, error.httpStatus);
    }
  }
}).basePath('/api');

route.use(useJwtSession({ whitelist: ['/api/auth/otp', '/api/swagger'] }));

export { route };
