import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const employes = await prisma.post.findMany();
    return NextResponse.json(employes, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failde to fetch employé" },
      { status: 500 }
    );
  }
}

//Ajouter une citation

export async function POST(request: Request) {
  try {
    const { title, auteur, user,themes } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "citation n'est pas un texte" },
        { status: 201 }
      );
    }

    //creation d'un nouvelle citation

    const newCitation = await prisma.post.create({
      data: { title, auteur, user, themes },
    });
    return NextResponse.json(newCitation, { status: 201 });
  } catch (error) {
    console.error("Failed to create citation", error);
    return NextResponse.json(
      { error: "Failed to create citation" },
      { status: 500 }
    );
  }
}
