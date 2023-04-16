import EmptyState from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import TripsClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Please login to view your trips"
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no properties"
          subtitle="Add a property to see it here"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
