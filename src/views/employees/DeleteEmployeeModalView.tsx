import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { getEmployeesById } from '@/api/EmployeeAPI';
import DeleteEmployeeForm from '@/components/employees/DeleteEmployeeForm';

export default function DeleteEmployeeModalView() {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['deleteEmployee', employeeId],
    queryFn: () => getEmployeesById(employeeId),
    retry: false,
  });

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Dialog open={true} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={true} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-center items-center h-32">
              <p className="text-red-500">Error al cargar los datos del empleado</p>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  if (data) {
    return (
      <Dialog open={true} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-2xl font-bold">Eliminar Empleado</DialogTitle>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="mt-4">
              <DeleteEmployeeForm
                employeeId={employeeId}
                employeeName={data.employeeName}
                onClose={handleClose}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }
}
