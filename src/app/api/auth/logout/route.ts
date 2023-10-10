import {NextRequest, NextResponse} from "next/server";
import {cookies} from 'next/headers'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        cookies().delete('token');
        cookies().delete('credentials');
        return NextResponse.json("logout successfully", {status: 200});
    } catch (error: any) {
        switch (error.response.status) {
            case 400:
                return NextResponse.json("unable to logout", {status: 400});
            default:
                return NextResponse.json("something went wrong", {status: 500});
        }
    }
}