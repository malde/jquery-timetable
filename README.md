# jQuery Festival Timetable Plugin

This plugin creates an timetable for each day and stages of a festival.

## jQuery Usage

    $('#timetable').timetable({
        'hourWidth': 90,        // the width an hour should be in pixels
        'firstHour': 11,        // the hour after which the performances are starting
        'lastHour': 2,          // the hour after the last performance of a day
        'file': 'festival.json' // the file containing the JSON data describing the festival (should be on the same domain)
    });

You might have to play around with the values to make the table fit into a page.

## Festival data

The data for the lineup follows the following format. A festival has an array of days, each day has an array of stages, which each have an array of artists playing those stages.
Each day and stage should be named. The data for an artist has 4 fields, an unique `id`, a `name` and the `time` (24h format) and `duration` (in minutes) of their performance.

    {
        "name": "Festival Name",
        "days": [
            {
                "name": "First Day",
                "date": "06/21/2013",
                "stages": [
                    {
                        "id": "blue",
                        "name": "Blue Stage",
                        "artists": [
                            {
                                "id": "national",
                                "name": "The National",
                                "time": "20:30",
                                "duration": 60
                            },
                            {
                                "id": "portishead",
                                "name": "Portishead",
                                "time": "22:10",
                                "duration": 80
                            },
                            {
                                "id": "sigurros",
                                "name": "Sigur Rós",
                                "time": "00:30",
                                "duration": 90
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": "Stage 2",
                        "artists": [ ... ]
                    }
                ]
            },
            {
                "name": "Day 2",
                "date": "06/22/2013",
                "stages": [ ... ]
            }
        ]
    }

## Design / CSS

There are a few examples in the `/examples`-folder, but you should provide your own css (maybe use one of the examples as a starting point).