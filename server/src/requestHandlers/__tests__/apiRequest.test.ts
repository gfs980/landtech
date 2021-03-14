import request from 'supertest';
import { app } from '../../app';
import { testCompaniesArray, testLandsArray } from '../../data/types/dataStructureTypeTests';

describe('testing apis file Apis', () => {
  it('testing main api for getting landOwnership and companyRelations', async () => {
    const res = await request(app).get('/').expect(200);
    const body = res.body;
    expect(Object.keys(body)).toStrictEqual(['companyRelations', 'landOwnership']);

    const landOwnership = body.landOwnership;
    testLandsArray(landOwnership);

    const companyRelations = body.companyRelations;
    testCompaniesArray(companyRelations);
  });

  it('testing main api for getting only landOwnership array', async () => {
    const res = await request(app).get('/landOwnership').expect(200);
    const landOwnership = res.body;

    testLandsArray(landOwnership);
  });

  it('testing main api for getting only companyRelations array', async () => {
    const res = await request(app).get('/companyRelations').expect(200);
    const companyRelations = res.body;
    testCompaniesArray(companyRelations);
  });
});
