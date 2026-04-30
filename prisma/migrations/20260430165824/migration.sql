/*
  Warnings:

  - You are about to alter the column `nome` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - Added the required column `senha` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_nome_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `senha` VARCHAR(60) NOT NULL,
    MODIFY `nome` VARCHAR(60) NOT NULL;

-- CreateTable
CREATE TABLE `convidados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `sobrenome` VARCHAR(60) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(60) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` ENUM('confirmado', 'Indefinido') NOT NULL DEFAULT 'Indefinido',

    UNIQUE INDEX `convidados_cpf_key`(`cpf`),
    UNIQUE INDEX `convidados_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
