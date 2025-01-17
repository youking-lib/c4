import { APIContext } from '@/ctx/adapter';
import { route } from './api';
import { authSchema } from './auth.schema';

route.openapi(authSchema.login, async c => {
  const api = new APIContext(c);

  api.getClerkClient();

  return c.json({ status: 'success', token: '123' } as const, 200);
});

route.openapi(authSchema.sendOTPCode, async c => {
  const api = new APIContext(c);

  const { email } = c.req.valid('json');
  const stack = await api.getStackServerClient();

  const res = await stack.sendMagicLinkEmail(email, 'http://localhost:3000/auth/magic-link/verify');

  if (res.status === 'error') {
    throw new Error(res.error.message);
  }

  return c.json({ status: 'success', data: { nonce: res.data.nonce } } as const, 200);
});

route.openapi(authSchema.verifyOTPCode, async c => {
  const api = new APIContext(c);

  const { code, nonce } = c.req.valid('json');

  const stack = await api.getStackServerClient();
  const res = await stack.signInWithMagicLink(code + nonce);

  if (res.status === 'error') {
    throw new Error(res.error.message);
  }

  return c.json(
    {
      status: 'success',
      data: null
    } as const,
    200
  );
});
