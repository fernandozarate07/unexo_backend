/*
  Warnings:

  - You are about to drop the column `reason` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - Added the required column `reasonId` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_phone_key` ON `user`;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `reason`,
    ADD COLUMN `reasonId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `phone`,
    MODIFY `role` ENUM('user', 'moderator', 'admin') NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `reportReason` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `reportReason_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_reasonId_fkey` FOREIGN KEY (`reasonId`) REFERENCES `reportReason`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
