import { MikroORM } from "@mikro-orm/core";
import { User } from "./Entities/User";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);

    orm.getMigrator().up();

    const users = await orm.em.find(User, {});
    console.table(users);
};

main().catch(console.error);
