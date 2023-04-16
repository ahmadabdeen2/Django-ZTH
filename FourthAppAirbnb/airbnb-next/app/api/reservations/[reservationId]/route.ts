import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams{
    reservationId?: string;
}

export async function DELETE(
    request:Request,
    {params}:{params: IParams}
){

    const {reservationId} = params;

    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if(!reservationId || typeof reservationId !== 'string') return NextResponse.error();

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id: reservationId,
            OR: [
            { userId: currentUser.id },
            { listing: { userId: currentUser.id } },
            ],
        }
    })

    return NextResponse.json(reservation);

    

}