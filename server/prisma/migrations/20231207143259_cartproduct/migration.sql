/*
  Warnings:

  - You are about to drop the column `amount` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_productId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `amount`,
    DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `CartProduct` (
    `cartProductId` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `productProductId` VARCHAR(191) NULL,
    `cartCartId` VARCHAR(191) NULL,

    PRIMARY KEY (`cartProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productProductId_fkey` FOREIGN KEY (`productProductId`) REFERENCES `Product`(`productId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_cartCartId_fkey` FOREIGN KEY (`cartCartId`) REFERENCES `Cart`(`cartId`) ON DELETE SET NULL ON UPDATE CASCADE;
