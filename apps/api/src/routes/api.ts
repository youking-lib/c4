import { OpenAPIHono } from '@hono/zod-openapi';

import { Env } from '@/ctx/interface';
import { useProjectAuth } from '@/middlewares/use-project';

const route = new OpenAPIHono<Env>().basePath('/api');

route.use('/project/*', useProjectAuth());

export { route };
