export interface blogTypes {
    title: string;
    description: string;
    content: string;
    authorID: string;
    coverImage: string;
    date: String;
    authorName: String;
    likes: Number;
  }

 export interface jsonResTypes {
    message: string;
    status: number;
}

export interface getBlogjsonResTypes {
    message: string;
    status: number;
    blogs: any;
}