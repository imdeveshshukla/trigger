/*
  Warnings:

  - Added the required column `params` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "params" JSONB NOT NULL;
