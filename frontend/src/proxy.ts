import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

import { checkRole } from "./lib/role-middleware";
import { CustomRole } from "./types/api/models/CustomRole";

export default withAuth(
  async function proxy(request: NextRequest) {
    console.log("-------------------------PROXY-------------------------");
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return await checkRole(request, [CustomRole.ROLE_ADMIN])
    }

    if (request.nextUrl.pathname.startsWith("/manager")) {
      return await checkRole(request, [CustomRole.ROLE_MANAGER])
    }

    if (request.nextUrl.pathname.startsWith("/user")) {
      return await checkRole(request, [CustomRole.ROLE_USER])
    }

    return await checkRole(request, [])
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return !!token
      }
    }
  }
)

// Configure which paths should be protected
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/protected/:path*",
    "/admin/:path*",
    "/manager/:path*",
    "/user/:path*",
  ]
}
