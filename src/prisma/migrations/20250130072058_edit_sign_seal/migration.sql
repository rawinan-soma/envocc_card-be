/*
  Warnings:

  - Added the required column `update_admin` to the `seals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_admin` to the `sign_persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seals` ADD COLUMN `add_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `update_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sign_persons` ADD COLUMN `date_update` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `update_admin` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `seals` ADD CONSTRAINT `seals_update_admin_fkey` FOREIGN KEY (`update_admin`) REFERENCES `admins`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sign_persons` ADD CONSTRAINT `sign_persons_update_admin_fkey` FOREIGN KEY (`update_admin`) REFERENCES `admins`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
