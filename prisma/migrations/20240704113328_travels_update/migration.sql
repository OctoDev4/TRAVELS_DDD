/*
  Warnings:

  - Made the column `endDate` on table `travels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalExpenses` on table `travels` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADM', 'MEMBER');

-- AlterTable
ALTER TABLE "travels" ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "totalExpenses" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_role" "userRole" NOT NULL DEFAULT 'MEMBER';
