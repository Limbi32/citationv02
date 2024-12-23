import { Contenu1 } from "@/app/Components/Contenu1";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

// const getData = async (id: string) => {
//   const res = await fetch("" + apiUrl + "/blog/" + id);
//   const data = await res.json();
//   return data;
// };
export default async function page({ params }: Props) {
  return (
    <div className=" m-8">
      <Contenu1 id={(await params).id} />
    </div>
  );
}
