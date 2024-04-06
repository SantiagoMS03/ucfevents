const db = require("../../db");

const relateUserEvent = async (userId, eventId) => {
    await db.query(`INSERT INTO attending (user_id, event_id) VALUES ${userId}, ${eventId}`);
}

module.exports =  relateUserEvent;