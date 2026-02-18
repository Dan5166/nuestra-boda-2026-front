import { NavLink } from "react-router-dom";

interface NavbarProps {
  code: string | null;
}

export default function Navbar({ code }: NavbarProps) {
  const withCode = (path: string) => {
    if (!code) return path;
    return `${path}?code=${code}`;
  };

  const baseClasses =
    "transition font-medium";

  const activeClasses =
    "text-[#d4af37] border-b-2 border-[#d4af37] pb-1";

  const inactiveClasses =
    "text-gray-700 hover:text-[#d4af37]";

  return (
    <nav className="w-full bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <span className="font-semibold tracking-wide text-[#d4af37]">
          D & D
        </span>

        <div className="flex gap-6 text-sm">
          <NavLink
            to={withCode("/")}
            end
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to={withCode("/invitation")}
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            Invitación
          </NavLink>

          <NavLink
            to={withCode("/rsvp")}
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            RSVP
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
