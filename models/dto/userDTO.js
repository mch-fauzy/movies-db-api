const { BadRequestError, SHARED } = require('../../utils');

class ViewUserRequest {
    constructor(queryReq) {
        this.page = typeof queryReq.page === 'undefined' ? SHARED.PAGINATION.DEFAULTPAGE : parseInt(queryReq.page);
        this.pageSize = typeof queryReq.pageSize === 'undefined' ? SHARED.PAGINATION.DEFAULTPAGESIZE : parseInt(queryReq.pageSize);
    }

    validate() {
        if (this.page <= 0 || isNaN(this.page)) {
            throw new BadRequestError('Page must be a positive integer');
        }

        if (this.pageSize <= 0 || isNaN(this.pageSize)) {
            throw new BadRequestError('PageSize must be a positive integer');
        }
    }

    toPaginationModel() {
        return {
            page: this.page,
            pageSize: this.pageSize,
        };
    }
}

class ViewUserResponse {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.gender = user.gender;
        this.role = user.role;
    }
}

function buildViewUserResponse(userList) {
    const userListResponse = [];
    for (const user of userList) {
        userListResponse.push(new ViewUserResponse(user));
    }
    return userListResponse;
}

// function above is same as below
// function buildViewUserResponse(userList) {
//     return userList.map((user) => new ViewUserResponse(user));
// }

module.exports = {
    ViewUserRequest,
    buildViewUserResponse
}
