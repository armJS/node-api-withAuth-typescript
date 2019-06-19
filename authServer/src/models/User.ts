import Sequelize, {Model} from 'sequelize';
import {sequelize} from '../db/db';

class User extends Model {
    public name: string;
    public password: string;
    public email: string;
}

export function initUserModel() {
    User.init(
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING,
            password: Sequelize.STRING,
            email: Sequelize.STRING,
        }, {sequelize, tableName: 'Users', modelName: 'User'}
    );
}

export default User;