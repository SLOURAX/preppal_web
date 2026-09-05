export interface QuizQuestion {
  readonly id: number;
  readonly text: string;
  readonly options: readonly string[];
  readonly correctAnswer: string;
  readonly explanation: string;
}

const BASE_QUESTIONS = [
  [
    "In the diagram, PQR is a straight line. If (a + 12)° + (a + b)° + (3b + 12)° = 180°. Find 2b + a.",
    ["68°", "78°", "88°", "98°"],
    "78°",
    "Combine the angles on the straight line, simplify, and isolate the expression to get 78°.",
  ],
  [
    "Which of the following is a factor of the polynomial x³ − 3x² + 2x?",
    ["(x − 3)", "(x − 2)", "(x + 1)", "(x + 2)"],
    "(x − 2)",
    "x³ − 3x² + 2x factors to x(x − 1)(x − 2), so (x − 2) is a factor.",
  ],
  [
    "A train travels 300 km in 2 hours. What is its average speed in km/h?",
    ["100 km/h", "120 km/h", "150 km/h", "180 km/h"],
    "150 km/h",
    "Average speed is distance ÷ time: 300 ÷ 2 = 150 km/h.",
  ],
  [
    "Evaluate log₂ 64.",
    ["4", "5", "6", "8"],
    "6",
    "Because 2⁶ = 64, log₂ 64 equals 6.",
  ],
  [
    "If the sum of the interior angles of a polygon is 1260°, how many sides does the polygon have?",
    ["7", "8", "9", "10"],
    "9",
    "Use (n − 2) × 180 = 1260, giving n = 9 sides.",
  ],
  [
    "A circle has a circumference of 44 cm. Find its radius. (Take π = 22/7)",
    ["6 cm", "7 cm", "8 cm", "14 cm"],
    "7 cm",
    "Rearrange C = 2πr: 44 ÷ (2 × 22/7) = 7 cm.",
  ],
  [
    "Simplify: (3x² − 5x + 2) ÷ (x − 1)",
    ["3x − 2", "3x + 2", "x − 2", "3x − 1"],
    "3x − 2",
    "Factor the numerator as (3x − 2)(x − 1), then cancel (x − 1).",
  ],
  [
    "If P = {2, 3, 5, 7} and Q = {1, 3, 5, 9}, find P ∩ Q.",
    ["{3, 5}", "{2, 3}", "{1, 7}", "{3, 7}"],
    "{3, 5}",
    "The intersection contains values that appear in both sets: 3 and 5.",
  ],
  [
    "What is the value of sin 30° + cos 60°?",
    ["0", "½", "1", "√3/2"],
    "1",
    "Both sin 30° and cos 60° equal ½, so their sum is 1.",
  ],
  [
    "A rectangular field is 80 m long and 60 m wide. Find the length of a diagonal.",
    ["90 m", "100 m", "110 m", "120 m"],
    "100 m",
    "Apply Pythagoras: √(80² + 60²) = √6400 = 100 m.",
  ],
] as const;

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = Array.from(
  { length: 40 },
  (_, index) => {
    const [text, options, correctAnswer, explanation] =
      BASE_QUESTIONS[index % BASE_QUESTIONS.length]!;
    return { id: index + 1, text, options, correctAnswer, explanation };
  },
);
