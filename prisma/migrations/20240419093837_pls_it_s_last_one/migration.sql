/*
  Warnings:

  - You are about to drop the column `server_id` on the `employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_server_id_fkey";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "server_id",
ADD COLUMN     "serverId" INTEGER;

-- CreateTable
CREATE TABLE "server_emp" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,

    CONSTRAINT "server_emp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_emp" ADD CONSTRAINT "server_emp_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_emp" ADD CONSTRAINT "server_emp_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
