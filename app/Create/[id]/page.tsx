import React from "react";

const getData = async (id: number) => {
  const res = await fetch("http://localhost:3000/blog/" + id);
  const data = await res.json();
  return data;
};
export default async function page({ params }: { params: { id: number } }) {
  const article = await getData(params.id);
  console.log(article);

  return (
    <div className="bg-slate-200 m-8">
      <div className="p-8 text-center">
        <div>{article.title}</div>
        <div className="text-right">{article.auteur}</div>
      </div>
    </div>
  );
}
