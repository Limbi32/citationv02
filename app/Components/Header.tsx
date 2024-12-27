"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handlesend = () => {
    router.push("/Create");
  };
  const handlelogin = () => {
    router.push("/Login");
  };
  return (
    <div className="bg-slate-500 text-slate-300 flex justify-between p-6">
      <h1 className="text-left text-fuchsia-50">Citation App</h1>
<div className="flex gap-8">
  
<button
        className="bg-slate-900 p-2 rounded-md  hover:bg-slate-600"
        onClick={handlesend}
        
      >
        Creer Une Citation
      </button>
     
      <button className="bg-slate-900 p-2 rounded-md  hover:bg-slate-600"  onClick={handlelogin}>  
        Login
      </button>
</div>
    </div>
  );
}
