class UserModel {
    constructor(id, email, gender, role) {
        this.id = id;
        this.email = email;
        this.gender = gender;
        this.role = role;
    }

    static fromDatabase(row) {
        return new UserModel(row.id, row.email, row.gender, row.role);
    }

    static schema = {
        id: 'number',
        email: 'string',
        gender: 'string',
        role: 'string'
    };
}

module.exports = UserModel;
