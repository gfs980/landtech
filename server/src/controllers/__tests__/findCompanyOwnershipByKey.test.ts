import { CompanyOwnershipApi } from '../IndexControllerTypes';
import { findCompanyOwnershipByKey } from '../IndexController';

describe('testing Index Controller function: findCompanyOwnershipByKey', () => {
  it('testing findCompanyOwnershipByKey with C86586227406 has 0 indirectly companies', () => {
    const companyObjExample = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const ownedCompaniesByCompany: CompanyOwnershipApi = findCompanyOwnershipByKey(companyObjExample.id);
    expect(ownedCompaniesByCompany.searchedResult).toStrictEqual(companyObjExample);

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(ownedCompaniesByCompany.indirectly.lands.length).toBe(0);
    // we know from findTreeOwnership tests that it has no indirect companies
    expect(ownedCompaniesByCompany.indirectly.companies.length).toBe(0);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(ownedCompaniesByCompany.directly.lands.length).toBe(1);
    // we know from findCompaniesByParent tests that it has no indirect companies
    expect(ownedCompaniesByCompany.directly.companies.length).toBe(5);
  });

  it('testing findCompanyOwnershipByKey with R860395717497 has many indirectly companies', () => {
    const companyObjExample = {
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    };
    // This companyObjExample name is duplicate so we wont test equality
    const ownedCompaniesByCompany: CompanyOwnershipApi = findCompanyOwnershipByKey(companyObjExample.name);

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(ownedCompaniesByCompany.indirectly.lands.length).not.toBe(48);
    expect(ownedCompaniesByCompany.indirectly.companies.length).not.toBe(14);

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(ownedCompaniesByCompany.directly.lands.length).toBe(0);
    expect(ownedCompaniesByCompany.directly.companies.length).not.toBe(13);
  });

  it('testing the findCompanyOwnershipByKey function that should throw error', () => {
    const t = () => {
      findCompanyOwnershipByKey('testing name should throw error');
    };
    expect(t).toThrow('Company not found by this ID or Name');
  });
});
