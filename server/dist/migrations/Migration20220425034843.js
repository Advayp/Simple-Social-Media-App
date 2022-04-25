"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220425034843 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220425034843 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" add column "dislikes" int null, add column "likes" int null;');
    }
    async down() {
        this.addSql('alter table "post" drop column "dislikes";');
        this.addSql('alter table "post" drop column "likes";');
    }
}
exports.Migration20220425034843 = Migration20220425034843;
//# sourceMappingURL=Migration20220425034843.js.map