import {FC} from "react";
import {useRouteError} from "react-router-dom";

const ErrorPage: FC = () => {
  console.error(useRouteError());

  return (
    <div>
      Error
    </div>
  );
};

export default ErrorPage;