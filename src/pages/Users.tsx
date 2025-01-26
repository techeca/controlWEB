import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, Eraser, Pencil } from "lucide-react"
import { userRepository } from "@/repositories/userRepository"
import { toast } from "sonner"
import NewUserForm from "@/components/forms/newUser-form"
import { User } from "@/types/User"
import EditUserForm from "@/components/forms/editUser-form"
import UsersTable from "@/components/UsersTable"

export default function Users() {
    const [selection, setSelection] = useState('selection');
    const [users, setUsers] = useState<User[]>([])
    const [userSelected, setUserSelected] = useState<User>({} as User)

    function back() {
        setSelection('selection')
    }

    function editarUsuario(user: User) {
        setSelection('edit')
        setUserSelected(user)
    }

    async function handleDeleteUser(rut: string) {
        try {
            await userRepository.deleteUser(rut)
            toast("✅ Eliminación exitosa", {
                description: "El usuario ha sido eliminado sin problemas.",
            })
            fetchUsers();
        } catch (error) {
            toast("❌ Error", {
                description: `${error}`,
            })
        }
    }

    const fetchUsers = useCallback(async () => {
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
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Ejecuta solo al montar el componente

    return (
        <div className="h-full mx-12 md:mx-36">

            {selection === 'selection' &&
                <div className="space-y-8">
                    <div className="flex flex-wrap justify-start space-x-6">
                        <Card onClick={() => setSelection('new')} className="cursor-pointer hover:bg-neutral-900">
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

                    </div>

                    <UsersTable users={users} fnEdit={editarUsuario} fnDelete={handleDeleteUser} />
                </div>
            }

            {(selection === 'new') &&
                <NewUserForm fetchUsers={fetchUsers}>
                    <Button onClick={() => back()}><ArrowLeft /> Volver</Button>
                </NewUserForm>
            }

            {(selection === 'edit') &&
                <EditUserForm fetchUsers={fetchUsers} user={userSelected}>
                    <Button onClick={() => back()}><ArrowLeft /> Volver</Button>
                </EditUserForm>
            }

        </div>
    )
}