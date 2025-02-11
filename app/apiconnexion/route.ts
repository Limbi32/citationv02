import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export  async function POST(req:Request){

    const { email, password } = await req.json();
   
    const user= await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(user&& await bcrypt.compare(password,user.password)){
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '24h' });
        return NextResponse.json({ token }, { status: 200 });
    }else{
        return NextResponse.json({error:"email ou mot de passe incorrect"}, { status: 405 })
    }
}