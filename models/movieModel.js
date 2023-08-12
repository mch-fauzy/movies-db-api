class MovieModel {
    constructor(id, title, genres, year, photo) {
        this.id = id;
        this.title = title;
        this.genres = genres;
        this.year = year;
    }

    static fromDatabase(row) {
        return new MovieModel(row.id, row.title, row.genres, row.year);
    }

    static schema = {
        id: 'number',
        title: 'string',
        genres: 'string',
        year: 'string'
    };
}

module.exports = MovieModel;
