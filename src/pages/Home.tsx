import HeroDesktop from "../assets/fondo-desktop.png";
import HeroMovil from "../assets/fondo-movil.png";
import G1 from "../assets/fondo-desktop.png";
import G2 from "../assets/fondo-desktop.png";
import G3 from "../assets/fondo-desktop.png";
import G4 from "../assets/fondo-desktop.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen text-[#5c4a2e]">
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroDesktop})` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${HeroMovil})` }}
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-center px-6 ">
          <div className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.70)]">
            <p className="uppercase tracking-[0.4em] text-lg text-white mb-4">
              Nos casamos
            </p>

            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Dominic <span className="italic">&</span> Danyael
            </h1>

            <p className="text-white mb-10 text-lg lg:text-base tracking-widest">
              26 · Abril · 2026
            </p>
          </div>
          <Link
              to="/rsvp"
              className="inline-block px-10 py-4 bg-linear-to-r from-[#bf953f] via-[#d4af37] to-[#aa771c] text-white font-bold uppercase tracking-[0.25em] text-xs rounded-full shadow-xl hover:brightness-110 transition"
            >
              Confirmar asistencia
            </Link>
        </div>
      </section>

      {/* ===== FRASE ===== */}
      <section className="py-24 bg-[#fdfaf6] text-center px-6">
        <p className="font-serif text-2xl md:text-3xl italic max-w-3xl mx-auto">
          “El amor no se mira, se siente. Y aún más cuando estamos juntos.”
        </p>
      </section>

      {/* ===== NUESTRA HISTORIA ===== */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-serif text-4xl mb-6">Nuestra historia</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Todo comenzó con una conversación simple que cambió nuestras vidas
            para siempre. Desde ese día, aprendimos que el amor se construye con
            paciencia, risas y complicidad.
            <br />
            <br />
            Hoy queremos celebrar este paso rodeados de las personas que más
            queremos 💛
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img src={G1} className="rounded-2xl shadow-lg object-cover h-48" />
          <img
            src={G2}
            className="rounded-2xl shadow-lg object-cover h-48 mt-10"
          />
        </div>
      </section>

      {/* ===== GALERÍA ===== */}
      <section className="py-24 bg-[#fdfaf6] px-6">
        <h2 className="font-serif text-4xl text-center mb-12">Momentos</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[G1, G2, G3, G4].map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 object-cover h-56"
            />
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-28 bg-linear-to-b from-[#bf953f] via-[#d4af37] to-[#aa771c] text-center text-white px-6">
        <h2 className="font-serif text-4xl mb-6">
          ¿Nos acompañas en este día tan especial?
        </h2>

        <p className="text-sm mb-10 opacity-90">
          Tu presencia es el mejor regalo que podríamos recibir
        </p>

        <Link
          to="/rsvp"
          className="inline-block px-12 py-4 bg-white text-[#8a6d3b] font-bold uppercase tracking-[0.25em] text-xs rounded-full shadow-xl hover:bg-[#fdf3d7] transition"
        >
          Ir al RSVP
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 text-center text-xs text-gray-500 bg-[#fdfaf6]">
        Dominic & Danyael · 2026 · Con amor 💛
      </footer>
    </div>
  );
}
