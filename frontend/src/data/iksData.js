/**
 * IKS (Indian Knowledge Systems) Data Catalog
 */

export const IKS_SCHOLARS = [
  {
    id: "aryabhata",
    name: "Aryabhata I",
    era: "476–550 CE",
    region: "Kusumapura (Pataliputra, Bihar)",
    field: "Ganita (Mathematics) & Jyotisha (Astronomy)",
    majorWorks: ["Aryabhatiya", "Arya-Siddhanta"],
    contributions: "Calculated π to 4 decimal places (3.1416), earth's rotation on its axis, planetary period calculations, sine tables (jya/kojya), and solar/lunar eclipse explanations.",
    category: "ganita",
    icon: "Calculator"
  },
  {
    id: "sushruta",
    name: "Sushruta",
    era: "c. 600 BCE",
    region: "Kashi (Varanasi)",
    field: "Shalya Tantra (Surgery) & Ayurveda",
    majorWorks: ["Sushruta Samhita"],
    contributions: "Father of Surgery & Plastic Surgery. Detailed 300+ surgical procedures, 120+ instruments (yantras & shastras), rhinoplasty (forehead flap), cataract couch surgery, and anatomical dissections.",
    category: "ayurveda",
    icon: "Stethoscope"
  },
  {
    id: "charaka",
    name: "Charaka",
    era: "c. 300–200 BCE",
    region: "Ancient Northwest / Gandhara",
    field: "Kaya Chikitsa (Internal Medicine) & Ayurveda",
    majorWorks: ["Charaka Samhita"],
    contributions: "Foundational treatise on Tridosha (Vata, Pitta, Kapha), Dhatus, Dinacharya (daily regimen), holistic pathology, prevention of disease, and pharmacology.",
    category: "ayurveda",
    icon: "HeartPulse"
  },
  {
    id: "madhava",
    name: "Madhava of Sangamagrama",
    era: "c. 1340–1425 CE",
    region: "Kerala (Sangamagrama)",
    field: "Ganita (Calculus & Infinite Series)",
    majorWorks: ["Venuaroha", "Sphutacandranapti", "Madhava-Leibniz Series"],
    contributions: "Pioneer of mathematical analysis and infinite series approximations for π, sine, cosine, and arctangent (predating Newton, Leibniz, and Gregory by over 250 years).",
    category: "ganita",
    icon: "Infinity"
  },
  {
    id: "brahmagupta",
    name: "Brahmagupta",
    era: "598–668 CE",
    region: "Bhillamala (Bhinmal, Rajasthan)",
    field: "Ganita (Algebra & Number Theory) & Astronomy",
    majorWorks: ["Brahmasphutasiddhanta", "Khandakhadyaka"],
    contributions: "First to define arithmetic operations with Zero and negative numbers, Brahmagupta's formula for cyclic quadrilaterals, and solution of indeterminate equations (Kuttaka/Bhavana).",
    category: "ganita",
    icon: "Binary"
  },
  {
    id: "bhaskara2",
    name: "Bhaskaracharya (Bhaskara II)",
    era: "1114–1185 CE",
    region: "Bijapur / Patan (Sahyadri)",
    field: "Ganita & Astronomy",
    majorWorks: ["Siddhanta Shiromani (Lilavati, Bijaganita, Goladhyaya)"],
    contributions: "Differential calculus principles (Tatkaliki gati), Chakravala cyclic algorithm for indeterminate quadratic equations, spherical trigonometry.",
    category: "ganita",
    icon: "Sigma"
  },
  {
    id: "kautilya",
    name: "Kautilya (Chanakya / Vishnugupta)",
    era: "c. 375–283 BCE",
    region: "Takshashila / Pataliputra",
    field: "Rajaneeti (Political Science) & Arthashastra (Economics)",
    majorWorks: ["Arthashastra"],
    contributions: "Saptanga theory of statecraft, foreign diplomacy (Sadgunya), fiscal management, ethical taxation, state administration, and intelligence architecture.",
    category: "governance",
    icon: "Crown"
  },
  {
    id: "nagarjuna",
    name: "Nagarjuna",
    era: "c. 2nd–3rd Century CE",
    region: "Nagarjunakonda / Vidarbha",
    field: "Rasashastra (Alchemy & Metallurgy) & Philosophy",
    majorWorks: ["Rasaratnakara", "Mulamadhyamakakarika"],
    contributions: "Purification and calcination of metals (Bhasma preparation), extraction of zinc (distillation per descensum), mercury (Parada) alchemy, and Madhyamaka philosophy.",
    category: "rasashastra",
    icon: "Flame"
  },
  {
    id: "panini",
    name: "Panini",
    era: "c. 6th–4th Century BCE",
    region: "Shalatula (Gandhara)",
    field: "Vyakarana (Sanskrit Grammar & Formal Linguistics)",
    majorWorks: ["Ashtadhyayi"],
    contributions: "World's earliest formal generative grammar in 3,959 concise sutras, auxiliary markers, and auxiliary metarules; foundational to modern computer science, BNF grammars, and syntax trees.",
    category: "linguistics",
    icon: "Languages"
  },
  {
    id: "gautama",
    name: "Gautama (Aksapada)",
    era: "c. 6th–2nd Century BCE",
    region: "Mithila",
    field: "Nyaya Darshana (Epistemology & Logic)",
    majorWorks: ["Nyaya Sutras"],
    contributions: "Systematized Indian logic into 16 categories (Padarthas), 4 Pramanas (Pratyaksha, Anumana, Upamana, Shabda), and the 5-step syllogism (Pancha-Avayava).",
    category: "nyaya",
    icon: "Brain"
  },
  {
    id: "dharampal",
    name: "Dharampal",
    era: "1922–2006 CE",
    region: "India / UK Archives",
    field: "Historiography of Indigenous Indian Education & Technology",
    majorWorks: ["The Beautiful Tree (1983)", "Indian Science and Technology in the 18th Century"],
    contributions: "Exhaustively uncovered British colonial surveys (Thomas Munro, William Adam) demonstrating high literacy, universal school access across castes, and decentralized indigenous schooling in pre-colonial India.",
    category: "education",
    icon: "GraduationCap"
  },
  {
    id: "varahamihira",
    name: "Varahamihira",
    era: "505–587 CE",
    region: "Ujjain (Avanti)",
    field: "Jyotisha, Hydrology, Gemology & Meteorology",
    majorWorks: ["Brihat Samhita", "Pancha-Siddhantika", "Brihat Jataka"],
    contributions: "Encyclopedic knowledge of groundwater detection (Dakargala), earthquake indicators, botanical grafting, architectural alignments, and combinatorial mathematics.",
    category: "ganita",
    icon: "Compass"
  }
];

