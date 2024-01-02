import { signIn } from "@/actions";
import { Button } from "@nextui-org/react";
import React from "react";
import Logo from '@/../public/assets/logo.png'
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      <div className="flex">
        <center className="w-80 h-90 flex flex-col items-center justify-center border-r-1 border-gray-100">
        <h3 className="text-3xl font-extrabold my-6">Call Sentiment Analysis - SSO</h3>
        <hr/>
          <form action={signIn}>
            <Button size="lg"  type="submit" variant="solid" color="primary">
              <span className="bg-white p-1 rounded-xl shadow-md"><FcGoogle/></span> Signin With Google
            </Button>
          </form>
        </center>
        <center className="w-80 border-l-1 h-90 border-gray-100">
            <Image src={Logo} alt="Logo" width={1000} height={300} />
        </center>
      </div>
    </div>
  );
}
