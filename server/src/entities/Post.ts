import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt? = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt? = new Date();

    @Property({ type: "text", unique: true })
    title: string;

    @Property({ type: "text" })
    content: string;

    @Property()
    userId: number;

    @Property({ nullable: true })
    dislikes: number;

    @Property({ nullable: true })
    likes: number;
}
