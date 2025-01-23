import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { userRepository } from "@/repositories/userRepository"
import { Button } from "../ui/button"
import { Save } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import newUserSchema from "@/schemas/newUserSchema"
import FormInput from "../FormInput"

export default function NewUserForm({ children, fetchUsers }: { children: React.ReactNode, fetchUsers: () => void }) {
    const form = useForm<z.infer<typeof newUserSchema>>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            nombre: "", segundoNombre: "", apellido: "", segundoApellido: "", rut: "",
            correo: "", tipo: "USER", cargo: "", contrasena: "", recontrasena: ""
        },
    })

    async function onSubmit(values: z.infer<typeof newUserSchema>) {
        try {
            await userRepository.createUser(values)
            toast("✅ Usuario creado", {
                description: "El usuario ha sido creado correctamente.",
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
            form.reset()
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nuevo Usuario</CardTitle>
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