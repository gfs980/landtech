import { Request, Response, Router } from 'express';
import { companyRelations, landOwnership } from '../data/dataReader';
import { CompanyInterface } from '../data/types/CompanyTypes';
import { findCompanyLandsByKey, findCompanyOwnershipByKey } from '../controllers/IndexController';
export const IndexRequestHandler: Router = Router();

IndexRequestHandler.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      companyRelations: companyRelations,
      landOwnership: landOwnership
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

IndexRequestHandler.get('/companyRelations', async (req: Request, res: Response) => {
  try {
    res.status(200).json(companyRelations);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

IndexRequestHandler.get('/landOwnership', async (req: Request, res: Response) => {
  try {
    res.status(200).json(landOwnership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

IndexRequestHandler.get('/findCompanyOwnership/:key', async (req: Request, res: Response) => {
  try {
    const companyKey:CompanyInterface['id']|CompanyInterface['name'] = req.params.key;
    const result = findCompanyOwnershipByKey(companyKey);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

IndexRequestHandler.get('/findCompanyLands/:key', async (req: Request, res: Response) => {
  try {
    const companyKey:CompanyInterface['id']|CompanyInterface['name'] = req.params.key;
    const result = findCompanyLandsByKey(companyKey);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
