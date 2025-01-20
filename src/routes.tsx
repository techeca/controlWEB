import { Navigate } from "react-router-dom";
import Layout from "./layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";

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
                path: 'dashboard',
                element: <ProtectedRoute element={<Dashboard />} />
            },
            {
                path: 'users',
                element: <ProtectedRoute element={<Users />} />
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