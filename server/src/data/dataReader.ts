import * as fs from 'fs';
import * as path from 'path';
import { CompanyInterface } from './types/CompanyTypes';
import { LandInterface } from './types/LandTypes';

type FindLandsFcInterface = (id:CompanyInterface['id']) => LandInterface[]
type FindCompaniesByParentInter = (id:CompanyInterface['id']) => CompanyInterface[]
type FindCompanyByPropInter = (searchProp: keyof Omit<CompanyInterface, 'parentId'>, searchValue: CompanyInterface[keyof Omit<CompanyInterface, 'parentId'>]) => CompanyInterface|undefined

export const companyRelations = fs.readFileSync(path.resolve(__dirname, './company_relations.csv'), 'utf8')
  .split('\n')
  .slice(1) // header row
  .map((line) => {
    const [id, name, parentId] = line.split(',');
    return { id, name, parentId };
  });

export const landOwnership = fs.readFileSync(path.resolve(__dirname, './land_ownership.csv'), 'utf8')
  .split('\n')
  .slice(1) // header row
  .map((line) => {
    const [landId, companyId] = line.split(',');
    return { landId, companyId };
  });

export const findLandsByCompanyId:FindLandsFcInterface = (id) => {
  return landOwnership.filter(land => land.companyId === id);
};

export const findCompanyByProp:FindCompanyByPropInter = (searchProp, searchValue) => {
  return companyRelations.find(company => company[searchProp] === searchValue);
};

export const findCompaniesByParent:FindCompaniesByParentInter = (id) => {
  return companyRelations.filter(company => company.parentId === id);
};