export const IKS_PROMPTS = [
  {
    category: "Ganita & Astronomy",
    icon: "Calculator",
    color: "#f59e0b",
    description: "Infinite series, zero, trigonometry & planetary motion",
    prompts: [
      "Explain Madhava of Sangamagrama's infinite series for π and trigonometric functions.",
      "How did Aryabhata calculate earth's circumference and explain solar & lunar eclipses?",
      "Explain Brahmagupta's rules for arithmetic with zero and negative numbers.",
      "What was the significance of the Kerala School of Astronomy and Mathematics?"
    ]
  },
  {
    category: "Ayurveda & Shalya Tantra",
    icon: "HeartPulse",
    color: "#10b981",
    description: "Surgery, anatomy, tridosha & holistic healthcare",
    prompts: [
      "What surgical procedures and instruments are detailed in the Sushruta Samhita?",
      "Explain the Tridosha framework (Vata, Pitta, Kapha) in Charaka Samhita.",
      "How did ancient Indian surgeons perform reconstructive rhinoplasty?",
      "Explain the concepts of Dinacharya and Ritucharya in classical Ayurveda."
    ]
  },
  {
    category: "Arthashastra & Statecraft",
    icon: "Crown",
    color: "#f43f5e",
    description: "Saptanga theory, diplomacy, ethics & economic policy",
    prompts: [
      "Explain Kautilya's Saptanga Theory of State in the Arthashastra.",
      "What were the economic principles of taxation and market regulation in Arthashastra?",
      "Compare Kautilya's Arthashastra with Kamandaka's Nitisara.",
      "How did ancient Indian republican polities (Gana-Sanghas) function?"
    ]
  },
  {
    category: "Education & Heritage Engineering",
    icon: "Landmark",
    color: "#8b5cf6",
    description: "Nalanda, Takshashila, Dharampal & Kanheri water systems",
    prompts: [
      "What does Dharampal's 'The Beautiful Tree' reveal about indigenous Indian schooling?",
      "How were ancient universities like Nalanda, Takshashila, and Valabhi organized?",
      "Describe the sophisticated ancient rock-cut water harvesting system at Kanheri Caves.",
      "What was the impact of Thomas Babington Macaulay's 1835 Minute on Indian education?"
    ]
  },
  {
    category: "Logic & Epistemology",
    icon: "Brain",
    color: "#06b6d4",
    description: "Nyaya pramanas, syllogisms & Navya-Nyaya reasoning",
    prompts: [
      "Explain the four Pramanas (means of valid knowledge) in Nyaya philosophy.",
      "How does the five-step Nyaya syllogism (Pancha-Avayava) work?",
      "What was Gangesha Upadhyaya's contribution to Navya-Nyaya logic in Mithila?",
      "Explain the atomistic worldview (Anuvada) of Sage Kanada's Vaisheshika."
    ]
  },
  {
    category: "Rasashastra & Metallurgy",
    icon: "Flame",
    color: "#f97316",
    description: "Zinc smelting, Wootz steel, Bhasmas & metallurgy",
    prompts: [
      "Explain the ancient Indian technique of zinc distillation per descensum at Zawar.",
      "What was Wootz steel (Ukku) and how was crucible steel forged in ancient India?",
      "Describe Nagarjuna's Rasaratnakara and the preparation of medicinal Bhasmas.",
      "What is the metallurgical secret behind the rust-resistant Iron Pillar of Delhi?"
    ]
  }
];

export const IKS_SUBHASHITAS = [
  {
    sanskrit: "विद्या ददाति विनयं विनयाद्याति पात्रताम् ।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥",
    translation: "Knowledge bestows humility; from humility comes worthiness; from worthiness one attains prosperity; from prosperity righteousness, and thence enduring bliss."
  },
  {
    sanskrit: "न चोरहार्यं न च राजहार्यं न भ्रातृभाज्यं न च भारकारि ।\nव्यये कृते वर्धत एव नित्यं विद्याधनं सर्वधनप्रधानम् ॥",
    translation: "It cannot be stolen by thieves, nor seized by rulers, nor divided by kin, nor does it weigh down the bearer. The more it is shared, the more it grows — the wealth of knowledge is supreme among all wealth."
  },
  {
    sanskrit: "आ नो भद्राः क्रतवो यन्तु विश्वतः ।",
    translation: "May auspicious and noble thoughts come to us from every quarter of the universe. (Rigveda 1.89.1)"
  },
  {
    sanskrit: "ज्ञानेन हीनाः पशुभिः समानाः ।",
    translation: "Those devoid of wisdom and knowledge are akin to beasts."
  },
  {
    sanskrit: "सत्यमेव जयते नानृतम् ।",
    translation: "Truth alone triumphs, not falsehood."
  }
];
