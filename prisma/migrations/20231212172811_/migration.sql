/*
  Warnings:

  - You are about to drop the column `userId` on the `purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_userId_fkey`;

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `userId`;
