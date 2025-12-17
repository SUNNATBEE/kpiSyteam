export const userProfile = {
  name: 'Jasur Qodirov',
  role: 'Xodim | KPI monitoring',
  avatar:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80',
  score: 82,
  delta: 12,
}

export const periods = [
  { id: 1, name: '2025 - 1-chorak', range: '01.01.2025 - 31.03.2025' },
  { id: 2, name: '2025 - 2-chorak', range: '01.04.2025 - 30.06.2025' },
  { id: 3, name: '2025 - Yillik', range: "01.01.2025 - 31.12.2025" },
]

export const criteriaTypes = [
  {
    id: 1,
    name: 'Kasbiy mahorat',
    maxScore: 40,
    score: 32,
    items: [
      { id: '1.1', title: 'Trening va sertifikatlar', score: 12, max: 15, desc: "Xizmat tayyorgarligi bo'yicha malaka oshirish" },
      { id: '1.2', title: "Ko'nikmalarni bo'lishish", score: 10, max: 10, desc: 'Ichki workshop va mahorat darslari' },
      { id: '1.3', title: 'Innovatsion takliflar', score: 10, max: 15, desc: "Yangi g'oyalar, optimizatsiya" },
    ],
  },
  {
    id: 2,
    name: 'Natijadorlik',
    maxScore: 35,
    score: 26,
    items: [
      { id: '2.1', title: 'Reja bajarilishi', score: 18, max: 20, desc: "Maqsadli ko'rsatkichlar bajarilishi" },
      { id: '2.2', title: 'Jamoa ishlashi', score: 8, max: 15, desc: "Boshqa bo'linmalar bilan hamkorlik" },
    ],
  },
  {
    id: 3,
    name: 'Foydalanuvchi hissasi',
    maxScore: 25,
    score: 18,
    items: [
      { id: '3.1', title: "Tizimga ma'lumot kiritish", score: 10, max: 15, desc: 'Submissiyalar soni va sifati' },
      { id: '3.2', title: 'Mijoz fikr-mulohazalari', score: 8, max: 10, desc: 'Foydalanuvchi mamnunligi' },
    ],
  },
]

export const submissionHistory = [
  {
    id: 21,
    title: '1.1 | Trening sertifikati',
    status: "Ma'qullandi",
    score: 12,
    date: '2025-02-12',
    period: '2025 - 1-chorak',
  },
  {
    id: 22,
    title: '2.1 | Reja bajarilishi',
    status: 'Kutilmoqda',
    score: 0,
    date: '2025-03-02',
    period: '2025 - 1-chorak',
  },
  {
    id: 23,
    title: "3.1 | Ma'lumot yuklash",
    status: 'Rad etildi',
    score: 0,
    date: '2025-01-28',
    period: '2025 - 1-chorak',
  },
]

export const validatorQueue = [
  {
    id: 45,
    user: 'Dilshod M.',
    title: '1.2 | Workshop hujjati',
    date: '2025-03-03',
    status: 'Kutilmoqda',
    score: 10,
    evidence: 'workshop.pdf',
  },
  {
    id: 46,
    user: 'Sitora R.',
    title: '2.2 | Jamoa loyihasi',
    date: '2025-03-01',
    status: 'Kutilmoqda',
    score: 15,
    evidence: 'team-project.docx',
  },
  {
    id: 47,
    user: 'Muzaffar A.',
    title: '3.1 | Dalil fayli',
    date: '2025-02-25',
    status: "Ma'qullandi",
    score: 8,
    evidence: 'proof.pdf',
  },
]

