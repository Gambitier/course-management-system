import { Prisma, PrismaClient, Role } from '@prisma/client';

/////////////////////////////////////////////////

const prisma = new PrismaClient();

async function main() {
  const admin: Prisma.UserCreateInput = {
    prefix: 'MR',
    firstName: 'Admin',
    lastName: 'CMS',
    email: 'cms-admin@yopmail.com',
    phone: '1234567890',
    password: 'Test@123',
    userRoles: {
      create: {
        role: Role.ADMIN,
      },
    },
  };

  const superAdmin: Prisma.UserCreateInput = {
    prefix: 'MR',
    firstName: 'SuperAdmin',
    lastName: 'CMS',
    email: 'cms-superadmin@yopmail.com',
    phone: '2234567890',
    password: 'Test@123',
    userRoles: {
      create: {
        role: Role.SUPERADMIN,
      },
    },
  };

  const employee: Prisma.UserCreateInput = {
    prefix: 'MR',
    firstName: 'employee',
    lastName: 'CMS',
    email: 'cms-employee@yopmail.com',
    phone: '2334567890',
    password: 'Test@123',
    userRoles: {
      create: {
        role: Role.EMPLOYEE,
      },
    },
  };

  const adminEntity = await prisma.user.upsert({
    where: { email: admin.email },
    update: {},
    create: admin,
  });

  const superAdminEntity = await prisma.user.upsert({
    where: { email: superAdmin.email },
    update: {},
    create: superAdmin,
  });

  const employeeEntity = await prisma.user.upsert({
    where: { email: employee.email },
    update: {},
    create: employee,
  });

  console.log({ adminEntity, superAdminEntity, employeeEntity });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
