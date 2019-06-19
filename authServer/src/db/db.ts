import {Sequelize} from "sequelize";
import jsyaml from "js-yaml";
import fs from 'fs-extra';
import logger from "../loger";
import {initUserModel} from "../models/User";

export let sequelize: Sequelize;

async function connectDB(): Promise<Sequelize> {
    const dbConfig = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
    const dbParams = await jsyaml.safeLoad(dbConfig);
    sequelize = new Sequelize(dbParams.dbname, dbParams.username, dbParams.password, dbParams.params);
    return sequelize;
}

function initModels () {
    initUserModel();
    sequelize.sync();
}


connectDB().then((seqlz: Sequelize) => seqlz.authenticate()).then(() => {
    initModels();
    logger.log('info', 'Connection has been established successfully.');
}).catch((err => {
    logger.log('error', 'Unable to connect to the database:', err);
}));