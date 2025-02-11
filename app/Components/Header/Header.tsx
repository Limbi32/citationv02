"use client";
import { useState } from "react";
import Header from "../Header";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

export default function Header1({ token }: { token: string | null }) {
  const [isopen, setIsopen] = useState(false);

  const handleshow = () => {
    setIsopen(!isopen);
  };

  return (
    <div className="flex flex-col  w-full">
      <header>
        <Header handleshow={handleshow} token={token} />
      </header>
      <div
        className={` ${
          isopen
            ? "flex  flex-col  rounded-xl absolute top-24 right-0 gap-4   bg-zinc-500 p-10"
            : "hidden"
        }`}
      >
        <div className="flex  gap-4 justify-center">
          <RxAvatar style={{ fontSize: "25px" }} />
          <Link className="text-zinc-200" href="">
            Mon compte
          </Link>
        </div>

        <button
          className="bg-zinc-400 p-2 w-full
                rounded-xl shadow-2xl focus:ring-2
                 hover:bg-zinc-400/50 text-zinc-600 font-bold  text-sm"
        >
          <div className="flex  flex-col justify-center items-center gap-2">
            <div>Deconnexion</div>
          </div>
        </button>
      </div>
    </div>
  );
}
