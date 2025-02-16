import {NextResponse} from 'next/server'
import { connectToDatabase } from '@/lib/database'
import Products from '@/lib/models/car.model'



export async function GET (){
    await connectToDatabase()

    try {
        const products = await Products.find();

        return NextResponse.json({ contents:products},{status:200});

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({error:'Failled to fecth product'})
        
    }
}