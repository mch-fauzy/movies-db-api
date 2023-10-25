class PaginationModel {
    constructor(pagination) {
        this.page = pagination.page;
        this.pageSize = pagination.pageSize;
    }
}

module.exports = {
    PaginationModel,
}