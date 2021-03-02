import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request{
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExistis = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExistis) {
      throw new Error('Email address already used!');
    }

    const user = userRepository.create({
      name,
      password: await hash(password, 8),
      email,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
