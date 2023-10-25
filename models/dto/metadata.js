class MetadataDTO {
    constructor(metadata) {
        this.totalPages = metadata.totalPages;
        this.currentPage = metadata.currentPage;
        this.nextPage = metadata.nextPage;
        this.previousPage = metadata.previousPage;
    }
}

function buildMetadataDTO(page, pageSize, totalRows) {
    const totalPages = Math.ceil(totalRows / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;
    return new MetadataDTO({
        totalPages: totalPages,
        currentPage: page,
        nextPage: nextPage,
        previousPage: previousPage,
    });
};

module.exports = {
    buildMetadataDTO,
}
