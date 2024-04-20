import "@/shared/styles/global/index.scss"

import ReactDOM from "react-dom/client";
import React from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router.tsx";
import {Provider} from "react-redux";
import {store} from "@/app/store.ts";
import {IconContext} from "react-icons";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <IconContext.Provider value={{className: "react-icon", size: "100%"}}>
        <RouterProvider router={router}/>
      </IconContext.Provider>
    </React.StrictMode>
  </Provider>
,
)