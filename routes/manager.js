const fs = require('fs');

module.exports = {
    addManagerPage: (req, res) => {
        res.render('add-manager.ejs', {
            title: "Welcome to Manager database | Add a new manager"
            ,message: ''
        });
    },
    addManager: (req, res) => {
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;

        let usernameQuery = "SELECT * FROM `managers` WHERE first_name = '" + first_name + "' AND last_name = '" + last_name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Manager already exists';
                res.render('add-manager.ejs', {
                    message,
                    title: "Welcome to Better Manager database | Add a new manager"
                });
            } else {
                // insert the manager's details to the database
                let query = "INSERT INTO `managers` (first_name, last_name) VALUES ('" +
                    first_name + "', '" + last_name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },
    editManagerPage: (req, res) => {
        let managerId = req.params.id;
        let query = "SELECT * FROM `managers` WHERE id = '" + managerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-manager.ejs', {
                title: "Edit  Manager"
                ,manager: result[0]
                ,message: ''
            });
        });
    },
    editManager: (req, res) => {
        let managerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;

        let query = "UPDATE `managers` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "' WHERE id = " + managerId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteManager: (req, res) => {
        let managerId = req.params.id;
        let deleteUserQuery = 'DELETE FROM managers WHERE id = "' + managerId + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
