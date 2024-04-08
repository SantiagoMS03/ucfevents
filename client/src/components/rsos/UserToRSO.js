import React from "react";
import RelationFinder from "../../apis/RelationFinder";

const UserToRSO = async (rsoIDs, userIds, setUserID) => {
    console.log("Test rsoid",rsoIDs)
    console.log("Test userid", userIds)
    try {
      const response = await RelationFinder.post(`/${rsoIDs}`, {
        user_ids: userIds
      })
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  
export default UserToRSO;