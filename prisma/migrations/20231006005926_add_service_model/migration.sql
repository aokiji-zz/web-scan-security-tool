-- DropIndex
DROP INDEX "Target_externalIp_key";

-- CreateTable
CREATE TABLE "Service" (
    "port" INTEGER NOT NULL,
    "protocol" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "service" TEXT NOT NULL,
    "version" TEXT,
    "product" TEXT,
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
