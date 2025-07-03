import { execSync } from "node:child_process";

export function setupPrismaTests() {

  // antes de tudo, cria o banco de dados
  execSync("npx dotenv-cli -e .env.test -- npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma")
}
