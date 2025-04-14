/*
  Warnings:

  - You are about to drop the column `contributionId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `notificationTypeId` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_contributionId_fkey`;

-- DropIndex
DROP INDEX `notification_contributionId_fkey` ON `notification`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `contributionId`,
    ADD COLUMN `notificationTypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `notificationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `notificationType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_notificationTypeId_fkey` FOREIGN KEY (`notificationTypeId`) REFERENCES `notificationType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
