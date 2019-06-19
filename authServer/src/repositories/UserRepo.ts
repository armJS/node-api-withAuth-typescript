import User from '../models/User';

class UserRepo {
    constructor() {
    }

    findById(id: number) {
        return User.findOne({where: {id}})
    }

    save(user: User) {
        return user.save();
    }

    async update(id: number, props: any) {
        return User.update(props, {where: {id}});
    }

    delete(id: number) {
        return User.destroy({
            where: {id}
        });
    }

    list() {
        return User.findAll();
    }
}


export default new UserRepo();
