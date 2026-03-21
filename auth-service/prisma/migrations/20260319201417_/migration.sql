-- AlterTable
ALTER TABLE `Profile` MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `genero` ENUM('sem_preferencia', 'femenino', 'masculino') NULL DEFAULT 'sem_preferencia';
