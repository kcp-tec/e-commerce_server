/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartProductId]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purchaseId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `totalValue` DECIMAL(9, 2) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_cartId_key` ON `Cart`(`cartId`);

-- CreateIndex
CREATE UNIQUE INDEX `Cart_userId_key` ON `Cart`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `CartProduct_cartProductId_key` ON `CartProduct`(`cartProductId`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_productId_key` ON `Product`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `Purchase_purchaseId_key` ON `Purchase`(`purchaseId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userId_key` ON `User`(`userId`);
