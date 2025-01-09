import { StaticImageData } from "next/image";

export interface Blogs {
    title: string,
    desc: string,
    img: string|StaticImageData,
    authorId: string,
}

export interface JwtPayload {
    id: string;
}