import { Context } from 'hono';
import { createClerkClient } from '@clerk/backend';

import { getS3Client } from '@/libs/storage';

import { Env } from './interface';
import { prismaClients } from './prisma';

export type HonoAPIContext = Context<Env>;

export class APIContext {
  constructor(public ctx: HonoAPIContext) {}

  async getSession() {
    return this.ctx.get('session');
  }

  async getEnv() {
    return this.ctx.env;
  }

  async getPrismaClient() {
    const prisma = await prismaClients.fetch(this.ctx.env.database);
    return prisma;
  }

  async getS3Client() {
    const env = await this.getEnv();

    return getS3Client({
      endpoint: env.S3_ENDPOINT,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY
    });
  }

  async getClerkClient() {
    const options = await getClerkOptions(this);
    return createClerkClient(options);
  }
}

export async function getClerkOptions(api: APIContext) {
  const env = await api.getEnv();

  return {
    jwtKey: env.CLERK_JWT_KEY,
    secretKey: env.CLERK_SECRET_KEY,
    publishableKey: env.CLERK_PUBLISHABLE_KEY
  };
}

export async function getClerkSession(api: APIContext) {
  const options = await getClerkOptions(api);
  const client = await api.getClerkClient();

  const res = await client.authenticateRequest(api.ctx.req.raw, {
    ...options
  });

  if (res.status === 'signed-in') {
    return res.toAuth();
  }

  return null;
}
