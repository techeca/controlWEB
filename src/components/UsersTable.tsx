import { User } from "@/types/User"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { ArrowLeft, Eraser, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UsersTable({users, fnEdit, fnDelete}: {users: User[], fnEdit: (user: User) => void, fnDelete: (rut: string) => void}) {

    return (
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
                            <Button variant="outline" onClick={() => fnEdit(user)}><Pencil className="cursor-pointer" /></Button>
                            <Dialog>
                                <DialogTrigger><Button variant="destructive"><Eraser className="cursor-pointer" /></Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>¿Deseas eliminar este usuario?</DialogTitle>
                                        <DialogDescription>
                                            Esta acción no puede ser revertida! <br />
                                            <span>Vas a eliminar la cuenta y los registros de <span className="font-bold">{user.name} {user.secondName} {user.lastName} {user.surName}</span></span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="sm:justify-end">
                                        <DialogClose asChild>
                                            <Button onClick={() => fnDelete(user.rut)} type="button" variant="destructive">
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
    )
}