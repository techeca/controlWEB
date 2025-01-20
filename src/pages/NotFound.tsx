import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Página no encontrada</h2>
      <p className="text-lg mb-8 text-center max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="flex space-x-4">
        <Button asChild variant="outline">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </a>
        </Button>
        <Button asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </a>
        </Button>
      </div>
    </div>
  )
}

