import request from 'supertest';
import { app } from '../../app';

describe(' testing findCompanyLands api', () => {
  it('testing main search result api findCompanyLands with C86586227406 ID', async () => {
    const companyObjExample = {
      id: 'C86586227406',
      name: 'Suniresuni stralli UK Limited',
      parentId: 'R860395717497'
    };

    const res = await request(app).get(`/findCompanyLands/${companyObjExample.id}`).expect(200);
    const companyRelations = res.body;

    // we know from findTreeOwnership tests that it has no indirect lands
    expect(companyRelations.indirectly.lands.length).toBe(0);

    // we know from findLandsByCompanyId tests that it has no indirect lands
    expect(companyRelations.directly.lands.length).toBe(1);
  });

  it('testing main search result api findCompanyLands with bad Search Key', async () => {
    const res = await request(app).get('/findCompanyLands/bad testing search key').expect(400);
    const companyRelations = res.body;
    expect(companyRelations).toStrictEqual({ message: 'Company not found by this ID or Name' });
  });
});
