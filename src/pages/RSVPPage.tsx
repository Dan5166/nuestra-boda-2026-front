import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FondoDesktop from "../assets/fondo-desktop.png";
import FondoMovil from "../assets/fondo-movil.png";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

/* =========================
   TIPOS
========================= */

export const EstadoUsuario = {
  PENDIENTE: "pendiente",
  CONFIRMADO: "confirmado",
  RECHAZADO: "rechazado",
} as const;
export type EstadoUsuario = (typeof EstadoUsuario)[keyof typeof EstadoUsuario];

export const AlergiaAlimentaria = {
  NINGUNA: "ninguna",
  VEGANA: "vegana",
  CELIACA: "celiaca",
  SIN_LACTOSA: "sin lactosa",
} as const;
export type AlergiaAlimentaria =
  (typeof AlergiaAlimentaria)[keyof typeof AlergiaAlimentaria];

interface Invitado {
  userId: string;
  nombre: string;
  telefono: string;
  mail: string;
  estado: EstadoUsuario;
  alergiaAlimentaria?: AlergiaAlimentaria;
  otrasAlergias?: string;
  mensaje?: string;
}

/* =========================
   COMPONENTE
========================= */

export default function RSVPPage() {
  const [searchParams] = useSearchParams();
  const codeFromUrl = searchParams.get("code")?.toUpperCase() || "";

  const [step, setStep] = useState<"codigo" | "formulario">("codigo");
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingCode, setLoadingCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });
  const navigate = useNavigate();

  /* =========================
     BUSCAR CÓDIGO
  ========================= */

  const buscarCodigo = async (codigoABuscar: string) => {
    setLoadingCode(true);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/by-code/${codigoABuscar}`);
      if (!res.ok) throw new Error();

      const data = await res.json();

      const invitadosMap: Invitado[] = data.usuarios.map((u: any) => ({
        userId: u.userId,
        nombre: u.nombre,
        telefono: "",
        mail: "",
        estado: u.estado ?? EstadoUsuario.PENDIENTE,
        alergiaAlimentaria: AlergiaAlimentaria.NINGUNA,
        otrasAlergias: "",
        mensaje: "",
      }));

      setInvitados(invitadosMap);
      setStep("formulario");
    } catch {
      setStatusMsg({
        type: "error",
        msg: "El código no existe o es inválido.",
      });
    } finally {
      setLoading(false);
      setLoadingCode(false);
    }
  };

  useEffect(() => {
    if (codeFromUrl) buscarCodigo(codeFromUrl);
  }, [codeFromUrl]);

  /* =========================
     HELPERS
  ========================= */

  const updateInvitado = (index: number, field: keyof Invitado, value: any) => {
    const copia = [...invitados];
    copia[index] = { ...copia[index], [field]: value };
    setInvitados(copia);
  };

  const todosRespondieron = invitados.every(
    (i) =>
      i.estado === EstadoUsuario.CONFIRMADO ||
      i.estado === EstadoUsuario.RECHAZADO,
  );

  /* =========================
     ENVIAR RSVP
  ========================= */

  const enviarRSVP = async () => {
    setLoading(true);
    setStatusMsg({ type: "", msg: "" });

    try {
      for (const inv of invitados) {
        const body = {
          telefono: inv.telefono,
          mail: inv.mail || undefined,
          estado: inv.estado,
          alergiaAlimentaria:
            inv.estado === EstadoUsuario.CONFIRMADO
              ? inv.alergiaAlimentaria
              : undefined,
          otrasAlergias:
            inv.estado === EstadoUsuario.CONFIRMADO
              ? inv.otrasAlergias
              : undefined,
          mensaje: inv.mensaje || undefined,
        };

        const res = await fetch(`${API_URL}/users/${inv.userId}/rsvp`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Error guardando RSVP");
      }

      setStatusMsg({
        type: "success",
        msg: "¡Gracias! Tu respuesta fue registrada correctamente 💛",
      });

      // 👉 Redirige al home luego de 2.5 segundos
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch {
      setStatusMsg({
        type: "error",
        msg: "Ocurrió un error al guardar el RSVP",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RENDER
  ========================= */

  const invitado = invitados[activeIndex];

  if (loadingCode) return <Loader />;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${FondoDesktop})` }}
    >
      <div
        className="fixed inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${FondoMovil})` }}
      />

      <div className="relative z-10 w-full max-w-xl bg-white/95 p-6">
        {step === "formulario" && invitado && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 border-b mb-4">
              {invitados.map((i, idx) => (
                <button
                  key={i.userId}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-2 text-sm ${
                    idx === activeIndex
                      ? "border-b-2 border-[#bf953f]"
                      : "text-gray-400"
                  }`}
                >
                  {i.nombre}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-4">
              <input
                placeholder="Teléfono *"
                className="w-full border p-2"
                value={invitado.telefono}
                onChange={(e) =>
                  updateInvitado(activeIndex, "telefono", e.target.value)
                }
              />

              <input
                placeholder="Email (opcional)"
                className="w-full border p-2"
                value={invitado.mail}
                onChange={(e) =>
                  updateInvitado(activeIndex, "mail", e.target.value)
                }
              />

              <select
                className="w-full border p-2"
                value={invitado.estado}
                onChange={(e) =>
                  updateInvitado(
                    activeIndex,
                    "estado",
                    e.target.value as EstadoUsuario,
                  )
                }
              >
                <option value="">¿Asistirás?</option>
                <option value="confirmado">Confirmo asistencia</option>
                <option value="rechazado">No podré asistir</option>
              </select>

              {invitado.estado === EstadoUsuario.CONFIRMADO && (
                <>
                  <select
                    className="w-full border p-2"
                    value={invitado.alergiaAlimentaria}
                    onChange={(e) =>
                      updateInvitado(
                        activeIndex,
                        "alergiaAlimentaria",
                        e.target.value,
                      )
                    }
                  >
                    <option value="ninguna">Sin alergias</option>
                    <option value="vegana">Vegana</option>
                    <option value="celiaca">Celíaca</option>
                    <option value="sin lactosa">Sin lactosa</option>
                  </select>

                  <input
                    placeholder="Otras alergias"
                    className="w-full border p-2"
                    value={invitado.otrasAlergias}
                    onChange={(e) =>
                      updateInvitado(
                        activeIndex,
                        "otrasAlergias",
                        e.target.value,
                      )
                    }
                  />
                </>
              )}

              <textarea
                placeholder="Mensaje"
                className="w-full border p-2"
                value={invitado.mensaje}
                onChange={(e) =>
                  updateInvitado(activeIndex, "mensaje", e.target.value)
                }
              />
            </div>

            {statusMsg.type !== "success" && (
              <button
                disabled={!todosRespondieron || loading}
                onClick={enviarRSVP}
                className="w-full mt-6 py-3 bg-[#8a6d3b] text-white font-bold disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Confirmar Invitación"}
              </button>
            )}
          </>
        )}

        {statusMsg.msg && (
          <div
            className={`mt-6 rounded-lg border p-4 text-center ${
              statusMsg.type === "error"
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-green-300 bg-green-50 text-green-700"
            }`}
          >
            <p className="font-semibold">{statusMsg.msg}</p>

            {statusMsg.type === "success" && (
              <p className="mt-2 text-sm text-green-600">
                Serás redirigido automáticamente al inicio…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
