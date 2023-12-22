export class Answer {
    constructor(
        public id?: String,
        public versionId?: String,
        public employeeId?: String,
        public patientId?: String,
        public stateId?: String,
        public value?: String,
        public total?: number,
        public createdAt?: Date,
        public updatedAt?: Date,
        public answerStateId?: String,
    ) {}
}