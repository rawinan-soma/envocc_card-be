/*
  Warnings:

  - Added the required column `institution` to the `epositions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `epositions` ADD COLUMN `institution` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `epositions` ADD CONSTRAINT `epositions_institution_fkey` FOREIGN KEY (`institution`) REFERENCES `institutions`(`institution_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
