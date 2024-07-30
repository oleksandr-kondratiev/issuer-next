-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `lastVisited` TIMESTAMP NULL;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Issue_assignedUserId_idx` ON `Issue`(`assignedUserId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
