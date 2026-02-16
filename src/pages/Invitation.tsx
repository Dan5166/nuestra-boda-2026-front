import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InvitationImage from "../assets/invitacion_compressed_page-0001.jpg";
import BotonesRegaloYTransferencia from "../components/BotonesRegaloYTransferencia";

const API_URL = import.meta.env.VITE_API_URL;

interface Invitado {
  nombre: string;
}

export default function Invitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codeFromUrl = searchParams.get("code")?.toUpperCase() || "";

  const [step, setStep] = useState<"codigo" | "invitacion">(
    codeFromUrl ? "invitacion" : "codigo",
  );

  const [codigoInput, setCodigoInput] = useState(codeFromUrl);
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* =========================
     BUSCAR INVITADOS POR CODE
  ========================= */

  const buscarCodigo = async (codigo: string) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/users/by-code/${codigo}`);
      if (!res.ok) throw new Error();

      const data = await res.json();

      const invitadosMap = data.usuarios.map((u: any) => ({
        nombre: u.nombre,
      }));

      setInvitados(invitadosMap);
      setStep("invitacion");

      // 👉 Actualiza la URL sin recargar
      navigate(`/invitation?code=${codigo}`, { replace: true });
    } catch {
      setErrorMsg("El código ingresado no es válido.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     AUTO BUSCAR SI VIENE EN URL
  ========================= */

  useEffect(() => {
    if (codeFromUrl) buscarCodigo(codeFromUrl);
  }, []);

  /* =========================
     TEXTO DINÁMICO
  ========================= */

  const nombresInvitados =
    invitados.length > 0
      ? invitados.map((i) => i.nombre).join(" & ")
      : "Te queremos en nuestra boda";

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#5c4a2e] flex items-center justify-center px-4">
      {/* =========================
          PASO 1: INGRESAR CÓDIGO
      ========================= */}
      {step === "codigo" && (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="font-serif text-3xl mb-6">Invitación de matrimonio</h1>

          <p className="text-sm text-gray-600 mb-6">
            Ingresa el código que recibiste para ver tu invitación
          </p>

          <input
            placeholder="Código de invitación"
            className="w-full border p-3 mb-4 text-center tracking-widest uppercase"
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
          />

          <button
            onClick={() => buscarCodigo(codigoInput)}
            disabled={!codigoInput || loading}
            className="w-full py-3 bg-[#8a6d3b] text-white font-bold disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Continuar"}
          </button>

          {errorMsg && (
            <div className="mt-4 text-sm text-red-600">{errorMsg}</div>
          )}
        </div>
      )}

      {/* =========================
          PASO 2: INVITACIÓN
      ========================= */}
      {step === "invitacion" && (
        <div className="w-full">
          {/* ===== HEADER ===== */}
          <header className="py-10 text-center px-4">
            <h1 className="font-serif text-3xl md:text-4xl mb-2">
              {loading ? "Cargando invitación..." : nombresInvitados}
            </h1>

            <p className="text-sm tracking-widest uppercase text-gray-500">
              Con mucho amor, Dominic & Danyael
            </p>
          </header>

          {/* ===== INVITACIÓN ===== */}
          <main className="max-w-4xl mx-auto px-4">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
              <img
                src={InvitationImage}
                alt="Invitación de matrimonio"
                className="w-full object-contain"
              />
            </div>

            {/* ===== BOTONES REGALO / TRANSFERENCIA ===== */}
            <div className="mt-10">
              <BotonesRegaloYTransferencia />
            </div>
          </main>

          {/* ===== CTA RSVP ===== */}
          <section className="py-20 text-center px-6">
            <p className="font-serif text-xl md:text-2xl mb-8">
              Será un honor contar con tu presencia
            </p>

            <Link
              to={`/rsvp${codeFromUrl ? `?code=${codeFromUrl}` : ""}`}
              className="
                inline-block
                px-12 py-4
                bg-linear-to-r from-[#bf953f] via-[#d4af37] to-[#aa771c]
                text-white
                font-bold
                uppercase
                tracking-[0.25em]
                text-xs
                rounded-full
                shadow-xl
                hover:brightness-110
                transition
              "
            >
              Confirmar asistencia
            </Link>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="py-10 text-center text-xs text-gray-500">
            Dominic & Danyael · 19 · Abril · 2026
          </footer>
        </div>
      )}
    </div>
  );
}
