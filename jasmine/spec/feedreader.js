/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        //tests to make sure that the allFeeds
        // variable has been defined and that it is not empty.
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // loops through each feed
        // in the allFeeds object and ensures it has a URL defined
        // and that the URL is not empty.
        it('url defined and not empty', function () {
            //loops through allFeeds and ensures it has a URL defined and
            //is not empty
            allFeeds.forEach(function (el) {
                expect(el.url).toBeDefined();
                expect(el.url).not.toBe(0);
            });
        });

        // Loops through each feed
        // in the allFeeds object and ensures it has a name defined
        // and that the name is not empty.
        it('name is defined and not empty', function () {
            allFeeds.forEach(function (el) {
                expect(el.name).toBeDefined();
                expect(el.name).not.toEqual(0);
            });
        });
    });

    /*Test suite named "The menu" */
    describe("The menu", function () {

        //ensures the menu element is hidden by default.
        it('hidden by default', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        // ensures the menu changes
        // visibility when the menu icon is clicked.
        it('toggles visibility', function () {

            //create a simulated trigger event
            let event = document.createEvent('Event');
            event.initEvent('click', false, true);
            let menuTrigger = document.getElementsByClassName('menu-icon-link');

            //loop through the class to be clicked on
            menuTriggerFunc = () => {
                for (let i = 0; i < menuTrigger.length; i++) {
                    menuTrigger[i].dispatchEvent(event);
                }
            }

            //when it first triggers the click event it sees if 
            //triggered event is false on second click, it checks if true
            menuTriggerFunc();

            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            menuTriggerFunc();

            expect(document.body.classList.contains('menu-hidden')).toBe(true);

        });

    });

    /*Test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        // test that ensures when the loadFeed
        // function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loadFeed called, completes its work, and a single entry element is in the feed container ', function (done) {
            let cntnrEls = $('.feed .entry');

            expect(cntnrEls.length).toBeGreaterThan(0);
            done();
        });
    });

    /*Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        //  ensures when a new feed is loaded
        // by the loadFeed function that the content actually changes.
        let feedOld;
        let feedNew;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feedOld = document.querySelector('.feed').innerHTML;
                loadFeed(1, function () {
                    feedNew = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
        it('loads new feed', function () {
            expect(feedNew).not.toBe(feedOld);
        })

    });

}());