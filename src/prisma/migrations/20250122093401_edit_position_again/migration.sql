/*
  Warnings:

  - Made the column `position` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position_lv` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_position_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_position_lv_fkey`;

-- DropIndex
DROP INDEX `users_position_fkey` ON `users`;

-- DropIndex
DROP INDEX `users_position_lv_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `position` INTEGER NOT NULL,
    MODIFY `position_lv` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_position_fkey` FOREIGN KEY (`position`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_position_lv_fkey` FOREIGN KEY (`position_lv`) REFERENCES `position_lvs`(`position_lv_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
