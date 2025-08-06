import type { Employee } from '@/types/index';
import {
  UserCircleIcon,
  PhoneIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface EmployeeCardProps {
  employee: Employee;
  onDelete?: () => void;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/employees/${employee._id}/edit`);
  };

  const handleDelete = () => {
    navigate(`/employees/${employee._id}/delete`);
  };

  const handleViewDetails = () => {
    navigate(`/employees/${employee._id}/details`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 hover:-translate-y-1 cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-full group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
            <UserCircleIcon className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
            {employee.employeeName}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <PhoneIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-500 transition-colors duration-300 flex-shrink-0" />
            <span className="text-sm truncate">{employee.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <BriefcaseIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-500 transition-colors duration-300 flex-shrink-0" />
            <span className="text-sm truncate">{employee.role}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <BuildingOfficeIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-500 transition-colors duration-300 flex-shrink-0" />
            <span className="text-sm truncate">{employee.branch}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <ShieldCheckIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-500 transition-colors duration-300 flex-shrink-0" />
            <span
              className={`text-sm ${employee.healthInsurance ? 'text-green-600' : 'text-red-500'}`}
            >
              {employee.healthInsurance ? 'Con seguro médico' : 'Sin seguro médico'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-t border-gray-100 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
        <div className="flex justify-end space-x-3">
          <button
            onClick={e => {
              e.stopPropagation();
              handleEdit();
            }}
            className="text-blue-500 hover:text-blue-600 font-medium text-sm px-2 py-1 rounded hover:bg-blue-50 transition-all duration-300 cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-500 hover:text-red-600 font-medium text-sm px-2 py-1 rounded hover:bg-red-50 transition-all duration-300 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
