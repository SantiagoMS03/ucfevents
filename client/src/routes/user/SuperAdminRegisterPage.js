import React, { Fragment, useState } from 'react';

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [UniversityName, setUniversityName] = useState("");
  const [UniversityAddress, setUniversityAddress] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [universities, setUniversities] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        // Perform registration logic here
        console.log('Super Admin Info:', { username, password, email });
        console.log('University Info:', { UniversityName, UniversityAddress, description, numberOfStudents, photo });

        // Assuming University is successfully created, add it to universities
        const newUniversity = { name: UniversityName, address: UniversityAddress };
        setUniversities([...universities, newUniversity]);

        // Clear form fields after registration
        setUsername("");
        setPassword("");
        setEmail("");
        setUniversityName("");
        setUniversityAddress("");
        setDescription("");
        setNumberOfStudents(0);
        setPhoto(null);
    } catch (err) {
      console.error(err);
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <Fragment>
      <h2>Register as Super Admin and Create University</h2>
      <form>
        {/* Super Admin Registration Form */}
        <h3>Super Admin Registration</h3>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            value={username}
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        {/* University Creation Form */}
        <h3>University Creation</h3>
        <div>
          <label htmlFor='UniversityName'>University Name</label>
          <input
            id='UniversityName'
            value={UniversityName}
            type='text'
            onChange={(e) => setUniversityName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='UniversityAddress'>University Address</label>
          <input
            id='UniversityAddress'
            value={UniversityAddress}
            type='text'
            onChange={(e) => setUniversityAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='numberOfStudents'>Number of Students</label>
          <input
            id='numberOfStudents'
            value={numberOfStudents}
            type='number'
            onChange={(e) => setNumberOfStudents(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='photo'>Photo</label>
          <input
            id='photo'
            type='file'
            accept='image/*'
            onChange={handlePhotoChange}
          />
        </div>
        <button onClick={handleRegister}>Register and Create University</button>
      </form>
      
      {/* Dropdown for selecting universities */}
      <div>
        <h3>Select University</h3>
        <select>
          <option value="">Select University</option>
          {universities.map((university, index) => (
            <option key={index} value={university.name}>{university.name}</option>
          ))}
        </select>
      </div>
    </Fragment>
  )
}

export default RegistrationPage;
