/*
  Warnings:

  - You are about to drop the column `picture` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `picture`;

-- CreateTable
CREATE TABLE `ProductPic` (
    `productPicId` VARCHAR(191) NOT NULL,
    `productPic` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`productPicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductPic` ADD CONSTRAINT `ProductPic_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
