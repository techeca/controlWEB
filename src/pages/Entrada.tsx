import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { Clock, ArrowBigLeftDash, ArrowBigRightDash, BookOpenCheck, ClockArrowDown, ClockArrowUp } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext";
import { controlRepository } from "@/repositories/controlRepository";
import { toast } from "sonner";
import { generateFormattedDate, generateFormattedTime } from "@/lib/utils";

type ControlType = "ENTRADA" | "SALIDA";

export default function Entrada() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [allUserControls, setAllUserControls] = useState<any>([]);
    const [todayEntrance, setTodayEntrance] = useState<boolean>(false);
    const [todayExit, setTodayExit] = useState<boolean>(false);
    const { user } = useAuth()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    const fetchControls = useCallback(async () => {
        try {
            const { result } = await controlRepository.getControls();
            setAllUserControls(result)

            // Obtén la fecha de hoy
            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
            const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

            // Filtrar los controles de la fecha actual
            const todayControls = result.filter((control: any) => {
                const controlDate = new Date(control.createdAt).toISOString();
                return controlDate >= startOfToday && controlDate < endOfToday;
            });

            // Verificar si hay controles de "entrada" y "salida"
            const hasEntrance = todayControls.some((control: any) => control.typeControl === 'ENTRADA');
            const hasExit = todayControls.some((control: any) => control.typeControl === 'SALIDA');

            // Establecer los estados
            setTodayEntrance(hasEntrance);
            setTodayExit(hasExit);
        } catch (error) {
            console.log(error);
            toast("❌ Error", {
                description: "Hubo un error al intentar obtener los controles.",
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
        }
    }, [])

    async function addControl(type: ControlType) {
        try {  
            if(type === "ENTRADA" && todayEntrance) return false;
            if(type === "SALIDA" && todayExit) return false;

            const { result } = await controlRepository.createControl({ tipo: type })
            if (type === "ENTRADA") {
                toast("✅ Entrada Generada", {
                    description: `Entrada realizada a las ${generateFormattedTime(new Date(result.createdAt))} hrs.`,
                    action: {
                        label: "Cerrar",
                        onClick: () => {
                            console.log("Cerrar Toast");
                        }
                    }
                })
                setTodayEntrance(true)
                await fetchControls()
            } else if (type === "SALIDA") {
                toast("✅ Salida Generada", {
                    description: `Salida realizada a las ${generateFormattedTime(new Date(result.createdAt))} hrs.`,
                    action: {
                        label: "Cerrar",
                        onClick: () => {
                            console.log("Cerrar Toast");
                        }
                    }
                })
                setTodayExit(true)
                await fetchControls()
            }
            
        } catch (error) {
            console.log(error);
            toast("❌ Error", {
                description: "Hubo un error al intentar generar la entrada.",
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        console.log("Cerrar Toast");
                    }
                }
            })
        }
    }

    useEffect(() => {
        fetchControls()
    }, [fetchControls])

    return (
        <div className="h-full mx-36 space-y-6">
            <div className="flex gap-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Clock />Hora</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            {generateFormattedTime(currentTime)}
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        {generateFormattedDate(currentTime)}
                    </CardFooter>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><ClockArrowDown /> Entradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            {user?.controles.filter((control: any) => control.typeControl === 'ENTRADA').length}
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        Total de Entradas
                    </CardFooter>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><ClockArrowUp /> Salidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            {user?.controles.filter((control: any) => control.typeControl === 'SALIDA').length}
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        Total de Salidas
                    </CardFooter>
                </Card>
            </div>

            <div className="flex gap-6">

                <Card onClick={() => addControl("ENTRADA")} className={`${todayEntrance ? `cursor-not-allowed opacity-30` : `cursor-pointer hover:bg-neutral-900`} w-full flex flex-col items-center`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Marcar Entrada</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            <ArrowBigRightDash size={64} color="#00b34d" />
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        Click para marcar
                    </CardFooter>
                </Card>

                <Card onClick={() => addControl("SALIDA")} className={`${todayExit ? `cursor-not-allowed opacity-30` : `cursor-pointer hover:bg-neutral-900`} w-full flex flex-col items-center`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Marcar Salida</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            <ArrowBigLeftDash size={64} color="#a20202" />
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        Click para marcar
                    </CardFooter>
                </Card>
            </div>

            <div className="w-full">
                <Table>
                    <TableCaption>Lista de últimos registros ingresados.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Hora</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Nombre</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUserControls.length > 0 && allUserControls.sort((a: any, b: any) => b.id - a.id).map((control: any) => (
                            <TableRow key={control.id}>
                                <TableCell className="font-medium">{generateFormattedTime(new Date(control.createdAt))}</TableCell>
                                <TableCell className="flex">{control.typeControl === 'ENTRADA' ? <ArrowBigRightDash color="#00b34d" /> : <ArrowBigLeftDash color="#a20202" />} {control.tipo}</TableCell>
                                <TableCell>{generateFormattedDate(new Date(control.createdAt))}</TableCell>
                                <TableCell className="text-right">{user?.name} {user?.lastName} {user?.surName}</TableCell>
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
    )
}