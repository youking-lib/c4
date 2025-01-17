import { z } from '@hono/zod-openapi';

export function success<T extends z.ZodTypeAny>(data: T) {
  const result = z.object({ status: z.literal('success') });

  return {
    content: {
      'application/json': {
        schema: data
          ? result.merge(
              z.object({
                data
              })
            )
          : result
      }
    },
    description: 'verify otp code successful'
  };
}
