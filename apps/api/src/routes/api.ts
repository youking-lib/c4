import { OpenAPIHono } from '@hono/zod-openapi';

import { Env } from '@/ctx/interface';
import { useProjectAuth } from '@/middlewares/use-project';
import { useJwtSession } from '@/middlewares/use-session';

const route = new OpenAPIHono<Env>().basePath('/api');

route.use(useJwtSession({ whitelist: ['/api/auth/otp', '/api/swagger'] }));
route.use('/project/*', useProjectAuth());

export { route };
