/*
  Warnings:

  - Added the required column `seal_name` to the `seals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seals` ADD COLUMN `seal_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_signer_fkey` FOREIGN KEY (`signer`) REFERENCES `sign_persons`(`sign_person_id`) ON DELETE CASCADE ON UPDATE CASCADE;
