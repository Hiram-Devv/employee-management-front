import { dashboardEmployeeSchema, type Employee, type EmployeeFormData } from '@/types/index';
import api from '@/lib/axios';
import { isAxiosError } from 'axios';

export async function createEmployee(formData: EmployeeFormData) {
  try {
    const { data } = await api.post('/employees', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getEmployees() {
  try {
    const { data } = await api('/employees');
    const response = dashboardEmployeeSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getEmployeesById(id: Employee['_id']) {
  try {
    const { data } = await api(`/employees/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type EmployeeAPIType = {
  formData: EmployeeFormData;
  employeeId: Employee['_id'];
};

export async function updateEmployee({ formData, employeeId }: EmployeeAPIType) {
  try {
    const { data } = await api.put<string>(`/employees/${employeeId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteEmployee(id: Employee['_id']) {
  try {
    const { data } = await api.delete<string>(`/employees/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
