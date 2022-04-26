import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt? = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt? = new Date();

    @Property({ type: "text" })
    name: string;

    @Property({ type: "text" })
    password: string;

    @Property({ type: "text", nullable: true })
    badge: string = "New";
}
