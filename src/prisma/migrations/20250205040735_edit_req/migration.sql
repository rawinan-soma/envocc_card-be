/*
  Warnings:

  - The primary key for the `requests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `requests` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`req_id`);
