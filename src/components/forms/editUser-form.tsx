import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import FormInput from "../FormInput"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import editUserSchema from "@/schemas/editUserSchema"
import { User } from "@/types/User"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { userRepository } from "@/repositories/userRepository"
import { toast } from "sonner"

export default function EditUserForm({ children, fetchUsers, user }: { children: React.ReactNode, fetchUsers: () => void, user: User }){
    const form = useForm<z.infer<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            nombre: user.name, segundoNombre: user.secondName, apellido: user.lastName, segundoApellido: user.surName, rut: user.rut,
            correo: user.email, tipo: user.type, cargo: user.cargo, contrasena: "", recontrasena: ""
        },
    })

    async function onSubmit(values: z.infer<typeof editUserSchema>) {
        try {
            await userRepository.updateUser(user.rut, values)
            toast("✅ Usuario actualizado", {
                description: "El usuario ha sido actualizado correctamente.",
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
            //form.reset()
            fetchUsers();
        } catch (error) {
            toast("❌ Error", {
                description: `${error}`,
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
        }
    }

    return(
        <Card>
        <CardHeader>
            <CardTitle>Editar Usuario</CardTitle>
            <CardDescription>Rellena los campos del formulario</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex w-full gap-6">
                        <FormInput form={form} type="text" name="nombre" />
                        <FormInput form={form} type="text" name="segundoNombre" />
                    </div>

                    <div className="flex w-full gap-6">
                        <FormInput form={form} type="text" name="apellido" />
                        <FormInput form={form} type="text" name="segundoApellido" />
                    </div>

                    <div className="flex w-full gap-6">
                        <FormInput form={form} type="text" name="rut" />
                        <FormInput form={form} type="email" name="correo" />
                    </div>

                    <div className="flex w-full gap-6">
                        <FormInput form={form} type="text" name="cargo" />

                        <FormField control={form.control} name="tipo" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Roles de Usuario</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Administrador</SelectItem>
                                        <SelectItem value="USER">Usuario</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="flex w-full gap-6">
                        <FormInput form={form} type="password" name="contrasena" />
                        <FormInput form={form} type="password" name="recontrasena" />
                    </div>

                    <div className="space-x-2">
                        <Button type="submit"><Save /> Guardar</Button>
                        {children}
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
    )
}