import { createRoute, z } from '@hono/zod-openapi';
import { errorSchema, successSchema } from './utils';

export const authSchema = {
  login: createRoute({
    tags: ['auth'],
    method: 'post',
    path: '/login',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(z.null()),
        description: 'Login successful'
      }
    }
  }),

  logout: createRoute({
    tags: ['auth'],
    method: 'post',
    path: '/logout',
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(z.null()),
        description: 'Logout successful'
      }
    }
  }),

  loginUser: createRoute({
    tags: ['auth'],
    method: 'get',
    path: '/auth/me',
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.object({
            uid: z.string(),
            name: z.string(),
            email: z.string(),
            projectId: z.string(),
            projectName: z.string()
          })
        ),
        description: 'Login successful'
      }
    }
  }),

  sendOTPCode: createRoute({
    tags: ['auth'],
    method: 'post',
    description: 'send otp code',
    path: '/auth/otp/send-code',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(z.object({ nonce: z.string() })),
        description: 'send otp code successful'
      }
    }
  }),

  verifyOTPCode: createRoute({
    tags: ['auth'],
    method: 'post',
    path: '/auth/otp/verify/code',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              nonce: z.string(),
              code: z.string()
            })
          }
        }
      }
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(
          z.object({ accessToken: z.string(), refreshToken: z.string(), newUser: z.boolean() })
        ),
        description: 'verify otp code successful'
      }
    }
  }),

  verifyMagicLink: createRoute({
    tags: ['auth'],
    method: 'get',
    path: '/auth/magic-link/verify',
    request: {
      query: z.object({
        code: z.string()
      })
    },
    responses: {
      ...errorSchema,
      200: {
        ...successSchema(z.null()),
        description: 'verify magic link successful'
      }
    }
  })
};
