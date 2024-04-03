import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4000/users",
  });


// export async function userRegistration(registrationData){
//     return await axios.post(
//         'http://localhost:4000/user/registration', registrationData)
// };

// export async function userLogin(loginData){
//     return await axios.post(
//         'http://localhost:4000/user/login', loginData)
// };

// export async function userLogout(){
//     return await axios.post(
//         'http://localhost:4000/user/logout')
// };