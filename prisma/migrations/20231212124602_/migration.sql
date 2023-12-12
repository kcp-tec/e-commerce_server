/*
  Warnings:

  - You are about to drop the column `cardId` on the `purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_cardId_fkey`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `cartStatus` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `cardId`,
    ADD COLUMN `cartId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Purchase_cartId_key` ON `Purchase`(`cartId`);

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;
