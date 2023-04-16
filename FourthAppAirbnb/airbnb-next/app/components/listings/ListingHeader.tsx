"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading title={title} subtitle={`${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
    <Image
    src={imageSrc}
    fill
    alt = {title}
    className="object-cover  w-full"
    />

    <div className="absolute top-5 right-5">
        <HeartButton
            listingId={id}
            currentUser={currentUser}
        />
    </div>



      </div>
    </>
  );
};

export default ListingHeader;
