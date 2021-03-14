import { CompanyInterface } from './CompanyTypes';

export interface LandInterface {
    landId: string
    companyId: CompanyInterface['id']
}
