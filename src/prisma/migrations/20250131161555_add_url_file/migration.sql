-- AlterTable
ALTER TABLE `documents` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `envocc_card_files` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `exp_files` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `experiences_files` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gov_card_files` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `photos` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `request_files` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `seals` ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sign_persons` ADD COLUMN `url` VARCHAR(191) NULL;
