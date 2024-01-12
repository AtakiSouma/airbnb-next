"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useReducer, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
import {SafeUser} from "../../types/index"
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import RentModal from "../modals/RentModal";
import useRentModal from "@/app/Hooks/useRentModal";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
     if(!currentUser){
      loginModal.onOpen();
     }
     rentModal.onOpen();
  },[ loginModal , rentModal ,currentUser])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
             absolute 
             rounded-xl 
             shadow-md
             w-[40vw]
             md:w-3/4 
             bg-white 
             overflow-hidden 
             right-0 
             top-12 
             text-sm

             "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label={"My Trips"} />
                <MenuItem onClick={() => {}} label={"My Favorites"} />
                <MenuItem onClick={() => {}} label={"My reservations"} />
                <MenuItem onClick={() => {}} label={"My properties"} />
                <MenuItem onClick={rentModal.onOpen} label={"Airbnb my Home"} />
                <hr/>
                <MenuItem onClick={() => signOut()} label={"Logout"} />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label={"Login"} />
                <MenuItem onClick={registerModal.onOpen} label={"Sign up"} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;