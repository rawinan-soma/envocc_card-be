-- AlterTable
ALTER TABLE `admins` ADD COLUMN `is_validate` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `sign_persons` MODIFY `sign_person_active` BOOLEAN NOT NULL DEFAULT true;
