/*
  Warnings:

  - You are about to drop the column `department_seal` on the `departments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `department_seal` ON `departments`;

-- AlterTable
ALTER TABLE `departments` DROP COLUMN `department_seal`;
