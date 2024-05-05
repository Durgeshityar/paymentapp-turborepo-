/*
  Warnings:

  - You are about to drop the `App_User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" TEXT NOT NULL;

-- DropTable
DROP TABLE "App_User";

-- DropTable
DROP TABLE "Merchant";

-- DropEnum
DROP TYPE "AuthType";
