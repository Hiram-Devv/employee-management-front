import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import EditEmployeeModalView from '@/views/employees/EditEmployeeModalView';
import DeleteEmployeeModalView from '@/views/employees/DeleteEmployeeModalView';
import EmployeeDetails from '@/views/employees/EmployeeDetails';
import PayrollView from '@/views/employees/PayrollView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />}>
            <Route path="employees/:employeeId/edit" element={<EditEmployeeModalView />} />
            <Route path="employees/:employeeId/delete" element={<DeleteEmployeeModalView />} />
          </Route>
          <Route path="/employees/:employeeId/details" element={<EmployeeDetails />} />
          <Route path="/employees/:employeeId/payroll" element={<PayrollView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
