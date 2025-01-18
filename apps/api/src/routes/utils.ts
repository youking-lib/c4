import { z } from '@hono/zod-openapi';

export function successSchema<T extends z.ZodTypeAny>(data: T) {
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
    }
  };
}

export const errorSchema = {
  400: errorSchemaFactory(
    z.literal('bad_request'),
    'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).'
  ),

  401: errorSchemaFactory(
    z.literal('unauthorized'),
    `Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.`
  ),

  403: errorSchemaFactory(
    z.literal('forbidden'),
    "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
  ),

  404: errorSchemaFactory(z.literal('not_found'), 'The server cannot find the requested resource.'),

  409: errorSchemaFactory(
    z.literal('conflict'),
    'This response is sent when a request conflicts with the current state of the server.'
  ),

  410: errorSchemaFactory(
    z.literal('invite_expired'),
    'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.'
  ),

  422: errorSchemaFactory(
    z.literal('unprocessable_entity'),
    'The request was well-formed but was unable to be followed due to semantic errors.'
  ),

  429: errorSchemaFactory(
    z.literal('rate_limit_exceeded'),
    `The user has sent too many requests in a given amount of time ("rate limiting")`
  ),

  500: errorSchemaFactory(
    z.literal('internal_server_error'),
    'The server has encountered a situation it does not know how to handle.'
  )
};

export function errorSchemaFactory<T extends z.ZodTypeAny>(code: T, description: string) {
  return {
    description,
    content: {
      'application/json': {
        schema: z.object({
          status: z.literal('error'),
          error: z.object({
            code,
            message: z.string().default(description).openapi({
              description: 'A human readable explanation of what went wrong.',
              example: 'The requested resource was not found.'
            })
            // doc_url: z.string().default('https://c4.top/docs').openapi({
            //   description: 'A link to our documentation with more details about this error code',
            //   example: `https://c4.top/docs`
            // })
          })
        })
      }
    }
  };
}
