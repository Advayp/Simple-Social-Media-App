import { Migration } from '@mikro-orm/migrations';

export class Migration20220426043214 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "profile_picture" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "profile_picture";');
  }

}
