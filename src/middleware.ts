import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const PUBLIC_PATHS = ["/", "/recover-access", "/notice", "/posts"] 

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl

    if (!req.nextauth.token) {
       // Permitir acesso às rotas públicas
      if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next()
      }
      // Caso contrário, redireciona para "/"
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    }
  }
)

export const config = {
  matcher: ["/((?!^$|api|_next/static|_next/image|favicon.ico).*)"],
}




// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   function middleware(req) {
//     // If not authenticated, redirect to "/"
//     if (!req.nextauth.token) {
//       return NextResponse.redirect(new URL("/", req.url))
//     }
//     return NextResponse.next()
//   },
//   {
//     pages: {
//       signIn: "/", // Optional — fallback for redirect
//     },
//   }
// )

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }

// import { withAuth } from "next-auth/middleware"

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       return !!token
//     },
//   },
//   pages: {
//     signIn: "/", // redireciona para "/" se não logado
//   },
// })

// export const config = {
//   matcher: ["/((?!$|api|_next/static|_next/image|favicon.ico).*)"],
// }
