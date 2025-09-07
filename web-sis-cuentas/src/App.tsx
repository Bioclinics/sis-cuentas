import { useEffect, useState } from "react";
import "./App.css";
import CuentaForm from "./components/CuentaForm";
import CuentaTable from "./components/CuentaTable";
import CuentaModal from "./components/CuentaModal";

export const App = () => {
    const [cuentas, setCuentas] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [selectedCuenta, setSelectedCuenta] = useState<any | null>(null);

    const fetchCuentas = async (page = 1) => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/cuentas?page=${page}&limit=5`
        );
        const data = await res.json();
        setCuentas(data.cuentas.data);
        setPage(Number(data.cuentas.page));
        setLastPage(Number(data.cuentas.last_page));
    };
    const handleDeleteCuenta = async (id: number) => {
        await fetch(`${import.meta.env.VITE_API_URL}/cuentas/${id}`, {
            method: "DELETE",
        });

        // 👇 actualizamos el estado sin recargar toda la página
      await fetchCuentas(page);
    };

    useEffect(() => {
        fetchCuentas();
    }, []);

    const handlePageChange = (newPage: number) => {
        fetchCuentas(newPage);
    };

    const handleAddCuenta = () => {
        fetchCuentas(page);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 relative">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">
                Gestión de Cuentas
            </h1>
            <CuentaForm onAdd={handleAddCuenta} />
            <CuentaTable
                cuentas={cuentas}
                onView={setSelectedCuenta}
                onDelete={handleDeleteCuenta}
            />
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 mr-2"
                >
                    Anterior
                </button>
                <span className="px-3 py-1">
                    {page} / {lastPage}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= lastPage}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 ml-2"
                >
                    Siguiente
                </button>
            </div>

            {/* Modal */}
            {selectedCuenta && (
                <CuentaModal
                    cuenta={selectedCuenta}
                    onClose={() => setSelectedCuenta(null)}
                />
            )}
        </div>
    );
};
