import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState, useCallback, useEffect } from "react";
import { controlRepository } from "@/repositories/controlRepository";
import { toast } from "sonner"
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { generateFormattedDate, generateFormattedTime } from "@/lib/utils";

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


export default function Controls() {
    const [allUserControls, setAllUserControls] = useState<any>([]);
    const [chartData, setChartData] = useState<any>([]);
    //const { user } = useAuth();
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
    });

    const fetchControls = useCallback(async (page = 1, pageSize = 10) => {
        try {
            const { result, pagination, chartData } = await controlRepository.getAllControls({ page, pageSize });
            setAllUserControls(result);
            setPaginationData(pagination);
            setChartData(chartData);
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
            });
        }
    }, []);

    const handleNextPage = () => {
        if (paginationData.hasNextPage && paginationData.nextPage !== null) {
            fetchControls(paginationData.nextPage, paginationData.pageSize || 10);
        }
    };

    const handlePrevPage = () => {
        if (paginationData.hasPrevPage && paginationData.prevPage !== null) {
            fetchControls(paginationData.prevPage, paginationData.pageSize || 10);
        }
    };

    useEffect(() => {
        fetchControls()
    }, [fetchControls]);

    return (
        <div className="h-full mx-12 md:mx-36 space-y-8">

            {/*<div className="flex flex-wrap justify-start space-x-6">

                <Card>
                    <CardHeader>
                        <CardTitle>Asistencias de Hoy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                            02
                        </h1>
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
            </div>*/}

            <Card>
                <CardHeader>
                    <CardTitle>Asistencias - Inasistencias</CardTitle>
                    <CardDescription>Enero - Diciembre 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer className="aspect-auto h-[250px] w-full" config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                            <Bar dataKey="asistencias" fill="var(--color-asistencias)" radius={4} />
                            <Bar dataKey="inasistencias" fill="var(--color-inasistencias)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {/*<div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Gráfico de total de asistencias e inasistencias del año 2025
                                </div>*/}
                </CardFooter>
            </Card>

            <div className="w-full">
                <Table>
                    {/*<TableCaption>Lista de últimos registros ingresados.</TableCaption>*/}
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
                                <TableCell className="text-right">{control.user.name} {control.user.lastName} {control.user.surName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="w-full my-3">
                    <PaginationContent>
                        {/* Página anterior */}
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (paginationData.hasPrevPage) {
                                        handlePrevPage();
                                    }
                                }}
                                className={!paginationData.hasPrevPage ? "hover:bg-neutral-950 opacity-50" : ""}
                            >
                                Anterior
                            </PaginationPrevious>
                        </PaginationItem>

                        {/* Páginas numeradas */}
                        {[...Array(paginationData.totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetchControls(index + 1, paginationData.pageSize);
                                    }}
                                    isActive={paginationData.currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Página siguiente */}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (paginationData.hasNextPage) {
                                        handleNextPage();
                                    }
                                }}
                                className={!paginationData.hasNextPage ? "hover:bg-neutral-950 opacity-50" : ""}
                            >
                                Siguiente
                            </PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </div >
    )
}