import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(params.id) },
    });
    if (!note)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const DELETE = async (request: Request, { params }: Params) => {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deletedNote);
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Note not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const PUT = (request: Request) => {
  return NextResponse.json({
    message: "updating single note...",
  });
};
