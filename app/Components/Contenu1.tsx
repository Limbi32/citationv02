"use client";

import useFetch from "../Hooks/useFetch";

// Définir un type pour les données que vous attendez de l'API
type Post = {
  id: string;
  title: string;
  auteur: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export function Contenu1({ id }: { id: string }) {
  const { data, error, loading } = useFetch<Post>("" + apiUrl + id);

  if (loading) {
    return (
      <div className="bg-slate-300 text-center p-8 font-bold text-2xl">
        Loading
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-slate-300 p-8 text-center rounded-3xl">
      <div className="">{data && data.title}</div>
      <div className="text-right font-bold">{data && data.auteur}</div>
    </div>
  );
}
