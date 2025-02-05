/*
  Warnings:

  - Made the column `user` on table `requests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_ibfk_1`;

-- AlterTable
ALTER TABLE `requests` MODIFY `user` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
