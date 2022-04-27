"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220427140709 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220427140709 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "liked_posts" text[] null, add column "disliked_posts" text[] null;');
    }
    async down() {
        this.addSql('alter table "user" drop column "liked_posts";');
        this.addSql('alter table "user" drop column "disliked_posts";');
    }
}
exports.Migration20220427140709 = Migration20220427140709;
//# sourceMappingURL=Migration20220427140709.js.map