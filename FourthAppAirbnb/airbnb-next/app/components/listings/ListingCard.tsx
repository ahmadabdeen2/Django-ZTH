"use client";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  listing: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const { getByValue } = useCountries();
  const router = useRouter();
  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    // return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')})}`
    return `${format(start, "PP")} - ${format(end, "PP")})}`;
  }, [reservation]);
  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
aspect-square
w-full
relative
overflow-hidden
rounded-xl
"
        >
          <Image
            src={listing.imageSrc}
            className="object-cover h-full w-full group-hover:brightness-90 transition-all"
            fill
            alt={listing.title}
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-regular text-sm">{location?.label}</div>
        <div className="font-light text-neutral-500 ">
          {reservationDate?.slice(0,27) || listing.category}
        </div>
        <div className="font-light">
          {listing?.title}
        </div>
        <div className="flex flex-row items-center gap-[0.25rem]">
          <div className="font-regular ">${price}</div>
          {!reservation && (
            <div className='font-extralight'>
                per night
            </div>
          )}
        </div>
        {onAction && actionLabel && (
            <Button
            disabled={disabled}
            onClick={handleCancel}
            small
            label={actionLabel}
            />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
