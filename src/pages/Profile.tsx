import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import { Navbar } from '../components/Home/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Landing/Footer';
import styles from './Profile.module.css';
import { getTodayNutrition, getUserProfile, updateUserProfile } from '../services/api';

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
  dailyNutritionGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

type BooleanSettingKey = 'reminders' | 'notifications' | 'darkMode' | 'emailUpdates';

const Profile: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active tab from URL query parameter
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    return tab || 'settings';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    profilePhoto: 'https://via.placeholder.com/150',
    height: 0,
    weight: 0,
    bmi: 0,
    bmiCategory: 'Not calculated',
    streak: 0,
    progress: 0,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const [nutritionGoals, setNutritionGoals] = useState({
    calories: userData.dailyNutritionGoals?.calories || 2000,
    protein: userData.dailyNutritionGoals?.protein || 150,
    carbs: userData.dailyNutritionGoals?.carbs || 250,
    fat: userData.dailyNutritionGoals?.fat || 70
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
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setProfileError('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setProfileError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        // Update both states to ensure consistency
        setUserData(prev => ({
          ...prev,
          profilePhoto: imageUrl
        }));
        setProfileForm(prev => ({
          ...prev,
          profilePhoto: imageUrl
        }));
      };
      reader.onerror = () => {
        setProfileError('Error reading the image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === 'profilePhoto' && files && files[0]) {
      handleImageUpload(e);
    } else {
      setProfileForm(prev => ({ ...prev, [name]: value }));
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

  const handleNutritionGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutritionGoals(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const profileData = await getUserProfile();
        if (!profileData) {
          throw new Error('No profile data received');
        }

        setUserData(prev => ({
          ...prev,
          ...profileData,
          profilePhoto: profileData.profilePhoto || prev.profilePhoto
        }));
        
        // Update profile form with fetched data
        setProfileForm({
          name: profileData.name || '',
          age: profileData.age || '',
          email: profileData.email || '',
          profilePhoto: profileData.profilePhoto || 'https://via.placeholder.com/150'
        });

        // Update nutrition goals if available
        if (profileData.dailyNutritionGoals) {
          setNutritionGoals(profileData.dailyNutritionGoals);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load profile data. Please try again.';
        setError(errorMessage);
        
        // If unauthorized, redirect to login
        if (err instanceof Error && err.message.includes('401')) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateProfileForm();
    if (error) {
      setProfileError(error);
      setProfileSuccess(false);
      return;
    }

    setIsLoading(true);
    setProfileError('');
    
    try {
      const updatedData = {
        name: profileForm.name,
        age: Number(profileForm.age),
        email: profileForm.email,
        profilePhoto: profileForm.profilePhoto,
        dailyNutritionGoals: nutritionGoals
      };

      // Update user data in backend
      const response = await updateUserProfile(updatedData);
      
      if (!response) {
        throw new Error('No response received from server');
      }

      // Update user data in state
      setUserData(prev => ({
        ...prev,
        ...response
      }));

      // Update global context
      dispatch({
        type: 'SET_USER_DATA',
        payload: {
          ...state.userData,
          ...response
        }
      });

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile. Please try again.';
      setProfileError(errorMessage);
      
      // If unauthorized, redirect to login
      if (err instanceof Error && err.message.includes('401')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
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

  // Remove the duplicate nutritionIntake since we're using todayIntake
  const [todayIntake, setTodayIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/profile?tab=${tab}`, { replace: true });
  };

  // Fetch nutrition data when component mounts and when tab changes
  useEffect(() => {
    const fetchNutritionData = async () => {
      if (activeTab === 'nutrition') {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getTodayNutrition();
          console.log('Fetched nutrition data:', data);
          
          // Update today's intake with the totals from the API
          setTodayIntake(data.totals || {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
          });

          // If the API returns goals, update them in the context
          if (data.goals && state.userData) {
            dispatch({
              type: 'SET_USER_DATA',
              payload: {
                ...state.userData,
                dailyNutritionGoals: data.goals
              }
            });
          }
        } catch (error) {
          console.error('Failed to fetch nutrition data:', error);
          setError('Failed to load nutrition data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNutritionData();
  }, [activeTab, dispatch, state.userData]);

  // Safe percentage calculation with proper type checking
  const getNutritionPercent = (type: keyof typeof nutritionGoals) => {
    const goal = state.userData?.dailyNutritionGoals?.[type] || 0;
    const intake = todayIntake[type] || 0;
    
    if (!goal || goal === 0) return 0;
    return Math.min(100, Math.round((intake / goal) * 100));
  };

  const validateProfileForm = () => {
    if (!profileForm.name.trim()) return 'Name is required.';
    if (!profileForm.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return 'Invalid email address.';
    if (!profileForm.age || isNaN(Number(profileForm.age)) || Number(profileForm.age) <= 0) return 'Age must be a positive number.';
    return '';
  };

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
        {error && (
          <div className={styles.errorMessage}>
            {error}
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}
        <div className={styles.profileHeader}>
          <div className={styles.imagePreviewContainer}>
            {userData.profilePhoto ? (
              <img 
                src={userData.profilePhoto} 
                alt="Profile" 
                className={styles.imagePreview} 
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <div className={styles.profilePhotoPlaceholder} onClick={() => fileInputRef.current?.click()}>
                {userData.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '👤'}
              </div>
            )}
          </div>
          <h1 className={styles.userName}>{userData.name}</h1>
          <p className={styles.userEmail}>{userData.email}</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            Settings
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'bmi' ? styles.active : ''}`}
            onClick={() => handleTabChange('bmi')}
          >
            BMI Info
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'streak' ? styles.active : ''}`}
            onClick={() => handleTabChange('streak')}
          >
            Streak
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`}
            onClick={() => handleTabChange('progress')}
          >
            Progress
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
            onClick={() => handleTabChange('nutrition')}
          >
            Nutrition
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'settings' && (
            <div className={styles.settings}>
              <div className={styles.profileFormHeading}>Profile Settings</div>
              <form 
                className={`${styles.profileForm} ${isLoading ? styles.loading : ''}`} 
                onSubmit={handleProfileSave}
              >
                {/* Personal Information Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.sectionTitle}>Personal Information</h3>
                  <div className={styles.profileFormRow}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileInputChange}
                      className={styles.profileInput}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className={styles.profileFormRow}>
                    <label htmlFor="age">Age</label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={profileForm.age}
                      onChange={handleProfileInputChange}
                      className={styles.profileInput}
                      placeholder="Enter your age"
                      min="1"
                    />
                  </div>
                  <div className={styles.profileFormRow}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileInputChange}
                      className={styles.profileInput}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Profile Photo Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.sectionTitle}>Profile Photo</h3>
                  <div className={styles.profilePhotoEdit}>
                    <div className={styles.imagePreviewContainer}>
                      {profileForm.profilePhoto ? (
                        <img 
                          src={profileForm.profilePhoto} 
                          alt="Profile Preview" 
                          className={styles.imagePreview} 
                        />
                      ) : (
                        <div className={styles.profilePhotoPlaceholder}>
                          {profileForm.name ? profileForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '👤'}
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleProfileInputChange}
                      className={styles.fileInput}
                    />
                    <button
                      type="button"
                      className={styles.uploadButton}
                      onClick={() => (document.querySelector('input[name="profilePhoto"]') as HTMLInputElement)?.click()}
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Nutrition Goals Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.sectionTitle}>Daily Nutrition Goals</h3>
                  <div className={styles.nutritionGrid}>
                    <div className={styles.profileFormRow}>
                      <label htmlFor="calories">Calories (kcal)</label>
                      <input
                        id="calories"
                        type="number"
                        name="calories"
                        value={nutritionGoals.calories}
                        onChange={handleNutritionGoalsChange}
                        className={styles.profileInput}
                        min="0"
                        placeholder="Enter daily calorie goal"
                      />
                    </div>
                    <div className={styles.profileFormRow}>
                      <label htmlFor="protein">Protein (g)</label>
                      <input
                        id="protein"
                        type="number"
                        name="protein"
                        value={nutritionGoals.protein}
                        onChange={handleNutritionGoalsChange}
                        className={styles.profileInput}
                        min="0"
                        placeholder="Enter protein goal"
                      />
                    </div>
                    <div className={styles.profileFormRow}>
                      <label htmlFor="carbs">Carbohydrates (g)</label>
                      <input
                        id="carbs"
                        type="number"
                        name="carbs"
                        value={nutritionGoals.carbs}
                        onChange={handleNutritionGoalsChange}
                        className={styles.profileInput}
                        min="0"
                        placeholder="Enter carbs goal"
                      />
                    </div>
                    <div className={styles.profileFormRow}>
                      <label htmlFor="fat">Fat (g)</label>
                      <input
                        id="fat"
                        type="number"
                        name="fat"
                        value={nutritionGoals.fat}
                        onChange={handleNutritionGoalsChange}
                        className={styles.profileInput}
                        min="0"
                        placeholder="Enter fat goal"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.sectionTitle}>Preferences</h3>
                  <div className={styles.settingItem}>
                    <span>Reminders</span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={settings.reminders}
                        onChange={() => handleSettingToggle('reminders')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <span>Notifications</span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={() => handleSettingToggle('notifications')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <span>Email Updates</span>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={settings.emailUpdates}
                        onChange={() => handleSettingToggle('emailUpdates')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.saveProfileButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>

                {/* Status Messages */}
                {profileError && (
                  <div className={styles.profileError}>
                    <span className={styles.errorIcon}>!</span>
                    {profileError}
                  </div>
                )}
                {profileSuccess && (
                  <div className={styles.profileSuccess}>
                    <span className={styles.successIcon}>✓</span>
                    Profile updated successfully!
                  </div>
                )}
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
            <div className={styles.nutritionTabContent}>
              {isLoading ? (
                <div className={styles.loadingSpinner}>Loading nutrition data...</div>
              ) : error ? (
                <div className={styles.errorMessage}>{error}</div>
              ) : (
                <div className={styles.nutritionTabGrid}>
                  {[
                    { key: 'calories', label: 'Calories', unit: 'kcal' },
                    { key: 'protein', label: 'Protein', unit: 'g' },
                    { key: 'carbs', label: 'Carbs', unit: 'g' },
                    { key: 'fat', label: 'Fat', unit: 'g' },
                  ].map(nutrient => {
                    const percent = getNutritionPercent(nutrient.key as keyof typeof nutritionGoals);
                    const goal = state.userData?.dailyNutritionGoals?.[nutrient.key as keyof typeof nutritionGoals] || 0;
                    const intake = todayIntake[nutrient.key as keyof typeof todayIntake] || 0;

                    return (
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
                              strokeDashoffset={113 - (113 * percent) / 100}
                              style={{ transition: 'stroke-dashoffset 0.7s ease' }}
                            />
                          </svg>
                          <div className={styles.nutritionTabCirclePercent}>
                            {percent}%
                          </div>
                        </div>
                        <div className={styles.nutritionTabCircleLabel}>
                          {nutrient.label}
                        </div>
                        <div className={styles.nutritionTabCircleValue}>
                          {intake} / {goal} {nutrient.unit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;