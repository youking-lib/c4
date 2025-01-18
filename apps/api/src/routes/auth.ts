import { APIContext } from '@/ctx/adapter';
import { route } from './api';
import { authSchema } from './auth.schema';

route.openapi(authSchema.loginUser, async c => {
  const session = c.get('session');

  return c.json({ status: 'success', data: session } as const, 200);
});

route.openapi(authSchema.sendOTPCode, async c => {
  const api = new APIContext(c);

  const { email } = c.req.valid('json');
  const stack = await api.getStackServerClient();

  const res = await stack.sendMagicLinkEmail(email, 'http://localhost:3000/auth/magic-link/verify');

  if (res.status === 'error') {
    return c.json(
      {
        status: 'error',
        error: {
          message: res.error.message,
          code: 'bad_request'
        }
      } as const,
      400
    );
  }

  return c.json({ status: 'success', data: { nonce: res.data.nonce } } as const, 200);
});

route.openapi(authSchema.verifyOTPCode, async c => {
  const api = new APIContext(c);

  const { code, nonce } = c.req.valid('json');

  const stack = await api.getStackServerClient();
  const res = await stack.signInWithMagicLink(code + nonce);

  if (res.status === 'error') {
    return c.json(
      {
        status: 'error',
        error: {
          message: res.error.message,
          code: 'bad_request'
        }
      } as const,
      400
    );
  }

  return c.json(
    {
      status: 'success',
      data: {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        newUser: res.data.newUser
      }
    } as const,
    200
  );
});
