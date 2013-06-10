/**
 * Dependencies
 */

var entries = require("../modules/entries"),
    config = require("../config");

/**
 * Entrie Controller
 */

var entryController = {

    projects: function (req, res) {

        entries.getEntries().then(function (entries) {

            res.render("projects", {
                debugMode: debugMode,
                title: "Projects",
                view: "page-projects",
                entries: entries
            });

        });

    },

    students: function (req, res) {

        entries.getEntries().then(function (entries) {

            res.render("students", {
                debugMode: debugMode,
                title: "Students",
                view: "page-students",
                entries: entries
            });

        });

    },

    project: function (req, res) {

        var slug = req.params.slug,
            query = { "project.slug": slug };

        console.log("Query: ", query);

        entries.getEntry(query).then(function (entry) {

            if (entry === null) {

                res.send(404);

            } else {

                res.render("project", {
                    debugMode: debugMode,
                    title: "Project",
                    view: "page-project",
                    entry: entry
                });

            }

        });

    },

    add: function (req, res) {

        console.log("Add entries req: ", req.body.entries);

        if (req.body.apiKey === config.apiKey) {

            entries.addEntries(req.body.entries).then(function () {

                res.send(200);

            });

        } else {

            res.send(401);

        }

    }

};

module.exports = entryController;
