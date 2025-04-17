import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import CreateMenu from "./pages/CreateMenu";
import EditMenu from "@/pages/EditMenu";
import AllMenu from "@/pages/AllMenu";
import Menu from "@/pages/Menu";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/PPRoutes/ProtectedRoute";
import PublicRoute from "./components/PPRoutes/PublicRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AllBlogs from "./pages/Blogs/AllBlogs";
import CreateBlog from "./pages/Blogs/CreateBlog";
import AllOffers from "./pages/Offers/AllOffers";
import CreateOffer from "./pages/Offers/CreateOffer";
import CreateCategory from "./pages/category/CreateCategory";
import AllCategory from "./pages/category/AllCategory";
import AllPopularChoices from "./pages/popularchoices/AllPopularChoices";
import CreatePopularChoice from "./pages/popularchoices/CreatePopularChoice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>

             {/* Public Routes - Only accessible if NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
          </Route>

             {/* Protected Routes - Only accessible if LOGGED IN */}
             <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Profile />} />
              <Route path="/create-category/:id?" element={<CreateCategory />} />
              <Route path="/all-category" element={<AllCategory />} />
              <Route path="/create-menu" element={<CreateMenu />} />
              <Route path="/edit-menu/:id" element={<EditMenu />} />
              <Route path="/all-menu" element={<AllMenu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/popular" element={<AllPopularChoices />} />
            <Route path="/popular/create/:id?" element={<CreatePopularChoice />} />
              <Route path="blogs" element={<AllBlogs />} />
            <Route path="blogs/create/:id?/:slug?" element={<CreateBlog />} />
            <Route path="offers" element={<AllOffers />} />
            <Route path="offers/create/:id?" element={<CreateOffer />} />
            </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
           <Toaster />
        </BrowserRouter>
  </QueryClientProvider>
);

export default App;
