import {Request, Response} from 'restify';
import User from "../models/User";
import * as sequelize from 'sequelize';

const Op = sequelize.Op;


export default class UsersController {
    public static async save(req: Request, res: Response) {
        try {
            await User.create({name: req.body.name, email: req.body.email, password: req.body.password});
            res.send(200);
        } catch (e) {
            // TODO:
            res.send(500);
        }
    }

    public static async check(req: Request, res: Response) {
        try {
            const user = await User.findOne({
                where: {
                    [Op.and]: [{name: req.body.name}, {password: req.body.password}]
                }
            });
            user ? res.send({username: req.body.name}) : res.send(400);
        } catch (e) {
            // TODO:
            res.send(500);
        }
    }
}
