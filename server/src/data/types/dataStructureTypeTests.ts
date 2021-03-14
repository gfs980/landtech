import { CompanyInterface } from './CompanyTypes';
import { LandInterface } from './LandTypes';

type ForeachCompanyFncInt = (companies: CompanyInterface[]) => void;
type ForeachLandFncInt = (companies: LandInterface[]) => void;

export const testCompaniesArray:ForeachCompanyFncInt = (companies) => {
  expect(Array.isArray(companies)).toBe(true);
  expect(companies.length).toBeGreaterThan(0);
  expect(Object.keys(companies[0])).toStrictEqual(['id', 'name', 'parentId']);
};

export const testLandsArray:ForeachLandFncInt = (lands) => {
  expect(Array.isArray(lands)).toBe(true);
  expect(lands.length).toBeGreaterThan(0);
  expect(Object.keys(lands[0])).toStrictEqual(['landId', 'companyId']);
};
