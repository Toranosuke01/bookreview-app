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
import { Profile } from "../pages/Profile";
import { CreateReview } from "../pages/CreateReview";
import { Review } from "../pages/Review";
import { EditReview } from "../pages/EditReview";


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
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/new" element={
          <ProtectedRoute>
            <CreateReview />
          </ProtectedRoute>
        } />
        <Route path="/detail/:reviewId" element={
          <ProtectedRoute>
            <Review />
          </ProtectedRoute>
        } />
        <Route path="/edit/:reviewId" element={
          <ProtectedRoute>
            <EditReview />
          </ProtectedRoute>
        } />
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
