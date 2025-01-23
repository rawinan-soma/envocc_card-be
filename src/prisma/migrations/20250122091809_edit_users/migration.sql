/*
  Warnings:

  - You are about to drop the column `districts1` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doc_name]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file_card_name]` on the table `envocc_card_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file_name]` on the table `exp_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exp_file]` on the table `experiences_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file_name]` on the table `gov_card_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[photo]` on the table `photos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file_name]` on the table `request_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seal_pix]` on the table `seals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signature_pix]` on the table `sign_persons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `district1` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `districts1`,
    ADD COLUMN `district1` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `documents_doc_name_key` ON `documents`(`doc_name`);

-- CreateIndex
CREATE UNIQUE INDEX `envocc_card_files_file_card_name_key` ON `envocc_card_files`(`file_card_name`);

-- CreateIndex
CREATE UNIQUE INDEX `exp_files_file_name_key` ON `exp_files`(`file_name`);

-- CreateIndex
CREATE UNIQUE INDEX `experiences_files_exp_file_key` ON `experiences_files`(`exp_file`);

-- CreateIndex
CREATE UNIQUE INDEX `gov_card_files_file_name_key` ON `gov_card_files`(`file_name`);

-- CreateIndex
CREATE UNIQUE INDEX `photos_photo_key` ON `photos`(`photo`);

-- CreateIndex
CREATE UNIQUE INDEX `request_files_file_name_key` ON `request_files`(`file_name`);

-- CreateIndex
CREATE UNIQUE INDEX `seals_seal_pix_key` ON `seals`(`seal_pix`);

-- CreateIndex
CREATE UNIQUE INDEX `sign_persons_signature_pix_key` ON `sign_persons`(`signature_pix`);
