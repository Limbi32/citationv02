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
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 text-center">
      <div>{data && data.title}</div>
      <div className="text-right">{data && data.auteur}</div>
    </div>
  );
}
