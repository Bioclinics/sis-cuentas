import { useState } from "react";

interface Props {
  onAdd: () => void;
}

const CuentaForm = ({ onAdd }: Props) => {
  const [motivo, setMotivo] = useState("");
  const [monto, setMonto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/cuentas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo, monto: parseFloat(monto) }),
    });
    setMotivo("");
    setMonto("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        className="border p-2 rounded flex-1"
        required
      />
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="border p-2 rounded w-full sm:w-32"
        step="0.01"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 rounded">
        Agregar
      </button>
    </form>
  );
};

export default CuentaForm;
