import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeesById } from '@/api/EmployeeAPI';
import { useQuery } from '@tanstack/react-query';
import {
  UserCircleIcon,
  PhoneIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

export default function EmployeeDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editEmployee', employeeId],
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
        <div className="text-red-500 text-xl mb-4">{isError && 'Empleado no encontrado'}</div>
        <button onClick={() => navigate('/')} className="text-blue-500 hover:text-blue-600">
          Volver a la lista
        </button>
      </div>
    );
  }
  if (data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-full">
              <UserCircleIcon className="h-12 w-12 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{data.employeeName}</h1>
              <p className="text-gray-600">{data.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="text-gray-800">{data.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Rol</p>
                  <p className="text-gray-800">{data.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Sucursal</p>
                  <p className="text-gray-800">{data.branch}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Seguro Médico</p>
                  <p className={`${data.healthInsurance ? 'text-green-600' : 'text-red-500'}`}>
                    {data.healthInsurance ? 'Con seguro médico' : 'Sin seguro médico'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate(`/employees/${employeeId}/payroll`)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex items-center"
          >
            <BanknotesIcon className="h-5 w-5 mr-2" />
            Generar Nómina Semanal
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }
}
