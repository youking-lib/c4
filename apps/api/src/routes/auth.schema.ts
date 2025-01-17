import { createRoute, z } from '@hono/zod-openapi';
import { success } from './utils';

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
      200: {
        ...success(z.null()),
        description: 'Login successful'
      }
    }
  }),

  logout: createRoute({
    tags: ['auth'],
    method: 'post',
    path: '/logout',
    responses: {
      200: {
        ...success(z.null()),
        description: 'Logout successful'
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
      200: {
        ...success(z.object({ nonce: z.string() })),
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
      200: {
        ...success(z.null()),
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
      200: {
        ...success(z.null()),
        description: 'verify magic link successful'
      }
    }
  })
};
