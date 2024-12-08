import React from "react";
import { articles } from "@/app/blog/data";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const article: {
    id: number;
    title: string;
    auteur: string;
  } = articles.find((article) => article.id === parseInt(params.id));

  return (
    <div className="bg-slate-200 m-8">
      <div className="p-8 text-center">
        <div>{article.title}</div>
        <div className="text-right">{article.auteur}</div>
      </div>
    </div>
  );
}
