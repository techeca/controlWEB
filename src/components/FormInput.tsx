import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { User } from "@/types/User";

type FormFieldNames = "nombre" | "segundoNombre" | "apellido" | "segundoApellido" | "rut" | 
                      "correo" | "tipo" | "cargo" | "contrasena" | "recontrasena";
type FormValues = {
  nombre: string;
  segundoNombre: string;
  apellido: string;
  segundoApellido: string;
  cargo: string;
  tipo: "ADMIN" | "USER";
  correo: string;
  contrasena: string;
  rut: string;
  recontrasena: string;
};


export default function FormInput({ type, name, form }: { type: string; name: FormFieldNames; form: any }) {
    return (
        <FormField control={form.control} name={name} render={({ field }) => (
            <FormItem className="w-full">
                <FormLabel className="capitalize">{name}</FormLabel>
                <FormControl>
                    <Input type={type} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        />
    )
}