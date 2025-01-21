import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowLeft, Save, User } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "Nombre must be at least 2 characters.",
    }),
    segundoNombre: z.string().min(2, {
        message: "Segundo Nombre must be at least 2 characters.",
    }),
    apellido: z.string().min(2, {
        message: "Apellido must be at least 2 characters.",
    }),
    segundoApellido: z.string().min(2, {
        message: "Segundo Apellido must be at least 2 characters.",
    }),
    rut: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
    correo: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
    tipo: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
    cargo: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
    repassword: z.string().min(2, {
        message: "RUT must be at least 2 characters.",
    }),
})

const users = [
    {
        id: 1,
        nombre: "Jim Vásquez",
        rut: "18014220",
        correo: "jvasquezc@pjud.cl",
        cargo: "Administrativo Informático",
    },
    {
        id: 2,
        nombre: "Fernando Fabricio Vásquez Campusano",
        rut: "18014220",
        correo: "jvasquezc@pjud.cl",
        cargo: "Administrativo Informático",
    }
]

export default function Users() {
    const [selection, setSelection] = useState('selection');
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            segundoNombre: "",
            apellido: "",
            segundoApellido: "",
            rut: "",
            correo: "",
            tipo: "",
            cargo: "",
            password: "",
            repassword: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="h-full mx-12 md:mx-36">

            {selection === 'selection' &&
                <div className="space-y-6">
                    <div className="flex flex-wrap justify-center gap-6">
                        <Card onClick={() => setSelection('new')} className="cursor-pointer">
                            <CardHeader>
                                <CardTitle>Nuevo Usuario</CardTitle>
                                <CardDescription>Agregar nuevo Usuario al sistema</CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Nuevo Usuario</CardTitle>
                                <CardDescription>Rellena los campos del formulario</CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>

                        {/*<Card>
                            <CardHeader>
                                <CardTitle>Nuevo Usuario</CardTitle>
                                <CardDescription>Rellena los campos del formulario</CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>*/}
                    </div>

                    <div>
                        <Table>
                            <TableCaption>Lista de registros recientes.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Nombre</TableHead>
                                    <TableHead>RUT</TableHead>
                                    <TableHead>Correo</TableHead>
                                    <TableHead className="text-right">Cargo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.nombre}</TableCell>
                                        <TableCell className="">{user.rut}</TableCell>
                                        <TableCell>{user.correo}</TableCell>
                                        <TableCell className="text-right">{user.cargo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/*
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter>
                            */}
                        </Table>
                    </div>
                </div>
            }

            {selection === 'new' &&
                <Card>
                    <CardHeader>
                        <CardTitle>Nuevo Usuario</CardTitle>
                        <CardDescription>Rellena los campos del formulario</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="flex w-full gap-6">
                                    <FormField control={form.control} name="nombre" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="segundoNombre" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Segundo Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>

                                <div className="flex w-full gap-6">
                                    <FormField control={form.control} name="apellido" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="segundoApellido" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Segundo Apellido</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>

                                <div className="flex w-full gap-6">
                                    <FormField control={form.control} name="rut" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>RUT</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="correo" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>

                                <div className="flex w-full gap-6">
                                    <FormField control={form.control} name="cargo" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Cargo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

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
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="repassword" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Repetir Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>

                                <div className="space-x-2">
                                    <Button type="submit"><Save /> Guardar</Button>
                                    <Button type="submit" onClick={() => setSelection('selection')}><ArrowLeft /> Volver</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            }

            {
                <div className="w-full">

                </div>
            }

        </div>
    )
}