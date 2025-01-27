import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { configRepository } from "@/repositories/configRepository";
import { es } from "date-fns/locale";

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
})

const FormDaysSchema = z.object({
    LUNES: z.boolean(),
    MARTES: z.boolean(),
    MIERCOLES: z.boolean(),
    JUEVES: z.boolean(),
    VIERNES: z.boolean(),
    SABADO: z.boolean(),
    DOMINGO: z.boolean(),
})

export default function Configuracion() {
    const [systemConfig, setSystemconfig] = useState();
    const [weekDays, setWeekDays] = useState([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const formDays = useForm<z.infer<typeof FormDaysSchema>>({
        resolver: zodResolver(FormDaysSchema),
        defaultValues: {
            LUNES: false,
            MARTES: false,
            MIERCOLES: false,
            JUEVES: false,
            VIERNES: false,
            SABADO: false,
            DOMINGO: false
        },
    })

    const fetchConfig = useCallback(async () => {
        const { result } = await configRepository.getConfig();

        formDays.setValue('LUNES', result[0].isExcluded)
        formDays.setValue('MARTES', result[1].isExcluded)
        formDays.setValue('MIERCOLES', result[2].isExcluded)
        formDays.setValue('JUEVES', result[3].isExcluded)
        formDays.setValue('VIERNES', result[4].isExcluded)
        formDays.setValue('SABADO', result[5].isExcluded)
        formDays.setValue("DOMINGO", result[6].isExcluded)

        setWeekDays(result)
        console.log(result);
    }, [configRepository])

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("✅ You submitted the following values:", {
            description: JSON.stringify(data, null, 2),
        })
    }

    function onSubmitDays(data: z.infer<typeof FormDaysSchema>) {
        toast("✅ You submitted the following values:", {
            description: JSON.stringify(data, null, 2),
        })
    }

    useEffect(() => {
        fetchConfig()
    }, [fetchConfig])

    return (
        <div className="h-full mx-36">
            <div className="flex gap-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Exclusión de sábados y domingos</CardTitle>
                        <CardDescription>Seleccionar día para no considerar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Form {...formDays}>
                            <form onSubmit={formDays.handleSubmit(onSubmitDays)} className="space-y-3">
                                {weekDays.map((day: any) => (
                                    <FormField key={day.id} control={formDays.control} name={day.Day}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>{day.Day}</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <div className="w-full flex justify-end">
                                    <Button className="" type="submit">Guardar</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Exclusión de fechas específicas</CardTitle>
                        <CardDescription>Lista de fechas a no considerar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-40 w-full rounded-md border">
                            <div className="p-4">
                                <div className="text-sm">
                                    <p>01-01-2025</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="text-sm">
                                    <p>08-01-2025</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="text-sm">
                                    <p>25-12-2025</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="text-sm">
                                    <p>31-12-2025</p>
                                </div>
                                <Separator className="my-2" />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="flex">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
                                <FormField control={form.control} name="dob" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="hidden">Agregar Fecha</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? (format(field.value, "PPP", { locale: es })) : (<span>Agregar Fecha</span>)}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar locale={es} onDayClick={e => console.log(e)} mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button type="submit">Agregar</Button>
                            </form>
                        </Form>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}