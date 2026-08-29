// Auto-generated exercise/meal data. Edit here to change plans, exercises, images, meals.
const DATA = {
 "plans": {
  "gym": {
   "label": "Gym",
   "icon": "🏋️",
   "sessions": {
    "fullupper": {
     "name": "Full Upper",
     "emoji": "💪",
     "group": "broad",
     "muscles": "chest·back·shoulders·arms",
     "slots": [
      [
       "Flat chest press",
       "4 × 8–10",
       ""
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Vertical pull (lats)",
       "3 × 8–10",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "push": {
     "name": "Push",
     "emoji": "🔴",
     "group": "broad",
     "muscles": "chest·shoulders·triceps + core",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Side lateral raise",
       "3 × 12–15",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "pull": {
     "name": "Pull",
     "emoji": "🔵",
     "group": "broad",
     "muscles": "back·biceps·rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "fullbody": {
     "name": "Full Body",
     "emoji": "🔥",
     "group": "broad",
     "muscles": "a bit of everything (short/travel)",
     "slots": [
      [
       "Squat",
       "3 × 10–12",
       ""
      ],
      [
       "Flat chest press",
       "3 × 8–12",
       ""
      ],
      [
       "Horizontal row",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 10–12",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "chest": {
     "name": "Chest",
     "emoji": "🎯",
     "group": "focused",
     "muscles": "chest · triceps assist",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Chest fly",
       "3 × 12–15",
       ""
      ],
      [
       "Chest dip",
       "3 × 8–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "back": {
     "name": "Back",
     "emoji": "🪃",
     "group": "focused",
     "muscles": "lats · traps · rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–12",
       ""
      ],
      [
       "Lat pullover / straight-arm",
       "3 × 12–15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "shoulders": {
     "name": "Shoulders",
     "emoji": "🔺",
     "group": "focused",
     "muscles": "delts (front·side·rear)",
     "slots": [
      [
       "Overhead press",
       "4 × 6–10",
       "5 × 4–6 heavy"
      ],
      [
       "Side lateral raise",
       "4 × 12–20",
       ""
      ],
      [
       "Front raise",
       "3 × 10–15",
       ""
      ],
      [
       "Upright row",
       "3 × 10–12",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "arms": {
     "name": "Arms",
     "emoji": "💥",
     "group": "focused",
     "muscles": "biceps · triceps · forearms",
     "slots": [
      [
       "Biceps curl",
       "4 × 8–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "4 × 8–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ],
      [
       "Overhead triceps",
       "3 × 10–12",
       ""
      ],
      [
       "Forearm / wrist",
       "3 × 15–20",
       ""
      ]
     ]
    },
    "legs": {
     "name": "Legs & Core",
     "emoji": "🦵",
     "group": "focused",
     "muscles": "legs (maintenance) · core",
     "slots": [
      [
       "Squat",
       "3 × 8–12",
       ""
      ],
      [
       "Lunge",
       "3 × 12/leg",
       ""
      ],
      [
       "Hamstring / RDL",
       "3 × 10–12",
       ""
      ],
      [
       "Calf raise",
       "3 × 15–20",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45–60s",
       ""
      ]
     ]
    }
   },
   "variations": {
    "Flat chest press": {
     "bar": {
      "name": "Barbell Bench Press - Medium Grip",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg"
     },
     "cable": {
      "name": "Cable Chest Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Chest_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Chest_Press/1.jpg"
     },
     "db": {
      "name": "Dumbbell Bench Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/1.jpg"
     }
    },
    "Horizontal row": {
     "bar": {
      "name": "Bent Over Barbell Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg"
     },
     "cable": {
      "name": "Seated Cable Rows",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg"
     },
     "db": {
      "name": "One-Arm Dumbbell Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg"
     }
    },
    "Overhead press": {
     "bar": {
      "name": "Standing Military Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Military_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Military_Press/1.jpg"
     },
     "cable": {
      "name": "Cable Shoulder Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Shoulder_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Shoulder_Press/1.jpg"
     },
     "db": {
      "name": "Standing Dumbbell Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Press/1.jpg"
     }
    },
    "Vertical pull (lats)": {
     "bar": {
      "name": "Pullups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/1.jpg"
     },
     "cable": {
      "name": "Wide-Grip Lat Pulldown",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg"
     },
     "db": {
      "name": "Bent Over Two-Dumbbell Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Dumbbell_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Dumbbell_Row/1.jpg"
     }
    },
    "Biceps curl": {
     "bar": {
      "name": "Barbell Curl",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/1.jpg"
     },
     "cable": {
      "name": "Cable Hammer Curls - Rope Attachment",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/1.jpg"
     },
     "db": {
      "name": "Dumbbell Bicep Curl",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/1.jpg"
     }
    },
    "Triceps pushdown/ext": {
     "bar": {
      "name": "Lying Triceps Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Triceps_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Triceps_Press/1.jpg"
     },
     "cable": {
      "name": "Triceps Pushdown",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/1.jpg"
     },
     "db": {
      "name": "Standing Dumbbell Triceps Extension",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/1.jpg"
     }
    },
    "Incline press": {
     "bar": {
      "name": "Barbell Incline Bench Press - Medium Grip",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg"
     },
     "cable": {
      "name": "Low Cable Crossover",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/1.jpg"
     },
     "db": {
      "name": "Incline Dumbbell Press",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg"
     }
    },
    "Side lateral raise": {
     "cable": {
      "name": "Cable Seated Lateral Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Lateral_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Lateral_Raise/1.jpg"
     },
     "db": {
      "name": "Side Lateral Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg"
     }
    },
    "Plank (core)": {
     "db": {
      "name": "Plank",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"
     }
    },
    "Rear delts": {
     "cable": {
      "name": "Face Pull",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg"
     },
     "db": {
      "name": "Seated Bent-Over Rear Delt Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Rear_Delt_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Rear_Delt_Raise/1.jpg"
     }
    },
    "Shrugs (traps)": {
     "bar": {
      "name": "Barbell Shrug",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug/1.jpg"
     },
     "cable": {
      "name": "Cable Shrugs",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Shrugs/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Shrugs/1.jpg"
     },
     "db": {
      "name": "Dumbbell Shrug",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/1.jpg"
     }
    },
    "Hammer curl": {
     "cable": {
      "name": "Cable Hammer Curls - Rope Attachment",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/1.jpg"
     },
     "db": {
      "name": "Hammer Curls",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg"
     }
    },
    "Squat": {
     "bar": {
      "name": "Barbell Full Squat",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/1.jpg"
     },
     "db": {
      "name": "Dumbbell Squat",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Squat/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Squat/1.jpg"
     }
    },
    "Leg raise (core)": {
     "bar": {
      "name": "Hanging Leg Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/1.jpg"
     },
     "cable": {
      "name": "Cable Crunch",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crunch/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crunch/1.jpg"
     },
     "db": {
      "name": "Weighted Crunches",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Crunches/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Crunches/1.jpg"
     }
    },
    "Chest fly": {
     "cable": {
      "name": "Cable Crossover",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/1.jpg"
     },
     "db": {
      "name": "Dumbbell Flyes",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Flyes/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Flyes/1.jpg"
     }
    },
    "Chest dip": {
     "bar": {
      "name": "Dips - Chest Version",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Chest_Version/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Chest_Version/1.jpg"
     }
    },
    "Lat pullover / straight-arm": {
     "cable": {
      "name": "Straight-Arm Pulldown",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/1.jpg"
     },
     "db": {
      "name": "Bent-Arm Dumbbell Pullover",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/1.jpg"
     }
    },
    "Front raise": {
     "bar": {
      "name": "Front Plate Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Plate_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Plate_Raise/1.jpg"
     },
     "cable": {
      "name": "Front Cable Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Cable_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Cable_Raise/1.jpg"
     },
     "db": {
      "name": "Front Dumbbell Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/1.jpg"
     }
    },
    "Upright row": {
     "bar": {
      "name": "Upright Barbell Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Barbell_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Barbell_Row/1.jpg"
     },
     "cable": {
      "name": "Upright Cable Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Cable_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Cable_Row/1.jpg"
     },
     "db": {
      "name": "Standing Dumbbell Upright Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Upright_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Upright_Row/1.jpg"
     }
    },
    "Overhead triceps": {
     "cable": {
      "name": "Cable Rope Overhead Triceps Extension",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/1.jpg"
     },
     "db": {
      "name": "Standing Dumbbell Triceps Extension",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/1.jpg"
     }
    },
    "Forearm / wrist": {
     "bar": {
      "name": "Palms-Up Barbell Wrist Curl Over A Bench",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench/1.jpg"
     },
     "db": {
      "name": "Palms-Down Dumbbell Wrist Curl Over A Bench",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench/1.jpg"
     }
    },
    "Lunge": {
     "bar": {
      "name": "Barbell Lunge",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Lunge/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Lunge/1.jpg"
     },
     "db": {
      "name": "Dumbbell Lunges",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunges/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunges/1.jpg"
     }
    },
    "Hamstring / RDL": {
     "bar": {
      "name": "Romanian Deadlift",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg"
     },
     "db": {
      "name": "Stiff-Legged Dumbbell Deadlift",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Dumbbell_Deadlift/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Dumbbell_Deadlift/1.jpg"
     }
    },
    "Calf raise": {
     "bar": {
      "name": "Standing Barbell Calf Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Barbell_Calf_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Barbell_Calf_Raise/1.jpg"
     },
     "db": {
      "name": "Standing Dumbbell Calf Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Calf_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Calf_Raise/1.jpg"
     }
    }
   },
   "cues": {
    "Barbell Bench Press - Medium Grip": "Bar to mid-chest, elbows ~45°, press up.",
    "Cable Chest Press": "Press cable handles forward, squeeze chest.",
    "Dumbbell Bench Press": "DBs at chest, press up and slightly together.",
    "Bent Over Barbell Row": "Hinge, row bar to lower ribs, squeeze blades.",
    "Seated Cable Rows": "Pull handle to stomach, squeeze shoulder blades.",
    "One-Arm Dumbbell Row": "Hand on bench, row DB to hip, squeeze.",
    "Standing Military Press": "Press bar overhead from shoulders, brace core.",
    "Standing Palms-In Dumbbell Press": "Neutral-grip DB press overhead.",
    "Standing Dumbbell Press": "Press DBs overhead, don't over-flare.",
    "Pullups": "Pull chin over bar. Band-assist if needed.",
    "Wide-Grip Lat Pulldown": "Pull bar to upper chest, drive elbows down.",
    "Bent Over Two-Dumbbell Row": "Hinge, row both DBs to hips, squeeze.",
    "Barbell Curl": "Curl bar, no swing, squeeze at top.",
    "Cable Hammer Curls - Rope Attachment": "Rope curl, neutral grip, control.",
    "Dumbbell Bicep Curl": "Curl DBs, squeeze top, control down.",
    "Lying Triceps Press": "Skull-crusher: lower bar to forehead, extend.",
    "Triceps Pushdown": "Elbows pinned, extend down, squeeze.",
    "Standing Dumbbell Triceps Extension": "DB overhead, extend up, elbows still.",
    "Barbell Incline Bench Press - Medium Grip": "Incline bar press for upper chest.",
    "Low Cable Crossover": "Low-to-high cable flye for upper chest.",
    "Incline Dumbbell Press": "Bench ~30°, press DBs up and together.",
    "Cable Seated Lateral Raise": "Seated cable raise out to the side.",
    "Side Lateral Raise": "Raise out to shoulder height, slight bend. Light.",
    "Plank": "Forearms down, body straight, brace, hold.",
    "Face Pull": "Rope to face, elbows high — great for skater shoulders.",
    "Seated Bent-Over Rear Delt Raise": "Hinge seated, raise DBs out, squeeze rear delts.",
    "Barbell Shrug": "Shrug shoulders up, squeeze traps, lower.",
    "Cable Shrugs": "Shrug against cable, hold at top.",
    "Dumbbell Shrug": "Shrug DBs up, squeeze traps.",
    "Hammer Curls": "Neutral grip curl — biceps + forearm.",
    "Barbell Full Squat": "Bar on back, sit down to depth, drive up.",
    "Dumbbell Squat": "DBs at sides, squat down, stand.",
    "Hanging Leg Raise": "Hang, raise legs with control, no swing.",
    "Cable Crunch": "Kneel, crunch down pulling rope, contract abs.",
    "Weighted Crunches": "Crunch holding weight on chest.",
    "Cable Crossover": "Bring handles together in front, squeeze.",
    "Dumbbell Flyes": "Wide arc, slight elbow bend, squeeze at top.",
    "Dips - Chest Version": "Lean forward on dip bars, lower, press up (chest).",
    "Straight-Arm Pulldown": "Arms straight, pull bar to thighs — lats.",
    "Bent-Arm Dumbbell Pullover": "",
    "Front Plate Raise": "Raise plate to front to eye level.",
    "Front Cable Raise": "Cable raise to front, control.",
    "Front Dumbbell Raise": "Raise DB to front to shoulder height.",
    "Upright Barbell Row": "Pull bar up along body to chest, elbows high.",
    "Upright Cable Row": "Cable pull up to chest, elbows lead.",
    "Standing Dumbbell Upright Row": "",
    "Cable Rope Overhead Triceps Extension": "Rope overhead, extend, stretch triceps.",
    "Palms-Up Barbell Wrist Curl Over A Bench": "",
    "Palms-Down Dumbbell Wrist Curl Over A Bench": "",
    "Barbell Lunge": "Bar on back, lunge forward, push up.",
    "Dumbbell Lunges": "Step forward with DBs, drop knee, push up.",
    "Romanian Deadlift": "Hinge at hips, bar down shins, drive up. Hamstrings.",
    "Stiff-Legged Dumbbell Deadlift": "Near-straight legs, hinge with DBs.",
    "Standing Barbell Calf Raise": "Rise onto toes with bar, squeeze, lower slow.",
    "Standing Dumbbell Calf Raise": "Rise onto toes with DBs, squeeze.",
    "Cable Shoulder Press": "Press cable handles overhead from shoulder height, control down."
   }
  },
  "cal": {
   "label": "Calisthenics",
   "icon": "🤸",
   "sessions": {
    "fullupper": {
     "name": "Full Upper",
     "emoji": "💪",
     "group": "broad",
     "muscles": "chest·back·shoulders·arms",
     "slots": [
      [
       "Flat chest press",
       "4 × 8–10",
       ""
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Vertical pull (lats)",
       "3 × 8–10",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "push": {
     "name": "Push",
     "emoji": "🔴",
     "group": "broad",
     "muscles": "chest·shoulders·triceps + core",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Side lateral raise",
       "3 × 12–15",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "pull": {
     "name": "Pull",
     "emoji": "🔵",
     "group": "broad",
     "muscles": "back·biceps·rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "fullbody": {
     "name": "Full Body",
     "emoji": "🔥",
     "group": "broad",
     "muscles": "a bit of everything (short/travel)",
     "slots": [
      [
       "Squat",
       "3 × 10–12",
       ""
      ],
      [
       "Flat chest press",
       "3 × 8–12",
       ""
      ],
      [
       "Horizontal row",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 10–12",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "chest": {
     "name": "Chest",
     "emoji": "🎯",
     "group": "focused",
     "muscles": "chest · triceps assist",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Chest fly",
       "3 × 12–15",
       ""
      ],
      [
       "Chest dip",
       "3 × 8–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "back": {
     "name": "Back",
     "emoji": "🪃",
     "group": "focused",
     "muscles": "lats · traps · rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–12",
       ""
      ],
      [
       "Lat pullover / straight-arm",
       "3 × 12–15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "shoulders": {
     "name": "Shoulders",
     "emoji": "🔺",
     "group": "focused",
     "muscles": "delts (front·side·rear)",
     "slots": [
      [
       "Overhead press",
       "4 × 6–10",
       "5 × 4–6 heavy"
      ],
      [
       "Side lateral raise",
       "4 × 12–20",
       ""
      ],
      [
       "Front raise",
       "3 × 10–15",
       ""
      ],
      [
       "Upright row",
       "3 × 10–12",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "arms": {
     "name": "Arms",
     "emoji": "💥",
     "group": "focused",
     "muscles": "biceps · triceps · forearms",
     "slots": [
      [
       "Biceps curl",
       "4 × 8–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "4 × 8–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ],
      [
       "Overhead triceps",
       "3 × 10–12",
       ""
      ],
      [
       "Forearm / wrist",
       "3 × 15–20",
       ""
      ]
     ]
    },
    "legs": {
     "name": "Legs & Core",
     "emoji": "🦵",
     "group": "focused",
     "muscles": "legs (maintenance) · core",
     "slots": [
      [
       "Squat",
       "3 × 8–12",
       ""
      ],
      [
       "Lunge",
       "3 × 12/leg",
       ""
      ],
      [
       "Hamstring / RDL",
       "3 × 10–12",
       ""
      ],
      [
       "Calf raise",
       "3 × 15–20",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45–60s",
       ""
      ]
     ]
    }
   },
   "variations": {
    "Flat chest press": {
     "bw": {
      "name": "Pushups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/1.jpg"
     }
    },
    "Horizontal row": {
     "bw": {
      "name": "Inverted Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/1.jpg"
     }
    },
    "Overhead press": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Vertical pull (lats)": {
     "bw": {
      "name": "Pullups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/1.jpg"
     }
    },
    "Biceps curl": {
     "bw": {
      "name": "Chin-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/1.jpg"
     }
    },
    "Triceps pushdown/ext": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Incline press": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Side lateral raise": {
     "bw": {
      "name": "Side Lateral Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg"
     }
    },
    "Plank (core)": {
     "bw": {
      "name": "Plank",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"
     }
    },
    "Rear delts": {
     "bw": {
      "name": "Band Pull Apart",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/1.jpg"
     }
    },
    "Shrugs (traps)": {
     "bw": {
      "name": "Superman",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/1.jpg"
     }
    },
    "Hammer curl": {
     "bw": {
      "name": "Chin-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/1.jpg"
     }
    },
    "Squat": {
     "bw": {
      "name": "Bodyweight Squat",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/1.jpg"
     }
    },
    "Leg raise (core)": {
     "bw": {
      "name": "Flat Bench Lying Leg Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/1.jpg"
     }
    },
    "Chest fly": {
     "bw": {
      "name": "Pushups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/1.jpg"
     }
    },
    "Chest dip": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Lat pullover / straight-arm": {
     "bw": {
      "name": "Superman",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/1.jpg"
     }
    },
    "Front raise": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Upright row": {
     "bw": {
      "name": "Band Pull Apart",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/1.jpg"
     }
    },
    "Overhead triceps": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Forearm / wrist": {
     "bw": {
      "name": "Plank",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"
     }
    },
    "Lunge": {
     "bw": {
      "name": "Bodyweight Walking Lunge",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/1.jpg"
     }
    },
    "Hamstring / RDL": {
     "bw": {
      "name": "Butt Lift (Bridge)",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt_Lift_Bridge/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt_Lift_Bridge/1.jpg"
     }
    },
    "Calf raise": {
     "bw": {
      "name": "Standing Calf Raises",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg"
     }
    }
   },
   "cues": {
    "Pushups": "Body straight, chest to floor, press up. Feet up = harder.",
    "Inverted Row": "Under a bar/table, pull chest up, body straight.",
    "Decline Push-Up": "Feet elevated push-up — hits shoulders/upper chest.",
    "Pullups": "Pull chin over bar. Band-assist if needed.",
    "Chin-Up": "Underhand pull-up — biceps + back.",
    "Bench Dips": "Hands on bench behind you, lower & press up.",
    "Side Lateral Raise": "Raise out to shoulder height, slight bend. Light.",
    "Plank": "Forearms down, body straight, brace, hold.",
    "Band Pull Apart": "Band at chest, pull apart, squeeze blades.",
    "Superman": "Face down, lift chest+legs, squeeze, lower.",
    "Bodyweight Squat": "Sit back and down, knees track toes, stand.",
    "Flat Bench Lying Leg Raise": "Lie down, raise legs with control.",
    "Bodyweight Walking Lunge": "Step forward, drop back knee, alternate.",
    "Butt Lift (Bridge)": "On back, drive hips up, squeeze glutes.",
    "Standing Calf Raises": "Rise onto toes, squeeze, lower slow. On a step for range."
   }
  },
  "travel": {
   "label": "Travel",
   "icon": "✈️",
   "sessions": {
    "fullupper": {
     "name": "Full Upper",
     "emoji": "💪",
     "group": "broad",
     "muscles": "chest·back·shoulders·arms",
     "slots": [
      [
       "Flat chest press",
       "4 × 8–10",
       ""
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Vertical pull (lats)",
       "3 × 8–10",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "push": {
     "name": "Push",
     "emoji": "🔴",
     "group": "broad",
     "muscles": "chest·shoulders·triceps + core",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 8–12",
       ""
      ],
      [
       "Side lateral raise",
       "3 × 12–15",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "3 × 10–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "pull": {
     "name": "Pull",
     "emoji": "🔵",
     "group": "broad",
     "muscles": "back·biceps·rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–10",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Biceps curl",
       "3 × 10–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ]
     ]
    },
    "fullbody": {
     "name": "Full Body",
     "emoji": "🔥",
     "group": "broad",
     "muscles": "a bit of everything (short/travel)",
     "slots": [
      [
       "Squat",
       "3 × 10–12",
       ""
      ],
      [
       "Flat chest press",
       "3 × 8–12",
       ""
      ],
      [
       "Horizontal row",
       "3 × 8–12",
       ""
      ],
      [
       "Overhead press",
       "3 × 10–12",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "chest": {
     "name": "Chest",
     "emoji": "🎯",
     "group": "focused",
     "muscles": "chest · triceps assist",
     "slots": [
      [
       "Flat chest press",
       "4 × 6–10",
       "5 × 3–5 heavy"
      ],
      [
       "Incline press",
       "3 × 8–12",
       ""
      ],
      [
       "Chest fly",
       "3 × 12–15",
       ""
      ],
      [
       "Chest dip",
       "3 × 8–12",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45s",
       ""
      ]
     ]
    },
    "back": {
     "name": "Back",
     "emoji": "🪃",
     "group": "focused",
     "muscles": "lats · traps · rear delts",
     "slots": [
      [
       "Vertical pull (lats)",
       "4 × 6–10",
       "weighted 5 × 3–5"
      ],
      [
       "Horizontal row",
       "4 × 8–12",
       ""
      ],
      [
       "Lat pullover / straight-arm",
       "3 × 12–15",
       ""
      ],
      [
       "Shrugs (traps)",
       "3 × 12–15",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "shoulders": {
     "name": "Shoulders",
     "emoji": "🔺",
     "group": "focused",
     "muscles": "delts (front·side·rear)",
     "slots": [
      [
       "Overhead press",
       "4 × 6–10",
       "5 × 4–6 heavy"
      ],
      [
       "Side lateral raise",
       "4 × 12–20",
       ""
      ],
      [
       "Front raise",
       "3 × 10–15",
       ""
      ],
      [
       "Upright row",
       "3 × 10–12",
       ""
      ],
      [
       "Rear delts",
       "3 × 15",
       ""
      ]
     ]
    },
    "arms": {
     "name": "Arms",
     "emoji": "💥",
     "group": "focused",
     "muscles": "biceps · triceps · forearms",
     "slots": [
      [
       "Biceps curl",
       "4 × 8–12",
       ""
      ],
      [
       "Triceps pushdown/ext",
       "4 × 8–12",
       ""
      ],
      [
       "Hammer curl",
       "3 × 10–12",
       ""
      ],
      [
       "Overhead triceps",
       "3 × 10–12",
       ""
      ],
      [
       "Forearm / wrist",
       "3 × 15–20",
       ""
      ]
     ]
    },
    "legs": {
     "name": "Legs & Core",
     "emoji": "🦵",
     "group": "focused",
     "muscles": "legs (maintenance) · core",
     "slots": [
      [
       "Squat",
       "3 × 8–12",
       ""
      ],
      [
       "Lunge",
       "3 × 12/leg",
       ""
      ],
      [
       "Hamstring / RDL",
       "3 × 10–12",
       ""
      ],
      [
       "Calf raise",
       "3 × 15–20",
       ""
      ],
      [
       "Leg raise (core)",
       "3 × 12–15",
       ""
      ],
      [
       "Plank (core)",
       "3 × 45–60s",
       ""
      ]
     ]
    }
   },
   "variations": {
    "Flat chest press": {
     "bw": {
      "name": "Pushups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/1.jpg"
     }
    },
    "Horizontal row": {
     "bw": {
      "name": "Inverted Row",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/1.jpg"
     }
    },
    "Overhead press": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Vertical pull (lats)": {
     "bw": {
      "name": "Pullups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/1.jpg"
     }
    },
    "Biceps curl": {
     "bw": {
      "name": "Chin-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/1.jpg"
     }
    },
    "Triceps pushdown/ext": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Incline press": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Side lateral raise": {
     "bw": {
      "name": "Side Lateral Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg"
     }
    },
    "Plank (core)": {
     "bw": {
      "name": "Plank",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"
     }
    },
    "Rear delts": {
     "bw": {
      "name": "Band Pull Apart",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/1.jpg"
     }
    },
    "Shrugs (traps)": {
     "bw": {
      "name": "Superman",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/1.jpg"
     }
    },
    "Hammer curl": {
     "bw": {
      "name": "Chin-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin-Up/1.jpg"
     }
    },
    "Squat": {
     "bw": {
      "name": "Bodyweight Squat",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/1.jpg"
     }
    },
    "Leg raise (core)": {
     "bw": {
      "name": "Flat Bench Lying Leg Raise",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/1.jpg"
     }
    },
    "Chest fly": {
     "bw": {
      "name": "Pushups",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/1.jpg"
     }
    },
    "Chest dip": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Lat pullover / straight-arm": {
     "bw": {
      "name": "Superman",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Superman/1.jpg"
     }
    },
    "Front raise": {
     "bw": {
      "name": "Decline Push-Up",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Push-Up/1.jpg"
     }
    },
    "Upright row": {
     "bw": {
      "name": "Band Pull Apart",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/1.jpg"
     }
    },
    "Overhead triceps": {
     "bw": {
      "name": "Bench Dips",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg"
     }
    },
    "Forearm / wrist": {
     "bw": {
      "name": "Plank",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"
     }
    },
    "Lunge": {
     "bw": {
      "name": "Bodyweight Walking Lunge",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/1.jpg"
     }
    },
    "Hamstring / RDL": {
     "bw": {
      "name": "Butt Lift (Bridge)",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt_Lift_Bridge/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt_Lift_Bridge/1.jpg"
     }
    },
    "Calf raise": {
     "bw": {
      "name": "Standing Calf Raises",
      "img": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
      "img2": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg"
     }
    }
   },
   "cues": {
    "Pushups": "Body straight, chest to floor, press up. Feet up = harder.",
    "Inverted Row": "Under a bar/table, pull chest up, body straight.",
    "Decline Push-Up": "Feet elevated push-up — hits shoulders/upper chest.",
    "Pullups": "Pull chin over bar. Band-assist if needed.",
    "Chin-Up": "Underhand pull-up — biceps + back.",
    "Bench Dips": "Hands on bench behind you, lower & press up.",
    "Side Lateral Raise": "Raise out to shoulder height, slight bend. Light.",
    "Plank": "Forearms down, body straight, brace, hold.",
    "Band Pull Apart": "Band at chest, pull apart, squeeze blades.",
    "Superman": "Face down, lift chest+legs, squeeze, lower.",
    "Bodyweight Squat": "Sit back and down, knees track toes, stand.",
    "Flat Bench Lying Leg Raise": "Lie down, raise legs with control.",
    "Bodyweight Walking Lunge": "Step forward, drop back knee, alternate.",
    "Butt Lift (Bridge)": "On back, drive hips up, squeeze glutes.",
    "Standing Calf Raises": "Rise onto toes, squeeze, lower slow. On a step for range."
   }
  }
 },
 "meals": {
  "targets": {
   "protein": "120–165 g/day",
   "calories": "slight surplus (+200–300 kcal)",
   "water": "2.5–3 L",
   "note": "Lean gain — build muscle without adding skate-slowing weight."
  },
  "principles": [
   "Protein every meal (~30–40 g). This is the #1 lever for building muscle.",
   "Keep carbs — they fuel skate sessions & recovery. Don't cut them.",
   "Eat within ~2 h after training (protein + carbs).",
   "Slight surplus only. If you gain fat fast, dial back carbs a little."
  ],
  "meals": [
   {
    "t": "🌅 Breakfast",
    "p": "~35 g protein",
    "ideas": [
     "3 eggs + 2 slices wholegrain toast + tomato (pan con tomate) — ~28 g",
     "Greek yogurt (200 g) + oats + honey + berries — ~25 g",
     "Tortilla de claras (egg-white omelette) + whole egg + cheese — ~30 g"
    ]
   },
   {
    "t": "🥗 Lunch",
    "p": "~45 g protein",
    "ideas": [
     "Grilled chicken breast (180 g) + rice + salad — ~50 g",
     "Lentils/garbanzos stew (legumbres) + tuna — ~35 g",
     "Salmon + potatoes + veg — ~40 g"
    ]
   },
   {
    "t": "🍎 Snack",
    "p": "~25 g protein",
    "ideas": [
     "Whey shake + banana — ~28 g",
     "Cottage cheese / requesón + nuts — ~20 g",
     "Tuna can + wholegrain crackers — ~25 g",
     "Boiled eggs (2) + fruit — ~13 g"
    ]
   },
   {
    "t": "🌙 Dinner",
    "p": "~40 g protein",
    "ideas": [
     "Lean beef/pavo (turkey) + quinoa + veg — ~45 g",
     "Merluza/white fish + sweet potato + greens — ~38 g",
     "Tofu/tempeh stir-fry + rice (plant option) — ~30 g",
     "Chicken + wholegrain pasta + tomato — ~42 g"
    ]
   }
  ],
  "protein_foods": [
   "Eggs / egg whites",
   "Chicken & turkey (pollo/pavo)",
   "White fish & salmon (merluza/salmón)",
   "Greek yogurt & requesón",
   "Whey protein",
   "Tuna (atún)",
   "Lentils & chickpeas (lentejas/garbanzos)",
   "Tofu & tempeh",
   "Cheese (queso fresco)"
  ]
 }
};
