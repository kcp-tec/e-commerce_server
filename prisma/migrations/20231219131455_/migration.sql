/*
  Warnings:

  - You are about to drop the column `Phone` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Phone`,
    ADD COLUMN `phone` CHAR(11) NULL;
