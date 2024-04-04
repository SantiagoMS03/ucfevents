import React, { Fragment } from 'react'
import RegisterAdmin from "../../components/login/RegisterAdmin"

const AdminRegisterPage = () => {
 return (
    <div>
        <div className="text-center display-4">Register Admin</div>
            <Fragment>
                <RegisterAdmin/>
            </Fragment>
    </div>
 )
}

export default AdminRegisterPage;