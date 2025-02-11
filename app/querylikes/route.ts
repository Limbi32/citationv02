import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // Récupérer les paramètres du corps de la requête

  const {
    param1,
    param2,
  }: {
    param1: string;
    param2: string;
  } = await req.json();
  // Faire quelque chose avec les paramètres

  // Vérifier si les deux paramètres sont fournis
  if (!param1 || !param2) {
    return NextResponse.json(
      { message: "Les deux paramètres sont requis." },
      { status: 400 }
    );
  }

  // Vérifier l'utilisateur qui a jouter cette citation
  const existingUser = await prisma.user.findUnique({
    where: {
      email: param1,
    },
  });

  if (existingUser) {
    const userid = existingUser.id;
    //verifier si cette utilisateur a deja liker cette citation
    const like = await prisma.likeDislike.findFirst({
      where: {
        userId: userid,
        postId: Number(param2),
      },
    });

    //s'il a deja liker mettre jour isLiked a false
    if (like) {
      return NextResponse.json({ isLiked: false }, { status: 200 });
    } else {
      return NextResponse.json({ isLiked: true }, { status: 200 });
    }
  } else {
    return NextResponse.json(
      { message: "Utilsateur non trouvé" },
      { status: 400 }
    );
  }
}
