import { Link } from "react-router-dom";

interface NavbarProps {
  code: string | null;
}

export default function Navbar({ code }: NavbarProps) {
  const withCode = (path: string) => {
    if (!code) return path;
    return `${path}?code=${code}`;
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <span className="font-semibold tracking-wide text-[#d4af37]">
          D & D
        </span>

        <div className="flex gap-6 text-sm font-medium">
          <Link
            to={withCode("/")}
            className="text-gray-700 hover:text-[#d4af37] transition"
          >
            Inicio
          </Link>

          <Link
            to={withCode("/invitation")}
            className="text-gray-700 hover:text-[#d4af37] transition"
          >
            Invitación
          </Link>

          <Link
            to={withCode("/rsvp")}
            className="text-gray-700 hover:text-[#d4af37] transition"
          >
            RSVP
          </Link>
        </div>
      </div>
    </nav>
  );
}
