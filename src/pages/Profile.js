import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import { Navbar } from '../components/Home/Navbar';
import Footer from '../components/Landing/Footer';
const Profile = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [userData, setUserData] = useState({
        name: 'Joo Doe',
        email: 'Joo7doe@example.com',
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
    const fileInputRef = useRef(null);
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
    const [bmiResult, setBmiResult] = useState({ bmi: '--', category: '' });
    const [bmiError, setBmiError] = useState('');
    // Streak State
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
    };
    const startOfWeek = getStartOfWeek(today);
    // This would come from backend or global state in a real app:
    const [workoutCompletion, setWorkoutCompletion] = useState(() => {
        // Simulate fetching from backend/localStorage
        const saved = localStorage.getItem('workoutCompletion');
        if (saved)
            return JSON.parse(saved);
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
            if (workoutCompletion[i])
                streak++;
            else
                break;
        }
        return streak;
    };
    const currentStreak = calculateStreak();
    const totalCompleted = workoutCompletion.filter(Boolean).length;
    const handleLogout = () => {
        navigate('/login');
    };
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData(prev => ({
                    ...prev,
                    profilePhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const calculateBMI = (height, weight) => {
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            let category = '';
            if (bmi < 18.5)
                category = 'Underweight';
            else if (bmi < 25)
                category = 'Normal';
            else if (bmi < 30)
                category = 'Overweight';
            else
                category = 'Obese';
            return { bmi: Number(bmi.toFixed(1)), category };
        }
        return { bmi: 0, category: 'Not calculated' };
    };
    const handleHeightChange = (e) => {
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
    const handleWeightChange = (e) => {
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
    const handleNutritionChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            nutrition: {
                ...prev.nutrition,
                [name]: Number(value)
            }
        }));
    };
    const handleSettingToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const handleLanguageChange = (e) => {
        setSettings(prev => ({ ...prev, language: e.target.value }));
    };
    const handleProfileInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto' && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileForm(prev => ({ ...prev, profilePhoto: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        }
        else {
            setProfileForm(prev => ({ ...prev, [name]: value }));
        }
    };
    const validateProfileForm = () => {
        if (!profileForm.name.trim())
            return 'Name is required.';
        if (!profileForm.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
            return 'Invalid email address.';
        if (!profileForm.age || isNaN(Number(profileForm.age)) || Number(profileForm.age) <= 0)
            return 'Age must be a positive number.';
        return '';
    };
    const handleProfileSave = (e) => {
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
    const handleBmiInputChange = (e) => {
        const { name, value } = e.target;
        setBmiForm(prev => ({ ...prev, [name]: value }));
    };
    const handleBmiCalculate = (e) => {
        e.preventDefault();
        const height = Number(bmiForm.height);
        const weight = Number(bmiForm.weight);
        if (!height || !weight || height <= 0 || weight <= 0) {
            setBmiError('Please enter valid height and weight.');
            setBmiResult({ bmi: '--', category: '' });
            return;
        }
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        let category = '';
        if (bmi < 18.5)
            category = 'Underweight';
        else if (bmi < 25)
            category = 'Normal';
        else if (bmi < 30)
            category = 'Overweight';
        else
            category = 'Obese';
        setBmiResult({ bmi: Number(bmi.toFixed(1)), category });
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
    const getCompletionPercent = (entry) => entry.total === 0 ? 0 : Math.round((entry.completed / entry.total) * 100);
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
    const getNutritionPercent = (type) => Math.min(100, Math.round((nutritionIntake[type] / nutritionGoals[type]) * 100));
    // Set active tab based on query parameter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: styles.profileContainer, children: [_jsxs("div", { className: styles.profileHeader, children: [_jsxs("div", { className: styles.profilePhotoContainer, children: [userData.profilePhoto && userData.profilePhoto !== 'https://via.placeholder.com/150' ? (_jsx("img", { src: userData.profilePhoto, alt: "Profile", className: styles.profilePhoto, onClick: () => fileInputRef.current?.click() })) : (_jsx("div", { className: styles.profilePhotoPlaceholder, onClick: () => fileInputRef.current?.click(), children: "Upload a photo" })), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleImageUpload, accept: "image/*", style: { display: 'none' } }), _jsx("button", { className: styles.uploadButton, onClick: () => fileInputRef.current?.click(), children: "Change Photo" })] }), _jsx("h1", { className: styles.userName, children: userData.name }), _jsx("p", { className: styles.userEmail, children: userData.email })] }), _jsxs("div", { className: styles.tabs, children: [_jsx("button", { className: `${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`, onClick: () => setActiveTab('settings'), children: "Settings" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'bmi' ? styles.active : ''}`, onClick: () => setActiveTab('bmi'), children: "BMI Info" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'streak' ? styles.active : ''}`, onClick: () => setActiveTab('streak'), children: "Streak" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`, onClick: () => setActiveTab('progress'), children: "Progress" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`, onClick: () => setActiveTab('nutrition'), children: "Nutrition" })] }), _jsxs("div", { className: styles.tabContent, children: [activeTab === 'settings' && (_jsxs("div", { className: styles.settings, children: [_jsx("div", { className: styles.profileFormHeading, children: "Settings" }), _jsxs("form", { className: styles.profileForm, onSubmit: handleProfileSave, children: [_jsxs("div", { className: styles.profileFormRow, children: [_jsx("label", { children: "Name" }), _jsx("input", { type: "text", name: "name", value: profileForm.name, onChange: handleProfileInputChange, className: styles.profileInput })] }), _jsxs("div", { className: styles.profileFormRow, children: [_jsx("label", { children: "Age" }), _jsx("input", { type: "number", name: "age", value: profileForm.age, onChange: handleProfileInputChange, className: styles.profileInput, min: "1" })] }), _jsxs("div", { className: styles.profileFormRow, children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", name: "email", value: profileForm.email, onChange: handleProfileInputChange, className: styles.profileInput })] }), _jsxs("div", { className: styles.profileFormRow, children: [_jsx("label", { children: "Profile Photo" }), _jsxs("div", { className: styles.profilePhotoEdit, children: [profileForm.profilePhoto && profileForm.profilePhoto !== 'https://via.placeholder.com/150' ? (_jsx("img", { src: profileForm.profilePhoto, alt: "Profile Preview", className: styles.profilePhotoPreview })) : (_jsx("div", { className: styles.profilePhotoPlaceholder, children: profileForm.name ? profileForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : _jsx("span", { children: "\uD83D\uDC64" }) })), _jsx("input", { type: "file", name: "profilePhoto", accept: "image/*", onChange: handleProfileInputChange })] })] }), _jsx("div", { className: styles.buttonRow, children: _jsx("button", { type: "submit", className: styles.saveProfileButton, children: "Save Profile" }) }), profileError && _jsx("div", { className: styles.profileError, children: profileError }), profileSuccess && _jsx("div", { className: styles.profileSuccess, children: "Profile saved!" }), _jsxs("div", { className: styles.settingItem, children: [_jsx("span", { children: "Reminders" }), _jsxs("label", { className: styles.switch, children: [_jsx("input", { type: "checkbox", checked: settings.reminders, onChange: () => handleSettingToggle('reminders') }), _jsx("span", { className: styles.slider })] })] }), _jsxs("div", { className: styles.settingItem, children: [_jsx("span", { children: "Notifications" }), _jsxs("label", { className: styles.switch, children: [_jsx("input", { type: "checkbox", checked: settings.notifications, onChange: () => handleSettingToggle('notifications') }), _jsx("span", { className: styles.slider })] })] }), _jsxs("div", { className: styles.settingItem, children: [_jsx("span", { children: "Email Updates" }), _jsxs("label", { className: styles.switch, children: [_jsx("input", { type: "checkbox", checked: settings.emailUpdates, onChange: () => handleSettingToggle('emailUpdates') }), _jsx("span", { className: styles.slider })] })] }), _jsx("button", { className: styles.logoutButton, onClick: handleLogout, type: "button", children: "Logout" })] })] })), activeTab === 'bmi' && (_jsxs("div", { className: styles.bmiInfo, children: [_jsx("div", { className: styles.profileFormHeading, children: "BMI Calculator" }), _jsxs("form", { className: styles.bmiForm, onSubmit: handleBmiCalculate, children: [_jsxs("div", { className: styles.bmiInputs, children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { children: "Height (cm)" }), _jsx("input", { type: "number", name: "height", value: bmiForm.height, onChange: handleBmiInputChange, className: styles.bmiInput, min: "1" })] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { children: "Weight (kg)" }), _jsx("input", { type: "number", name: "weight", value: bmiForm.weight, onChange: handleBmiInputChange, className: styles.bmiInput, min: "1" })] })] }), _jsx("button", { type: "submit", className: styles.calculateBmiButton, children: "Calculate BMI" }), bmiError && _jsx("div", { className: styles.bmiError, children: bmiError }), _jsx("div", { className: styles.bmiValue, children: bmiResult.bmi }), _jsx("div", { className: styles.bmiCategory, children: bmiResult.category })] })] })), activeTab === 'streak' && (_jsxs("div", { className: styles.streakInfo, children: [_jsxs("div", { className: styles.streakValue, children: [_jsx("span", { role: "img", "aria-label": "fire", children: "\uD83D\uDD25" }), " Current Streak: ", currentStreak, " Day", currentStreak !== 1 ? 's' : ''] }), _jsx("div", { className: styles.streakGrid, children: weekDays.map((day, idx) => (_jsxs("div", { className: workoutCompletion[idx] ? styles.streakDayActive : styles.streakDay, children: [day, workoutCompletion[idx] && (_jsx("span", { className: styles.streakCheck, children: "\u2714" }))] }, day))) }), _jsxs("div", { className: styles.streakHistory, children: ["Total Workout Days Completed: ", _jsx("span", { className: styles.streakHistoryCount, children: totalCompleted })] }), _jsx("button", { className: styles.resetStreakButton, onClick: handleResetStreak, children: "Reset Streak" })] })), activeTab === 'progress' && (_jsxs("div", { className: styles.progressInfo, children: [_jsx("h2", { children: "Progress" }), _jsx("div", { className: styles.progressChartLabel, children: "Daily Workout Completion" }), _jsx("div", { className: styles.progressChart, children: mockDailyWorkouts.map((entry, idx) => (_jsxs("div", { className: styles.progressBarDay, children: [_jsx("div", { className: styles.progressBarDayLabel, children: entry.day }), _jsx("div", { className: styles.progressBarTrack, children: _jsx("div", { className: styles.progressBarFill, style: { width: `${getCompletionPercent(entry)}%` }, children: _jsxs("span", { className: styles.progressBarPercent, children: [getCompletionPercent(entry), "%"] }) }) })] }, entry.day))) }), _jsxs("div", { className: styles.progressValue, children: [userData.progress, "%"] })] })), activeTab === 'nutrition' && (_jsx("div", { className: styles.nutritionTabGrid, children: [
                                    { key: 'calories', label: 'Calories' },
                                    { key: 'protein', label: 'Protein' },
                                    { key: 'carbs', label: 'Carbs' },
                                    { key: 'fat', label: 'Fat' },
                                ].map(nutrient => (_jsxs("div", { className: styles.nutritionTabCircleWrapper, children: [_jsxs("div", { className: styles.nutritionTabCircleOuter, children: [_jsxs("svg", { className: styles.nutritionTabCircleSvg, viewBox: "0 0 40 40", children: [_jsx("circle", { className: styles.nutritionTabCircleTrack, cx: "20", cy: "20", r: "18", stroke: "#eee", strokeWidth: "4", fill: "none" }), _jsx("circle", { className: styles.nutritionTabCircleBar, cx: "20", cy: "20", r: "18", stroke: "#FF6B35", strokeWidth: "4", fill: "none", strokeDasharray: 113, strokeDashoffset: 113 - (113 * getNutritionPercent(nutrient.key)) / 100, style: { transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' } })] }), _jsxs("div", { className: styles.nutritionTabCirclePercent, children: [getNutritionPercent(nutrient.key), "%"] })] }), _jsx("div", { className: styles.nutritionTabCircleLabel, children: nutrient.label })] }, nutrient.key))) }))] })] }), _jsx(Footer, {})] }));
};
export default Profile;
