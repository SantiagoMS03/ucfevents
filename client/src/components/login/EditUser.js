import React from 'react';
import UserFinder from '../../apis/UserFinder';

function EditUser(id) {
    try {
        const updateUser = UserFinder.put(`/${id}`);
        console.log(updateUser);
      } catch (err) {
        console.log(err);
      }
}
export default EditUser;