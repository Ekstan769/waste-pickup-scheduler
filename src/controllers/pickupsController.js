const pool = require('../db');

async function createPickup(req, res) {
    const { user_id, address, scheduled_date } = req.body;

    if (!user_id || !address || !scheduled_date) {
        return res.status(400).json({ error: 'user_id, address, and scheduled_date are required' });
    }

    try {
        const result =await pool.query(
            `INSERT INTO pickups (user_id, address, scheduled_date)
            VALUES ($1, $2, $3) RETURNING *`,
            [user_id, address, scheduled_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong creating the pickup' });
    }
}

async function getUserPickups(req, res) {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM pickups WHERE user_id = $1 ORDER BY scheduled_date ASC',
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something wen wrong fetching pickups' });
    }
}

async function updatePickupStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'completed', 'missed'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status must be pending, completed, or missed' });
    }

    try {
        const result = await pool.query(
            'UPDATE pickups SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pickup not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Somrthing went wrong updating the pickup' });
    }
}

async function addFeedback(req, res) {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }

    try {
        const pickupCheck = await pool.query('Select id FROM pickups WHERE id = $1', [id]);
        if (pickupCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Pickup not found' });
        }

        const result = await pool.query(
            'INSERT INTO feedback (pickup_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
            [id, rating,comment]
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong adding feedback' });
    }
}
module.exports = { createPickup, getUserPickups, updatePickupStatus, addFeedback };