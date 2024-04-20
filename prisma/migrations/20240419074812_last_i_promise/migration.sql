/*
  Warnings:

  - Added the required column `age` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "profession" AS ENUM ('DataAnalyst', 'IT', 'Programmer', 'ProductManager', 'ProjectManager', 'SecurityEngineer', 'SoftwareArchitect', 'SoftwareEngineer', 'Tester', 'SystemsAnalyst');

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "profession" "profession" NOT NULL;
