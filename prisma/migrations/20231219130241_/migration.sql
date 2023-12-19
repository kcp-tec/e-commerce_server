/*
  Warnings:

  - You are about to drop the column `mainAdress` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `mainAdress`,
    ADD COLUMN `mainAddress` BOOLEAN NOT NULL DEFAULT false;
