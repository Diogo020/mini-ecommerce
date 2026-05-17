import { User, UserRepository } from "../repositories/userRepository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

interface UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: CreateUserDTO): Promise<User> {
    this.validateUserData(data);

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("E-mail já cadastrado.");
    }

    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      active: data.active ?? true
    };

    return this.userRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error("ID do usuário inválido.");
    }

    return this.userRepository.findById(id);
  }

  async update(id: number, data: UpdateUserDTO): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error("ID do usuário inválido.");
    }

    this.validateUserData(data);

    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      return null;
    }

    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new Error("E-mail já cadastrado por outro usuário.");
    }

    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      active: data.active ?? true
    };

    return this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error("ID do usuário inválido.");
    }

    return this.userRepository.delete(id);
  }

  private validateUserData(data: CreateUserDTO | UpdateUserDTO): void {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Nome do usuário é obrigatório.");
    }

    if (!data.email || data.email.trim() === "") {
      throw new Error("E-mail do usuário é obrigatório.");
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error("E-mail inválido.");
    }

    if (!data.password || data.password.trim() === "") {
      throw new Error("Senha do usuário é obrigatória.");
    }

    if (data.password.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres.");
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
