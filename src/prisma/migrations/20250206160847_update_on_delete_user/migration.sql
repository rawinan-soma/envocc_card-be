-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_ibfk_1`;

-- DropForeignKey
ALTER TABLE `admins` DROP FOREIGN KEY `admins_ibfk_2`;

-- DropForeignKey
ALTER TABLE `departments` DROP FOREIGN KEY `departments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `departments` DROP FOREIGN KEY `departments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `envocc_card_files` DROP FOREIGN KEY `envocc_card_files_ibfk_1`;

-- DropForeignKey
ALTER TABLE `exp_files` DROP FOREIGN KEY `exp_files_ibfk_1`;

-- DropForeignKey
ALTER TABLE `experiences` DROP FOREIGN KEY `experience_ibfk_1`;

-- DropForeignKey
ALTER TABLE `experiences_files` DROP FOREIGN KEY `experiences_files_ibfk_1`;

-- DropForeignKey
ALTER TABLE `gov_card_files` DROP FOREIGN KEY `gov_card_files_ibfk_1`;

-- DropForeignKey
ALTER TABLE `institutions` DROP FOREIGN KEY `institutions_ibfk_1`;

-- DropForeignKey
ALTER TABLE `members` DROP FOREIGN KEY `members_ibfk_1`;

-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `request_files` DROP FOREIGN KEY `request_files_ibfk_1`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_ibfk_1`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_ibfk_2`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_ibfk_3`;

-- DropForeignKey
ALTER TABLE `resetpass` DROP FOREIGN KEY `resetpass_ibfk_1`;

-- DropForeignKey
ALTER TABLE `resetpass` DROP FOREIGN KEY `resetpass_ibfk_2`;

-- DropForeignKey
ALTER TABLE `sign_persons` DROP FOREIGN KEY `sign_persons_ibfk_1`;

-- DropIndex
DROP INDEX `members_ibfk_1` ON `members`;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`level`) REFERENCES `access_levels`(`level_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`institution`) REFERENCES `institutions`(`institution_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`ministry`) REFERENCES `ministries`(`ministry_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`department_seal`) REFERENCES `seals`(`seal_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `envocc_card_files` ADD CONSTRAINT `envocc_card_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exp_files` ADD CONSTRAINT `exp_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `experiences_files` ADD CONSTRAINT `experiences_files_ibfk_1` FOREIGN KEY (`admin`) REFERENCES `admins`(`admin_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gov_card_files` ADD CONSTRAINT `gov_card_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `institutions` ADD CONSTRAINT `institutions_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments`(`department_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `request_files` ADD CONSTRAINT `request_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`approver`) REFERENCES `admins`(`admin_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`request_status`) REFERENCES `request_statuses`(`status_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resetpass` ADD CONSTRAINT `resetpass_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resetpass` ADD CONSTRAINT `resetpass_ibfk_2` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sign_persons` ADD CONSTRAINT `sign_persons_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments`(`department_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
