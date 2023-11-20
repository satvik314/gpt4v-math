-- CreateTable
CREATE TABLE "UserButtonUsage" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserButtonUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserButtonUsage_userId_key" ON "UserButtonUsage"("userId");
