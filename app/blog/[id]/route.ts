import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const employes = await prisma.employes.findFirst({
      where: {
        id: parseInt((await params).id),
      },
    });
    return NextResponse.json(employes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failde to fetch employé" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const deletedEmploye = await prisma.employes.delete({
      where: {
        id: parseInt((await params).id),
      },
    });
    return NextResponse.json(deletedEmploye, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete employé" },
      { status: 500 }
    );
  }
}