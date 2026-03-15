-- AlterTable: add optional teamId to SimpleTask (assign task to a team)
ALTER TABLE `SimpleTask` ADD COLUMN `teamId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `SimpleTask` ADD CONSTRAINT `SimpleTask_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
