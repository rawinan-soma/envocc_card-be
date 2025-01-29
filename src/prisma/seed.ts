import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const ministries = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/ministries.json',
      'utf-8',
    ),
  );
  await prisma.ministries.createMany({
    data: ministries,
  });

  const access_levels = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/access_levels.json',
      'utf-8',
    ),
  );

  await prisma.access_levels.createMany({
    data: access_levels,
  });

  const seals = JSON.parse(
    fs.readFileSync('E:/envocc_card-be/src/prisma/data/seals.json', 'utf-8'),
  );
  await prisma.seals.createMany({
    data: seals,
  });

  const departments = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/departments.json',
      'utf-8',
    ),
  );
  await prisma.departments.createMany({
    data: departments,
  });

  const institutions = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/institution.json',
      'utf-8',
    ),
  );
  await prisma.institutions.createMany({
    data: institutions,
  });

  const positions = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/positions.json',
      'utf-8',
    ),
  );
  await prisma.positions.createMany({
    data: positions,
  });

  const position_lvls = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/position_lvls.json',
      'utf-8',
    ),
  );
  await prisma.position_lvs.createMany({
    data: position_lvls,
  });

  await prisma.admins.create({
    data: {
      email: 'testemail@mainModule.com',
      fname: 'ทดสอบ',
      lname: 'ทดสอบ',
      password: '1234',
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
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/eposition.json',
      'utf-8',
    ),
  );
  await prisma.epositions.createMany({
    data: epositions,
  });

  const request_statuses = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/request_statuses.json',
      'utf-8',
    ),
  );
  await prisma.request_statuses.createMany({
    data: request_statuses,
  });

  const users = JSON.parse(
    fs.readFileSync('E:/envocc_card-be/src/prisma/data/users.json', 'utf-8'),
  );
  await prisma.users.createMany({
    data: users,
  });

  const experiences = JSON.parse(
    fs.readFileSync(
      'E:/envocc_card-be/src/prisma/data/experiences.json',
      'utf-8',
    ),
  );
  await prisma.experiences.createMany({
    data: experiences,
  });

  const requests = JSON.parse(
    fs.readFileSync('E:/envocc_card-be/src/prisma/data/requests.json', 'utf-8'),
  );
  await prisma.requests.createMany({
    data: requests,
  });
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
