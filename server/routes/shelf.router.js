const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */

 
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT "item".*, "person"."id" as person_id, "person"."username"
                        FROM  "item"
                        JOIN "person"
                        ON "person"."id" = "item"."person_id";`;
        pool.query(query).then((results) => {
            res.send(results.rows); 
        }).catch((error) => {
            console.log('Error getting shelf items', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});



/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `INSERT INTO "item" ("description", "image_url", "person_id") VALUES ($1, $2, $3);`; 
        const itemToAdd = req.body;
        pool.query(query, [itemToAdd.description, itemToAdd.image_url, req.user.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error posting new item', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403); 
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `DELETE FROM "item" WHERE "id" = $1;`;
        pool.query(query, [req.query.id]).then((results) => {
            res.sendStatus(200); 
        }).catch((error) => {
            console.log(`Error deleting item with id of: ${req.params.id}`, error);
        });
    } else {
        res.sendStatus(403); 
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
    if (req.isAuthenticated()){
    const query = `SELECT COUNT ("item"."description"), "person"."username"
    FROM  "item"
    RIGHT JOIN "person"
    ON "person"."id" = "item"."person_id"
    GROUP BY "person"."id";`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting count', error); 
    });
    } else {
        res.sendStatus(403); 
    }
});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;