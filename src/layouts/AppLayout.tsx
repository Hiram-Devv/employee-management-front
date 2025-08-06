import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-2">
        <div className="max-w-screen-2xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:grid lg:grid-cols-3 lg:gap-4">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Logo />
          </div>
          {/* nav on the center */}
          <nav className="m4-2 lg:mt-0 lg:justify-self-center">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-white text-xl hover:text-gray-300 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-xl hover:text-gray-300 transition-colors"
                >
                  Empleados
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-xl hover:text-gray-300 transition-colors"
                >
                  Reportes
                </a>
              </li>
            </ul>
          </nav>

          {/* nav on the center */}
          <div className="mt-2 lg:mt-0 lg:justify-self-end">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}
