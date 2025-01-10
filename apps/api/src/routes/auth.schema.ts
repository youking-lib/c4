import { createRoute, z } from "@hono/zod-openapi";

export const authSchema = {
  login: createRoute({
    tags: ["auth"],
    method: "post",
    path: "/login",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              status: z.literal("success"),
              token: z.string(),
            }),
          },
        },
        description: "Login successful",
      },
    },
  }),

  logout: createRoute({
    tags: ["auth"],
    method: "post",
    path: "/logout",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              status: z.literal("success"),
              message: z.string(),
            }),
          },
        },
        description: "Logout successful",
      },
    },
  }),
};
