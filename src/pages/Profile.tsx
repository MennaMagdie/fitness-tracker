import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import { Navbar } from '../components/Home/Navbar';
import Footer from '../components/Landing/Footer';

interface UserData {
  name: string;
  email: string;
  profilePhoto: string;
  height: number;
  weight: number;
  bmi: number;
  bmiCategory: string;
  streak: number;
  progress: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  age?: number;
}

type BooleanSettingKey = 'reminders' | 'notifications' | 'darkMode' | 'emailUpdates';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePhoto: 'https://via.placeholder.com/150',
    height: 0,
    weight: 0,
    bmi: 0,
    bmiCategory: 'Not calculated',
    streak: 7,
    progress: 75,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    reminders: true,
    notifications: true,
    darkMode: false,
    emailUpdates: false,
    language: 'en',
  });
  const location = useLocation();

  const [profileForm, setProfileForm] = useState({
    name: userData.name,
    age: userData.age || '',
    email: userData.email,
    profilePhoto: userData.profilePhoto,
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [bmiForm, setBmiForm] = useState({
    height: userData.height || '',
    weight: userData.weight || '',
  });
  const [bmiResult, setBmiResult] = useState<{bmi: number|string, category: string}>({bmi: '--', category: ''});
  const [bmiError, setBmiError] = useState('');

  // Streak State
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0,0,0,0);
    return d;
  };
  const startOfWeek = getStartOfWeek(today);

  // This would come from backend or global state in a real app:
  const [workoutCompletion, setWorkoutCompletion] = useState<boolean[]>(() => {
    // Simulate fetching from backend/localStorage
    const saved = localStorage.getItem('workoutCompletion');
    if (saved) return JSON.parse(saved);
    return Array(7).fill(false);
  });

  // Simulate backend/state update:
  useEffect(() => {
    localStorage.setItem('workoutCompletion', JSON.stringify(workoutCompletion));
  }, [workoutCompletion]);

  const handleResetStreak = () => {
    setWorkoutCompletion(Array(7).fill(false));
  };

  const calculateStreak = () => {
    let streak = 0;
    for (let i = workoutCompletion.length - 1; i >= 0; i--) {
      if (workoutCompletion[i]) streak++;
      else break;
    }
    return streak;
  };
  const currentStreak = calculateStreak();
  const totalCompleted = workoutCompletion.filter(Boolean).length;

  const handleLogout = () => {
    navigate('/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profilePhoto: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateBMI = (height: number, weight: number) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      let category = '';

      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      return { bmi: Number(bmi.toFixed(1)), category };
    }
    return { bmi: 0, category: 'Not calculated' };
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    setUserData(prev => {
      const { bmi, category } = calculateBMI(height, prev.weight);
      return {
        ...prev,
        height,
        bmi,
        bmiCategory: category
      };
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    setUserData(prev => {
      const { bmi, category } = calculateBMI(prev.height, weight);
      return {
        ...prev,
        weight,
        bmi,
        bmiCategory: category
      };
    });
  };

  const handleNutritionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [name]: Number(value)
      }
    }));
  };

  const handleSettingToggle = (key: BooleanSettingKey) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfileForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateProfileForm = () => {
    if (!profileForm.name.trim()) return 'Name is required.';
    if (!profileForm.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return 'Invalid email address.';
    if (!profileForm.age || isNaN(Number(profileForm.age)) || Number(profileForm.age) <= 0) return 'Age must be a positive number.';
    return '';
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateProfileForm();
    if (error) {
      setProfileError(error);
      setProfileSuccess(false);
      return;
    }
    setUserData(prev => ({
      ...prev,
      name: profileForm.name,
      age: Number(profileForm.age),
      email: profileForm.email,
      profilePhoto: profileForm.profilePhoto,
    }));
    setProfileError('');
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2000);
    console.log('Profile updated:', profileForm);
  };

  const handleBmiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBmiForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBmiCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const height = Number(bmiForm.height);
    const weight = Number(bmiForm.weight);
    if (!height || !weight || height <= 0 || weight <= 0) {
      setBmiError('Please enter valid height and weight.');
      setBmiResult({bmi: '--', category: ''});
      return;
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    setBmiResult({bmi: Number(bmi.toFixed(1)), category});
    setBmiError('');
  };

  // Mock data for daily workout completion (future integration with real data)
  const mockDailyWorkouts = [
    { day: 'Sun', completed: 3, total: 4 },
    { day: 'Mon', completed: 2, total: 3 },
    { day: 'Tue', completed: 3, total: 3 },
    { day: 'Wed', completed: 1, total: 2 },
    { day: 'Thu', completed: 2, total: 2 },
    { day: 'Fri', completed: 0, total: 2 },
    { day: 'Sat', completed: 2, total: 2 },
  ];
  const getCompletionPercent = (entry: {completed: number, total: number}) =>
    entry.total === 0 ? 0 : Math.round((entry.completed / entry.total) * 100);

  // Mock nutrition data for the Nutrition tab
  const nutritionGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
  };
  const nutritionIntake = {
    calories: 1200,
    protein: 80,
    carbs: 180,
    fat: 40,
  };
  const getNutritionPercent = (type: keyof typeof nutritionGoals) =>
    Math.min(100, Math.round((nutritionIntake[type] / nutritionGoals[type]) * 100));

  // Set active tab based on query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profilePhotoContainer}>
            {userData.profilePhoto && userData.profilePhoto !== 'https://via.placeholder.com/150' ? (
              <img 
                src={userData.profilePhoto} 
                alt="Profile" 
                className={styles.profilePhoto} 
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <div className={styles.profilePhotoPlaceholder} onClick={() => fileInputRef.current?.click()}>
                Upload a photo
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button 
              className={styles.uploadButton}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>
          <h1 className={styles.userName}>{userData.name}</h1>
          <p className={styles.userEmail}>{userData.email}</p>
        
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'bmi' ? styles.active : ''}`}
            onClick={() => setActiveTab('bmi')}
          >
            BMI Info
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'streak' ? styles.active : ''}`}
            onClick={() => setActiveTab('streak')}
          >
            Streak
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'settings' && (
            <div className={styles.settings}>
              <div className={styles.profileFormHeading}>Settings</div>
              <form className={styles.profileForm} onSubmit={handleProfileSave}>
                <div className={styles.profileFormRow}>
                  <label>Name</label>
                  <input type="text" name="name" value={profileForm.name} onChange={handleProfileInputChange} className={styles.profileInput} />
                </div>
                <div className={styles.profileFormRow}>
                  <label>Age</label>
                  <input type="number" name="age" value={profileForm.age} onChange={handleProfileInputChange} className={styles.profileInput} min="1" />
                </div>
                <div className={styles.profileFormRow}>
                  <label>Email</label>
                  <input type="email" name="email" value={profileForm.email} onChange={handleProfileInputChange} className={styles.profileInput} />
                </div>
                <div className={styles.profileFormRow}>
                  <label>Profile Photo</label>
                  <div className={styles.profilePhotoEdit}>
                    {profileForm.profilePhoto && profileForm.profilePhoto !== 'https://via.placeholder.com/150' ? (
                      <img src={profileForm.profilePhoto} alt="Profile Preview" className={styles.profilePhotoPreview} />
                    ) : (
                      <div className={styles.profilePhotoPlaceholder}>
                        {profileForm.name ? profileForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : <span>👤</span>}
                      </div>
                    )}
                    <input type="file" name="profilePhoto" accept="image/*" onChange={handleProfileInputChange} />
                  </div>
                </div>
                <div className={styles.buttonRow}>
                  <button type="submit" className={styles.saveProfileButton}>Save Profile</button>
                </div>
                {profileError && <div className={styles.profileError}>{profileError}</div>}
                {profileSuccess && <div className={styles.profileSuccess}>Profile saved!</div>}
                <div className={styles.settingItem}>
                  <span>Reminders</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={settings.reminders} onChange={() => handleSettingToggle('reminders')} />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <span>Notifications</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={settings.notifications} onChange={() => handleSettingToggle('notifications')} />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <span>Email Updates</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={settings.emailUpdates} onChange={() => handleSettingToggle('emailUpdates')} />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout} type="button">
                  Logout
                </button>
              </form>
            </div>
          )}

          {activeTab === 'bmi' && (
            <div className={styles.bmiInfo}>
              <div className={styles.profileFormHeading}>BMI Calculator</div>
              <form className={styles.bmiForm} onSubmit={handleBmiCalculate}>
                <div className={styles.bmiInputs}>
                  <div className={styles.inputGroup}>
                    <label>Height (cm)</label>
                    <input type="number" name="height" value={bmiForm.height} onChange={handleBmiInputChange} className={styles.bmiInput} min="1" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Weight (kg)</label>
                    <input type="number" name="weight" value={bmiForm.weight} onChange={handleBmiInputChange} className={styles.bmiInput} min="1" />
                  </div>
                </div>
                <button type="submit" className={styles.calculateBmiButton}>Calculate BMI</button>
                {bmiError && <div className={styles.bmiError}>{bmiError}</div>}
                <div className={styles.bmiValue}>{bmiResult.bmi}</div>
                <div className={styles.bmiCategory}>{bmiResult.category}</div>
              </form>
            </div>
          )}

          {activeTab === 'streak' && (
            <div className={styles.streakInfo}>
              <div className={styles.streakValue}>
                <span role="img" aria-label="fire">🔥</span> Current Streak: {currentStreak} Day{currentStreak !== 1 ? 's' : ''}
              </div>
              <div className={styles.streakGrid}>
                {weekDays.map((day, idx) => (
                  <div
                    key={day}
                    className={workoutCompletion[idx] ? styles.streakDayActive : styles.streakDay}
                  >
                    {day}
                    {workoutCompletion[idx] && (
                      <span className={styles.streakCheck}>✔</span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.streakHistory}>
                Total Workout Days Completed: <span className={styles.streakHistoryCount}>{totalCompleted}</span>
              </div>
              <button className={styles.resetStreakButton} onClick={handleResetStreak}>
                Reset Streak
              </button>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className={styles.progressInfo}>
              <h2>Progress</h2>
              <div className={styles.progressChartLabel}>Daily Workout Completion</div>
              <div className={styles.progressChart}>
                {mockDailyWorkouts.map((entry, idx) => (
                  <div key={entry.day} className={styles.progressBarDay}>
                    <div className={styles.progressBarDayLabel}>{entry.day}</div>
                    <div className={styles.progressBarTrack}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${getCompletionPercent(entry)}%` }}
                      >
                        <span className={styles.progressBarPercent}>{getCompletionPercent(entry)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.progressValue}>{userData.progress}%</div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className={styles.nutritionTabGrid}>
              {[
                { key: 'calories', label: 'Calories' },
                { key: 'protein', label: 'Protein' },
                { key: 'carbs', label: 'Carbs' },
                { key: 'fat', label: 'Fat' },
              ].map(nutrient => (
                <div key={nutrient.key} className={styles.nutritionTabCircleWrapper}>
                  <div className={styles.nutritionTabCircleOuter}>
                    <svg className={styles.nutritionTabCircleSvg} viewBox="0 0 40 40">
                      <circle
                        className={styles.nutritionTabCircleTrack}
                        cx="20" cy="20" r="18"
                        stroke="#eee" strokeWidth="4" fill="none"
                      />
                      <circle
                        className={styles.nutritionTabCircleBar}
                        cx="20" cy="20" r="18"
                        stroke="#FF6B35"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={113}
                        strokeDashoffset={113 - (113 * getNutritionPercent(nutrient.key as keyof typeof nutritionGoals)) / 100}
                        style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
                      />
                    </svg>
                    <div className={styles.nutritionTabCirclePercent}>
                      {getNutritionPercent(nutrient.key as keyof typeof nutritionGoals)}%
                    </div>
                  </div>
                  <div className={styles.nutritionTabCircleLabel}>{nutrient.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;