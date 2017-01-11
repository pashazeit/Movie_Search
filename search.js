
        $(document).ready(function () {
            $('form').on('submit', function (event) {
                $('#results').html('');
                event.preventDefault();
                var form = $(this);
                var searchInput = $('#searchbox').val();

                $('#resetButton').click(function () {
                    $('#searchbox').val('');
                    $('#results').html('');
                });

                $.ajax({
                    url: 'http://www.omdbapi.com/?s=' + searchInput,
                    method: 'get',
                    data: 'json',
                    success: function (searchResult) {
                        var movieArray = searchResult["Search"];
                        var titleList = $('#movielist');
                        for (var i = 0; i < movieArray.length; i++) {
                            $.ajax({
                                url: 'http://www.omdbapi.com/?i=' + searchResult["Search"][i]["imdbID"],
                                method: 'get',
                                data: 'json',
                                success: function (movie) {
                                    console.log('kin:', movie);
                                    var plot = movie["Plot"];
                                    var released = movie["Released"];
                                    var poster = movie["Poster"];
                                    var idd = movie["imdbID"];
                                    var link = "http://imdb.com/title/" + idd;
                                    var rating = "http://imdb-button.appspot.com/" + idd + ".png"
                                    var allResult = $(
                                        '<div class="film">' +
                                        '<a class="thumb" href="' + link + '"target="_blank"><img src=' + poster + '/" ></a>' +
                                        '<div class="text">' +
                                        '<h2 id="movie">' + movie["Title"] + '</h2>' +
                                        '<p id = "rating">   <img src=' + rating + ' >    </p>' +
                                        '<p id="releasedate">' + released + '</p>' + plot +

                                        '</div>' +
                                        '</div><hr>' +
                                        '<div class="clean"> </div>');

                                    $('#results').append(allResult);
                                }
                            })

                        }
                        console.log(movieArray);
                    }
                });
            });
        });