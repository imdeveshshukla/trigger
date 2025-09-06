/*
  Warnings:

  - You are about to drop the `Zap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRunOutbox` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_userId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapRunId_fkey";

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Zap";

-- DropTable
DROP TABLE "ZapRun";

-- DropTable
DROP TABLE "ZapRunOutbox";

-- CreateTable
CREATE TABLE "Running" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Running_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunningOutbox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "RunningOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RunningOutbox_zapRunId_key" ON "RunningOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Running" ADD CONSTRAINT "Running_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunningOutbox" ADD CONSTRAINT "RunningOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "Running"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
