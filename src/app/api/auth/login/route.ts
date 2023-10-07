import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import axios from "axios";

type credentials = {
    username: string,
    password: string,
    grant_type: string,
    client_id: string,
    scope: string,
    client_secret: string
}

type Role = {
    role_type: string
}

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const {username, password, grant_type, client_id, scope, client_secret}:credentials = await req.json();
        const roleUrl = `https://rules-service.tkg-rms-dev.usdc01.solera.farm/api/ngp/user/ExactUid/${username}`;
        const roleResponse = await axios.get(roleUrl);
        var roles:any[] = [];
        roleResponse.data.userRoles.forEach((role:Role) => {
            roles.push(role.role_type);
        });
        if(roles.includes('Administrator')){
            cookies().set('credentials', roles+"|"+username);
            const url = "https://dispatch-login-dev.tkg-rms-dev.usdc01.solera.farm/connect/token";
            const response = await axios.post(url, new URLSearchParams({
                username,
                password,
                grant_type,
                client_id,
                scope,
                client_secret
            }).toString());
            const token = response.data.access_token;
            cookies().set('token', token,{
                httpOnly:true,
                sameSite:'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: response.data.expires_in,
                path:'/'
            });
            return NextResponse.json("login successfully", {status: 200});
        } else {
            return NextResponse.json("User role is not Administrator", {status: 400});
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json("Invalid credentials", {status: 400});
    }
}