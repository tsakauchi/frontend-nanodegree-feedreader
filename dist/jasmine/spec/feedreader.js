$(function(){function a(){expect(k).toHaveClass(m),expect(l.offset().left).toBeLessThan(0)}function b(){expect(k).not.toHaveClass(m),expect(l.offset().left).not.toBeLessThan(0)}function c(b){return function(){l.off(o),a(),b()}}function d(a){return function(){l.off(o),b(),a()}}function e(a){return function(){l.off(o),l.on(o,c(a)),n.click()}}function f(a){return function(){l.off(o),l.on(o,d(a)),n.click()}}function g(a){expect(a).toBeDefined(),expect(a).not.toBeNull(),expect(a.length).toBeGreaterThan(0)}function h(){return k.hasClass(m)}function i(){k.addClass(m)}function j(){k.removeClass(m)}var k=$("body"),l=$(".slide-menu"),m="menu-hidden",n=$(".menu-icon-link"),o="webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend";describe("RSS Feeds",function(){it("are defined",function(){expect(allFeeds).toBeDefined(),expect(allFeeds.length).toBeGreaterThan(0)}),it("have URL defined",function(){allFeeds.forEach(function(a){g(a.url)})}),it("have name defined",function(){allFeeds.forEach(function(a){g(a.name)})}),it("are listed in the menu in the correct order",function(){for(var a=$(".feed-list a"),b=0;b<allFeeds.length;b++)expect(allFeeds[b].name).toBe(a[b].text)})}),describe("The Menu",function(){it("is hidden by default",function(){a()}),it("is shown when the menu icon is clicked when the menu is hidden",function(a){h()?f(a)():(l.on(o,f(a)),i())}),it("is hidden when the menu icon is clicked when the menu is visible",function(a){h()?(l.on(o,e(a)),j()):e(a)()})}),describe("Initial entries",function(){var a=$(".feed");beforeEach(function(a){loadFeed(0,a)}),it("has at least a single .entry element within the .feed container",function(){var b=a.find(".entry");g(b)})}),describe("New feed selection",function(){var a=$(".feed");beforeEach(function(a){loadFeed(0,a)}),it("loads a new feed and content updates",function(b){var c=a.find(".entry");g(c),loadFeed(1,function(){var d=a.find(".entry");g(d),expect(c.first("h2").text()).not.toBe(d.first("h2").text()),b()})}),it("loads a new feed and page heading updates and menu closes",function(a){var b=$(".header-title").text(),e=function(a){return function(){var c=$(".header-title").text();expect(c).not.toBe(b),a()}},f=function(a,b){return function(){loadFeed(b,e(a))}},g=function(a){return function(){var b=$(".feed-list").children().last().find("a"),d=b.attr("data-id");l.on(o,c(f(a,d))),b.click()}};h()?(l.on(o,d(g(a))),j()):d(g(a))()})})}());