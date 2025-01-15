import { Env } from '@/ctx/interface';
import { OpenAPIHono } from '@hono/zod-openapi';

export const route = new OpenAPIHono<Env>();
