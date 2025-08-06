import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeesById } from '@/api/EmployeeAPI';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import PayrollForm from '@/components/payroll/PayrollForm';

export default function PayrollView() {
  const params = useParams();
  const navigate = useNavigate();
  const employeeId = params.employeeId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeesById(employeeId),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error al cargar los datos del empleado</div>
        <button onClick={() => navigate('/')} className="text-blue-500 hover:text-blue-600">
          Volver a la lista
        </button>
      </div>
    );
  }
  if (data) {
    return (
      <div className="max-w-5xl mx-auto p-5">
        <button
          onClick={() => navigate(`/employees/${employeeId}/details`)}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver a detalles
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestión de la nomina</h1>
          </div>

          <PayrollForm data={data} />

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => {
                /* TODO: Implementar generación de nómina */
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex items-center"
            >
              <BanknotesIcon className="h-5 w-5 mr-2" />
              Generar Nómina
            </button>
          </div>
        </div>
      </div>
    );
  }
}
