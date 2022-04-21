"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220420155141 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220420155141 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" add column "content" text not null;');
    }
    async down() {
        this.addSql('alter table "post" drop column "content";');
    }
}
exports.Migration20220420155141 = Migration20220420155141;
//# sourceMappingURL=Migration20220420155141.js.map