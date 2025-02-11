"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { PiSignInLight } from "react-icons/pi";
import { IoLogIn } from "react-icons/io5";
import jwt from "jsonwebtoken";

type HeaderProps = {
  handleshow: () => void;
  token: string | null;
};

export default function Header({ handleshow, token }: HeaderProps) {
  const router = useRouter();

  const [isopen, setIsopen] = useState(true);
  const [visible, setVisible] = useState(true);

  const decoded: {
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null = token
    ? (jwt.decode(token) as {
        id: string;
        email: string;
        password: string;
        exp: number;
      })
    : null;

  useEffect(() => {
    if (token) {
      try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }

        //Vérifier si le token est valide en vérifiant son expiration

        if (decoded) {
          // Vérifier si le token est
          console.log("decode " + decoded);
          const isExpired = Date.now() / 1000 > decoded.exp;
          if (isExpired) {
            setVisible(false);
            setIsopen(true);
          } else {
            setVisible(true);
            setIsopen(false);
          }
        } else {
          console.log("Invalid token");
          alert("Invalid token");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("token don't exist ");
    }
  }, [token, decoded]);

  const handlesend = () => {
    router.push("/Create");
  };
  const handleinscription = () => {
    router.push("/Inscription");
  };

  const handlelogin = () => {
    router.push("/Login");
  };

  return (
    <div className="bg-zinc-600 text-slate-300 flex justify-between p-6">
      <h1 className="text-left text-fuchsia-50">Citation App</h1>
      <div className="flex gap-5 ">
        <button
          className="bg-zinc-500 p-2 flex flex-col items-center gap-2 rounded-xl shadow-2xl focus:ring-2 hover:bg-slate-600  text-sm"
          onClick={handlesend}
        >
          <MdCreateNewFolder style={{ fontSize: "15px" }} />
          <div className="text-xs">Creer</div>
        </button>

        <button
          className={` ${
            isopen
              ? "bg-zinc-500 p-2 rounded-xl flex flex-col  justify-center items-center shadow-2xl focus:ring-2 hover:bg-slate-600  text-sm"
              : "hidden"
          }`}
          onClick={handleinscription}
        >
          <PiSignInLight style={{ fontSize: "25px" }} />
          <div className="text-xs">Inscription</div>
        </button>

        <button
          className={` ${
            visible
              ? "bg-zinc-500 p-2 rounded-xl shadow-2xl focus:ring-2 hover:bg-slate-600  text-sm"
              : "hidden"
          }`}
          onClick={handleshow}
        >
          <RxAvatar style={{ fontSize: "25px" }} />
        </button>

        <button
          className={` ${
            isopen
              ? "bg-zinc-500 p-2 rounded-xl flex flex-col  justify-center items-center shadow-2xl focus:ring-2 hover:bg-slate-600  text-sm"
              : "hidden"
          }`}
          onClick={handlelogin}
        >
          <IoLogIn style={{ fontSize: "25px" }} />
          <div className="text-xs">Login</div>
        </button>
      </div>
    </div>
  );
}
