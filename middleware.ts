// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import {
//   authMiddleware,
//   clerkMiddleware,
//   createRouteMatcher,
// } from "@clerk/nextjs/server";
// import { NextRequest } from "next/server";

// // export default authMiddleware({
// //   publicRoutes: ["/", "/menu", "/contact"],
// // });
// const isProtectedRoute = createRouteMatcher(["/"]);
// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import {
  authMiddleware,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/menu", "/contact"],
// });
const isProtectedRoute = createRouteMatcher(["/"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
