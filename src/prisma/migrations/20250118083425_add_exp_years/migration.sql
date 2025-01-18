/*
  Warnings:

  - You are about to drop the column `sing_person_active` on the `sign_persons` table. All the data in the column will be lost.
  - You are about to drop the column `sing_person_pname` on the `sign_persons` table. All the data in the column will be lost.
  - Added the required column `sign_person_active` to the `sign_persons` table without a default value. This is not possible if the table is not empty.
  - Made the column `department` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `sign_persons` DROP FOREIGN KEY `sign_persons_ibfk_1`;

-- AlterTable
ALTER TABLE `experiences` ADD COLUMN `exp_years` INTEGER NULL;

-- AlterTable
ALTER TABLE `sign_persons` DROP COLUMN `sing_person_active`,
    DROP COLUMN `sing_person_pname`,
    ADD COLUMN `sign_person_active` BOOLEAN NOT NULL,
    ADD COLUMN `sign_person_pname` VARCHAR(100) NULL,
    MODIFY `sign_person_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `department` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `sign_persons` ADD CONSTRAINT `sign_persons_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
