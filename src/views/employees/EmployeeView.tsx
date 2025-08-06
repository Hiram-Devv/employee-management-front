import { getEmployees } from '@/api/EmployeeAPI';
import { useQuery } from '@tanstack/react-query';
import EmployeeCard from '@/components/employees/EmployeeCard';

export default function EmployeeView() {
  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay empleados registrados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {data.map(employee => (
        <EmployeeCard key={employee._id} employee={employee} />
      ))}
    </div>
  );
}
