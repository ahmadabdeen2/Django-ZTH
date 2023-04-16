"use client";

import React, { useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";

import { useSearchParams, useRouter } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );
  const searchModal = useSearchModal();

  const onBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const onNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      onNext();
      return;
    }
    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const queryUpdated: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      queryUpdated.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      queryUpdated.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: queryUpdated,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    router,
    onNext,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading
        title = "Where are you going?"
        subtitle = "Enter a Country or select from the map"

        />
    <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
    />
    <hr/>

    <Map
    center = {location?.latlng}
    />

    </div>
  )

  if (step === STEPS.DATE){
    bodyContent = (
        <div className='flex flex-col gap-8'>
        <Heading
        title = "When are you going?"
        subtitle = "Choose dates"

        />
    <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
        />
  

  
    </div>
    )
  }

  if (step === STEPS.INFO){
    bodyContent = (
        <div className='flex flex-col gap-8'>
        <Heading
        title = "Find the place?"
        subtitle = "Add more filters if you would like"

        />
    <Counter
    title='Number of guests'
    value={guestCount}
    onChange={(value) => setGuestCount(value)}
    />
  
  <Counter
    title='Number of rooms'
    value={roomCount}
    onChange={(value) => setRoomCount(value)}
    />
  
  <Counter
    title='Number of bathrooms'
    value={bathroomCount}
    onChange={(value) => setBathroomCount(value)}
    />
  

  
    </div>
    )
  }



  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Find your next stay"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel="Back"
      body={bodyContent}
    />
  );
};

export default SearchModal;
