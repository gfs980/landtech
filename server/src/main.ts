import * as express from 'express';
import {companyRelations, landOwnership} from './data/dataReader';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(400).json({
        landOwnership: landOwnership,
        companyRelations: companyRelations
    });
});


app.listen(port, () => console.log(`Server started listening to port ${port}`));
