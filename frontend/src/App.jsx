import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/shared/ui/layouts";
import { AuthProvider } from "./shared/application/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
