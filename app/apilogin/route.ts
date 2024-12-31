

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


//Ajouter une citation

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !=="string") {
      return NextResponse.json({error:"citation n'est pas un texte"},{status:201})
    }


     // Vérifier si l'utilisateur existe déjà
     const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log('erreur')
      return;
    }
    //creation d'un nouvelle citation

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCitation = await prisma.user.create({
      data: { email, password: hashedPassword, },
    });
    return NextResponse.json(newCitation, { status: 201 });
  } catch (error) {
    console.error("Failed to inscription", error);
    return NextResponse.json(
      { error: "Failed to inscription" },
      { status: 500 }
    );
  }
}
