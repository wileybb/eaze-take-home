            $(document).ready(function() {
            $drawerRight = $('.cart-drawer-right');
            $cart_list = $('.cart-btn, .close-btn');
            $cart_list.click(function() {
                // $(this).toggleClass('active');
                $('.cart-drawer-push').toggleClass('cart-drawer-pushtoleft');
                $drawerRight.toggleClass('cart-drawer-open');
            });
        });
        $(document).ready(function() {
            var $ul = $('#favorite-links');
            var $title = $('#title');
            var $url = $('#url');
            //get items from local storage
            if(localStorage.getItem('vk-links')){
                $ul.html(localStorage.getItem('vk-links'));
            };
            //remove item from favorites
            $("#favorite-links").on('click','.removebtn',function() {
                $(this).parent().remove();
                //save changes to localstorage
                var $ul = $('#favorite-links');
                localStorage.setItem('vk-links', $ul.html());
            });
        });
        //declaring gifArray globally
        let gifArray = "";
        //creating scrolled flag
        let scrolled = false;
        //function to load more gifs when user hits bottom of page
        $(window).on("scroll", function() {
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            if ((scrollHeight - scrollPosition) / scrollHeight === 0 && scrolled === false) {
                console.log("you are at the bottom of the page" + scrolled);
                scrolled = true;
                console.log(scrolled);
                for(var i = 11; i < 25; i++){
                    //creating picture card parent element
                    var pictureCard = $('<div>');
                    pictureCard.attr("class", "pictureCard");
                    //creating image child element
                    var image = $('<img>');
                    image.attr("class", "collapsible2");
                    image.attr('src', gifArray[i].images.fixed_height.url);
                    //creating drop down box
                    var infoText = $('<div>');
                    infoText.attr("class", "content");
                    infoText.append("Rated: " + gifArray[i].rating.toUpperCase());
                    infoText.append(`<br>`);
                    infoText.append(" Source: ");
                    if(gifArray[i].source === "") {
                        infoText.append("unavailable");
                    } else {
                        var sourceLink = $('<a>');
                        sourceLink.attr("href", gifArray[i].source);
                        sourceLink.attr("target", "_blank");
                        sourceLink.append(gifArray[i].source);
                        infoText.append(sourceLink); 
                    };
                    //building favorite button
                    var favButton = $('<br><button><i class="fas fa-star"></i></button>');
                    favButton.attr("class", "favorites2 btn btn-primary");
                    favButton.attr("id", gifArray[i].images.fixed_height.url);
                    infoText.append(favButton);
                    //buiding parent element and appending it to container...
                    $(pictureCard).prepend(infoText);
                    // $(pictureCard).prepend(placeholder);
                    $(pictureCard).prepend(image);
                    $('#mosaic').append(pictureCard);
                }

                //calling function collapse/favorite click listeners
                addColapseListeners2();
                addFavListeners2();

            }
        });
        //---------------when clicking search button----------------->
        $("#basic-addon2").on("click", function(event) {
            event.preventDefault();
            scrolled = false;
            // This line grabs the input from the textbox
            var searchTerms = $("#search-input").val().trim();
            // clearing previous search results
            $("#mosaic").empty();
            // -----------AJAX CAll to giphy----------------->
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerms + "&api_key=Nmo83t2ddeUUrzIGVdPNOD5tQSWYwpLb";
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                gifArray = response.data;
                for(var i = 0; i < 11; i++){
                    //creating picture card parent element
                    var pictureCard = $('<div>');
                    pictureCard.attr("class", "pictureCard");
                    //creating image child element
                    var image = $('<img>');
                    image.attr("class", "collapsible");
                    image.attr('src', gifArray[i].images.fixed_height.url);
                    var infoText = $('<div>');
                    infoText.attr("class", "content");
                    infoText.append("Rated: " + gifArray[i].rating.toUpperCase());
                    infoText.append(`<br>`);
                    infoText.append(" Source: ");
                    if(gifArray[i].source === "") {
                        infoText.append("unavailable");
                    } else {
                        var sourceLink = $('<a>');
                        sourceLink.attr("href", gifArray[i].source);
                        sourceLink.attr("target", "_blank");
                        sourceLink.append(gifArray[i].source);
                        infoText.append(sourceLink); 
                    };
                    //building favorite button
                    var favButton = $('<br><button><i class="fas fa-star"></i></button>');
                    favButton.attr("class", "favorites btn btn-primary");
                    favButton.attr("id", gifArray[i].images.fixed_height.url);
                    infoText.append(favButton);
                    //buiding picture card element and appending it to container
                    $(pictureCard).prepend(infoText);
                    $(pictureCard).attr("id", i);
                    $(pictureCard).prepend(image);
                    $('#mosaic').prepend(pictureCard);
                };
                //calling functions to add collapse/favorite click listeners
                addColapseListeners();
                addFavListeners();
            });
        });
        function addFavListeners() {
            var fav = document.getElementsByClassName("favorites");
            for (let i = 0; i < fav.length; i++) {
                fav[i].addEventListener("click", function() {
                    console.log("fav clicked");
                    source = this.id;
                    console.log(source);
                    $('#favorite-links').append('<div><img class="favoritedGif" src=' + source + '><button class="removebtn btn">x</button><div>');
                    var $ul = $('#favorite-links');
                    localStorage.setItem('vk-links', $ul.html());
                })
            }
        }
        function addFavListeners2() {
            var fav = document.getElementsByClassName("favorites2");
            for (let i = 0; i < fav.length; i++) {
                fav[i].addEventListener("click", function() {
                    console.log("fav clicked");
                    source = this.id;
                    console.log(source);
                    $('#favorite-links').append('<div><img class="favoritedGif" src=' + source + '><button class="removebtn btn">x</button><div>');
                    var $ul = $('#favorite-links');
                    localStorage.setItem('vk-links', $ul.html());
                })
            }
        }
        function addColapseListeners() {
            var coll = document.getElementsByClassName("collapsible");
            for (let i = 0; i < coll.length; i++) {
                // coll[i].removeEventListener("click");    
                coll[i].addEventListener("click", function() {
                    
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight){
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    };
                });
            };

        };
        function addColapseListeners2() {
            var coll = document.getElementsByClassName("collapsible2");
            for (let i = 0; i < coll.length; i++) {
                // coll[i].removeEventListener("click");    
                coll[i].addEventListener("click", function() {
                    
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight){
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    };
                });
            };

        };
