import { Context } from "hono";
import { createClerkClient } from "@clerk/backend";

import { Env } from "./interface";
import { prismaClients } from "./prisma";

export type AdapterContext = Context<Env>;

export class Adapter {
  constructor(public ctx: AdapterContext) {}

  async getEnv() {
    return this.ctx.env;
  }

  async getPrismaClient() {
    const prisma = await prismaClients.fetch(this.ctx.env.database);
    return prisma;
  }

  async getClerkOptions() {
    const env = await this.getEnv();

    return {
      jwtKey: env.CLERK_JWT_KEY,
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.CLERK_PUBLISHABLE_KEY,
    };
  }

  async getClerkSession() {
    const client = await this.getClerkClient();
    const options = await this.getClerkOptions();

    const res = await client.authenticateRequest(this.ctx.req.raw, {
      ...options,
    });

    if (res.status === "signed-in") {
      return res.toAuth();
    }

    return null;
  }

  async getClerkClient() {
    const options = await this.getClerkOptions();
    return createClerkClient(options);
  }
}
