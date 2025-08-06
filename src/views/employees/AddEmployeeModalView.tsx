import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import AddEmployeeForm from '@/components/employees/AddEmployeeForm';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEmployeeModalView({ isOpen, onClose }: AddEmployeeModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fondo semi-transparente */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Contenedor centrado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-2xl font-bold">Agregar Empleado</DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="mt-4 overflow-y-auto pr-6 -mr-6">
            <div className="pl-2">
              <AddEmployeeForm onClose={onClose} />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
