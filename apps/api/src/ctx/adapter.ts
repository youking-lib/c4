import { Context } from 'hono';
import { StackServerInterface } from '@stackframe/stack-shared';
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

  async getStackServerClient() {
    const env = await this.getEnv();

    return new StackServerInterface({
      clientVersion: 'js @stackframe/stack@2.7.5',
      baseUrl: 'https://api.stack-auth.com',
      projectId: env.NEXT_PUBLIC_STACK_PROJECT_ID,
      publishableClientKey: env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
      secretServerKey: env.STACK_SECRET_SERVER_KEY
    });
  }
}
