import { User } from "@prisma/client"; // ili gde ti je tip user

declare module "express-serve-static-core" {
  interface Request {
    userData: User; // dodaj ovde svoj tip korisnika ili 'any' ako nemaš tip
    session: session.Session & Partial<session.SessionData>;
  }
}

declare module "express-session" {
  interface SessionData {
    csrfToken: string;
    userId?: string;
  }
}
