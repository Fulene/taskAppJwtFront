export class Task {
  id?: number;
  name?: string;

  constructor(args?: Partial<Task>) {
    if (args) Object.assign(this, args);
  }
}
