"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220418042109 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220418042109 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "password" text not null);');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20220418042109 = Migration20220418042109;
//# sourceMappingURL=Migration20220418042109.js.map