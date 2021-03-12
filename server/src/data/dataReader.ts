import * as fs from 'fs';
import * as path from "path";

export const companyRelations = fs.readFileSync(path.resolve(__dirname, './company_relations.csv'), 'utf8')
    .split("\n")
    .slice(1) // header row
    .map((line) => {
        const [id, name, parentId] = line.split(',');
        return {id, name, parentId}
    });

export const landOwnership = fs.readFileSync(path.resolve(__dirname, './land_ownership.csv'), 'utf8')
    .split("\n")
    .slice(1) // header row
    .map((line) => {
        const [landId, companyId] = line.split(',');
        return {landId, companyId}
    });
