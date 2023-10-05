-- CreateTable
CREATE TABLE "Target" (
    "domain" TEXT,
    "externalIp" TEXT NOT NULL,
    "url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Target_domain_key" ON "Target"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Target_externalIp_key" ON "Target"("externalIp");
