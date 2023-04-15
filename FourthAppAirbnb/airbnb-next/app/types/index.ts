import { Account, Listing, Reservation, User } from "@prisma/client";

type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified">  
& {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | undefined;
}

// write safe user without Omit








export type { SafeUser}