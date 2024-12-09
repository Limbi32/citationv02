import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const getData = async (id: string) => {
  const res = await fetch("http://localhost:3000/blog/" + id);
  const data = await res.json();
  return data;
};
export default async function page({ params }: Props) {
  const article = await getData((await params).id);
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
