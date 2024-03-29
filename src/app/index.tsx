import ReactDOM from "react-dom/client";
import React from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router.tsx";
import {Provider} from "react-redux";
import {store} from "@/app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)