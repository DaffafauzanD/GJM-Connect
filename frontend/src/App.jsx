import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/shared/ui/layouts";
import { AuthProvider } from "./shared/application/context/AuthContext";
import { ProtectedRoute } from "@/shared/utils/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={
           <ProtectedRoute>
             <Navigate to="/dashboard/home" replace />
           </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
