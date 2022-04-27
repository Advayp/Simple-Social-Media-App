import { Entity, PrimaryKey, Property, types } from "@mikro-orm/core";
import { GenerateSeed } from "../utils";

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

    @Property({ type: "text", nullable: true })
    profilePicture?: string = `https://avatars.dicebear.com/api/bottts/${GenerateSeed(
        12
    )}.svg`;

    @Property({ type: types.array, nullable: true })
    likedPosts?: Array<number> = [];

    @Property({ type: types.array, nullable: true })
    dislikedPosts?: Array<number> = [];
}
