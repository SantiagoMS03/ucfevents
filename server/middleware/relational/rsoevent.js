
const db = require("../../db");

const relateRSOEvent = async (rsoId, eventId) => {
    await db.query(`INSERT INTO rsoevent (rso_id, event_id) VALUES ${rsoId}, ${eventId}`);
}

module.exports =  relateRSOEvent;