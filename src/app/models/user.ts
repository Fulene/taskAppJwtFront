export class User {
  name?: string;
  password?: string;
  roles: any[] = [];

  constructor(args?: any) {
    if (args) {
      this.name = args.sub;
      this.roles = args.roles;
    }
  }

  isAdmin() {
    return this.roles.some((r) => r.authority === 'ADMIN');
  }
}
