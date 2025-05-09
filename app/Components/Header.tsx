"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
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
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setVisible(false);
      setIsopen(true);
    }
  }, [token, decoded]);

  const handlesend = () => {
    console.log("/creer");

    router.push("/Create");
  };

  const handlelogin = () => {
    router.push("/Login");
  };

  // const [darkMode, setDarkMode] = useState(false);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.toggle("dark");
  // };

  return (
    <div className=" bg-gray-900 shadow-lg p-5 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold text-purple-400 tracking-wide">
        📚 Citation App
      </h1>
      <div className="flex gap-3">
        <button
          className="bg-violet-600   text-sm  hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-xl transition-transform transform hover:scale-105 duration-300 shadow-md hover:shadow-lg"
          onClick={handlesend}
        >
          <MdCreateNewFolder style={{ fontSize: "15px" }} />
          <div className="text-xs">Creer</div>
        </button>

        <button
          className={` ${
            visible
              ? "bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg transition duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]"
              : "hidden"
          }`}
          onClick={handleshow}
        >
          <RxAvatar style={{ fontSize: "25px" }} />
        </button>

        <button
          className={` ${
            isopen
              ? "bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-full transition-all duration-300 animate-pulse hover:animate-none"
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
