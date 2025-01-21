import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowLeft, Save, User, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { userRepository } from "@/repositories/userRepository"

const chartData = [
    { month: "Enero", asistencias: 186, inasistencias: 80 },
    { month: "Febrero", asistencias: 305, inasistencias: 200 },
    { month: "Marzo", asistencias: 237, inasistencias: 120 },
    { month: "Abril", asistencias: 73, inasistencias: 190 },
    { month: "Mayo", asistencias: 209, inasistencias: 130 },
    { month: "Junio", asistencias: 214, inasistencias: 140 },
    { month: "Julio", asistencias: 214, inasistencias: 140 },
    { month: "Agosto", asistencias: 214, inasistencias: 140 },
    { month: "Septiembre", asistencias: 214, inasistencias: 140 },
    { month: "Octubre", asistencias: 214, inasistencias: 140 },
    { month: "Noviembre", asistencias: 214, inasistencias: 140 },
    { month: "Diciembre", asistencias: 214, inasistencias: 140 },
]
const chartConfig = {
    asistencias: {
        label: "Asistencia",
        color: "hsl(var(--chart-1))",
    },
    inasistencias: {
        label: "Inasistencia",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const tiposPermitidos = ["ADMIN", "USER"] as const;

// Expresión regular para validar mayúsculas, números y signos especiales
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }).max(16, {
        message: "El nombre debe tener como máximo 16 caracteres.",
    }),

    segundoNombre: z.string()
    //.min(2, {
    //    message: "El segundo nombre debe tener al menos 2 caracteres.",
    //}).max(20, {
    //    message: "El segundo nombre debe tener máximo 20 caracteres."
    //})
    ,

    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }).max(20, {
        message: "El apellido debe tener máximo 20 caracteres."
    }),

    segundoApellido: z.string()
    //.min(2, {
    //    message: "El segundo apellido debe tener al menos 2 caracteres.",
    //}).max(20, {
    //    message: "El segundo apellido debe tener máximo 20 caracteres."
    //})
    ,

    rut: z.string().min(2, {
        message: "RUT debe tener mínimo 2 caracteres.",
    }),

    correo: z.string().email({ 
        message: "Formato de correo inválido" 
    }),

    tipo: z.enum(tiposPermitidos, {
        message: "El tipo debe ser uno de los valores permitidos: ADMIN, USER.",
    }),

    cargo: z.string().min(2, {
        message: "El cargo debe tener al menos 2 caracteres.",
    }),

    contrasena: z.string().min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
    }).regex(passwordRegex, {
        message: "La contraseña debe tener al menos una letra mayúscula, un número y un signo especial.",
    }),

    recontrasena: z.string().min(8, {
        message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),
    
}).refine((data) => data.contrasena === data.recontrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["recontrasena"], // El error se asignará al campo `repassword`
});

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
            tipo: "USER",
            cargo: "",
            contrasena: "",
            recontrasena: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        userRepository.createUser(values)
    }

    function cleanForm(){
        form.reset()
        setSelection('selection')
    }

    return (
        <div className="h-full mx-12 md:mx-36">

            {selection === 'selection' &&
                <div className="space-y-8">
                    <div className="flex flex-wrap justify-start space-x-6">
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
                                <CardTitle>Total Usuarios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                                    02
                                </h1>
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
                            <TableCaption>Lista de usuarios registrados recientemente.</TableCaption>
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
                                    <FormField control={form.control} name="contrasena" render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="recontrasena" render={({ field }) => (
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
                                    <Button type="submit" onClick={() => cleanForm()}><ArrowLeft /> Volver</Button>
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