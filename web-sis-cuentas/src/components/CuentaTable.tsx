interface Props {
  cuentas: any[];
  onView: (cuenta: any) => void;
  onDelete: (id: number) => void; // 👈 pasamos un callback al padre
}

const CuentaTable = ({ cuentas, onView, onDelete }: Props) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-blue-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Motivo</th>
          <th className="border p-2">Monto</th>
          <th className="border p-2">Fecha</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cuentas.map((c) => (
          <tr key={c.id}>
            <td className="border p-2">{c.id}</td>
            <td className="border p-2">{c.motivo}</td>
            <td className="border p-2">{Number(c.monto).toFixed(2)}</td>
            <td className="border p-2">{new Date(c.fecha).toLocaleString()}</td>
            <td className="border p-2 flex gap-2 justify-center">
              <button
                onClick={() => onView(c)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ver
              </button>
              <button
                onClick={() => onDelete(c.id)} // 👈 llamamos al padre
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CuentaTable;
