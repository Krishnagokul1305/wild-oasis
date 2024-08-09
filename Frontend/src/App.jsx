import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import AppLayout from "./ui/AppLayout";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
