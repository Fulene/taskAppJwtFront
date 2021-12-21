export class User {
  id?: number;
  name?: string;
  password?: string;
  roles: string[] = [];

  constructor(args?: Partial<User>) {
    if (args) Object.assign(this, args);
  }
}
