"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220420154146 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220420154146 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "user_id" int not null);');
    }
    async down() {
        this.addSql('drop table if exists "post" cascade;');
    }
}
exports.Migration20220420154146 = Migration20220420154146;
//# sourceMappingURL=Migration20220420154146.js.map