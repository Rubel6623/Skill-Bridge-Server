const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const subjects = await prisma.tutorSubject.findMany({
    include: {
      category: true,
      tutorProfile: {
        include: {
          user: true
        }
      }
    }
  });
  console.log('--- SUBJECTS ---');
  console.log(JSON.stringify(subjects, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
