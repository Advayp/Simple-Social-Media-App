import { Migration } from '@mikro-orm/migrations';

export class Migration20220420155141 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "content" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "content";');
  }

}
