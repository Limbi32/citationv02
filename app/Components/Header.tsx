"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handlesend = () => {
    router.push("/Create");
  };
  return (
    <div className="bg-slate-500 text-slate-300 flex justify-between p-6">
      <h1 className="text-left text-fuchsia-50">Citation App</h1>

      <button
        className="bg-slate-900 p-2 rounded-md  hover:bg-slate-600"
        onClick={handlesend}
      >
        Creer Une Citation
      </button>
    </div>
  );
}
