import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async () => {
  try {
    const notes = await prisma.note.findMany();
    console.log(notes);
    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
export const POST = async (request: Request) => {
  try {
    const { title, content } = await request.json();
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
