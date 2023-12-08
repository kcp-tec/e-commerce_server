/*
  Warnings:

  - Added the required column `stars` to the `ProductComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productcomment` ADD COLUMN `comment` VARCHAR(255) NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `stars` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CommentPic` (
    `commentPicId` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NULL,
    `productCommentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentPicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentLike` (
    `commentLikeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productCommentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentPic` ADD CONSTRAINT `CommentPic_productCommentId_fkey` FOREIGN KEY (`productCommentId`) REFERENCES `ProductComment`(`productCommentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_productCommentId_fkey` FOREIGN KEY (`productCommentId`) REFERENCES `ProductComment`(`productCommentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
