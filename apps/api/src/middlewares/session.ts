import { MiddlewareHandler } from "hono";

import type { Env } from "@/ctx/interface";
import { APIContext, getClerkSession } from "@/ctx/adapter";

export const jwt = (): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const api = new APIContext(c);

    const session = await getClerkSession(api);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("session", session);

    await next();
  };
};
