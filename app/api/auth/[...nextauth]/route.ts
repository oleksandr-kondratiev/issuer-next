import nextAuthOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
