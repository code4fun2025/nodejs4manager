module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `managers` ORDER BY id ASC"; // query database to get all the managers

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Manager database | View Managers"
                ,managers: result
            });
        });
    },
};