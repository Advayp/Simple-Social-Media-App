"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220426043214 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220426043214 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "profile_picture" text null;');
    }
    async down() {
        this.addSql('alter table "user" drop column "profile_picture";');
    }
}
exports.Migration20220426043214 = Migration20220426043214;
//# sourceMappingURL=Migration20220426043214.js.map