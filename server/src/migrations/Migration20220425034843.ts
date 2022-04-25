import { Migration } from "@mikro-orm/migrations";

export class Migration20220425034843 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'alter table "post" add column "dislikes" int null, add column "likes" int null;'
        );
    }

    async down(): Promise<void> {
        this.addSql('alter table "post" drop column "dislikes";');
        this.addSql('alter table "post" drop column "likes";');
    }
}
