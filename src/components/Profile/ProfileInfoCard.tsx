import React from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import '../../pages/Profile.css';

const ProfileInfoCard = ({ profile, onEdit }: any) => (
  <div className="card profile-info-card">
    <div className="profile-avatar">
      <FaUserCircle size={64} />
    </div>
    <div>
      <h2 className="profile-name">{profile.name}</h2>
      <p className="profile-email">{profile.email}</p>
      <div className="profile-stats">
        <span>Weight: {profile.weight}kg</span>
        <span>Height: {profile.height}cm</span>
        <span>BMI: {profile.bmi}</span>
        <button className="btn btn-icon" onClick={onEdit} title="Edit Profile">
          <FaEdit />
        </button>
      </div>
    </div>
  </div>
);

export default ProfileInfoCard; 