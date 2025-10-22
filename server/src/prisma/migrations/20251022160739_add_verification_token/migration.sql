/*
  Warnings:

  - The values [user,admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ispremium` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `premiumexpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profileImagePublicId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpire` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorEnabled` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorSecret` on the `user` table. All the data in the column will be lost.
  - Made the column `updatedat` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('STARTER', 'PROFESSIONAL', 'BUSINESS');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."user" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "createdat",
DROP COLUMN "ispremium",
DROP COLUMN "premiumexpires",
DROP COLUMN "profileImage",
DROP COLUMN "profileImagePublicId",
DROP COLUMN "resetPasswordExpire",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "twoFactorEnabled",
DROP COLUMN "twoFactorSecret",
ADD COLUMN     "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isverified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'STARTER',
ADD COLUMN     "plan_expires" TIMESTAMP(6),
ADD COLUMN     "profileimage" TEXT,
ADD COLUMN     "profileimagepublicid" TEXT,
ADD COLUMN     "resetpasswordexpire" TIMESTAMP(3),
ADD COLUMN     "resetpasswordtoken" TEXT,
ADD COLUMN     "twofactorenabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twofactorsecret" TEXT,
ADD COLUMN     "verificationexpires" TIMESTAMP(3),
ADD COLUMN     "verificationtoken" TEXT,
ALTER COLUMN "updatedat" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';
