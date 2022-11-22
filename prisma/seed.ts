import { Course, Prisma, PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

/////////////////////////////////////////////////

const prisma = new PrismaClient();

function hashData(data: string | Buffer): string {
  const hash = bcrypt.hashSync(data, bcrypt.genSaltSync(8));
  return hash;
}

async function main() {
  const { adminEntity, superAdminEntity, employeeEntity } = await seedUsers();

  const { javascriptCourseEntity, pythonCourseEntity, javaCourseEntity } =
    await seedCourses(adminEntity, superAdminEntity);

  console.log({ adminEntity, superAdminEntity, employeeEntity });
  console.log({ javascriptCourseEntity, pythonCourseEntity, javaCourseEntity });
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

async function seedCourses(adminEntity: User, superAdminEntity: User) {
  const javascriptCourse: Course = {
    id: 'ea3076ec-6c02-4164-949a-eec7770e4698',
    title: 'Javascript Course',
    description: 'Javascript Course Description',
    videoUrl: 'localhost/courses/Javascript',
    topics: ['Intro', 'Conditional Statement'],
    durationMinutes: 120,
    category: 'Programming',
    createdByUserId: adminEntity.id,
    approvedByUserId: superAdminEntity.id,
    approvedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: null,
  };

  const javascriptCourseEntity = await prisma.course.upsert({
    where: { id: javascriptCourse.id },
    update: {},
    create: javascriptCourse,
  });

  const pythonCourse: Course = {
    id: '3fab8504-c7d3-4495-bb56-b2f0ea180e4c',
    title: 'Python Course',
    description: 'Python Course Description',
    videoUrl: 'localhost/courses/python',
    topics: ['Intro', 'Conditional Statement'],
    durationMinutes: 120,
    category: 'Programming',
    createdByUserId: adminEntity.id,
    approvedByUserId: superAdminEntity.id,
    approvedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: null,
  };

  const pythonCourseEntity = await prisma.course.upsert({
    where: { id: pythonCourse.id },
    update: {},
    create: pythonCourse,
  });

  const javaCourse: Course = {
    id: 'a34727a7-56d3-4466-b200-34ed5266b3b7',
    title: 'java Course',
    description: 'java Course Description',
    videoUrl: 'localhost/courses/java',
    topics: ['Intro', 'Conditional Statement'],
    durationMinutes: 120,
    category: 'Programming',
    createdByUserId: adminEntity.id,
    approvedByUserId: null,
    approvedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: null,
  };

  const javaCourseEntity = await prisma.course.upsert({
    where: { id: javaCourse.id },
    update: {},
    create: javaCourse,
  });

  return { javascriptCourseEntity, pythonCourseEntity, javaCourseEntity };
}

async function seedUsers() {
  const admin: Prisma.UserCreateInput = {
    id: '07d638c2-876a-4bea-b534-80b092746160',
    prefix: 'MR',
    firstName: 'Admin',
    lastName: 'CMS',
    email: 'cms-admin@yopmail.com',
    phone: '1234567890',
    password: hashData('Test@123'),
    userRoles: {
      create: {
        role: Role.ADMIN,
      },
    },
  };

  const superAdmin: Prisma.UserCreateInput = {
    id: 'f2b978c0-5728-4747-9382-e5d1be801352',
    prefix: 'MR',
    firstName: 'SuperAdmin',
    lastName: 'CMS',
    email: 'cms-superadmin@yopmail.com',
    phone: '2234567890',
    password: hashData('Test@123'),
    userRoles: {
      create: {
        role: Role.SUPERADMIN,
      },
    },
  };

  const employee: Prisma.UserCreateInput = {
    id: 'd9852368-9546-4773-9b15-96b33966011c',
    prefix: 'MR',
    firstName: 'employee',
    lastName: 'CMS',
    email: 'cms-employee@yopmail.com',
    phone: '2334567890',
    password: hashData('Test@123'),
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

  return { adminEntity, superAdminEntity, employeeEntity };
}
