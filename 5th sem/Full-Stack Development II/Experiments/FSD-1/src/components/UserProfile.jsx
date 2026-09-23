import './UserProfile.css'

function UserProfile({name , job , bio , skills , email , phone , isAvailable}){

    return(
        <div className='profile-card'>
            <h1>User Profile</h1>
            <div className="profile-info">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Job:</strong> {job}</p>
                <p><strong>Bio:</strong> {bio}</p>
                <p><strong>Skills:</strong></p>
                <ul className='skill-list'>
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Status:</strong> 
                    {isAvailable ? 
                        <span className='online-dot'>● Online</span> : 
                        " Not available"
                    }
                </p>
            </div>
        </div>
    )
}
export default UserProfile;