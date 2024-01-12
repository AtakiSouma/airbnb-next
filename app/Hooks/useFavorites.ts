import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorites = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorites = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try{
        let request;
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        }else{
          request = () => axios.post(`/api/favorites/${listingId}`) ;
        }
        await request(); 
        router.refresh();
        toast.success("Success")
      }catch(error){
        toast.error("Some thing went wrong!")
      }

    },
    [

        currentUser,
        hasFavorite,
        listingId,
        loginModal,
        router
    ]
  );
  return {
    hasFavorite , 
    toggleFavorites,
  }
};
export default useFavorites;
