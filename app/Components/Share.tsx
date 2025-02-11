"use client";
import Tooltip from "./Tooltips/Tooltips";
import { FaShareAlt } from "react-icons/fa";

export function Share({
  text,
  apiurl,
  user,
  setModals,
}: {
  text: string;
  apiurl: string;
  user: { id: string; email: string; password: string; exp: number } | null;
  setModals: (ismodals: boolean) => void;
}) {
  const handleShare = () => {
    console.log(apiurl);
    if (user) {
      const facebookUrl = `https://www.facebook.com/sharer?u=${encodeURIComponent(
        "http://localhost:3000/"
      )} &quote=${encodeURIComponent(text)}`;
      console.log("share " + text + " encode " + encodeURIComponent(text));

      window.open(facebookUrl, "_blank", "width=600,height=400");
    } else {
      setModals(true);
      console.log("user is null");
    }
  };
  return (
    <Tooltip text="Partager">
      <button className=" rounded-lg p-2 focus:ring-2" onClick={handleShare}>
        <FaShareAlt style={{ fontSize: "15px" }} />
      </button>
    </Tooltip>
  );
}
