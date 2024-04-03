import React, { Fragment } from 'react'
import RegisterUser from "../../components/login/RegisterUser"

const UserRegisterPage = () => {
 return (
    <div>
        <div className="text-center display-4">Register User</div>
            <Fragment>
                <RegisterUser/>
            </Fragment>
    </div>
 )
}

export default UserRegisterPage;