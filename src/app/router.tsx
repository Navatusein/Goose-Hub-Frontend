import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "@/app/layouts/base-layout.tsx";
import ProtectedLayout from "@/app/layouts/protected-layout.tsx";

export const router = createBrowserRouter([
  {
    element: <BaseLayout/>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <div>Main</div>
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
      }
    ],
  }
])

