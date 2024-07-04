/*
  Warnings:

  - You are about to drop the column `employeeId` on the `travels` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `travels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelerId` to the `travels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_employeeId_fkey";

-- AlterTable
ALTER TABLE "travels" DROP COLUMN "employeeId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "travelerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
