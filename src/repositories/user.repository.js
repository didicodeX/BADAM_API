import  {User} from "../models/user.model.js"

export const getAllUsers = () => User.find();