import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ArrowLeft, Save, User, TrendingUp, BadgeCheck, Eraser, Pencil } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { userRepository } from "@/repositories/userRepository"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"

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

interface User {
    id: number;
    name: string;
    secondName: string;
    lastName: string;
    surName: string;
    rut: string;
    email: string;
    cargo: string;
}

export default function Users() {
    const [selection, setSelection] = useState('selection');
    const [users, setUsers] = useState<User[]>([])

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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            await userRepository.createUser(values)
            form.reset()
            toast("✅ Creación exitosa", {
                description: "El usuario ha sido creado correctamente.",
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
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

    function cleanForm() {
        form.reset()
        setSelection('selection')
    }

    function cargarFormulario(user: User) {
        setSelection('new')
        form.setValue('nombre', user.name)
    }

    async function handleDeleteUser(rut: string) {
        try {
            await userRepository.deleteUser(rut)
            toast("✅ Eliminación exitosa", {
                description: "El usuario ha sido eliminado sin problemas.",
            })
        } catch (error) {
            toast("❌ Error", {
                description: `${error}`,
            })
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userRepository.getAllUsers();
                setUsers(fetchedUsers.result);
            } catch (error) {
                console.error("Error al cargar los usuarios:", error);
                toast("❌ Error", {
                    description: "No se pudieron cargar los usuarios.",
                    action: {
                        label: "Cerrar",
                        onClick: () => {
                            console.log("Cerrar Toast");
                        }
                    }
                });
            }
        };

        fetchUsers();
    }, []); // Ejecuta solo al montar el componente

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
                                    {users.length}
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
                                    <TableHead className="">Cargo</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length > 0 && users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name} {user.secondName} {user.lastName} {user.surName}</TableCell>
                                        <TableCell className="">{user.rut}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="">{user.cargo}</TableCell>
                                        <TableCell className="justify-end flex gap-3">
                                            <Button variant="outline" onClick={() => cargarFormulario(user)}><Pencil className="cursor-pointer" /></Button>
                                            <Dialog>
                                                <DialogTrigger><Button variant="destructive"><Eraser className="cursor-pointer" /></Button></DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>¿Deseas eliminar este usuario?</DialogTitle>
                                                        <DialogDescription>
                                                            Esta acción no puede ser revertida! <br />
                                                            <p>Vas a eliminar la cuenta y los registros de <span className="font-bold">{user.name} {user.secondName} {user.lastName} {user.surName}</span></p>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="sm:justify-end">
                                                        <DialogClose asChild>
                                                        <Button onClick={() => handleDeleteUser(user.rut)} type="button" variant="destructive">
                                                            Eliminar
                                                        </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary">
                                                                Cancelar
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>


                                        </TableCell>
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