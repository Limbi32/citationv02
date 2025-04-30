"use client";
import Tooltip from "./Tooltips/Tooltips";
import { FaCopy } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
export function Copy({
  copierDansPressePapier,
  iscopy,
  setIscopy,
}: {
  copierDansPressePapier: () => void;
  iscopy: boolean;
  setIscopy: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setIscopy(false);
  return (
    <Tooltip text="Copier">
      <button
        className=" hover:text-violet-600 dark:hover:text-violet-400"
        onClick={copierDansPressePapier}
      >
        {iscopy ? <FaRegCopy /> : <FaCopy />}
      </button>
    </Tooltip>
  );
}
