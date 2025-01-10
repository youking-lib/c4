import { MiddlewareHandler } from "hono";

import type { Env } from "@/ctx/interface";
import { Adapter } from "@/ctx/adapter";

export const jwt = (): MiddlewareHandler<Env> => {
  return async (c, next) => {
    const adapter = new Adapter(c);

    const session = await adapter.getClerkSession();

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("session", session);

    await next();
  };
};
