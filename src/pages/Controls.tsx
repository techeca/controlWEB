import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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


export default function Controls() {

    return (
        <div className="h-full mx-12 md:mx-36 space-y-8">

            <div className="flex flex-wrap justify-start space-x-6">

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
                <Card className="">
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
            </div>

        </div >
    )
}