-- DropIndex
DROP INDEX `Cart_cartId_key` ON `cart`;

-- DropIndex
DROP INDEX `CartProduct_cartProductId_key` ON `cartproduct`;

-- DropIndex
DROP INDEX `Product_productId_key` ON `product`;

-- DropIndex
DROP INDEX `Purchase_purchaseId_key` ON `purchase`;

-- DropIndex
DROP INDEX `User_userId_key` ON `user`;

-- CreateTable
CREATE TABLE `Favorite` (
    `favoriteId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`favoriteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
