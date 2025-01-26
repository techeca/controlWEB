import { Navigate } from "react-router-dom";
import Layout from "./layout";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Entrada from "./pages/Entrada";
import Controls from "./pages/Controls";
import Historial from "./pages/Historial";
import Configuracion from "./pages/Configuracion";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: 'signIn',
                element: <SignIn />
            },
            {
                path: 'users',
                element: <ProtectedRoute element={<Users />} />
            },
            {
                path: 'entrada',
                element: <ProtectedRoute element={<Entrada />} />
            },
            {
                path: 'controls',
                element: <ProtectedRoute element={<Controls />} />
            },
            {
                path: 'historial',
                element: <ProtectedRoute element={<Historial />} />
            },
            {
                path: 'configuracion',
                element: <ProtectedRoute element={<Configuracion />} />
            },
            {
                index: true,
                element: <Navigate to='signIn' />
            },
            {
                path: "*",
                element: <NotFound />, // Renderiza tu componente personalizado
            },
        ]
    }
]

export default routes;