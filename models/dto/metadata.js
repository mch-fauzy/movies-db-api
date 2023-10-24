
const buildMetadata = (page, pageSize, totalRows) => {
    const totalPages = Math.ceil(totalRows / pageSize);
    return {
        totalPages: totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
    };
}

module.exports = {
    buildMetadata,
}
