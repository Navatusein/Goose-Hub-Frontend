import {createBrowserRouter, Navigate} from "react-router-dom";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";
import ProtectedLayout from "@/app/layouts/protected-layout/protected-layout.tsx";
import {DeveloperPage} from "@/pages/developer";
import {MainPage} from "@/pages/main";
// import {ErrorPage} from "@/pages/error";
import DebugLayout from "@/app/layouts/debug-layout/debug-layout.tsx";

export const router = createBrowserRouter([
  {
    element: <DebugLayout/>,
    children: [
      {
        element: <BaseLayout/>,
        // errorElement: <ErrorPage/>,
        children: [
          {
            path: "/",
            element: <Navigate to="/content" replace/>
          },
          {
            path: "/content/:contentType?",
            element: <MainPage/>
          },
          {
            path: "/dev",
            element: <DeveloperPage/>
          },
          {
            path: "/login",
            element: <div>Login</div>
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
    ]
  }
])

