import { User } from "@prisma/client"; // ili gde ti je tip user

declare module "express-serve-static-core" {
  interface Request {
    userData: User; // dodaj ovde svoj tip korisnika ili 'any' ako nemaš tip
  }
}
