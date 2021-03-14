import { companyRelations, findLandsByCompanyId, findCompanyByProp, landOwnership, findCompaniesByParent } from '../dataReader';
import { testCompaniesArray, testLandsArray } from '../types/dataStructureTypeTests';

describe('testing the dataReader', () => {
  it('testing companyRelations if returns correct format', () => {
    testCompaniesArray(companyRelations);
  });

  it('testing landOwnership if returns correct format', () => {
    testLandsArray(landOwnership);
  });

  it('checking company id: C100517359149', () => {
    const companiesC100517359149 = companyRelations.filter(company => company.parentId === 'C100517359149');
    expect(companiesC100517359149.length).toBe(0);
  });

  it('checking company id: C86586227406', () => {
    const companiesC86586227406 = companyRelations.filter(company => company.parentId === 'C86586227406');
    expect(companiesC86586227406.length).toBe(5);
  });

  it('checking lands id: C100517359149', () => {
    const landsC100517359149 = landOwnership.filter(company => company.companyId === 'C100517359149');
    expect(landsC100517359149.length).toBe(0);
  });

  it('checking lands id: C86586227406', () => {
    const landsC86586227406 = landOwnership.filter(company => company.companyId === 'C86586227406');
    expect(landsC86586227406.length).toBe(1);
  });

  it('find company ids that own other companies', () => {
    const ownedCompanies = companyRelations.filter(company => {
      return companyRelations.filter(comp => comp.parentId === company.id).length;
    }).map(cp => ({
      ...cp,
      companiesOwned: companyRelations.filter(comp => comp.parentId === cp.id).length,
      landsOwned: landOwnership.filter(land => land.companyId === cp.id).length
    }));
    expect(ownedCompanies.length).toBeGreaterThan(0);
  });

  it('testing if the company ID not duplicated', () => {
    const setCompaniesIds = new Set(companyRelations.map(comp => comp.id));
    expect(setCompaniesIds.size).toBe(companyRelations.length);
  });

  it('testing if the company names not duplicated', () => {
    const setCompaniesNames = new Set(companyRelations.map(comp => comp.name));
    // Here we know that names in the Company csv file duplicated
    // This will affect our search result if we search company by name
    expect(setCompaniesNames.size).toBeLessThanOrEqual(companyRelations.length);
  });

  it('testing if the land ID not duplicated', () => {
    const setCompaniesIds = new Set(landOwnership.map(land => land.landId));
    expect(setCompaniesIds.size).toBe(landOwnership.length);
  });
});

describe('testing findLandsByCompanyId', () => {
  it('testing landFinder', () => {
    const lands = findLandsByCompanyId('R590980645905');
    testLandsArray(lands);
  });

  it('testing landFinder with company not owning land', () => {
    const lands = findLandsByCompanyId('C101307938502');
    expect(lands.length).toBe(0);
  });

  it('testing landFinder by ID C858370192866', () => {
    const lands = findLandsByCompanyId('C858370192866');
    expect(lands.length).toBe(0);
  });

  it('testing landFinder by ID C100517359149', () => {
    const modelResult = findLandsByCompanyId('C100517359149');
    expect(modelResult.length).toBe(0);
    expect(modelResult.length).toBe(landOwnership.filter(company => company.companyId === 'C100517359149').length);
  });

  it('testing landFinder by ID C86586227406', () => {
    const modelResult = findLandsByCompanyId('C86586227406');
    expect(modelResult.length).toBe(1);
    expect(modelResult.length).toBe(landOwnership.filter(company => company.companyId === 'C86586227406').length);
  });

  it('testing landFinder with bad id', () => {
    const lands = findLandsByCompanyId('geagjadkjgdaad');
    expect(lands.length).toBe(0);
  });
});

describe('testing findCompanyByProp', () => {
  it('testing find company by existing id', () => {
    expect(findCompanyByProp('id', 'C100517359149')).toStrictEqual({
      id: 'C100517359149',
      name: 'Leseetan Midlands Group Limited',
      parentId: 'R764915829891'
    });
  });

  it('testing find company by existing id C86586227406', () => {
    expect(findCompanyByProp('id', 'C86586227406')).toStrictEqual({
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    });
  });

  it('testing find company by existing id R860395717497', () => {
    expect(findCompanyByProp('id', 'R860395717497')).toStrictEqual({
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    });
  });

  it('testing find company by not existing id', () => {
    expect(findCompanyByProp('id', 'ageahgjaegea')).toStrictEqual(undefined);
  });

  it('testing find company by existing name', () => {
    expect(findCompanyByProp('name', 'Leseetan Midlands Group Limited')).toStrictEqual({
      id: 'C100517359149',
      name: 'Leseetan Midlands Group Limited',
      parentId: 'R764915829891'
    });
  });

  it('testing find company by not existing name', () => {
    expect(findCompanyByProp('name', 'ageahgjaegea')).toStrictEqual(undefined);
  });
});

describe('testing findCompaniesByParent', () => {
  it('should return array of companies owned by the C86586227406', function () {
    const ownedCompanies = findCompaniesByParent('C86586227406');
    expect(ownedCompanies.length).toBe(5);
    expect(ownedCompanies[0].parentId).toBe('C86586227406');
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'C86586227406').length);
  });

  it('should return array of companies owned by the C100517359149', function () {
    const ownedCompanies = findCompaniesByParent('C100517359149');
    expect(ownedCompanies.length).toBe(0);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'C100517359149').length);
  });

  it('should return array empty array for fake ID', function () {
    const ownedCompanies = findCompaniesByParent('akjgkaejgja');
    expect(ownedCompanies.length).toBe(0);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'akjgkaejgja').length);
  });

  it('should return array owned by C362757958866', function () {
    const ownedCompanies = findCompaniesByParent('C362757958866');
    expect(ownedCompanies.length).toBe(0);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'C362757958866').length);
  });

  it('should return array owned by C402951354884', function () {
    const ownedCompanies = findCompaniesByParent('C402951354884');
    expect(ownedCompanies.length).toBe(0);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'C402951354884').length);
  });

  it('should return array owned by CR247403325511', function () {
    const ownedCompanies = findCompaniesByParent('CR247403325511');
    expect(ownedCompanies.length).toBe(0);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'CR247403325511').length);
  });

  it('should return array owned by R860395717497', function () {
    const ownedCompanies = findCompaniesByParent('R860395717497');
    expect(ownedCompanies.length).toBe(13);
    expect(ownedCompanies.length).toBe(companyRelations.filter(company => company.parentId === 'R860395717497').length);
  });
});
