/*
  Warnings:

  - You are about to drop the column `department` on the `sign_persons` table. All the data in the column will be lost.
  - Added the required column `sign_person` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sign_persons` DROP FOREIGN KEY `sign_persons_ibfk_1`;

-- DropIndex
DROP INDEX `department` ON `sign_persons`;

-- AlterTable
ALTER TABLE `institutions` ADD COLUMN `sign_person` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sign_persons` DROP COLUMN `department`;

-- AddForeignKey
ALTER TABLE `institutions` ADD CONSTRAINT `institutions_sign_person_fkey` FOREIGN KEY (`sign_person`) REFERENCES `sign_persons`(`sign_person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
