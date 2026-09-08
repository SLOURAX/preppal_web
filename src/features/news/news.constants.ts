export interface NewsArticle {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly category: string;
  readonly author: string;
  readonly publishedAt: string;
  readonly readTime: string;
  readonly likes: number;
  readonly comments: number;
  readonly featured?: boolean;
  readonly body: readonly string[];
  readonly tags: readonly string[];
}

export const NEWS_CATEGORIES = [
  "All",
  "AI & Learning",
  "Study Skills",
  "Rewards",
  "Community",
] as const;

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    slug: "ai-explanations-that-build-understanding",
    title:
      "How AI explanations can turn a wrong answer into real understanding",
    excerpt:
      "The best feedback does more than reveal the answer. It helps learners recognise the reasoning pattern they can reuse next time.",
    image: "/news/ai-study-support.png",
    category: "AI & Learning",
    author: "Preppal Learning Team",
    publishedAt: "2026-09-02T09:30:00+01:00",
    readTime: "6 min read",
    likes: 284,
    comments: 38,
    featured: true,
    tags: ["Artificial intelligence", "Learning science", "Quiz support"],
    body: [
      "A useful explanation should meet a learner at the exact point where their reasoning changed direction. That means identifying the misconception, connecting it to what they already understand, and showing a clear path to the correct conclusion.",
      "Preppal’s AI support is designed around that learning moment. Instead of simply displaying the right option, it breaks the question into understandable steps and gives learners another opportunity to practise the same underlying skill.",
      "This approach makes mistakes valuable. Every incorrect answer becomes evidence about what to revisit, while every explanation becomes a small lesson that strengthens the learner’s next attempt.",
      "As the platform develops, these signals will also help shape personalised practice sessions—prioritising weak areas without making the experience feel repetitive or discouraging.",
    ],
  },
  {
    slug: "seven-day-exam-preparation-plan",
    title: "A practical seven-day plan for focused exam preparation",
    excerpt:
      "Use short practice sessions, deliberate review, and realistic targets to make the final week count.",
    image: "/news/exam-preparation.png",
    category: "Study Skills",
    author: "Dr. Nneka Adeyemi",
    publishedAt: "2026-09-01T14:15:00+01:00",
    readTime: "5 min read",
    likes: 196,
    comments: 24,
    tags: ["Exam prep", "Planning", "Study habits"],
    body: [
      "The final week before an exam is most effective when it is structured around retrieval practice rather than passive rereading. Begin by identifying the topics that carry the most weight and the areas where your confidence is lowest.",
      "Divide each day into short, focused sessions. Use one session for timed questions, another for reviewing mistakes, and a final short session for recalling key ideas without looking at your notes.",
      "Protect your sleep and leave space for recovery. Consistency across seven days will produce better results than a single exhausting study marathon.",
    ],
  },
  {
    slug: "new-reward-milestones",
    title: "New reward milestones make consistent practice more valuable",
    excerpt:
      "Learners can now see clearer progress toward point bonuses, streak achievements, and redemption goals.",
    image: "/news/learning-rewards.png",
    category: "Rewards",
    author: "Preppal Product Team",
    publishedAt: "2026-08-30T11:00:00+01:00",
    readTime: "3 min read",
    likes: 321,
    comments: 47,
    tags: ["XP and Coins", "Rewards", "Product update"],
    body: [
      "Progress is easier to sustain when the next milestone is visible. Our updated reward experience makes it clearer how quizzes, daily check-ins, and learning streaks contribute to a learner’s point balance.",
      "The goal is not to reward speed alone. Strong habits, thoughtful practice, and steady improvement all contribute to meaningful recognition across Preppal.",
      "Reward values and eligibility rules will continue to evolve as we learn which incentives best support genuine learning outcomes.",
    ],
  },
  {
    slug: "learning-together-improves-consistency",
    title: "Why learning with friends can improve consistency",
    excerpt:
      "Accountability, shared goals, and friendly competition can make a study routine easier to maintain.",
    image: "/news/learner-community.png",
    category: "Community",
    author: "Tomi Akinwale",
    publishedAt: "2026-08-28T16:40:00+01:00",
    readTime: "4 min read",
    likes: 175,
    comments: 31,
    tags: ["Community", "Referrals", "Motivation"],
    body: [
      "Studying with other people introduces a simple but powerful form of accountability. When learners share goals and check in on progress, it becomes easier to return after a difficult day.",
      "Friendly competition can also help when it remains focused on effort and improvement. A leaderboard should provide encouragement and context, not make learners feel that only the highest score matters.",
      "Preppal referrals are being designed around this idea: invite people you genuinely want to learn with, celebrate one another’s progress, and earn bonuses when that shared journey begins.",
    ],
  },
  {
    slug: "retrieval-practice-beats-rereading",
    title: "Retrieval practice: why testing yourself beats rereading",
    excerpt:
      "Trying to recall information strengthens memory and reveals gaps that familiar-looking notes can hide.",
    image: "/news/exam-preparation.png",
    category: "Study Skills",
    author: "Preppal Learning Team",
    publishedAt: "2026-08-25T08:20:00+01:00",
    readTime: "5 min read",
    likes: 243,
    comments: 19,
    tags: ["Memory", "Practice quizzes", "Study skills"],
    body: [
      "Rereading can create a feeling of familiarity, but familiarity is not the same as being able to retrieve an answer under exam conditions. Practice questions require the brain to reconstruct knowledge, which strengthens access to it later.",
      "A useful routine is to answer first, review second, and then return to a similar question after a short interval. This gives you evidence that the explanation changed what you can actually do.",
      "Even brief retrieval sessions are effective when they happen consistently and cover a mix of recent and older material.",
    ],
  },
  {
    slug: "building-a-healthier-learning-streak",
    title:
      "Build a learning streak that supports you—not one that pressures you",
    excerpt:
      "A sustainable streak celebrates returning to learn while leaving room for real life and recovery.",
    image: "/news/ai-study-support.png",
    category: "Study Skills",
    author: "Kemi Balogun",
    publishedAt: "2026-08-21T12:05:00+01:00",
    readTime: "4 min read",
    likes: 154,
    comments: 22,
    tags: ["Streaks", "Wellbeing", "Consistency"],
    body: [
      "A learning streak should make it easier to begin, not make a learner feel punished for missing a day. The most useful streaks are built around achievable actions, such as completing one short quiz or reviewing one difficult concept.",
      "Start with a minimum that feels almost too easy. Once the routine becomes familiar, longer sessions can grow naturally from it without becoming the price of keeping the streak alive.",
      "Progress includes returning after an interruption. A healthy system recognises that recovery is part of consistency.",
    ],
  },
  {
    slug: "leaderboards-that-motivate-every-learner",
    title: "Designing leaderboards that motivate more than the top three",
    excerpt:
      "Time-based rankings and personal progress give every learner a meaningful reason to participate.",
    image: "/news/learner-community.png",
    category: "Community",
    author: "Preppal Product Team",
    publishedAt: "2026-08-18T10:45:00+01:00",
    readTime: "4 min read",
    likes: 208,
    comments: 35,
    tags: ["Leaderboard", "Motivation", "Community"],
    body: [
      "A global all-time ranking can feel unreachable for a new learner. Shorter periods—today, this week, or a selected month—give more people a realistic opportunity to see their effort recognised.",
      "Personal movement matters too. Showing that a learner climbed five places can be more motivating than showing only the distance to first place.",
      "Preppal’s leaderboard will continue to balance achievement, fairness, and healthy competition as the community grows.",
    ],
  },
] as const;
