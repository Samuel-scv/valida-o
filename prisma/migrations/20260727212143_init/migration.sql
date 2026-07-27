/*
  Warnings:

  - Added the required column `criado_por` to the `convidados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `convidados` ADD COLUMN `criado_por` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `convidados` ADD CONSTRAINT `convidados_criado_por_fkey` FOREIGN KEY (`criado_por`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
