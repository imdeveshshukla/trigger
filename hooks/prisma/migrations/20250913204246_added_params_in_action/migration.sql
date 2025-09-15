-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "params" JSONB NOT NULL,
    "actionId" TEXT NOT NULL,
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "RunningOutbox_zapRunId_key" ON "RunningOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Running" ADD CONSTRAINT "Running_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunningOutbox" ADD CONSTRAINT "RunningOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "Running"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
