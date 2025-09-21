const questions = {
  hairType: {
    currentQuestion: 1,
    name: "What's your hair type or texture?",
    options: [
      { label: "a. Straight", value: "straight" },
      { label: "b. Curly", value: "curly" },
      { label: "c. Wavy", value: "wavy" },
      { label: "d. Fine", value: "fine" },
    ],
  },
  washFrequency: {
    currentQuestion: 2,
    name: "How often do you wash your hair?",
    options: [
      { label: "a. Daily", value: "daily" },
      { label: "b. Every other day", value: "every_other_day" },
      { label: "c. Twice a week", value: "twice_week" },
      { label: "d. Every two weeks", value: "every_two_weeks" },
    ],
  },
  hairGoals: {
    currentQuestion: 3,
    name: "What are your hair goals?",
    options: [
      { label: "a. Anti-breakage", value: "anti_breakage" },
      { label: "b. Hydration", value: "hydration" },
      { label: "c. Soothing dry scalp", value: "soothing_dry_scalp" },
      {
        label: "d. Repairs appearance of damaged hair",
        value: "repair_damaged_hair",
      },
      { label: "e. Volume", value: "volume" },
      { label: "f. Curl and coil enhancing", value: "curl_enhancing" },
    ],
  },
  concerns: {
    currentQuestion: 4,
    name: "Any main concerns?",
    options: [
      { label: "a. Breakage", value: "breakage" },
      { label: "b. Frizz", value: "frizz" },
      { label: "c. Scalp dryness", value: "scalp_dryness" },
      { label: "d. Damage", value: "damage" },
      { label: "e. Tangling", value: "tangling" },
    ],
  },
  hairColor: {
    currentQuestion: 5,
    name: "What's your hair color?",
    options: [
      { label: "a. Black", value: "black" },
      { label: "b. Brown", value: "brown" },
      { label: "c. Blonde", value: "blonde" },
      { label: "d. Red/Orange", value: "red_orange" },
      { label: "e. Silver/Grey", value: "silver_grey" },
    ],
  },
};

export default questions;
