import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const employes = await prisma.employes.findMany();
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
    const { title, auteur } = await request.json();

    //creation d'un nouvelle citation

    const newCitation = await prisma.employes.create({
      data: { title, auteur },
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
