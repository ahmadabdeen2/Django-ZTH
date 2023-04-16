"use client";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import {  SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser: SafeUser | null | undefined;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser){
      return loginModal.onOpen();
    }

    rentModal.onOpen();
    

  },[currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-light py-3 px-4 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-500 cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition-all"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Log In" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => router.push('/trips')} label="Trips" />
                <MenuItem onClick={() => router.push('/favorites')} label="Favorites" />
                <MenuItem onClick={() => {}} label="Properties" />
                <MenuItem onClick={() => router.push('/reservations')} label="Reservations" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
