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



type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate'> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}





export type { SafeUser, SafeListing, SafeReservation}