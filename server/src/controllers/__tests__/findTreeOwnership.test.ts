import { CompanyInterface } from '../../data/types/CompanyTypes';
import { companyRelations, findCompaniesByParent, findLandsByCompanyId } from '../../data/dataReader';
import { LandInterface } from '../../data/types/LandTypes';
import { TreeOwnership } from '../IndexControllerTypes';
import { findTreeOwnership, initialTreeOwnershipReducer } from '../IndexController';

type findTreeOwnershipTestFc = (companyObjExample:CompanyInterface, ownedCompaniesByCompany:CompanyInterface[], test:TreeOwnership) => void

const findTreeOwnershipTest:findTreeOwnershipTestFc = (companyObjExample, ownedCompaniesByCompany, test) => {
  // check if direct owned companies are not included in TreeOwnership
  const repeatedCompanies = ownedCompaniesByCompany.filter(compFromOwnedDirectly => {
    return test.companies.reduce((booleanAcc, companyFromTestResult) => {
      return booleanAcc || companyFromTestResult.id === compFromOwnedDirectly.id;
    }, false as boolean);
  });
  expect(repeatedCompanies.length).toBe(0);

  // check if direct owned lands are not included in TreeOwnership
  const repeatedLands = test.lands.filter(landsFromTest => landsFromTest.companyId === companyObjExample.id);
  expect(repeatedLands.length).toBe(0);

  // check if lands they dont have duplicates
  const setCompaniesIds = new Set(test.companies.map(comp => comp.id));
  expect(setCompaniesIds.size).toBe(test.companies.length);

  // check if lands they dont have duplicates
  const setLandsIds = new Set(test.lands.map(land => land.landId));
  expect(setLandsIds.size).toBe(test.lands.length);

  // check if nesting is working correctly in reduce for lands
  const landsOwnedByIndirectCompanies:LandInterface[] = test.companies.reduce((landsAcc, companyFromTest) => {
    const landsOwnedByCompanyFromTest = findLandsByCompanyId(companyFromTest.id);
    return [...landsAcc, ...landsOwnedByCompanyFromTest];
  }, [] as LandInterface[]);

  // check if nesting is working correctly in reduce for companies
  const companiesOwnedByIndirectCompanies:CompanyInterface[] = test.companies.reduce((companiesAcc, companyFromTest) => {
    const companiesOwnedByCompanyFromTest = findCompaniesByParent(companyFromTest.id);
    return [...companiesAcc, ...companiesOwnedByCompanyFromTest];
  }, [] as CompanyInterface[]);

  // Since direct Company is a direct ownership from companyObjExample but what it
  // owns would be indirect ownership for companyObjExample
  const landsOwnedByDirectCompanies:LandInterface[] = ownedCompaniesByCompany.reduce((landsAcc, companyFromOwnedCompanies) => {
    const landsOwnedByCompanyFromOwnedCompanies = findLandsByCompanyId(companyFromOwnedCompanies.id);
    return [...landsAcc, ...landsOwnedByCompanyFromOwnedCompanies];
  }, [] as LandInterface[]);
  const allIndirectLands = [...landsOwnedByIndirectCompanies, ...landsOwnedByDirectCompanies];
  expect(allIndirectLands.length).toBe(test.lands.length);

  // same for companies
  const companiesOwnedByOwnedCompanies:CompanyInterface[] = ownedCompaniesByCompany.reduce((companiesAcc, companyFromOwnedCompanies) => {
    const companiesOwnedByCompanyFromOwnedCompanies = findCompaniesByParent(companyFromOwnedCompanies.id);
    return [...companiesAcc, ...companiesOwnedByCompanyFromOwnedCompanies];
  }, [] as CompanyInterface[]);
  const allIndirectCompanies = [...companiesOwnedByIndirectCompanies, ...companiesOwnedByOwnedCompanies];
  expect(allIndirectCompanies.length).toBe(test.companies.length);
};

describe('testing Index Controller function: findTreeOwnership', () => {
  it('testing findTreeOwnership with C86586227406 has 0 indirectly companies', () => {
    const companyObjExample = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const ownedCompaniesByCompany: CompanyInterface[] = findCompaniesByParent(companyObjExample.id);
    const test:TreeOwnership = ownedCompaniesByCompany.reduce(findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership);
    expect(test.lands.length).toBe(0);
    expect(test.companies.length).toBe(0);

    findTreeOwnershipTest(companyObjExample, ownedCompaniesByCompany, test);
  });

  it('testing findTreeOwnership with R860395717497 has many indirectly companies', () => {
    const companyObjExample = {
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    };

    const ownedCompaniesByCompany: CompanyInterface[] = findCompaniesByParent(companyObjExample.id);
    const test:TreeOwnership = ownedCompaniesByCompany.reduce(findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership);
    expect(test.lands.length).toBe(48);
    expect(test.companies.length).toBe(14);
    findTreeOwnershipTest(companyObjExample, ownedCompaniesByCompany, test);
  });

  it('failing reduce mapper with id C16697450315', () => {
    const companyObjExample = {
      id: 'C16697450315',
      name: 'SALLIGLEE OLD LIMITED',
      parentId: 'R144770447190'
    };

    const ownedCompaniesByCompany: CompanyInterface[] = findCompaniesByParent(companyObjExample.id);
    const test:TreeOwnership = ownedCompaniesByCompany.reduce(findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership);
    expect(test.companies.length).toBe(86);
    expect(test.lands.length).toBe(2633);

    findTreeOwnershipTest(companyObjExample, ownedCompaniesByCompany, test);
  });

  it('loop first 100 companies findTreeOwnership to see if the test written correct', async () => {
    const first100Companies = companyRelations.slice(0, 100);
    first100Companies.forEach(companyObjExample => {
      const ownedCompaniesByCompany: CompanyInterface[] = findCompaniesByParent(companyObjExample.id);
      const test:TreeOwnership = ownedCompaniesByCompany.reduce(findTreeOwnership, initialTreeOwnershipReducer as TreeOwnership);

      findTreeOwnershipTest(companyObjExample, ownedCompaniesByCompany, test);
    });
  });
});
