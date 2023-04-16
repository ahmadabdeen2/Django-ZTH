import EmptyState from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Please login to view your favorites"
        />
      </ClientOnly>
    );
  }

  ;

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no favorites"
          subtitle="Favorite listings to see them here"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
    <FavoritesClient
    listings={listings}
    currentUser={currentUser}

    />
    </ClientOnly>
  );
};


export default FavoritesPage;