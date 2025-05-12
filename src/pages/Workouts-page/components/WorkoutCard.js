import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './WorkoutCard.module.css';
const WorkoutCard = ({ workout, isFavorite, onToggleFavorite, onClick }) => {
    return (_jsxs("div", { className: styles.workoutCard, onClick: onClick, children: [_jsxs("div", { className: styles.workoutImageContainer, children: [_jsx("img", { src: workout.image, alt: workout.title, className: styles.workoutImage, loading: "lazy" }), _jsx("button", { className: `${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`, onClick: (e) => {
                            e.stopPropagation();
                            onToggleFavorite();
                        }, "aria-label": isFavorite ? 'Remove from favorites' : 'Add to favorites', children: isFavorite ? '❤️' : '🤍' })] }), _jsxs("div", { className: styles.workoutContent, children: [_jsx("h3", { className: styles.workoutTitle, children: workout.title }), _jsxs("div", { className: styles.workoutMeta, children: [_jsxs("span", { className: styles.workoutDuration, children: ["\u23F1\uFE0F ", workout.duration, " min"] }), _jsxs("span", { className: styles.workoutType, children: ["\uD83C\uDFCB\uFE0F ", workout.type] }), _jsxs("span", { className: styles.workoutDifficulty, children: ["\uD83D\uDCCA ", workout.difficulty] })] }), _jsx("div", { className: styles.workoutActions, children: _jsx("button", { className: styles.actionButton, onClick: onClick, children: "View Details" }) })] })] }));
};
export default WorkoutCard;
