## Prisma

1. init

```bash
pnpm prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/0001_init.sql
```

2. migrate

```bash
pnpm prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0002_code_statistics.sql
```

3. apply

```bash
pnpm wrangler d1 migrations apply cyber-express --local
pnpm wrangler d1 migrations apply cyber-express --remote
```
