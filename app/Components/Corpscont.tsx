"use client";
import { useEffect, useState } from "react";
import Contenu from "./Contenu";
import Header1 from "./Header/Header";

export function Corpscont() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token1: string | null = localStorage.getItem("token");
    setToken(token1);
  }, []);
  return (
    <div>
      <Header1 token={token} />
      <Contenu token={token} />
    </div>
  );
}
