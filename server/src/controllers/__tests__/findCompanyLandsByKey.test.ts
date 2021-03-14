import { CompanyLandsApi } from '../IndexControllerTypes';
import { findCompanyLandsByKey } from '../IndexController';

describe('testing Index Controller function: findCompanyLandsByKey', () => {
  it('testing findCompanyLandsByKey with C86586227406 has 0 indirectly companies', () => {
    const companyObjExample = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const ownedCompaniesByCompany: CompanyLandsApi = findCompanyLandsByKey(companyObjExample.id);

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(ownedCompaniesByCompany.indirectly.lands.length).toBe(0);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(ownedCompaniesByCompany.directly.lands.length).toBe(1);
  });

  it('testing findCompanyLandsByKey with R860395717497 has many indirectly companies', () => {
    const companyObjExample = {
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    };
    // This companyObjExample name is duplicate so we wont test equality
    const ownedCompaniesByCompany: CompanyLandsApi = findCompanyLandsByKey(companyObjExample.name);

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(ownedCompaniesByCompany.indirectly.lands.length).not.toBe(48);

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(ownedCompaniesByCompany.directly.lands.length).toBe(0);
  });

  it('testing the findCompanyLandsByKey function that should throw error', () => {
    const t = () => {
      findCompanyLandsByKey('testing name should throw error');
    };
    expect(t).toThrow('Company not found by this ID or Name');
  });
});
