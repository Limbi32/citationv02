import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const employes = await prisma.post.findFirst({
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
    const deletedEmploye = await prisma.post.delete({
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { data } = await request.json();

    const updateemploye = await prisma.post.update({
      where: { id: parseInt((await params).id) },
      data,
    });

    return NextResponse.json(updateemploye, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to update citation" },
      { status: 500 }
    );
  }
}
