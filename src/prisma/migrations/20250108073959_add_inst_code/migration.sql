/*
  Warnings:

  - Added the required column `institution_code` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `institutions` ADD COLUMN `institution_code` VARCHAR(10) NOT NULL;
