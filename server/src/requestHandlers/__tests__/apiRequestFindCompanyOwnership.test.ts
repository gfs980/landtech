import request from 'supertest';
import { app } from '../../app';

describe(' testing findCompanyOwnership api', () => {
  it('testing main search result api findCompanyOwnership with C86586227406 ID', async () => {
    const companyObjExample = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const res = await request(app).get(`/findCompanyOwnership/${companyObjExample.id}`).expect(200);
    const companyRelations = res.body;

    expect(companyRelations.searchedResult).toStrictEqual(companyObjExample);

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(companyRelations.indirectly.lands.length).toBe(0);
    // we know from findTreeOwnership tests that it has no indirect companies
    expect(companyRelations.indirectly.companies.length).toBe(0);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(companyRelations.directly.lands.length).toBe(1);
    // we know from findCompaniesByParent tests that it has no indirect companies
    expect(companyRelations.directly.companies.length).toBe(5);
  });

  it('testing main search result api findCompanyOwnership with R860395717497 ID by name', async () => {
    const companyObjExample = {
      id: 'R860395717497',
      name: 'Suniresuni B Group Ltd',
      parentId: 'R725158469599'
    };

    const res = await request(app).get(`/findCompanyOwnership/${companyObjExample.name}`).expect(200);
    const companyRelations = res.body;

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(companyRelations.indirectly.lands.length).not.toBe(48);
    expect(companyRelations.indirectly.companies.length).not.toBe(14);

    // we know from findTreeOwnership tests that it has no indirect lands but we search here by the duplicated name
    // and results wont be the same as in that test since there we searched by the ID
    expect(companyRelations.directly.lands.length).toBe(0);
    expect(companyRelations.directly.companies.length).not.toBe(13);
  });

  it('testing main search result api findCompanyOwnership with bad Search Key', async () => {
    const res = await request(app).get('/findCompanyOwnership/bad testing search key').expect(400);
    const companyRelations = res.body;
    expect(companyRelations).toStrictEqual({ message: 'Company not found by this ID or Name' });
  });
});
