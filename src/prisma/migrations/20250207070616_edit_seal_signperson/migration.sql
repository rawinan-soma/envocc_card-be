/*
  Warnings:

  - Added the required column `seal` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `departments` DROP FOREIGN KEY `departments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `sign_persons` DROP FOREIGN KEY `sign_persons_update_admin_fkey`;

-- DropIndex
DROP INDEX `sign_persons_update_admin_fkey` ON `sign_persons`;

-- AlterTable
ALTER TABLE `institutions` ADD COLUMN `seal` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `institutions` ADD CONSTRAINT `institutions_seal_fkey` FOREIGN KEY (`seal`) REFERENCES `seals`(`seal_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
