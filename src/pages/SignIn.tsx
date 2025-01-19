import { LoginForm } from "@/components/login-form";
import { motion } from "framer-motion";

export default function SignIn() {

    return (
        <motion.div className="w-full mt-44 max-w-sm"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <LoginForm />
        </motion.div>
    )
}