-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fname" VARCHAR(255) NOT NULL,
    "lname" VARCHAR(255) NOT NULL,
    "phone" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "server_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
