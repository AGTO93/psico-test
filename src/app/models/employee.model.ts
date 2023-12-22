export class Employee {
    constructor(
        public id?: string,
        public name?: string,
        public lastname?: string,
        public dateOfBirth?: Date,
        public genderId?: string,
        public documentTypeId?: string,
        public documentNumber?: string,
        public address?: string,
        public phoneNumber?: string,
        public cityId?: string,
        public countryId?: string,
        public email?: string,
        public userId?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}