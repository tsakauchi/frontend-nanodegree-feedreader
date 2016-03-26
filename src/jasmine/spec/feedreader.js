/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Common variables and functions
     */
    var body = $('body');
    var menu = $('.slide-menu');
    var menuHidden = "menu-hidden";
    var menuIcon = $('.menu-icon-link');
    var transitionEndEvents = "webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend";

    function testIfMenuHidden() {
        expect(body).toHaveClass(menuHidden);
        expect(menu.offset().left).toBeLessThan(0);
    }

    function testIfMenuVisible() {
        expect(body).not.toHaveClass(menuHidden);
        expect(menu.offset().left).not.toBeLessThan(0);
    }

    function testIfMenuHiddenAfterTransition(done) {
        return function() {
            menu.off(transitionEndEvents);
            testIfMenuHidden();
            done();
        };
    }

    function testIfMenuVisibleAfterTransition(done) {
        return function() {
            menu.off(transitionEndEvents);
            testIfMenuVisible();
            done();
        };
    }

    function testIfMenuHiddenAfterMenuIconClick(done) {
        return function() {
            menu.off(transitionEndEvents);
            menu.on(transitionEndEvents, testIfMenuHiddenAfterTransition(done));
            menuIcon.click();
        };
    }

    function testIfMenuVisibleAfterMenuIconClick(done) {
        return function() {
            menu.off(transitionEndEvents);
            menu.on(transitionEndEvents, testIfMenuVisibleAfterTransition(done));
            menuIcon.click();
        };
    }

    function validateCollectionNotEmpty(collection) {
        expect(collection).toBeDefined();
        expect(collection).not.toBeNull();
        expect(collection.length).toBeGreaterThan(0);
    }

    function isMenuHidden() {
      return body.hasClass(menuHidden);
    }

    function hideMenu() {
      body.addClass(menuHidden);
    }

    function showMenu() {
      body.removeClass(menuHidden);
    }

    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined', function() {
            allFeeds.forEach(function(feed) {
                validateCollectionNotEmpty(feed.url);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined', function() {
            allFeeds.forEach(function(feed) {
                validateCollectionNotEmpty(feed.name);
            });
        });
    });


    /* The menu test suite */
    describe('The Menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            testIfMenuHidden();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is shown when the menu icon is clicked when the menu is hidden', function(done) {
            if (isMenuHidden()) {
                testIfMenuVisibleAfterMenuIconClick(done)();
            } else {
                menu.on(transitionEndEvents, testIfMenuVisibleAfterMenuIconClick(done));
                hideMenu();
            }
        });

        it('is hidden when the menu icon is clicked when the menu is visible', function(done) {
            if (isMenuHidden()) {
                menu.on(transitionEndEvents, testIfMenuHiddenAfterMenuIconClick(done));
                showMenu();
            } else {
                testIfMenuHiddenAfterMenuIconClick(done)();
            }
        });

    });

    /* Initial entries test suite */
    describe('Initial entries', function() {

        var feed = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least a single .entry element within the .feed container', function() {
            var entry = feed.find(".entry");
            validateCollectionNotEmpty(entry);
        });
    });

    /* New Feed Selection test suite */
    describe('New feed selection', function() {

        var feed = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('loads a new feed and content updates', function(done) {
            var oldEntry = feed.find(".entry");
            validateCollectionNotEmpty(oldEntry);

            loadFeed(1, function() {
                var newEntry = feed.find(".entry");
                validateCollectionNotEmpty(newEntry);
                expect(oldEntry.first("h2").text()).not.toBe(newEntry.first("h2").text());
                done();
            });
        });

        /* [Extra Test] Test that ensures when a new feed is loaded
         * when the menu item is selected. Verify that the page heading
         * is updated and the menu is closed.
         */
        it('loads a new feed and page heading updates and menu closes', function(done) {
            var oldHeading = $('.header-title').text();

            // called once the loadFeed is triggered
            var onFeedLoaded = function(done) {
                return function() {
                    var newHeading = $('.header-title').text();
                    expect(newHeading).not.toBe(oldHeading);
                    done();
                }
            };

            // called once the menu is hidden
            var onMenuHidden = function(done,id) {
                return function() {
                    loadFeed(id, onFeedLoaded(done));
                }
            };

            // called once the menu is visible
            var onMenuVisible = function(done) {
                return function() {
                    var lastFeed = $('.feed-list').children().last().find("a");
                    var lastFeedId = lastFeed.attr('data-id');
                    menu.on(transitionEndEvents, testIfMenuHiddenAfterTransition(onMenuHidden(done,lastFeedId)));
                    lastFeed.click();
                };
            };

            if (isMenuHidden()) {
                menu.on(transitionEndEvents, testIfMenuVisibleAfterTransition(onMenuVisible(done)));
                showMenu();
            } else {
                testIfMenuVisibleAfterTransition(onMenuVisible(done))();
            }
        });
    });
}());
