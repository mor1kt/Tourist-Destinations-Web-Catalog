import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import DestinationsList from "../pages/DestinationsList";
import DestinationDetails from "../pages/DestinationDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<DestinationsList />} />
          <Route path="destinations/:id" element={<DestinationDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
