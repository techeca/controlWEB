import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { controlRepository } from "@/repositories/controlRepository";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { generateFormattedDate, generateFormattedTime } from "@/lib/utils";

export default function Historial() {
    const [allUserControls, setAllUserControls] = useState<any>([]);
    const { user } = useAuth();
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
            const { result, pagination } = await controlRepository.getControls({ page, pageSize });
            setAllUserControls(result);
            setPaginationData(pagination);
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
        <div className="h-full mx-36">
            <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Historial</h1>

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
                                <TableCell className="text-right">{user?.name} {user?.lastName} {user?.surName}</TableCell>
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
        </div>
    )
}