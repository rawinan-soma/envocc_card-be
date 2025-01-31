/*
  Warnings:

  - Made the column `sign_person_pname` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sign_person_name` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sign_person_lname` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `signature_pix` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `sign_persons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sign_persons` MODIFY `sign_person_pname` VARCHAR(100) NOT NULL,
    MODIFY `sign_person_name` VARCHAR(255) NOT NULL,
    MODIFY `sign_person_lname` VARCHAR(255) NOT NULL,
    MODIFY `signature_pix` VARCHAR(255) NOT NULL,
    MODIFY `position` VARCHAR(255) NOT NULL;
