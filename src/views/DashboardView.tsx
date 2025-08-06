import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeView from './employees/EmployeeView';
import AddEmployeeModalView from './employees/AddEmployeeModalView';

export default function DashboardView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg shadow-gray-200/50 border border-white/20">
        <h1 className="text-5xl font-semibold">Empleados</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-all duration-300 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
        >
          Agregar empleado
        </button>
      </div>

      <AddEmployeeModalView isOpen={isModalOpen} onClose={onClose} />
      <EmployeeView />
      <Outlet />
    </>
  );
}
