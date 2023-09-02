export class User {
    username: string;
    email: string;
    password: string;
    avatar?: string;

    constructor(username: string, email: string, password: string, avatar?: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }
}