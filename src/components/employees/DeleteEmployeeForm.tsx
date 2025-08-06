import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { Employee } from '@/types/index';
import { deleteEmployee } from '@/api/EmployeeAPI';

type DeleteEmployeeFormProps = {
  employeeId: Employee['_id'];
  employeeName: string;
  onClose: () => void;
};

export default function DeleteEmployeeForm({
  employeeId,
  employeeName,
  onClose,
}: DeleteEmployeeFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(data);
      onClose();
    },
  });

  const handleDelete = () => mutate(employeeId);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          ¿Estás seguro de eliminar este empleado?
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Esta acción no se puede deshacer. Se eliminará permanentemente el empleado{' '}
          <span className="font-medium text-gray-900">{employeeName}</span>.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={isPending}
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}
