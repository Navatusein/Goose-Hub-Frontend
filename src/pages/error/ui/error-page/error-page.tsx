import {FC} from "react";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const ErrorPage: FC = () => {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return "Page not found";
    }
  }
};

export default ErrorPage;