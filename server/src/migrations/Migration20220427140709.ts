import { Migration } from '@mikro-orm/migrations';

export class Migration20220427140709 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "liked_posts" text[] null, add column "disliked_posts" text[] null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "liked_posts";');
    this.addSql('alter table "user" drop column "disliked_posts";');
  }

}
