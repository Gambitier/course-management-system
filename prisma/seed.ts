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

  await seedJavascriptCourseMaterial(javascriptCourseEntity);

  await seedCourseEnrollments(
    employeeEntity,
    javascriptCourseEntity,
    pythonCourseEntity,
    javaCourseEntity,
  );

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

async function seedCourseEnrollments(
  employeeEntity: User,
  javascriptCourseEntity: Course,
  pythonCourseEntity: Course,
  javaCourseEntity: Course,
) {
  const javascriptCourseEnrollment: Prisma.CourseEnrollmentCreateManyInput = {
    id: '88fb0ab8-9a9e-4632-ac36-ccd7604bc875',
    userId: employeeEntity.id,
    courseId: javascriptCourseEntity.id,
  };
  const pythonCourseEnrollment: Prisma.CourseEnrollmentCreateManyInput = {
    id: 'a3ee0171-cc46-40d1-9da2-5db0326a26d0',
    userId: employeeEntity.id,
    courseId: pythonCourseEntity.id,
  };
  const enrollment3: Prisma.CourseEnrollmentCreateManyInput = {
    id: '5752c2bb-c312-4efd-be74-2f137261e743',
    userId: employeeEntity.id,
    courseId: javaCourseEntity.id,
  };

  await prisma.courseEnrollment.createMany({
    data: [javascriptCourseEnrollment, pythonCourseEnrollment, enrollment3],
  });

  return {
    enrollment1: javascriptCourseEnrollment,
    enrollment2: pythonCourseEnrollment,
    enrollment3,
  };
}

async function seedJavascriptCourseMaterial(javascriptCourseEntity: Course) {
  await prisma.courseMaterial.createMany({
    data: [
      {
        id: '7e366a72-92a2-41de-ba3b-5f4a0adc7435',
        courseId: javascriptCourseEntity.id,
        title: 'javascript - Material 1',
        pdfUrl: 'www.pdf.com/javascript-Material-1',
        videoUrl: null,
        quizUrl: null,
      },
      {
        id: '8a767686-8ab3-4ad7-8976-e5be78666227',
        courseId: javascriptCourseEntity.id,
        title: 'javascript - Material 2',
        pdfUrl: null,
        videoUrl: 'www.video.com/javascript-Material-2',
        quizUrl: null,
      },
      {
        id: '3019dadc-276d-4bda-bb65-6aaf0bffa728',
        courseId: javascriptCourseEntity.id,
        title: 'javascript - Material 3',
        pdfUrl: 'www.pdf.com/javascript-Material-3',
        videoUrl: null,
        quizUrl: null,
      },
      {
        id: '5819aa40-7e08-4b7e-97f5-5551633af1ec',
        courseId: javascriptCourseEntity.id,
        title: 'javascript - Material 4',
        pdfUrl: null,
        videoUrl: null,
        quizUrl: 'www.quiz.com/javascript-Material-4',
      },
    ],
  });
}

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
