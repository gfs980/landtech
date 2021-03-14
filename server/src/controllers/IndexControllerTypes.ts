import { CompanyInterface } from '../data/types/CompanyTypes';
import { LandInterface } from '../data/types/LandTypes';

export interface TreeOwnership {
  companies: CompanyInterface[]
  lands: LandInterface[]
}
export interface TreeOwnershipApi extends TreeOwnership{
  landUnits: number,
  companyQuantity: number,
}
export interface CompanyOwnership {
  directly: TreeOwnership
  indirectly: TreeOwnership
}
export interface CompanyOwnershipApi {
  searchedResult: CompanyInterface
  directly: TreeOwnershipApi
  indirectly: TreeOwnershipApi
}
export interface CompanyLandsApi {
  directly: Omit<TreeOwnershipApi, 'companies'|'companyQuantity'>
  indirectly: Omit<TreeOwnershipApi, 'companies'|'companyQuantity'>
}

export type TreeOwnershipReducer = (accumulator: TreeOwnership, currentValue: CompanyInterface) => TreeOwnership;
export type WhatCompanyOwnsFnc = (company: CompanyInterface) => CompanyOwnership
export type FindCompanyOwnershipByKeyFnc = (key:CompanyInterface['id']|CompanyInterface['name']) => CompanyOwnershipApi
export type FindCompanyLandsByKeyFnc = (key:CompanyInterface['id']|CompanyInterface['name']) => CompanyLandsApi
