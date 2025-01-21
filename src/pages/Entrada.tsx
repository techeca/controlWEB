import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Clock, ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const controls = [
    {
        id: 1,
        hora: "08:00:00",
        tipo: "Entrada",
        fecha: "20 de Enero de 2025",
        nombre: "Jim Vásquez",
    },
    {
        id: 2,
        hora: "16:00:00",
        tipo: "Salida",
        fecha: "20 de Enero de 2025",
        nombre: "Jim Vásquez",
    }
]

export default function Entrada() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const formattedDate = `${currentTime.getDate()} de ${months[currentTime.getMonth()]} de ${currentTime.getUTCFullYear()}`;
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;

    return (
        <div className="h-full mx-36 space-y-6">
            <div>
                <Card className="w-[200px] lg:w-[250px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Clock />Hora</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {formattedTime}
                        </h1>
                    </CardContent>
                    <CardFooter className="italic">
                        {formattedDate}
                    </CardFooter>
                </Card>
            </div>

            <div className="w-full">
                <Table>
                    <TableCaption>Lista de registros recientes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Hora</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Nombre</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {controls.map((control) => (
                            <TableRow key={control.id}>
                                <TableCell className="font-medium">{control.hora}</TableCell>
                                <TableCell className="flex">{control.tipo === 'Entrada' ? <ArrowBigRightDash color="#00b34d"/> : <ArrowBigLeftDash color="#a20202"/>} {control.tipo}</TableCell>
                                <TableCell>{control.fecha}</TableCell>
                                <TableCell className="text-right">{control.nombre}</TableCell>
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