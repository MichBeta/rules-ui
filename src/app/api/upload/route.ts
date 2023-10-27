import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const formData = await req.formData();
        const file = formData.get('file');
        const url = "https://rules-service.tkg-rms-dev.usdc01.solera.farm/api/import/zip";
        const orgId = req.cookies.get('credentials')!.value.split('|')[2];
        const response = await axios.post(url, file, {
            headers: {},
            params: {
                orgId: orgId
            },
        });
        return NextResponse.json(response.data, {status: 200});
    }catch (e) {
        console.log(e)
        return NextResponse.json(e, {status: 400});
    }
}