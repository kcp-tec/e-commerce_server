-- AlterTable
ALTER TABLE `address` ADD COLUMN `mainAdress` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product` MODIFY `productStatus` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `Phone` CHAR(11) NULL;
