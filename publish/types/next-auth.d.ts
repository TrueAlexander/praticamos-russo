import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      // image?: string | null
      
      /** Seu campo custom */
      isAdmin?: boolean
    }
  }

  interface User {
    isAdmin?: boolean
  }

  interface JWT {
    isAdmin?: boolean
  }
}
