import { Link, useSearchParams } from "react-router-dom";
import InvitationImage from "../assets/invitacion_compressed_page-0001.jpg";

export default function Invitation() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  console.log("Código de invitación:", code);
  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#5c4a2e]">
      {/* ===== HEADER SIMPLE ===== */}
      <header className="py-10 text-center">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">
          Nuestra Invitación
        </h1>
        <p className="text-sm tracking-widest uppercase text-gray-500">
          Dominic & Danyael
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
      </main>

      {/* ===== CTA RSVP ===== */}
      <section className="py-20 text-center px-6">
        <p className="font-serif text-xl md:text-2xl mb-8">
          Será un honor contar con tu presencia
        </p>

        <Link
          to={`/rsvp${code ? `?code=${code}` : ""}`} // Redirige a /rsvp o /rsvp/:code si el código existe
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
  );
}
