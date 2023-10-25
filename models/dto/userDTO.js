const { BadRequestError, SHARED } = require('../../utils');
const { PaginationModel } = require('../../models')

class ViewUserRequestDTO {
    constructor(req) {
        this.page = typeof req.page === 'undefined' ? SHARED.PAGINATION.DEFAULTPAGE : parseInt(req.page);
        this.pageSize = typeof req.pageSize === 'undefined' ? SHARED.PAGINATION.DEFAULTPAGESIZE : parseInt(req.pageSize);
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
        return new PaginationModel({
            page: this.page,
            pageSize: this.pageSize,
        });
    }
}

class UserResponseDTO {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.gender = user.gender;
        this.role = user.role;
    }
}

function buildUserListResponseDTO(userList) {
    const userListResponse = [];
    for (const user of userList) {
        userListResponse.push(new UserResponseDTO(user));
    }
    return userListResponse;
}

// function above is same as below
// function buildUserListResponseDTO(userList) {
//     return userList.map((user) => new UserResponseDTO(user));
// }

module.exports = {
    ViewUserRequestDTO,
    buildUserListResponseDTO
}
