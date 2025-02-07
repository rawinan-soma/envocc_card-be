import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(async (tx) => {
    const ministries = JSON.parse(
      fs.readFileSync('././src/prisma/data/ministries.json', 'utf-8'),
    );
    await tx.ministries.createMany({
      data: ministries,
    });

    const access_levels = JSON.parse(
      fs.readFileSync('././src/prisma/data/access_levels.json', 'utf-8'),
    );

    await tx.access_levels.createMany({
      data: access_levels,
    });

    const seals = JSON.parse(
      fs.readFileSync('././src/prisma/data/seals.json', 'utf-8'),
    );
    await tx.seals.createMany({
      data: seals,
    });

    const signatures = JSON.parse(
      fs.readFileSync('././src/prisma/data/signer.json', 'utf-8'),
    );

    await tx.sign_persons.createMany({ data: signatures });

    const departments = JSON.parse(
      fs.readFileSync('././src/prisma/data/departments.json', 'utf-8'),
    );
    await tx.departments.createMany({
      data: departments,
    });

    const institutions = JSON.parse(
      fs.readFileSync('././src/prisma/data/institution.json', 'utf-8'),
    );
    await tx.institutions.createMany({
      data: institutions,
    });

    const positions = JSON.parse(
      fs.readFileSync('././src/prisma/data/positions.json', 'utf-8'),
    );
    await tx.positions.createMany({
      data: positions,
    });

    const position_lvls = JSON.parse(
      fs.readFileSync('././src/prisma/data/position_lvls.json', 'utf-8'),
    );
    await tx.position_lvs.createMany({
      data: position_lvls,
    });

    await tx.admins.create({
      data: {
        email: 'testemail@mainModule.com',
        fname: 'ทดสอบ',
        lname: 'ทดสอบ',
        password:
          '$2a$10$G2YUwq1YyF4dSxcem/62qu2uzFg7zoMTrlyhTjov5hgCMPXc3zPz.',
        pname: 'นาย',
        private_number: '0990000000',
        username: 'test01',
        work_number: '022000000',
        level: 1,
        admin_id: 1,
        create_date: new Date('2024-12-27'),
        institution: 28,
        position_lv: 1,
        position: 4,
        role: 'admin',
      },
    });

    const epositions = JSON.parse(
      fs.readFileSync('././src/prisma/data/eposition.json', 'utf-8'),
    );
    await tx.epositions.createMany({
      data: epositions,
    });

    const request_statuses = JSON.parse(
      fs.readFileSync('././src/prisma/data/request_statuses.json', 'utf-8'),
    );
    await tx.request_statuses.createMany({
      data: request_statuses,
    });

    const users = JSON.parse(
      fs.readFileSync('././src/prisma/data/users.json', 'utf-8'),
    );
    await tx.users.createMany({
      data: users,
    });

    const experiences = JSON.parse(
      fs.readFileSync('././src/prisma/data/experiences.json', 'utf-8'),
    );
    await tx.experiences.createMany({
      data: experiences,
    });

    const requests = JSON.parse(
      fs.readFileSync('././src/prisma/data/requests.json', 'utf-8'),
    );
    await tx.requests.createMany({
      data: requests,
    });
  });
  // const ministries = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/ministries.json', 'utf-8'),
  // );
  // await prisma.ministries.createMany({
  //   data: ministries,
  // });

  // const access_levels = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/access_levels.json', 'utf-8'),
  // );

  // await prisma.access_levels.createMany({
  //   data: access_levels,
  // });

  // const seals = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/seals.json', 'utf-8'),
  // );
  // await prisma.seals.createMany({
  //   data: seals,
  // });

  // const signatures = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/signer.json', 'utf-8'),
  // );

  // await prisma.sign_persons.createMany({ data: signatures });

  // const departments = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/departments.json', 'utf-8'),
  // );
  // await prisma.departments.createMany({
  //   data: departments,
  // });

  // const institutions = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/institution.json', 'utf-8'),
  // );
  // await prisma.institutions.createMany({
  //   data: institutions,
  // });

  // const positions = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/positions.json', 'utf-8'),
  // );
  // await prisma.positions.createMany({
  //   data: positions,
  // });

  // const position_lvls = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/position_lvls.json', 'utf-8'),
  // );
  // await prisma.position_lvs.createMany({
  //   data: position_lvls,
  // });

  // await prisma.admins.create({
  //   data: {
  //     email: 'testemail@mainModule.com',
  //     fname: 'ทดสอบ',
  //     lname: 'ทดสอบ',
  //     password: '$2a$10$G2YUwq1YyF4dSxcem/62qu2uzFg7zoMTrlyhTjov5hgCMPXc3zPz.',
  //     pname: 'นาย',
  //     private_number: '0990000000',
  //     username: 'test01',
  //     work_number: '022000000',
  //     level: 1,
  //     admin_id: 1,
  //     create_date: new Date('2024-12-27'),
  //     institution: 28,
  //     position_lv: 1,
  //     position: 4,
  //     role: 'admin',
  //   },
  // });

  // const epositions = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/eposition.json', 'utf-8'),
  // );
  // await prisma.epositions.createMany({
  //   data: epositions,
  // });

  // const request_statuses = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/request_statuses.json', 'utf-8'),
  // );
  // await prisma.request_statuses.createMany({
  //   data: request_statuses,
  // });

  // const users = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/users.json', 'utf-8'),
  // );
  // await prisma.users.createMany({
  //   data: users,
  // });

  // const experiences = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/experiences.json', 'utf-8'),
  // );
  // await prisma.experiences.createMany({
  //   data: experiences,
  // });

  // const requests = JSON.parse(
  //   fs.readFileSync('././src/prisma/data/requests.json', 'utf-8'),
  // );
  // await prisma.requests.createMany({
  //   data: requests,
  // });
}

main()
  .then(async () => {
    console.log('Seeding complete');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
