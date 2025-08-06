import { Listbox } from '@headlessui/react';
import { ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import type { EmployeeFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee } from '@/api/EmployeeAPI';
import { toast } from 'react-toastify';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const roles = [
  { id: 0, name: 'Seleccione un rol' },
  { id: 1, name: 'Desarrollador' },
  { id: 2, name: 'Diseñador' },
  { id: 3, name: 'Gerente' },
  { id: 4, name: 'Recursos Humanos' },
];

const branches = [
  { id: 0, name: 'Seleccione una sucursal' },
  { id: 1, name: 'Sucursal Central' },
  { id: 2, name: 'Sucursal Norte' },
  { id: 3, name: 'Sucursal Sur' },
];

type EmployeeFormProps = {
  onClose: () => void;
};

export default function AddEmployeeForm({ onClose }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<EmployeeFormData>({
    defaultValues: {
      employeeName: '',
      phone: '',
      role: '',
      healthInsurance: false,
      branch: '',
    },
  });

  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [healthInsurance, setHealthInsurance] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createEmployee,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(data);
      onClose();
    },
  });

  const handleSubmitForm = (formData: EmployeeFormData) => {
    mutate(formData);
  };

  const handleFormReset = () => {
    reset();
    setResetTrigger(prev => prev + 1);
  };

  useEffect(() => {
    setSelectedRole(roles[0]);
    setSelectedBranch(branches[0]);
    setHealthInsurance(false);
  }, [resetTrigger]);

  const handleRoleChange = (role: (typeof roles)[0]) => {
    setSelectedRole(role);
    setValue('role', role.name);
    trigger('role');
  };

  const handleBranchChange = (branch: (typeof branches)[0]) => {
    setSelectedBranch(branch);
    setValue('branch', branch.name);
    trigger('branch');
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4" noValidate>
      {/* Nombre */}
      <div>
        <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Empleado
        </label>
        <input
          type="text"
          id="employeeName"
          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ingrese el nombre completo"
          {...register('employeeName', {
            required: 'El nombre del empleado es obligatorio',
          })}
        />
        {/* Reserved space for error message  */}
        <div className="h-5 mt-2">
          {errors.employeeName && (
            <ErrorMessage>{errors.employeeName.message ?? 'Error en el campo'}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ingrese el número de teléfono"
          {...register('phone', {
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'El teléfono debe tener 10 dígitos',
            },
          })}
        />
        {/* Reserved space for error message  */}
        <div className="h-5 mt-2">
          {errors.phone && (
            <ErrorMessage>{errors.phone.message ?? 'Error en el campo'}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Rol */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Rol
        </label>
        <Listbox value={selectedRole} onChange={handleRoleChange}>
          <div className="relative">
            <ListboxButton
              className={`w-full px-3 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                selectedRole.id === 0 ? 'text-gray-500 border-gray-300' : 'border-gray-300'
              }`}
            >
              <span>{selectedRole.name}</span>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </ListboxButton>
            <input
              type="hidden"
              {...register('role', {
                required: 'El rol es obligatorio',
                validate: value => value !== 'Seleccione un rol' || 'Debe seleccionar un rol',
              })}
            />
            <ListboxOptions className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {roles.map(role => (
                <ListboxOption
                  key={role.id}
                  value={role}
                  className={({ selected }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      selected ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {role.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        {/* Reserved space for error message  */}
        <div className="h-5 mt-2">
          {errors.role && <ErrorMessage>{errors.role.message ?? 'Error en el campo'}</ErrorMessage>}
        </div>
      </div>

      {/* Seguro Médico */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Seguro Médico</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => {
              setHealthInsurance(true);
              setValue('healthInsurance', true);
              trigger('healthInsurance');
            }}
            className={`px-4 py-2 rounded-lg border ${
              healthInsurance
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Sí
          </button>
          <button
            type="button"
            onClick={() => {
              setHealthInsurance(false);
              setValue('healthInsurance', false);
              trigger('healthInsurance');
            }}
            className={`px-4 py-2 rounded-lg border ${
              !healthInsurance
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            No
          </button>
          <input type="hidden" {...register('healthInsurance')} />
        </div>
      </div>

      {/* Sucursal */}
      <div>
        <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
          Sucursal
        </label>
        <Listbox value={selectedBranch} onChange={handleBranchChange}>
          <div className="relative">
            <ListboxButton
              className={`w-full px-3 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                selectedBranch.id === 0 ? 'text-gray-500 border-gray-300' : 'border-gray-300'
              }`}
            >
              <span>{selectedBranch.name}</span>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </ListboxButton>
            <input
              type="hidden"
              {...register('branch', {
                required: 'La sucursal es obligatoria',
                validate: value =>
                  value !== 'Seleccione una sucursal' || 'Debe seleccionar una sucursal',
              })}
            />
            <ListboxOptions className=" z-10 w-full py-1 mt-1 mb-3 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {branches.map(branch => (
                <ListboxOption
                  key={branch.id}
                  value={branch}
                  className={({ selected }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      selected ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {branch.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        {/* Reserved space for error message  */}
        <div className="h-5 mt-2">
          {errors.branch && (
            <ErrorMessage>{errors.branch.message ?? 'Error en el campo'}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 mt-6 sticky bottom-0 bg-white pt-2">
        <button
          type="button"
          onClick={() => {
            handleFormReset();
            onClose();
          }}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar empleado
        </button>
      </div>
    </form>
  );
}
