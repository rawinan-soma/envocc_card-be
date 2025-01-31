-- DropForeignKey
ALTER TABLE `seals` DROP FOREIGN KEY `seals_update_admin_fkey`;

-- DropIndex
DROP INDEX `seals_update_admin_fkey` ON `seals`;
