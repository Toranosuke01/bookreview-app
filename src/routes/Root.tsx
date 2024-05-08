import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { LogIn } from "../pages/LogIn";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../types/types";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const Root = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={
          <Home />
        } />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return router;
};


export default Root;
