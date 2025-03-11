export class SessionDTO {

    name: string = '';
    username = '';

    constructor(name: string, username: string) {
        this.name = name;
        this.username = username;
    }

}