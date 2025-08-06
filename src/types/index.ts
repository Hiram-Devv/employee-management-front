import { z } from 'zod';

/** Empleados */

export const employeeSchema = z.object({
  _id: z.string(),
  employeeName: z.string(),
  phone: z.string(),
  role: z.string(),
  healthInsurance: z.boolean(),
  branch: z.string(),
});

export const dashboardEmployeeSchema = z.array(
  employeeSchema.pick({
    _id: true,
    employeeName: true,
    phone: true,
    role: true,
    healthInsurance: true,
    branch: true,
  })
);

export type Employee = z.infer<typeof employeeSchema>;
export type EmployeeFormData = Pick<
  Employee,
  'employeeName' | 'phone' | 'role' | 'branch' | 'healthInsurance'
>;
