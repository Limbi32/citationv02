import React from "react";

// const getData = async (id: string) => {
//   const res = await fetch("http://localhost:3000/blog/" + id);
//   const data = await res.json();
//   return data;
// };
export default async function page({ params }: { params: { id: string } }) {
  // const article = await getData(params.id);
  // console.log(article);

  return (
    <div className="bg-slate-200 m-8">
      <div className="p-8 text-center">
        <div>{params.id}</div>
        <div className="text-right">{params.id}</div>
      </div>
    </div>
  );
}
