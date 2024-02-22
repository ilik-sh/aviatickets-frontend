import { FC, Suspense } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem('access_token') ? (
      <Suspense fallback={<div />}>
          <div><Element /></div>
      </Suspense>
  ) : (
      <Navigate to={"/auth/login"} />
  );
};

// ======= public route ======= //
export const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />}>
      <Element />
  </Suspense>
);