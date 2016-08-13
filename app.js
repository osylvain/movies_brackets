const MOVIE_TITLES = [
    'sin city',
    'sin city: a dame to kill for',
    'seven samurai',
    'the pianist',
    'memento',
    'birdman',
    'scarface',
    'straight outta compton',
    'the legend of tarzan',
    'the jungle book',
    'memento',
    'the departed',
    'jason bourne',
    'john wick',
    'star trek beyond',
    'x-men: apocalypse',
    'zombieland',
    'the big lebowski',
    'fury',
    'hardcore henry',
    'pan\'s labyrinth',
    'the martian',
    'jurassic world',
    'blackfish',
    'her',
    'sicario',
    'the revenant',
    'the purge: election year',
    'warcraft',
    'watchmen',
    'ip man',
    'gladiator'
];

const MOVIE_TITLES_COOKIE = 'movieTitles';
const MOVIES_COOKIE = 'movies';
const BRACKET_COOKIE = 'bracket';

var moviesRoot = {
    imdbId: null,
    parent: null
};

function init() {
    if(movieListHasChanged()) {
        Cookies.set(MOVIE_TITLES_COOKIE, MOVIE_TITLES);
        fetchMovieMetadata();
    }
    if(!Cookies.get(BRACKET_COOKIE)) {
        Cookies.set(BRACKET_COOKIE, generateEmptyBrackets());
    }
}

init();

function fetchMovieMetadata() {
    for(var i = 0; i < MOVIE_TITLES.length; i++) {
        fetch('http://www.omdbapi.com/?plot=short&r=json&t=' + encodeURIComponent(MOVIE_TITLES[i]))
            .then(function(response) {
                return response.json();
            })
            .then(function(movie) {
                Cookies.set(movie.imdbID, movie);
            })
    }
}

function getMovie(id) {
    return Cookies.getJSON(id);
}

function generateEmptyBrackets() {
    debugger;
    var movies = Cookies.getJSON(MOVIES_COOKIE);
    var bracket = {
        firstRound: [],
        sweet16: [],
        elite8: [],
        final4: [],
        championship: [],
        champion: null
    };
    for(var i = 0; i < movies.length; i++) {
        bracket.firstRound.push(movies[i])
    }

}

function movieListHasChanged() {
    var movieTitles = Cookies.getJSON(MOVIE_TITLES_COOKIE);
    if(!movieTitles) {
        return true;
    }
    for(var i = 0; i < MOVIE_TITLES.length; i++) {
        if(MOVIE_TITLES[i] != movieTitles[i]) return true;
    }
    return false;
}