import type { EmployeeFormData } from '@/types';
import { PrinterIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

type PayrollFormProps = {
  data: EmployeeFormData;
};

type DayWork = {
  worked: boolean;
  overtimeHours: string;
};

type WeekWork = {
  [key: string]: DayWork;
};

export default function PayrollForm({ data }: PayrollFormProps) {
  const [baseSalary, setBaseSalary] = useState<string>('');
  const [daysWorked, setDaysWorked] = useState<string>('');
  const [overtimeHours, setOvertimeHours] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('');
  const [incentive, setIncentive] = useState<string>('');
  const [bonus, setBonus] = useState<string>('');

  const [weekWork, setWeekWork] = useState<WeekWork>({
    lunes: { worked: false, overtimeHours: '' },
    martes: { worked: false, overtimeHours: '' },
    miércoles: { worked: false, overtimeHours: '' },
    jueves: { worked: false, overtimeHours: '' },
    viernes: { worked: false, overtimeHours: '' },
    sábado: { worked: false, overtimeHours: '' },
    domingo: { worked: false, overtimeHours: '' },
  });

  // Función para formatear números como moneda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Función para convertir string a número
  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Actualizar días trabajados basado en la selección de días
  useEffect(() => {
    const workedDays = Object.values(weekWork).filter(day => day.worked).length;
    setDaysWorked(workedDays.toString());
  }, [weekWork]);

  // Actualizar horas extras basado en la selección de días
  useEffect(() => {
    const totalOvertime = Object.values(weekWork).reduce(
      (acc, day) => acc + parseNumber(day.overtimeHours),
      0
    );
    setOvertimeHours(totalOvertime.toString());
  }, [weekWork]);

  // Cálculos automáticos
  const baseSalaryNum = parseNumber(baseSalary);
  const dailySalary = baseSalaryNum / 7; // Por semana
  const hourlyRate = dailySalary / 9; // Asumiendo 9 horas por día
  const overtimeValue = hourlyRate;
  const overtimeTotal = overtimeValue * parseNumber(overtimeHours);
  const total =
    dailySalary * parseNumber(daysWorked) +
    overtimeTotal -
    parseNumber(discount) -
    parseNumber(insurance) +
    parseNumber(incentive) +
    parseNumber(bonus);

  const handleDayWorkChange = (day: string, worked: boolean) => {
    setWeekWork(prev => ({
      ...prev,
      [day]: { ...prev[day], worked },
    }));
  };

  const handleOvertimeChange = (day: string, hours: string) => {
    setWeekWork(prev => ({
      ...prev,
      [day]: { ...prev[day], overtimeHours: hours },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 hover:border-blue-100 transition-all duration-300">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Nómina semanal</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer">
            <PrinterIcon className="h-5 w-5 mr-2" />
            Imprimir
          </button>
          <button className="flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Guardar
          </button>
        </div>
      </div>

      {/* Seccion de fechas */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg mb-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Fecha inicial
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Fecha final
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Información del empleado */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Información del Empleado</h2>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del empleado</label>
            <input
              type="text"
              value={data.employeeName}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Puesto</label>
            <input
              type="text"
              value={data.role}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Desglose de salario */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Desglose de Salario</h2>

        <div className="flex gap-6">
          {/* Lado izquierdo - Cálculos y totales */}
          <div className="w-1/2 space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              {/* Salario base y diario */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Salario base semanal
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={baseSalary}
                    onChange={e => setBaseSalary(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Salario diario</label>
                <input
                  type="text"
                  value={formatCurrency(dailySalary)}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>

              {/* Días trabajados */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Días trabajados</label>
                <input
                  type="text"
                  value={daysWorked}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>

              {/* Horas extras */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Valor hora extra</label>
                <input
                  type="text"
                  value={formatCurrency(overtimeValue)}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Horas extras trabajadas
                </label>
                <input
                  type="text"
                  value={overtimeHours}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Total horas extras
                </label>
                <input
                  type="text"
                  value={formatCurrency(overtimeTotal)}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>
            </div>

            {/* Descuentos y bonos */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Descuento</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Seguro</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={insurance}
                    onChange={e => setInsurance(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Incentivo</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={incentive}
                    onChange={e => setIncentive(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">Bono (opcional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={bonus}
                    onChange={e => setBonus(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total a pagar</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Lado derecho - Control semanal */}
          <div className="w-1/2">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Control Semanal</h3>
              <div className="space-y-4">
                {Object.entries(weekWork).map(([day, { worked, overtimeHours }]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={worked}
                        onChange={e => handleDayWorkChange(day, e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-lg font-medium text-gray-700 capitalize">{day}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Horas extras:</label>
                      <input
                        type="text"
                        value={overtimeHours}
                        onChange={e => handleOvertimeChange(day, e.target.value)}
                        disabled={!worked}
                        className="w-20 px-2 py-1 bg-white border border-gray-300 rounded text-right disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
