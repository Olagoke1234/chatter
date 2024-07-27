import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any; // This allows for additional props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
