export interface Exercise {
  name: string;
  timeOrReps: string;
  image?: string;
  description: string;
  duration?: number;
  reps?: number;
}

export interface Workout {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  duration: number;
  intensity: string;
  thumbnail: string;
  image: string;
  isFavorited: boolean;
  exercises: Exercise[];
}

export const workouts: Workout[] = [
  {
    id: 'w1',
    title: 'Full Body Blast',
    type: 'strength',
    difficulty: 'intermediate',
    duration: 30,
    intensity: 'high',
    thumbnail: 'public/images/workouts/strenghtworkout.webp',
    image: '/public/images/workouts/strenghtworkout.webp',
    isFavorited: false,
    exercises: [
      { 
        name: 'Warm-up: Jumping Jacks', 
        timeOrReps: '1 minute', 
        image: '/images/jumping-jacks.jpg',
        description: 'Start with feet together, jump while spreading legs and raising arms overhead, then return to starting position.',
        duration: 60
      },
      { 
        name: 'Push-ups', 
        timeOrReps: '3 sets of 12', 
        image: '/images/pushup.jpg',
        description: 'Start in a plank position, lower your body until your chest nearly touches the floor, then push back up.',
        duration: 180
      },
      { 
        name: 'Squats', 
        timeOrReps: '3 sets of 15', 
        image: '/images/squat.jpg',
        description: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.',
        duration: 180
      },
      { 
        name: 'Plank', 
        timeOrReps: '3 sets of 30 seconds', 
        image: '/images/plank.jpg',
        description: 'Hold a push-up position with your forearms on the ground, keeping your body in a straight line.',
        duration: 90
      },
      { 
        name: 'Lunges', 
        timeOrReps: '3 sets of 10 each leg', 
        image: '/images/lunges.jpg',
        description: 'Step forward with one leg, lower your hips until both knees are bent at 90 degrees.',
        duration: 180
      },
      { 
        name: 'Mountain Climbers', 
        timeOrReps: '3 sets of 30 seconds', 
        image: '/images/mountain-climbers.jpg',
        description: 'In plank position, rapidly alternate bringing knees to chest.',
        duration: 90
      },
      { 
        name: 'Cool Down: Stretching', 
        timeOrReps: '2 minutes', 
        image: '/images/stretching.jpg',
        description: 'Gentle stretching for all major muscle groups to improve flexibility and reduce soreness.',
        duration: 120
      }
    ],
  },
  {
    id: 'w2',
    title: 'Morning Yoga Flow',
    type: 'yoga',
    difficulty: 'beginner',
    duration: 15,
    intensity: 'low',
    thumbnail: '/images/morning-yoga.jpg',
    image: '/images/morning-yoga.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Breathing Exercise', 
        timeOrReps: '1 minute', 
        image: '/images/breathing.jpg',
        description: 'Sit comfortably, focus on deep breathing to center yourself.',
        duration: 60
      },
      { 
        name: 'Sun Salutation', 
        timeOrReps: '3 rounds', 
        image: '/images/sun-salutation.jpg',
        description: 'A sequence of poses that flow together, starting and ending in mountain pose.',
        duration: 180
      },
      { 
        name: 'Downward Dog', 
        timeOrReps: '30 seconds', 
        image: '/images/downward-dog.jpg',
        description: 'Form an inverted V with your body, hands and feet on the ground, hips lifted high.',
        duration: 30
      },
      { 
        name: 'Warrior II', 
        timeOrReps: '30 seconds each side', 
        image: '/images/warrior-ii.jpg',
        description: 'Stand with legs wide apart, front knee bent, arms extended parallel to the floor.',
        duration: 60
      },
      { 
        name: 'Tree Pose', 
        timeOrReps: '30 seconds each side', 
        image: '/images/tree-pose.jpg',
        description: 'Stand on one leg, place other foot on inner thigh, hands in prayer position.',
        duration: 60
      },
      { 
        name: 'Child\'s Pose', 
        timeOrReps: '1 minute', 
        image: '/images/childs-pose.jpg',
        description: 'Kneel and sit back on heels, fold forward with arms extended.',
        duration: 60
      }
    ],
  },
  {
    id: 'w3',
    title: 'HIIT Power',
    type: 'hiit',
    difficulty: 'advanced',
    duration: 20,
    intensity: 'high',
    thumbnail: '/images/hiit-power.jpg',
    image: '/images/hiit-power.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Warm-up: High Knees', 
        timeOrReps: '1 minute', 
        image: '/images/high-knees.jpg',
        description: 'Run in place while bringing knees up to hip height.',
        duration: 60
      },
      { 
        name: 'Burpees', 
        timeOrReps: '30 seconds', 
        image: '/images/burpees.jpg',
        description: 'Start standing, drop to a push-up position, do a push-up, jump back up with hands overhead.',
        duration: 30
      },
      { 
        name: 'Mountain Climbers', 
        timeOrReps: '30 seconds', 
        image: '/images/mountain-climbers.jpg',
        description: 'In plank position, rapidly alternate bringing knees to chest.',
        duration: 30
      },
      { 
        name: 'Jump Squats', 
        timeOrReps: '30 seconds', 
        image: '/images/jump-squats.jpg',
        description: 'Perform a squat, then explode upward into a jump, landing softly back in squat position.',
        duration: 30
      },
      { 
        name: 'Rest', 
        timeOrReps: '30 seconds', 
        image: '/images/rest.jpg',
        description: 'Take a short break to catch your breath.',
        duration: 30
      },
      { 
        name: 'Repeat Circuit', 
        timeOrReps: '2 rounds', 
        image: '/images/circuit.jpg',
        description: 'Repeat the previous exercises for another round.',
        duration: 180
      },
      { 
        name: 'Cool Down: Stretching', 
        timeOrReps: '2 minutes', 
        image: '/images/stretching.jpg',
        description: 'Gentle stretching to cool down and prevent muscle soreness.',
        duration: 120
      }
    ],
  },
  {
    id: 'w4',
    title: 'Mobility Flow',
    type: 'mobility',
    difficulty: 'beginner',
    duration: 10,
    intensity: 'low',
    thumbnail: '/images/mobility-flow.jpg',
    image: '/images/mobility-flow.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Neck Rolls', 
        timeOrReps: '30 seconds', 
        image: '/images/neck-rolls.jpg',
        description: 'Gently roll your head in a circular motion, both clockwise and counterclockwise.',
        duration: 30
      },
      { 
        name: 'Cat-Cow', 
        timeOrReps: '10 reps', 
        image: '/images/cat-cow.jpg',
        description: 'Alternate between arching and rounding your back while on hands and knees.',
        duration: 60
      },
      { 
        name: 'World\'s Greatest Stretch', 
        timeOrReps: '30 seconds each side', 
        image: '/images/worlds-greatest.jpg',
        description: 'Lunge forward, place opposite hand on ground, rotate torso upward.',
        duration: 60
      },
      { 
        name: 'Hip Circles', 
        timeOrReps: '10 each direction', 
        image: '/images/hip-circles.jpg',
        description: 'Stand on one leg, make circles with the other leg, keeping core engaged.',
        duration: 60
      },
      { 
        name: 'Shoulder Rolls', 
        timeOrReps: '30 seconds', 
        image: '/images/shoulder-rolls.jpg',
        description: 'Roll shoulders forward and backward in a circular motion.',
        duration: 30
      }
    ],
  },
  {
    id: 'w5',
    title: 'Power Yoga',
    type: 'yoga',
    difficulty: 'advanced',
    duration: 45,
    intensity: 'medium',
    thumbnail: '/images/power-yoga.jpg',
    image: '/images/power-yoga.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Warm-up Flow', 
        timeOrReps: '5 minutes', 
        image: '/images/warmup-flow.jpg',
        description: 'Gentle flow to warm up the body and connect with breath.',
        duration: 300
      },
      { 
        name: 'Crow Pose', 
        timeOrReps: '30 seconds', 
        image: '/images/crow-pose.jpg',
        description: 'Balance on hands with knees resting on upper arms, core engaged.',
        duration: 30
      },
      { 
        name: 'Wheel Pose', 
        timeOrReps: '30 seconds', 
        image: '/images/wheel-pose.jpg',
        description: 'Lie on back, place hands by ears, lift body into a backbend.',
        duration: 30
      },
      { 
        name: 'Headstand', 
        timeOrReps: '30 seconds', 
        image: '/images/headstand.jpg',
        description: 'Balance on forearms and head, legs extended upward.',
        duration: 30
      },
      { 
        name: 'Warrior III', 
        timeOrReps: '30 seconds each side', 
        image: '/images/warrior-iii.jpg',
        description: 'Balance on one leg, extend other leg back, arms forward.',
        duration: 60
      },
      { 
        name: 'Side Plank', 
        timeOrReps: '30 seconds each side', 
        image: '/images/side-plank.jpg',
        description: 'Balance on one forearm and foot, body in a straight line.',
        duration: 60
      },
      { 
        name: 'Pigeon Pose', 
        timeOrReps: '1 minute each side', 
        image: '/images/pigeon-pose.jpg',
        description: 'Deep hip stretch with one leg bent in front, other extended back.',
        duration: 120
      },
      { 
        name: 'Savasana', 
        timeOrReps: '5 minutes', 
        image: '/images/savasana.jpg',
        description: 'Final relaxation pose, lying flat on back with eyes closed.',
        duration: 300
      }
    ],
  },
  {
    id: 'w6',
    title: 'Quick Cardio',
    type: 'cardio',
    difficulty: 'beginner',
    duration: 5,
    intensity: 'medium',
    thumbnail: '/images/quick-cardio.jpg',
    image: '/images/quick-cardio.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Jumping Jacks', 
        timeOrReps: '30 seconds', 
        image: '/images/jumping-jacks.jpg',
        description: 'Jump while spreading legs and raising arms overhead, then return to starting position.',
        duration: 30
      },
      { 
        name: 'High Knees', 
        timeOrReps: '30 seconds', 
        image: '/images/high-knees.jpg',
        description: 'Run in place while bringing knees up to hip height.',
        duration: 30
      },
      { 
        name: 'Butt Kicks', 
        timeOrReps: '30 seconds', 
        image: '/images/butt-kicks.jpg',
        description: 'Run in place while kicking heels up to touch glutes.',
        duration: 30
      },
      { 
        name: 'Mountain Climbers', 
        timeOrReps: '30 seconds', 
        image: '/images/mountain-climbers.jpg',
        description: 'In plank position, rapidly alternate bringing knees to chest.',
        duration: 30
      },
      { 
        name: 'Jump Rope', 
        timeOrReps: '30 seconds', 
        image: '/images/jump-rope.jpg',
        description: 'Jump rope or simulate the motion without a rope.',
        duration: 30
      }
    ],
  },
  {
    id: 'w7',
    title: 'Strength Builder',
    type: 'strength',
    difficulty: 'intermediate',
    duration: 60,
    intensity: 'high',
    thumbnail: '/images/strength-builder.jpg',
    image: '/images/strength-builder.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Warm-up: Dynamic Stretches', 
        timeOrReps: '5 minutes', 
        image: '/images/dynamic-stretches.jpg',
        description: 'Dynamic movements to prepare muscles for strength training.',
        duration: 300
      },
      { 
        name: 'Deadlifts', 
        timeOrReps: '4 sets of 8', 
        image: '/images/deadlifts.jpg',
        description: 'Hinge at hips, keep back straight, lift weight from ground to standing position.',
        duration: 480
      },
      { 
        name: 'Bench Press', 
        timeOrReps: '4 sets of 8', 
        image: '/images/bench-press.jpg',
        description: 'Lie on bench, lower weight to chest, press back up to starting position.',
        duration: 480
      },
      { 
        name: 'Pull-ups', 
        timeOrReps: '4 sets of 6', 
        image: '/images/pull-ups.jpg',
        description: 'Hang from bar, pull body up until chin clears bar, lower with control.',
        duration: 480
      },
      { 
        name: 'Squats', 
        timeOrReps: '4 sets of 10', 
        image: '/images/squat.jpg',
        description: 'Stand with feet shoulder-width apart, lower body as if sitting in a chair.',
        duration: 480
      },
      { 
        name: 'Overhead Press', 
        timeOrReps: '4 sets of 8', 
        image: '/images/overhead-press.jpg',
        description: 'Press weight overhead from shoulder height, keeping core engaged.',
        duration: 480
      },
      { 
        name: 'Cool Down: Static Stretches', 
        timeOrReps: '5 minutes', 
        image: '/images/static-stretches.jpg',
        description: 'Hold stretches to improve flexibility and prevent muscle soreness.',
        duration: 300
      }
    ],
  },
  {
    id: 'w8',
    title: 'Flexibility Focus',
    type: 'flexibility',
    difficulty: 'beginner',
    duration: 20,
    intensity: 'low',
    thumbnail: '/images/flexibility-focus.jpg',
    image: '/images/flexibility-focus.jpg',
    isFavorited: false,
    exercises: [
      { 
        name: 'Forward Fold', 
        timeOrReps: '30 seconds', 
        image: '/images/forward-fold.jpg',
        description: 'Stand with feet together, hinge at hips to fold forward, reaching for toes.',
        duration: 30
      },
      { 
        name: 'Butterfly Stretch', 
        timeOrReps: '30 seconds', 
        image: '/images/butterfly-stretch.jpg',
        description: 'Sit with soles of feet together, gently press knees toward floor.',
        duration: 30
      },
      { 
        name: 'Seated Forward Bend', 
        timeOrReps: '30 seconds', 
        image: '/images/seated-forward-bend.jpg',
        description: 'Sit with legs extended, reach forward to touch toes.',
        duration: 30
      },
      { 
        name: 'Cobra Stretch', 
        timeOrReps: '30 seconds', 
        image: '/images/cobra-stretch.jpg',
        description: 'Lie on stomach, press up through hands to arch back.',
        duration: 30
      },
      { 
        name: 'Quad Stretch', 
        timeOrReps: '30 seconds each side', 
        image: '/images/quad-stretch.jpg',
        description: 'Stand on one leg, pull other foot toward glutes.',
        duration: 60
      },
      { 
        name: 'Hamstring Stretch', 
        timeOrReps: '30 seconds each side', 
        image: '/images/hamstring-stretch.jpg',
        description: 'Extend one leg forward, reach toward toes.',
        duration: 60
      },
      { 
        name: 'Shoulder Stretch', 
        timeOrReps: '30 seconds each side', 
        image: '/images/shoulder-stretch.jpg',
        description: 'Bring one arm across body, use other arm to deepen stretch.',
        duration: 60
      }
    ],
  }
]; 