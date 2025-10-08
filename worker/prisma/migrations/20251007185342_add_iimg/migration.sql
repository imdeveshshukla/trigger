/*
  Warnings:

  - Added the required column `params` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Action" ADD COLUMN     "params" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."AvailableAction" ADD COLUMN     "img" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."AvailableTrigger" ADD COLUMN     "img" TEXT NOT NULL DEFAULT '';
