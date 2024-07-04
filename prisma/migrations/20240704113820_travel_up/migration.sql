/*
  Warnings:

  - Made the column `reason` on table `travels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "travels" ALTER COLUMN "reason" SET NOT NULL;
