import { OpenAPIHono } from '@hono/zod-openapi';

import { Env } from '@/ctx/interface';
import { useJwtSession } from '@/middlewares/use-session';

const route = new OpenAPIHono<Env>().basePath('/api');

route.use(useJwtSession({ whitelist: ['/api/auth/otp', '/api/swagger'] }));

export { route };
