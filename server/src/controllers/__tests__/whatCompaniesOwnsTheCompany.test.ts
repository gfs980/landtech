import { whatCompanyOwns } from '../IndexController';

describe('testing Index Controller function: findCompanyOwnershipByKey', () => {
  it('testing findCompanyOwnershipByKey with C86586227406 has 0 indirectly companies', () => {
    const companyWithParent = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const result = whatCompanyOwns(companyWithParent);

    Object.entries(result).forEach((values) => {
      expect(Object.keys(values[1])).toStrictEqual(['companies', 'lands']);
    });
    expect(Object.keys(result)).toStrictEqual(['directly', 'indirectly']);

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(result.indirectly.lands.length).toBe(0);
    // we know from findTreeOwnership tests that it has no indirect companies
    expect(result.indirectly.companies.length).toBe(0);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(result.directly.lands.length).toBe(1);
    // we know from findCompaniesByParent tests that it has no indirect companies
    expect(result.directly.companies.length).toBe(5);
  });

  it('testing findCompanyOwnershipByKey with R860395717497 has many indirectly companies', () => {
    const companyWithParent = {
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    };

    const result = whatCompanyOwns(companyWithParent);

    Object.entries(result).forEach((values) => {
      expect(Object.keys(values[1])).toStrictEqual(['companies', 'lands']);
    });
    expect(Object.keys(result)).toStrictEqual(['directly', 'indirectly']);

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(result.indirectly.lands.length).toBe(48);
    // we know from findTreeOwnership tests that it has no indirect companies
    expect(result.indirectly.companies.length).toBe(14);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(result.directly.lands.length).toBe(0);
    // we know from findCompaniesByParent tests that it has no indirect companies
    expect(result.directly.companies.length).toBe(13);
  });
});
