;
(function ($, window, document, undefined) {

    var pluginName = "timetable",
        defaults = {
            startTime: "12:00",
            hourWidth: 120
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    var _calcWidth = function (duration, hourWidth) {
        var fiveMinuteWidth = (hourWidth / 60) * 5;
        return (duration / 5) * fiveMinuteWidth;
    };

    var _calcOffset = function (time, hourWidth) {
        var fiveMinuteWidth = (hourWidth / 60) * 5;

        var timearray = time.split(':');
        var hours = parseInt(timearray[0], 10),
            minutes = parseInt(timearray[1], 10);

        hours = hours < 12 ? hours + 24 : hours; // TODO hartkodierte 12 konfigurierbar machen
        return (hours * hourWidth + (minutes / 5) * fiveMinuteWidth) - (12 * hourWidth);  // TODO tagesstartzeit (atm 12:00)
    };

    Plugin.prototype = {

        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and

            var plugin = this;

            $.getJSON("hurricane.json", function(json) {
                var $festival = plugin.createFestival(plugin.element, plugin.options, json);

                $(plugin.element).append($festival);
            });

        },

        createFestival: function (el, options, festival) {
            var days = festival.days;

            var $div = $('<div/>').addClass('festival');
            $div.append(festival.name);

            for (var i = 0; i < days.length; i++) {
                var day = days[i];
                var $day = this.createDay(el, options, day);

                $div.append($day);
            }

            return $div;
        },

        createDay: function (el, options, day) {
            var stages = day.stages;

            var $div = $('<div/>').addClass('day');
            $div.append(day.name);

            for (var i = 0; i < stages.length; i++) {
                var stage = stages[i];
                var $stage = this.createStage(el, options, stage);

                $div.append($stage);
            }

            return $div;
        },

        createStage: function (el, options, stage) {
            var artists = stage.artists;

            var $div = $('<div/>').addClass('stage');
            $div.append(stage.name);

            for(var i = 0; i < artists.length; i++) {
                var artist = artists[i];
                var $artist = this.createArtist(el, options, artist);

                $div.append($artist);
            }

            return $div;
        },

        createArtist: function (el, options, artist) {
            var offset = _calcOffset(artist.time, options.hourWidth);
            var width = _calcWidth(artist.duration, options.hourWidth);

            var $div = $('<div/>').addClass('artist');
            $div.attr('id', artist.id);
            $div.append(artist.name);
            $div.css({
                'width': width + 'px',
                'left': offset + 'px'
            });

            return $div;
        }

    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);