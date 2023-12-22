export class User {
[x: string]: any;
    constructor(
        public id?: String,
        public username?: String,
        public password?: String,
        public enabled?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public role?: any,
    ) {}
}