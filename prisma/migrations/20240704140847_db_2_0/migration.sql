/*
  Warnings:

  - You are about to drop the column `travelerId` on the `travels` table. All the data in the column will be lost.
  - You are about to drop the column `user_role` on the `users` table. All the data in the column will be lost.
  - Added the required column `traveler` to the `travels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_travelerId_fkey";

-- AlterTable
ALTER TABLE "travels" DROP COLUMN "travelerId",
ADD COLUMN     "traveler" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_role";

-- DropEnum
DROP TYPE "userRole";
