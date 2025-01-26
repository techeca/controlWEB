import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  })

export default function Configuracion() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

    const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("✅ You submitted the following values:", {
            description: JSON.stringify(data, null, 2),
        })
    }

    return (
        <div className="h-full mx-36">
            <div className="flex gap-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Exclusión de sábados y domingos</CardTitle>
                        <CardDescription>Seleccionar día para no considerar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {weekDays.map((d) =>
                            <div className="items-top flex space-x-2">
                                <Checkbox id={d} />
                                <div className="grid gap-1.5 leading-none">
                                    <label htmlFor={d} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {d}
                                    </label>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="italic">

                    </CardFooter>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">Exclusión de fechas específicas</CardTitle>
                        <CardDescription>Lista de fechas a no considerar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-32 w-full rounded-md border">
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
                                            <FormLabel className="hidden">Date of birth</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                            {field.value ? (format(field.value, "PPP")) : (<span>Agregar Fecha</span>)}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                                                        disabled={(date: any) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Guardar</Button>
                            </form>
                        </Form>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}