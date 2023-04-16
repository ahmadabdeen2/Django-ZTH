import React from 'react'
import getListingById from '@/app/actions/getListingById'
import { ClientOnly } from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import getCurrentUser from '@/app/actions/getCurrentUser'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'
interface IParams {
    listingId: string
}


const ListingPage = async ({ params } :  { params : IParams }) => {
    
    const reservations = await getReservations(params)
    const listing = await getListingById(params) 
    const currentUser = await getCurrentUser()

  if (!listing){
    return (
        <ClientOnly>
            <EmptyState
                title="Listing not found"
                subtitle="The listing you are looking for does not exist"
            />
        </ClientOnly>
    )
  }
    return (
    <ClientOnly>
        
        <ListingClient
        listing ={listing}
        currentUser={currentUser}
        reservations={reservations}
        />

        
    </ClientOnly>
  )
}

export default ListingPage