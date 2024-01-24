import { hash } from "bcrypt";
import { User } from "../model/user";

export class UserService {
  async created(name: string, email: string, password: string, photo: string): Promise<any> {
    try {
      const thisUserExists = await User.findOne({ email });
      if (thisUserExists != null) {
        const messege = 'Email already registered, try again!';

        return messege;
      };

      const passwordHashed = await hash(password, 8);

      const newUser = await new User({
        name,
        email,
        password: passwordHashed,
        photo
      }).save();

      return newUser;
    } catch (error) {
      console.log(error);
    };
  };
};
