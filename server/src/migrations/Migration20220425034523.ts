import { Migration } from '@mikro-orm/migrations';

export class Migration20220425034523 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "badge" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "badge";');
  }

}
