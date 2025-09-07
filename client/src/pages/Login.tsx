import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { auth, useAuthStore } from "@/store/authStore";

import { useNavigate } from "@tanstack/react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, loading, navigate]);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Error de inicio de sesión de Google:", error);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Bienvenido al Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">Inicia sesión para comenzar.</p>
          <Button onClick={handleSignIn}>Iniciar Sesión con Google</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
