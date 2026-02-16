import { useState } from "react";

export default function BotonesRegaloYTransferencia() {
  const [copiado, setCopiado] = useState(false);

  const codigoEvento = "2102595";

  const linkNoviosFalabella = `https://novios.falabella.com/info-evento/evento?codigoEvento=${codigoEvento}&ref=search`;

  const datosTransferencia = `
Banco: Falabella
Tipo de cuenta: Cuenta corriente
Número de cuenta: 1-983-295382-0
Nombre: Danyael Vásquez
RUT: 20.391.039-8
`.trim();

  const copiarDatos = async () => {
    try {
      await navigator.clipboard.writeText(datosTransferencia);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error("Error al copiar", error);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {/* Botón Novios Falabella */}
      <a
        href={linkNoviosFalabella}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs rounded-lg bg-neutral-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
      >
        🎁 Ver lista Novios Falabella
      </a>

      {/* Botón copiar datos */}
      <button
        onClick={copiarDatos}
        className="w-full max-w-xs rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-200 active:scale-[0.98]"
      >
        📋 Copiar datos de transferencia
      </button>

      {/* Feedback */}
      {copiado && (
        <span className="text-sm font-medium text-green-600">
          ✔ Datos copiados al portapapeles
        </span>
      )}
    </div>
  );
}
