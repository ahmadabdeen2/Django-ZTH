"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import Map from "../Map";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  console.log(category);
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };
  const onBack = () => {
    setStep((step) => step - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
        toast.success('Listing created successfully');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();

    })
    .catch(() => {
        toast.error('Something went wrong');
    })
    .finally(()=>{
        setIsLoading(false)
    })

  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create Listing";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return "Cancel";
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which category does your listing fall under?"
        subtitle="You can always change this later."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item, index) => {
          return (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                icon={item.icon}
                label={item.label}
                selected={category === item.label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your listing located?"
          subtitle="You can always change this later."
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your location"
          subtitle="You can always change this later."
        />
        <Counter
          title="How many guests can your listing accommodate?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="How many rooms does your listing have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        
        <Counter
          title="How many bathrooms does your listing have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Add photos of your listing"
                subtitle="You can always change this later."
            />
            <ImageUpload
            onChange={(value) => setCustomValue("imageSrc", value)}
            value={imageSrc}
            />

            </div>
    )
  }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Describe your listing"
                    subtitle="You can always change this later."
                />
                <Input
                id="title"
                label="Title"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
                />
                 <Input
                id="description"
                label="Description"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
                />
                </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Set your price per night"
                    subtitle="You can always change this later."
                />
                <Input 
                id="price"
                label="Price"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
                formatPrice={true}
                />
                </div>
        )
    }



  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
