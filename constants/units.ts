/**
 * 단위 종류 및 SI 기준 단위 정의
 * 각 단위는 SI 기본 단위로의 변환 계수를 가짐 (value * factor = SI value)
 */

export type UnitCategoryKey =
  | 'length'
  | 'area'
  | 'weight'
  | 'volume'
  | 'temperature'
  | 'pressure'
  | 'speed'
  | 'data'
  | 'time';

export interface UnitItem {
  id: string;
  name: string; // 표시명 (다국어는 별도 처리)
  nameKey: string; // i18n key
  factor: number; // to SI: value * factor = SI. from SI: SI / factor = value
  /** 온도는 선형이 아니므로 별도 변환 사용 */
  isTemperature?: boolean;
}

export interface UnitCategory {
  id: UnitCategoryKey;
  nameKey: string;
  siUnitId: string;
  units: UnitItem[];
}

// SI base: m, m², kg, m³, K, Pa, m/s, byte, s
export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    nameKey: 'units.length',
    siUnitId: 'm',
    units: [
      { id: 'mm', nameKey: 'units.mm', name: 'mm', factor: 0.001 },
      { id: 'cm', nameKey: 'units.cm', name: 'cm', factor: 0.01 },
      { id: 'm', nameKey: 'units.m', name: 'm', factor: 1 },
      { id: 'km', nameKey: 'units.km', name: 'km', factor: 1000 },
      { id: 'in', nameKey: 'units.in', name: 'in', factor: 0.0254 },
      { id: 'ft', nameKey: 'units.ft', name: 'ft', factor: 0.3048 },
      { id: 'yd', nameKey: 'units.yd', name: 'yd', factor: 0.9144 },
      { id: 'mi', nameKey: 'units.mi', name: 'mi', factor: 1609.344 },
    ],
  },
  {
    id: 'area',
    nameKey: 'units.area',
    siUnitId: 'm2',
    units: [
      { id: 'mm2', nameKey: 'units.mm2', name: 'mm²', factor: 1e-6 },
      { id: 'cm2', nameKey: 'units.cm2', name: 'cm²', factor: 1e-4 },
      { id: 'm2', nameKey: 'units.m2', name: 'm²', factor: 1 },
      { id: 'km2', nameKey: 'units.km2', name: 'km²', factor: 1e6 },
      { id: 'ha', nameKey: 'units.ha', name: 'ha', factor: 10000 },
      { id: 'in2', nameKey: 'units.in2', name: 'in²', factor: 0.00064516 },
      { id: 'ft2', nameKey: 'units.ft2', name: 'ft²', factor: 0.09290304 },
      { id: 'yd2', nameKey: 'units.yd2', name: 'yd²', factor: 0.83612736 },
    ],
  },
  {
    id: 'weight',
    nameKey: 'units.weight',
    siUnitId: 'kg',
    units: [
      { id: 'mg', nameKey: 'units.mg', name: 'mg', factor: 1e-6 },
      { id: 'g', nameKey: 'units.g', name: 'g', factor: 0.001 },
      { id: 'kg', nameKey: 'units.kg', name: 'kg', factor: 1 },
      { id: 't', nameKey: 'units.t', name: 't', factor: 1000 },
      { id: 'oz', nameKey: 'units.oz', name: 'oz', factor: 0.028349523125 },
      { id: 'lb', nameKey: 'units.lb', name: 'lb', factor: 0.45359237 },
    ],
  },
  {
    id: 'volume',
    nameKey: 'units.volume',
    siUnitId: 'm3',
    units: [
      { id: 'ml', nameKey: 'units.ml', name: 'mL', factor: 1e-6 },
      { id: 'l', nameKey: 'units.l', name: 'L', factor: 0.001 },
      { id: 'm3', nameKey: 'units.m3', name: 'm³', factor: 1 },
      { id: 'in3', nameKey: 'units.in3', name: 'in³', factor: 1.6387064e-5 },
      { id: 'ft3', nameKey: 'units.ft3', name: 'ft³', factor: 0.028316846592 },
      { id: 'gal', nameKey: 'units.gal', name: 'gal', factor: 0.003785411784 },
      { id: 'qt', nameKey: 'units.qt', name: 'qt', factor: 0.000946352946 },
    ],
  },
  {
    id: 'temperature',
    nameKey: 'units.temperature',
    siUnitId: 'K',
    units: [
      { id: 'K', nameKey: 'units.K', name: 'K', factor: 1, isTemperature: true },
      { id: 'C', nameKey: 'units.C', name: '°C', factor: 1, isTemperature: true },
      { id: 'F', nameKey: 'units.F', name: '°F', factor: 1, isTemperature: true },
    ],
  },
  {
    id: 'pressure',
    nameKey: 'units.pressure',
    siUnitId: 'Pa',
    units: [
      { id: 'Pa', nameKey: 'units.Pa', name: 'Pa', factor: 1 },
      { id: 'kPa', nameKey: 'units.kPa', name: 'kPa', factor: 1000 },
      { id: 'MPa', nameKey: 'units.MPa', name: 'MPa', factor: 1e6 },
      { id: 'bar', nameKey: 'units.bar', name: 'bar', factor: 100000 },
      { id: 'atm', nameKey: 'units.atm', name: 'atm', factor: 101325 },
      { id: 'psi', nameKey: 'units.psi', name: 'psi', factor: 6894.757293168 },
    ],
  },
  {
    id: 'speed',
    nameKey: 'units.speed',
    siUnitId: 'm_s',
    units: [
      { id: 'm_s', nameKey: 'units.m_s', name: 'm/s', factor: 1 },
      { id: 'km_h', nameKey: 'units.km_h', name: 'km/h', factor: 1 / 3.6 },
      { id: 'mph', nameKey: 'units.mph', name: 'mph', factor: 0.44704 },
      { id: 'knot', nameKey: 'units.knot', name: 'knot', factor: 0.514444 },
      { id: 'ft_s', nameKey: 'units.ft_s', name: 'ft/s', factor: 0.3048 },
    ],
  },
  {
    id: 'data',
    nameKey: 'units.data',
    siUnitId: 'B',
    units: [
      { id: 'B', nameKey: 'units.B', name: 'B', factor: 1 },
      { id: 'KB', nameKey: 'units.KB', name: 'KB', factor: 1024 },
      { id: 'MB', nameKey: 'units.MB', name: 'MB', factor: 1024 * 1024 },
      { id: 'GB', nameKey: 'units.GB', name: 'GB', factor: 1024 ** 3 },
      { id: 'TB', nameKey: 'units.TB', name: 'TB', factor: 1024 ** 4 },
      { id: 'Kb', nameKey: 'units.Kb', name: 'Kb', factor: 128 },
      { id: 'Mb', nameKey: 'units.Mb', name: 'Mb', factor: 128 * 1024 },
      { id: 'Gb', nameKey: 'units.Gb', name: 'Gb', factor: 128 * 1024 ** 2 },
    ],
  },
  {
    id: 'time',
    nameKey: 'units.time',
    siUnitId: 's',
    units: [
      { id: 'ms', nameKey: 'units.ms', name: 'ms', factor: 0.001 },
      { id: 's', nameKey: 'units.s', name: 's', factor: 1 },
      { id: 'min', nameKey: 'units.min', name: 'min', factor: 60 },
      { id: 'h', nameKey: 'units.h', name: 'h', factor: 3600 },
      { id: 'd', nameKey: 'units.d', name: 'd', factor: 86400 },
    ],
  },
];

