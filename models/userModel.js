class UserModel {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.gender = user.gender;
        this.role = user.role;
        this.count = user.count;
    }
}

function buildUserListModel(userList) {
    const userListModel = [];
    for (const user of userList) {
        userListModel.push(new UserModel(user));
    }
    return userListModel;
}

module.exports = {
    buildUserListModel,
}