import { findLandsByCompanyId, findCompanyByProp, findCompaniesByParent } from '../data/dataReader';
import { CompanyInterface } from '../data/types/CompanyTypes';
import { LandInterface } from '../data/types/LandTypes';
import {
  CompanyOwnership,
  FindCompanyLandsByKeyFnc,
  FindCompanyOwnershipByKeyFnc, TreeOwnership,
  TreeOwnershipReducer, WhatCompanyOwnsFnc
} from './IndexControllerTypes';

export const initialTreeOwnershipReducer:TreeOwnership = { lands: [], companies: [] };

export const findTreeOwnership:TreeOwnershipReducer = (acc, currentValue) => {
  const findTreeLands: LandInterface[] = findLandsByCompanyId(currentValue.id);
  const findTreeCompanies: CompanyInterface[] = findCompaniesByParent(currentValue.id);

  const nestedTreeOwnership:TreeOwnership = findTreeCompanies.reduce(
    findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership
  );

  return {
    companies: [...acc.companies, ...findTreeCompanies,
      ...nestedTreeOwnership.companies
    ],
    lands: [...acc.lands, ...findTreeLands,
      ...nestedTreeOwnership.lands
    ]
  };
};

export const whatCompanyOwns:WhatCompanyOwnsFnc = (company: CompanyInterface) => {
  const ownedCompaniesDirectly: CompanyInterface[] = findCompaniesByParent(company.id);
  const ownedCompaniesIndirectlyDownwards:TreeOwnership = ownedCompaniesDirectly.reduce(
    findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership
  );
  const directLandsOwned = findLandsByCompanyId(company.id);

  // Find Interval Trees from Parents TEST DOESNT REQUIRE IT!!!!
  // if (company.parentId) {
  //   console.log('We CAN FIND Interval Trees from Parents');
  // }

  return {
    directly: {
      companies: ownedCompaniesDirectly,
      lands: directLandsOwned
    },
    indirectly: ownedCompaniesIndirectlyDownwards
  };
};

export const findCompanyOwnershipByKey:FindCompanyOwnershipByKeyFnc = (key) => {
  const companyById:CompanyInterface|undefined = findCompanyByProp('id', key);
  const searchedResult:CompanyInterface|undefined = companyById !== undefined
    ? companyById
    : findCompanyByProp('name', key);

  if (!searchedResult) throw new Error('Company not found by this ID or Name');
  const companyOwnership: CompanyOwnership = whatCompanyOwns(searchedResult);

  return {
    searchedResult,
    directly: {
      landUnits: companyOwnership.directly.lands.length,
      companyQuantity: companyOwnership.directly.companies.length,
      ...companyOwnership.directly
    },
    indirectly: {
      landUnits: companyOwnership.indirectly.lands.length,
      companyQuantity: companyOwnership.indirectly.companies.length,
      ...companyOwnership.indirectly
    }
  };
};

export const findCompanyLandsByKey:FindCompanyLandsByKeyFnc = (key) => {
  const companyById:CompanyInterface|undefined = findCompanyByProp('id', key);
  const searchedResult:CompanyInterface|undefined = companyById !== undefined
    ? companyById
    : findCompanyByProp('name', key);

  if (!searchedResult) throw new Error('Company not found by this ID or Name');
  const companyOwnership: CompanyOwnership = whatCompanyOwns(searchedResult);

  return {
    directly: {
      landUnits: companyOwnership.directly.lands.length,
      lands: companyOwnership.directly.lands
    },
    indirectly: {
      landUnits: companyOwnership.indirectly.lands.length,
      lands: companyOwnership.indirectly.lands
    }
  };
};
