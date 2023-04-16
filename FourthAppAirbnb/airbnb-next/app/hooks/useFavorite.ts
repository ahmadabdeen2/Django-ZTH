'use client'
import axios from "axios";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {toast } from 'react-hot-toast'
import { SafeUser } from "../types";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
  }
  
  const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const loginModal = useLoginModal();
    
    const router = useRouter();
    const hasFavorited = useMemo(() => {
        if(!currentUser) return false;
        return currentUser.favoriteIds?.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e:React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) return loginModal.onOpen();

        try{
            let request;
            if(hasFavorited){
                request = axios.delete(`/api/favorites/${listingId}`);
            } else{
                request = axios.post(`/api/favorites/${listingId}`);
            }

            const {data} = await request;
            router.refresh()
            toast.success('Favorite updated');

        } catch (error:any){
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }



    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }


}


export default useFavorite;