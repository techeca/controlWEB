import { Navigate } from "react-router-dom";
import Layout from "./layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
                index: true,
                element: <Navigate to='signIn' />
            }
        ]
    }
]

export default routes;