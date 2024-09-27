import { Telegraf } from 'telegraf';

export class Bot extends Telegraf {
  constructor() {
    super('');

    this.listeners();
    this.launch();
  }

  private listeners() {}
}
