
const db = require("../../db");

const relateUniversityRSO = async (universityId, rsoId) => {
    await db.query(`INSERT INTO universityrso (university_id, rso_id) VALUES ${universityId}, ${rsoId}`);
}

module.exports =  relateUniversityRSO;