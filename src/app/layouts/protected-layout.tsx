import {FC, useMemo} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {UserRoles} from "@/entities/user";
import {useAppSelector} from "@/shared/hooks/use-app-selector.ts";
import {jwtDecoder} from "@/shared/helpers/jwt-decoder.ts";


interface IPros {
  requiredRoles: UserRoles[];
}

const ProtectedLayout: FC<IPros> = ({requiredRoles}) => {
  const {user} = useAppSelector(state => state.user);

  const jwtPayload = useMemo(() => {
    if (!user)
      return undefined;

    return jwtDecoder(user.jwtToken);
  }, [user]);

  if (!user || !jwtPayload)
    return <Navigate to="/login" replace/>

  if (!requiredRoles.includes(jwtPayload.role))
    return <Navigate to="/forbidden" replace/>

  return <Outlet/>;
};

export default ProtectedLayout;