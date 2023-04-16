
import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUset";
export async function POST(

    request:Request,
){
    const currUser = await getCurrentUser();
    if(!currUser) return NextResponse.redirect('/login');

    const body = await request.json()
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location,
    } = body;
    // Object.keys(body.forEach((value:any) => {
    //     if(!value) return NextResponse.redirect('/listings/new');
    // }))

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            price: parseInt(price,10),
            locationValue: location.value,
            userId: currUser.id,
        }
    })

    return NextResponse.json(listing);


    
    
    

    
    
}



