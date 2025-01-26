import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { login } = useAuth();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    setError(null); // Limpia errores anteriores

    try {
      await login({ rut, password }); // Llama a la función login del contexto
      navigate("/entrada");
    } catch (e) {
      setError("El RUT o la contraseña son incorrectos."); // Muestra un error si falla el login
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Escribe tu RUT y contraseña para ingresar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  type="text"
                  placeholder="12345678"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)} // Actualiza el estado
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Recupera tu contraseña
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mensaje de error */}
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}