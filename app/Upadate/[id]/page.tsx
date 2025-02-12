
import React from "react";
import FormUpdate from '../../Components/FormUpdate';

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
    <div className="w-full">
      <FormUpdate id={(await params).id}/>

    </div>
  );
}
