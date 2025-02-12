"use client";
import { useEffect } from "react";
import Tooltip from "./Tooltips/Tooltips";
import { AiFillLike } from "react-icons/ai";

export function Like({
  HandleLike,
  islike,
  setIslike,
  user,
}: {
  HandleLike: () => void;
  islike: boolean;
  setIslike: (isLiked: boolean) => void;
  user: {
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null;
}) {
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch("/querylikes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ param1: user.email, param2: user.id }),
        });

        const data: { isLiked: boolean } = await response.json();

        setIslike(data.isLiked);
      } else {
        console.log("user is null");
      }
      console.log(fetchData());
    };
    fetchData();
  }, [user, setIslike]);

  return (
    <Tooltip text="j'aime">
      <button
        className={`rounded-lg p-2  ${
          islike ? "text-blue-500" : "text-zinc-500"
        }`}
        onClick={HandleLike}
      >
        <AiFillLike />
      </button>
    </Tooltip>
  );
}
