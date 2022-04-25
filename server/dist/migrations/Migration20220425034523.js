"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220425034523 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220425034523 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "badge" text null;');
    }
    async down() {
        this.addSql('alter table "user" drop column "badge";');
    }
}
exports.Migration20220425034523 = Migration20220425034523;
//# sourceMappingURL=Migration20220425034523.js.map