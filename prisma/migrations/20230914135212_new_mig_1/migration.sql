/*
  Warnings:

  - You are about to drop the column `quantity` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "desc";
