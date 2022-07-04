import { User } from "../models/user";

const userService = {
    getUser: async (id: string) => {
        const user = await User.findById(id);
        return user;
    }
}

export default userService