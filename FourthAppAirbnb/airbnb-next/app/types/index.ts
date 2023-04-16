import { Account, Listing, Reservation, User } from "@prisma/client";

type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified">  
& {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | undefined | null;
}

// write safe user without Omit

type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
}








export type { SafeUser, SafeListing}