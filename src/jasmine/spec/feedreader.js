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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    function validateCollectionNotEmpty(collection) {
        expect(collection).toBeDefined();
        expect(collection).not.toBeNull();
        expect(collection.length).not.toBe(0);
    }

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
            expect(allFeeds.length).not.toBe(0);
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

        var body = $('body');
        var menu = $('.slide-menu');
        var menuIcon = $('.menu-icon-link');
        var menuHidden = "menu-hidden";
        var transitionEndEvents = "webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend";

        function testIfMenuHidden() {
            expect(body).toHaveClass(menuHidden);
            expect(menu.offset().left).toBeLessThan(0);
        }

        function testIfMenuVisible() {
            expect(body).not.toHaveClass(menuHidden);
            expect(menu.offset().left).not.toBeLessThan(0);
        }

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
            if (! body.hasClass(menuHidden)) body.addClass(menuHidden);
            testIfMenuHidden();
            menu.on(transitionEndEvents, function() {
                menu.off(transitionEndEvents);
                testIfMenuVisible();
                done();
            });
            menuIcon.click();
        });

        it('is hidden when the menu icon is clicked when the menu is visible', function(done) {
            if (body.hasClass(menuHidden)) body.removeClass(menuHidden);
            testIfMenuVisible();
            menu.on(transitionEndEvents, function() {
                menu.off(transitionEndEvents);
                testIfMenuHidden();
                done();
            });
            menuIcon.click();
        });

    });

    /* Initial entries test suite */
    describe('Initial entries', function() {

        var feed = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
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
            loadFeed(0, function() {
                done();
            });
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
    });
}());
