"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import { useCallback, useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { setMaxListeners } from "events";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
       toast.error("Some thing went wrong!")
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen(); 


  }, [loginModal , registerModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to AirBnb!"
        subTitle="Create an new account"
        center
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr/>
        <Button 

        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
        />
          <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
        />
        <div className="text-neutral-500
        text-center
        mt-4
        font-light
        ">
            <div className=" justify-center flex flex-row items-center gap-2">
                 <div>
                    Already have account?
                 </div>
                 <div
                     onClick={toggle}
                 className="
             
                 text-neutral-800
                 cursor-pointer
                 hover:underline
                 ">
                    Login in now
                 </div>
            </div>

        </div>

    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
