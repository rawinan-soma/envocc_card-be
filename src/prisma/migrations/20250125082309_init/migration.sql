-- CreateTable
CREATE TABLE `access_levels` (
    `level_id` INTEGER NOT NULL,
    `validate_documents` INTEGER NULL,
    `authorize_users` INTEGER NULL,
    `add_card` INTEGER NULL,
    `add_institution` INTEGER NULL,
    `add_admin` INTEGER NULL,
    `add_seal` INTEGER NULL,
    `add_document` INTEGER NULL,
    `data_institution` INTEGER NULL,
    `data_province` INTEGER NULL,
    `data_region` INTEGER NULL,
    `data_nation` INTEGER NULL,

    UNIQUE INDEX `level_id`(`level_id`),
    PRIMARY KEY (`level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `institution` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `pname` VARCHAR(255) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `lname` VARCHAR(255) NOT NULL,
    `private_number` VARCHAR(255) NOT NULL,
    `work_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `position` INTEGER NOT NULL,
    `position_lv` INTEGER NOT NULL,
    `create_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `admin_id`(`admin_id`),
    UNIQUE INDEX `admins_username_key`(`username`),
    UNIQUE INDEX `admins_email_key`(`email`),
    INDEX `institution`(`institution`),
    INDEX `level`(`level`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `department_id` INTEGER NOT NULL,
    `department_name_th` VARCHAR(255) NOT NULL,
    `department_name_eng` VARCHAR(255) NOT NULL,
    `ministry` INTEGER NOT NULL,
    `department_seal` INTEGER NOT NULL,

    UNIQUE INDEX `department_id`(`department_id`),
    UNIQUE INDEX `department_seal`(`department_seal`),
    INDEX `ministry`(`ministry`),
    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `doc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_type` INTEGER NULL,
    `doc_name` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `doc_id`(`doc_id`),
    UNIQUE INDEX `documents_doc_name_key`(`doc_name`),
    PRIMARY KEY (`doc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `envocc_card_files` (
    `envocc_card_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `file_card_name` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `envocc_card_file_id`(`envocc_card_file_id`),
    UNIQUE INDEX `envocc_card_files_file_card_name_key`(`file_card_name`),
    INDEX `user`(`user`),
    PRIMARY KEY (`envocc_card_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `epositions` (
    `eposition_id` INTEGER NOT NULL,
    `eposition_name_th` VARCHAR(255) NOT NULL,
    `eposition_name_eng` VARCHAR(255) NOT NULL,
    `institution` INTEGER NOT NULL,

    UNIQUE INDEX `eposition_id`(`eposition_id`),
    PRIMARY KEY (`eposition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exp_files` (
    `exp_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `file_name` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `exp_file_id`(`exp_file_id`),
    UNIQUE INDEX `exp_files_file_name_key`(`file_name`),
    INDEX `user`(`user`),
    PRIMARY KEY (`exp_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences` (
    `exp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `exp_fdate` DATE NULL,
    `exp_ldate` DATE NULL,
    `exp_years` INTEGER NULL,
    `exp_typeoffice` INTEGER NULL,
    `exp_office` VARCHAR(255) NULL,
    `exp_position` VARCHAR(255) NULL,
    `exp_work` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `exp_id`(`exp_id`),
    INDEX `user`(`user`),
    PRIMARY KEY (`exp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences_files` (
    `experience_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin` INTEGER NULL,
    `exp_file` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `experience_file_id`(`experience_file_id`),
    UNIQUE INDEX `experiences_files_exp_file_key`(`exp_file`),
    INDEX `admin`(`admin`),
    PRIMARY KEY (`experience_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gov_card_files` (
    `gov_card_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `file_name` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `gov_card_file_id`(`gov_card_file_id`),
    UNIQUE INDEX `gov_card_files_file_name_key`(`file_name`),
    INDEX `user`(`user`),
    PRIMARY KEY (`gov_card_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `institutions` (
    `institution_id` INTEGER NOT NULL,
    `institution_code` VARCHAR(10) NOT NULL,
    `institution_name_th` VARCHAR(255) NOT NULL,
    `institution_name_eng` VARCHAR(255) NOT NULL,
    `department` INTEGER NOT NULL,
    `province` INTEGER NOT NULL,
    `health_region` INTEGER NOT NULL,

    UNIQUE INDEX `institution_id`(`institution_id`),
    INDEX `department`(`department`),
    PRIMARY KEY (`institution_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_no` INTEGER NULL,
    `user` INTEGER NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `qrcode` VARCHAR(255) NULL,
    `qrcode_pass` VARCHAR(255) NULL,
    `signer` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `num_print` INTEGER NOT NULL DEFAULT 2,
    `create_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `members_member_id_key`(`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ministries` (
    `ministry_id` INTEGER NOT NULL,
    `ministry_name_th` VARCHAR(255) NOT NULL,
    `ministry_name_eng` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ministry_id`(`ministry_id`),
    PRIMARY KEY (`ministry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `photo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `photo` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `photo_id`(`photo_id`),
    UNIQUE INDEX `photos_photo_key`(`photo`),
    INDEX `user`(`user`),
    PRIMARY KEY (`photo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_files` (
    `request_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `file_name` VARCHAR(255) NULL,
    `create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `request_file_id`(`request_file_id`),
    UNIQUE INDEX `request_files_file_name_key`(`file_name`),
    INDEX `user`(`user`),
    PRIMARY KEY (`request_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_statuses` (
    `status_id` INTEGER NOT NULL,
    `status_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `status_id`(`status_id`),
    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requests` (
    `req_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `request_status` INTEGER NOT NULL,
    `request_type` INTEGER NOT NULL,
    `approver` INTEGER NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `date_update` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `req_id`(`req_id`),
    INDEX `approver`(`approver`),
    INDEX `request_status`(`request_status`),
    INDEX `user`(`user`),
    PRIMARY KEY (`req_id`, `request_status`, `date_update`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resetpass` (
    `resetpass_req_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `user_email` VARCHAR(255) NULL,
    `token` VARCHAR(255) NULL,
    `expiration_time` TIME(0) NULL,

    UNIQUE INDEX `resetpass_req_id`(`resetpass_req_id`),
    INDEX `user`(`user`),
    INDEX `user_email`(`user_email`),
    PRIMARY KEY (`resetpass_req_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seals` (
    `seal_id` INTEGER NOT NULL,
    `seal_pix` VARCHAR(255) NULL,

    UNIQUE INDEX `seal_id`(`seal_id`),
    UNIQUE INDEX `seals_seal_pix_key`(`seal_pix`),
    PRIMARY KEY (`seal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sign_persons` (
    `sign_person_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sign_person_pname` VARCHAR(100) NULL,
    `sign_person_name` VARCHAR(255) NULL,
    `sign_person_lname` VARCHAR(255) NULL,
    `signature_pix` VARCHAR(255) NULL,
    `department` INTEGER NOT NULL,
    `position` VARCHAR(255) NULL,
    `sign_person_active` BOOLEAN NOT NULL,

    UNIQUE INDEX `sign_person_id`(`sign_person_id`),
    UNIQUE INDEX `sign_persons_signature_pix_key`(`signature_pix`),
    INDEX `department`(`department`),
    PRIMARY KEY (`sign_person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `pname_th` VARCHAR(191) NOT NULL,
    `pname_other_th` VARCHAR(255) NOT NULL,
    `fname_th` VARCHAR(255) NOT NULL,
    `lname_th` VARCHAR(255) NOT NULL,
    `pname_en` VARCHAR(191) NOT NULL,
    `pname_other_en` VARCHAR(255) NOT NULL,
    `fname_en` VARCHAR(255) NOT NULL,
    `lname_en` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `nationality` VARCHAR(255) NOT NULL,
    `blood` VARCHAR(191) NOT NULL,
    `work_number` VARCHAR(191) NOT NULL,
    `private_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `house_number1` VARCHAR(255) NOT NULL,
    `moo1` INTEGER NOT NULL,
    `alley1` VARCHAR(255) NULL,
    `road1` VARCHAR(255) NULL,
    `province1` INTEGER NOT NULL,
    `amphures1` INTEGER NOT NULL,
    `district1` INTEGER NOT NULL,
    `zip_code1` INTEGER NOT NULL,
    `house_number2` VARCHAR(255) NOT NULL,
    `moo2` INTEGER NOT NULL,
    `alley2` VARCHAR(255) NULL,
    `road2` VARCHAR(255) NULL,
    `province2` INTEGER NOT NULL,
    `amphures2` INTEGER NOT NULL,
    `district2` INTEGER NOT NULL,
    `zip_code2` INTEGER NOT NULL,
    `institution` INTEGER NOT NULL,
    `eposition` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,
    `position_lv` INTEGER NOT NULL,
    `e_learning` INTEGER NOT NULL,
    `approve` BOOLEAN NOT NULL,
    `is_validate` BOOLEAN NOT NULL DEFAULT false,
    `create_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_id`(`user_id`),
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `email`(`email`),
    INDEX `institution`(`institution`),
    PRIMARY KEY (`username`, `email`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `positions` (
    `position_id` INTEGER NOT NULL,
    `position_name` VARCHAR(100) NULL,
    `position_name_eng` VARCHAR(100) NULL,

    PRIMARY KEY (`position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position_lvs` (
    `position_lv_id` INTEGER NOT NULL,
    `position_lv_name` VARCHAR(100) NULL,
    `position_lv_name_eng` VARCHAR(100) NULL,

    PRIMARY KEY (`position_lv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`level`) REFERENCES `access_levels`(`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`institution`) REFERENCES `institutions`(`institution_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_position_fkey` FOREIGN KEY (`position`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_position_lv_fkey` FOREIGN KEY (`position_lv`) REFERENCES `position_lvs`(`position_lv_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`ministry`) REFERENCES `ministries`(`ministry_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`department_seal`) REFERENCES `seals`(`seal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `envocc_card_files` ADD CONSTRAINT `envocc_card_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `epositions` ADD CONSTRAINT `epositions_institution_fkey` FOREIGN KEY (`institution`) REFERENCES `institutions`(`institution_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exp_files` ADD CONSTRAINT `exp_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `experiences_files` ADD CONSTRAINT `experiences_files_ibfk_1` FOREIGN KEY (`admin`) REFERENCES `admins`(`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gov_card_files` ADD CONSTRAINT `gov_card_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `institutions` ADD CONSTRAINT `institutions_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `request_files` ADD CONSTRAINT `request_files_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`approver`) REFERENCES `admins`(`admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`request_status`) REFERENCES `request_statuses`(`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resetpass` ADD CONSTRAINT `resetpass_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resetpass` ADD CONSTRAINT `resetpass_ibfk_2` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sign_persons` ADD CONSTRAINT `sign_persons_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`institution`) REFERENCES `institutions`(`institution_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_position_fkey` FOREIGN KEY (`position`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_position_lv_fkey` FOREIGN KEY (`position_lv`) REFERENCES `position_lvs`(`position_lv_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_eposition_fkey` FOREIGN KEY (`eposition`) REFERENCES `epositions`(`eposition_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
