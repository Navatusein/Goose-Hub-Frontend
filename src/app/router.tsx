import {createBrowserRouter} from "react-router-dom";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";
import ProtectedLayout from "@/app/layouts/protected-layout/protected-layout.tsx";
import {ProfileCommentsPage} from "@/pages/profile-comments";
import {ProfileHistoryPage} from "@/pages/profile-history";
import {ProfileSettingsPage} from "@/pages/profile-settings";
import {MainPage} from "@/pages/main";
import {ErrorPage} from "@/pages/error";
import {SignInPage} from "@/pages/sign-in";
import {SignUpPage} from "@/pages/sign-up";
import {LawmakersPage} from "@/pages/lawmakers"
import {PrivacyPolicyPage} from "@/pages/privacy-policy";
import {PlayerPage} from "@/pages/player";
import {ProfileWishListsPage} from "@/pages/profile-wish-lists";
import UserProfileLayout from "@/app/layouts/user-profile-layout/user-profile-layout.tsx";
import {ProfileWishListPage} from "@/pages/profile-wish-list";
import {AdminContentEditPage} from "@/pages/admin-content-edit";
import {ContactsPage} from "@/pages/contacts";
import {AdminFranchiseEdit} from "@/pages/admin-franchise-edit";

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
        path: "/content/:contentType/:contentId",
        element: <PlayerPage/>
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
        path: "/contacts",
        element: <ContactsPage/>
      },
      {
        element: <ProtectedLayout requiredRoles={["User", "Admin"]}/>,
        children: [
          {
            element: <UserProfileLayout/>,
            children: [
              {
                path: "/profile/wish-list",
                element: <ProfileWishListsPage/>
              },
              {
                path: "/profile/wish-list/:wishListId",
                element: <ProfileWishListPage/>
              },
              {
                path: "/profile/comments",
                element: <ProfileCommentsPage/>
              },
              {
                path: "/profile/history",
                element: <ProfileHistoryPage/>
              },
              {
                path: "/profile/settings",
                element: <ProfileSettingsPage/>
              }
            ]
          },
        ]
      },
      {
        element: <ProtectedLayout requiredRoles={["Admin"]}/>,
        children: [
          {
            path: "/admin/content/:contentId?",
            element: <AdminContentEditPage/>,
          },
          {
            path: "/admin/franchise/:contentId?",
            element: <AdminFranchiseEdit/>,
          }
        ]
      },
    ],
  }
])

