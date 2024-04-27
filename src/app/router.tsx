import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";
import ProtectedLayout from "@/app/layouts/protected-layout/protected-layout.tsx";
import {DeveloperPage} from "@/pages/developer";
import {MainPage} from "@/pages/main";
import {ErrorPage} from "@/pages/error";
import {SignInPage} from "@/pages/sign-in";
import {SignUpPage} from "@/pages/sign-up";
import {LawmakersPage} from "@/pages/lawmakers"
import {PrivacyPolicyPage} from "@/pages/privacy-policy";
import {PlayerPage} from "@/pages/player";

export const router = createBrowserRouter([
  {
    element: <BaseLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <MainPage/>
      },
      {
        path: "/content/:contentType?",
        element: <MainPage/>
      },
      {
        path: "/content/:contentType/:contentId/",
        element: <PlayerPage/>
      },
      {
        path: "/dev",
        element: <DeveloperPage/>
      },
      {
        path: "/login",
        element: <SignInPage/>
      },
      {
        path: "/register",
        element: <SignUpPage/>
      },
      {
        path: "/lawmakers",
        element: <LawmakersPage/>
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage/>
      },
      {
        element: <ProtectedLayout requiredRoles={["User", "Admin"]}/>,
        children: [
          {
            path: "/auth",
            element: <div>Auth</div>,
          }
        ]
      },
      {
        element: <ProtectedLayout requiredRoles={["Admin"]}/>,
        children: [
          {
            path: "/admin",
            element: <div>Admin</div>,
          }
        ]
      }
    ],
  }
])

