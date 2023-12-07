/*
  Warnings:

  - You are about to drop the column `cartCartId` on the `cartproduct` table. All the data in the column will be lost.
  - You are about to drop the column `productProductId` on the `cartproduct` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartproduct` DROP FOREIGN KEY `CartProduct_cartCartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartproduct` DROP FOREIGN KEY `CartProduct_productProductId_fkey`;

-- AlterTable
ALTER TABLE `cartproduct` DROP COLUMN `cartCartId`,
    DROP COLUMN `productProductId`,
    ADD COLUMN `cartId` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;
