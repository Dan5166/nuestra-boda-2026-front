import FondoDesktop from "../assets/fondo-desktop.png";
import FondoMovil from "../assets/fondo-movil.png";

export default function Loader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${FondoDesktop})` }}
    >
      <div
        className="fixed inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${FondoMovil})` }}
      />
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}
