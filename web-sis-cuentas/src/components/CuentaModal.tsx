interface Props {
  cuenta: any;
  onClose: () => void;
}

const CuentaModal = ({ cuenta, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo transparente con blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Contenido del modal */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-11/12 sm:w-96">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Detalle de Cuenta
        </h2>
        <p>
          <strong>Motivo:</strong> {cuenta.motivo}
        </p>
        <p>
          <strong>Monto:</strong> {Number(cuenta.monto).toFixed(2)}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(cuenta.fecha).toLocaleString()}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuentaModal;