function getCategory(categoryId: UnitCategoryKey): UnitCategory {
  const cat = UNIT_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) throw new Error(`Unknown category: ${categoryId}`);
  return cat;
}

function getUnit(categoryId: UnitCategoryKey, unitId: string): UnitItem {
  const cat = getCategory(categoryId);
  const u = cat.units.find((x) => x.id === unitId);
  if (!u) throw new Error(`Unknown unit: ${unitId} in ${categoryId}`);
  return u;
}

/** SI 값으로 변환 (온도 제외) */
function toSI(value: number, categoryId: UnitCategoryKey, unitId: string): number {
  const u = getUnit(categoryId, unitId);
  if (u.isTemperature) {
    if (unitId === 'K') return value;
    if (unitId === 'C') return value + 273.15;
    if (unitId === 'F') return (value - 32) * (5 / 9) + 273.15;
  }
  return value * u.factor;
}

/** SI 값에서 해당 단위로 변환 (온도 제외) */
function fromSI(siValue: number, categoryId: UnitCategoryKey, unitId: string): number {
  const u = getUnit(categoryId, unitId);
  if (u.isTemperature) {
    if (unitId === 'K') return siValue;
    if (unitId === 'C') return siValue - 273.15;
    if (unitId === 'F') return (siValue - 273.15) * (9 / 5) + 32;
  }
  return siValue / u.factor;
}

/** 원본 단위 값 → 대상 단위 값 */
export function convertUnit(
  value: number,
  categoryId: UnitCategoryKey,
  fromUnitId: string,
  toUnitId: string
): number {
  const si = toSI(value, categoryId, fromUnitId);
  return fromSI(si, categoryId, toUnitId);
}

/** 변환 결과 포맷 (숫자 → 문자열, 천단위 구분 등) */
export function formatConverted(value: number): string {
  if (value === 0) return '0';
  if (Number.isNaN(value) || !Number.isFinite(value)) return '—';
  const abs = Math.abs(value);
  if (abs >= 1e9 || (abs < 1e-3 && abs > 0)) {
    return value.toExponential(2);
  }
  if (abs >= 1000 || (abs < 1 && abs >= 0.0001)) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 0 });
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
}

export { getCategory, getUnit, toSI, fromSI };
