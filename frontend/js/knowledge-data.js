/**
 * Comprehensive IKS (Indian Knowledge Systems) Scholars & Thinkers Directory
 * Covers Modules 1, 2, and 3: Eras, Lineages, Key Treatises, and Breakthroughs
 */

const IKS_DATA = {
  scholars: [
    // --- GANITA (MATHEMATICS) & JYOTISHA (ASTRONOMY) ---
    {
      name: "Aryabhata I",
      era: "476–550 CE",
      region: "Kusumapura (Pataliputra / modern Patna, Bihar)",
      field: "Ganita (Mathematics) & Jyotisha (Astronomy)",
      majorWorks: ["Aryabhatiya (Gitikapada, Ganitapada, Kalakriyapada, Golapada)", "Arya-Siddhanta"],
      contributions: "Approximated π to 4 decimal places (3.1416), formulated Earth's axial rotation explaining day/night, solar and lunar eclipse geometry via shadows, tables of sines (jya) and versines (utkrama-jya), kuttaka method for linear indeterminate equations, and calculated the length of the solar year to 365.25868 days.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-calculator"
    },
    {
      name: "Madhava of Sangamagrama",
      era: "c. 1340–1425 CE",
      region: "Sangamagrama (Irinjalakuda, Kerala)",
      field: "Ganita (Mathematical Analysis, Infinite Series & Calculus)",
      majorWorks: ["Venuaroha", "Sphutacandranapti", "Aganita-graha", "Madhava-Leibniz Series citations in Tantrasamgraha & Yuktibhasa"],
      contributions: "Founder of the Kerala School of Astronomy and Mathematics. Pioneered infinite power series approximations for π, sine, cosine, and arctangent (predating Newton, Leibniz, and Gregory by over 250 years). Developed rapid convergence transformation series and correction terms for infinite series.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-infinity"
    },
    {
      name: "Brahmagupta",
      era: "598–668 CE",
      region: "Bhillamala (Bhinmal, Rajasthan) / Ujjain",
      field: "Ganita (Algebra, Number Theory & Geometry) & Astronomy",
      majorWorks: ["Brahmasphutasiddhanta (BSS)", "Khandakhadyaka"],
      contributions: "First mathematician in history to establish formal mathematical rules for arithmetic operations with Zero (including positive and negative quantities), Brahmagupta's formula for the area of a cyclic quadrilateral, Brahmagupta's identity, and the Bhavana method for solving Pell's equation (Nx² + 1 = y²).",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-circle-notch"
    },
    {
      name: "Bhaskaracharya (Bhaskara II)",
      era: "1114–1185 CE",
      region: "Bijapur / Patan (Sahyadri region, Maharashtra/Karnataka)",
      field: "Ganita (Algebra, Calculus & Spherical Trigonometry)",
      majorWorks: ["Siddhanta Shiromani (comprising Lilavati, Bijaganita, Grahaganita, Goladhyaya)", "Karanakutuhala"],
      contributions: "Formulated the Chakravala (cyclic) method for solving indeterminate quadratic equations (later praised by Lagrange), recognized differential calculus concepts (Tatkaliki gati / instantaneous velocity where derivative vanishes at extrema), and spherical trigonometry.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-square-root-variable"
    },
    {
      name: "Bhaskara I",
      era: "c. 600–680 CE",
      region: "Saurashtra (Gujarat) / Ashmaka",
      field: "Ganita & Astronomy",
      majorWorks: ["Mahabhaskariya", "Laghubhaskariya", "Aryabhatiyabhashya"],
      contributions: "First to write numbers in the Indian decimal system with a circle for zero, and created the world's first unique rational trigonometric approximation formula for sin(x) with less than 1.9% relative error.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-compass-drafting"
    },
    {
      name: "Mahaviracharya",
      era: "c. 815–877 CE",
      region: "Karnataka (Rashtrakuta Empire, under King Amoghavarsha)",
      field: "Ganita (Jaina Mathematics)",
      majorWorks: ["Ganita Sara Sangraha"],
      contributions: "Separated astrology completely from mathematics. Extensive treatment of fractions, permutations and combinations (vikalpa), unit fractions decomposition, and geometric series.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-cubes"
    },
    {
      name: "Varahamihira",
      era: "505–587 CE",
      region: "Avanti (Ujjain, Madhya Pradesh)",
      field: "Jyotisha, Hydrology, Gemology, Architecture & Meteorology",
      majorWorks: ["Brihat Samhita", "Pancha-Siddhantika", "Brihat Jataka"],
      contributions: "Synthesized 5 ancient astronomical schools (Surya, Romaka, Paulisa, Vasistha, Paitamaha). Encyclopedic documentation of hydrology (Dakargala groundwater detection using termites and flora), botanical grafting, earthquake indicators, and combinatorial formulas.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-star-and-crescent"
    },
    {
      name: "Nilakantha Somayaji",
      era: "1444–1544 CE",
      region: "Trikkantiyur (Tirur, Kerala)",
      field: "Ganita & Astronomy (Kerala School)",
      majorWorks: ["Tantrasamgraha", "Aryabhatiyabhashya", "Golasara", "Siddhantadarpana"],
      contributions: "Proposed a computational quasi-heliocentric planetary model where Mercury, Venus, Mars, Jupiter, and Saturn orbit the Sun, which in turn orbits the Earth (predating Tycho Brahe). Formulated fast series for π and inverse tangents.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-sun"
    },
    {
      name: "Jyeshthadeva",
      era: "c. 1500–1610 CE",
      region: "Kerala (Kerala School of Astronomy and Mathematics)",
      field: "Ganita (Mathematical Proofs & Analysis)",
      majorWorks: ["Yuktibhasa (Ganita-Yukti-Bhasa)"],
      contributions: "Authored what is considered the world's first comprehensive calculus textbook in Malayalam, providing systematic mathematical proofs, geometric derivations, and justifications for Madhava's infinite series, planetary algorithms, and integration techniques.",
      category: "ganita",
      module: "Module 2: Core Disciplines",
      icon: "fa-book-open"
    },
    {
      name: "Pingala",
      era: "c. 3rd–2nd Century BCE",
      region: "Ancient India",
      field: "Chhandas (Prosody) & Combinatorial Mathematics",
      majorWorks: ["Chhandas Shastra (Pingala Sutras)"],
      contributions: "Invented the binary numeral system (dvika), sequences corresponding to Fibonacci numbers (matrameru), binomial coefficients and Meru Prastara (predating Pascal's triangle by 1,800 years), and run-length combinatorial algorithms.",
      category: "ganita",
      module: "Module 3: Elective Topics",
      icon: "fa-binary"
    },

    // --- AYURVEDA & SHALYA TANTRA (MEDICINE & SURGERY) ---
    {
      name: "Sushruta",
      era: "c. 600 BCE",
      region: "Kashi (Varanasi, Uttar Pradesh)",
      field: "Shalya Tantra (Surgery, Anatomy & Plastic Surgery)",
      majorWorks: ["Sushruta Samhita"],
      contributions: "Revered as the 'Father of Surgery' and 'Father of Plastic Surgery'. Detailed 300+ surgical operations, 121 surgical instruments (101 Yantras and 20 Shastras), pedicled forehead flap rhinoplasty, cataract couching (extracapsular lens displacement), anatomical dissection on submerged cadavers, trauma surgery, and ethics for physicians.",
      category: "ayurveda",
      module: "Module 2: Core Disciplines",
      icon: "fa-user-doctor"
    },
    {
      name: "Charaka",
      era: "c. 300–200 BCE",
      region: "Ancient Northwest / Panchanada / Gandhara",
      field: "Kaya Chikitsa (Internal Medicine & Holistic Healthcare)",
      majorWorks: ["Charaka Samhita"],
      contributions: "Pinnacle authority on internal medicine and pathology. Formulated the Tridosha system (Vata, Pitta, Kapha), the seven bodily tissues (Saptadhatu), digestion and metabolic fire (Agni), circadian health (Dinacharya, Ritucharya), holistic immunity (Ojas), disease prevention, and an oath of medical ethics.",
      category: "ayurveda",
      module: "Module 2: Core Disciplines",
      icon: "fa-mortar-pestle"
    },
    {
      name: "Vagbhata (Vagbhata I & II)",
      era: "c. 6th–7th Century CE",
      region: "Sindh / Kerala tradition",
      field: "Ayurveda Synthesis (Brihat-Trayi)",
      majorWorks: ["Ashtanga Hridaya", "Ashtanga Sangraha"],
      contributions: "Compiled the core wisdom of Charaka and Sushruta into poetic, accessible verses covering the eight branches of Ayurveda (Ashtanga). Ashtanga Hridaya became the clinical standard textbook across South India, Tibet, and Central Asia.",
      category: "ayurveda",
      module: "Module 2: Core Disciplines",
      icon: "fa-heart-pulse"
    },
    {
      name: "Dhanvantari",
      era: "Vedic Antiquity / Kashi Lineage",
      region: "Kashi (Varanasi)",
      field: "Ayurveda & Surgical Lineage Patron",
      majorWorks: ["Dhanvantari Nighantu", "Divodasa Dhanvantari teachings in Sushruta Samhita"],
      contributions: "Revered archetype and divine patron of Indian medicine and surgery. Divodasa of Kashi transmitted surgical knowledge systematically to disciples including Sushruta, Aupadhenava, and Paushkalavata.",
      category: "ayurveda",
      module: "Module 2: Core Disciplines",
      icon: "fa-hand-holding-medical"
    },
    {
      name: "Jeevaka Kumarabhacca",
      era: "c. 6th Century BCE",
      region: "Takshashila / Rajagriha (Magadha)",
      field: "Medicine, Neuro-surgery & Pediatrics (Kaumarbhritya)",
      majorWorks: ["Recorded cases in Buddhist Vinaya Pitaka & Pali Canon"],
      contributions: "Renowned personal physician to Gautama Buddha and King Bimbisara of Magadha. Educated for 7 years at Takshashila University under sage Atreya. Recorded performing cranial trepanation (brain surgery), successful intestinal resection, and pediatric treatments.",
      category: "ayurveda",
      module: "Module 1: Foundations & Context",
      icon: "fa-stethoscope"
    },

    // --- RASASHASTRA & METALLURGY (ALCHEMY & MATERIAL SCIENCES) ---
    {
      name: "Nagarjuna (Rasashastra Tradition)",
      era: "c. 2nd–3rd Century CE / 8th–10th Century Alchemical Trad.",
      region: "Nagarjunakonda (Andhra Pradesh) / Vidarbha",
      field: "Rasashastra (Alchemy & Metallurgy) & Madhyamaka Philosophy",
      majorWorks: ["Rasaratnakara", "Rasendramangala", "Arogyamanjari"],
      contributions: "Pioneered alchemical distillation, extraction of metals, and medicinal transmutation. First documented description of zinc extraction via downward distillation (distillation per descensum) in closed retorts (Muka musha), purification of mercury (Parada Samskaras), and calcination of metallic bhasmas.",
      category: "rasashastra",
      module: "Module 2: Core Disciplines",
      icon: "fa-fire-flame-curved"
    },
    {
      name: "Govinda Bhagavatpada",
      era: "c. 8th Century CE",
      region: "Narmada Riverbanks / Central India",
      field: "Rasashastra (Chemical Processes & Mercury Science)",
      majorWorks: ["Rasahridayatantra"],
      contributions: "Guru of Adi Shankaracharya. Classified mercurial processing into 18 distinct operations (Ashtadasha Samskaras), detailed specialized apparatuses (Kosthi, Dola Yantra, Swedana Yantra), and medicinal metallurgy.",
      category: "rasashastra",
      module: "Module 2: Core Disciplines",
      icon: "fa-flask-vial"
    },
    {
      name: "Somadeva",
      era: "c. 12th Century CE",
      region: "Western India",
      field: "Rasashastra & Mineral Classification",
      majorWorks: ["Rasendrachudamani"],
      contributions: "Systematic classification of minerals (Maharasa, Uparasa, Sadharanarasa), furnace designs, and pyrotechnic crucible smelting techniques.",
      category: "rasashastra",
      module: "Module 2: Core Disciplines",
      icon: "fa-flask"
    },

    // --- ARTHASHASTRA & RAJANEETI (GOVERNANCE, DIPLOMACY & ECONOMICS) ---
    {
      name: "Chanakya (Kautilya / Vishnugupta)",
      era: "c. 375–283 BCE",
      region: "Takshashila / Pataliputra (Maurya Empire)",
      field: "Rajaneeti (Political Science), Economics (Varta), Ethics & Intelligence",
      majorWorks: ["Arthashastra (15 Adhikaranas, 150 Chapters)", "Chanakya Niti"],
      contributions: "Master strategist behind the Mauryan Empire. Formulated the Saptanga theory of state (Swami, Amatya, Janapada, Durga, Kosha, Danda, Mitra), the 6-fold foreign policy (Sadgunya), ethical taxation principles (gathering tax like a bee collects nectar without harming the flower), market price regulations, audit mechanisms, state treasury management, espionage network architecture, and civic administration.",
      category: "governance",
      module: "Module 2: Core Disciplines",
      icon: "fa-crown"
    },
    {
      name: "Kamandaka",
      era: "c. 4th–6th Century CE",
      region: "Gupta Era / Magadha",
      field: "Niti Shastra (Political Ethics & Statecraft)",
      majorWorks: ["Nitisara (Kamandakiya Nitisara)"],
      contributions: "Adapted Kautilyan statecraft into a moral and ethical framework suitable for monarchs. Expounded the Mandala theory of inter-state diplomacy, army deployment, espionage, and avoidance of unjust warfare through alliances.",
      category: "governance",
      module: "Module 2: Core Disciplines",
      icon: "fa-scale-balanced"
    },
    {
      name: "Somadeva Suri",
      era: "c. 10th Century CE",
      region: "Deccan (Rashtrakuta / Western Chalukya region)",
      field: "Rajaneeti & Jain Political Philosophy",
      majorWorks: ["Nitivakyamrita", "Yashastilaka Champu"],
      contributions: "Aphoristic handbook of secular statecraft emphasizing that the purpose of kingship is public welfare (Lokopakara), justice, ethical taxation, and bureaucratic accountability without religious sectarianism.",
      category: "governance",
      module: "Module 2: Core Disciplines",
      icon: "fa-landmark"
    },

    // --- NYAYA & VAISHESHIKA (LOGIC, EPISTEMOLOGY & ONTOLOGY) ---
    {
      name: "Aksapada Gautama",
      era: "c. 6th–2nd Century BCE",
      region: "Mithila / Northern India",
      field: "Nyaya Darshana (Formal Epistemology & Logic)",
      majorWorks: ["Nyaya Sutras"],
      contributions: "Systematized classical Indian logic and debate methodology. Established the 16 Padarthas (epistemic categories), 4 Pramanas (valid means of knowledge: Pratyaksha/perception, Anumana/inference, Upamana/comparison, Shabda/testimony), and the rigorous 5-step syllogism (Pratijna, Hetu, Udaharana, Upanaya, Nigamana).",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-brain"
    },
    {
      name: "Vatsyayana Pakshilasvamin",
      era: "c. 4th–5th Century CE",
      region: "Northern India / Pataliputra",
      field: "Nyaya Philosophy & Epistemology",
      majorWorks: ["Nyaya Bhashya"],
      contributions: "Author of the foundational commentary on the Nyaya Sutras. Established that valid action (Pravritti) is impossible without valid epistemic cognition (Pramana), defended realism against radical illusionism, and developed philosophical debate norms (Vada, Jalpa, Vitanda).",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-feather"
    },
    {
      name: "Gangesha Upadhyaya",
      era: "c. 1325–1380 CE",
      region: "Mithila (Bihar)",
      field: "Navya-Nyaya (New Logic & Formal Epistemic Semantics)",
      majorWorks: ["Tattvachintamani (4 Khandas: Pratyaksha, Anumana, Upamana, Shabda)"],
      contributions: "Founder of Navya-Nyaya school of mathematical logic. Created a formal technical language using relational properties (Avachhedakata, Svarupasambandha, Vyapti) that eliminated ambiguity from logical definitions, predating Gottlob Frege and Bertrand Russell's modern mathematical logic.",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-network-wired"
    },
    {
      name: "Dignaga",
      era: "c. 480–540 CE",
      region: "Kanchipuram (Tamil Nadu) / Nalanda University",
      field: "Buddhist Logic & Epistemology (Pramana-vada)",
      majorWorks: ["Pramanasamuccaya", "Hetuchakra"],
      contributions: "Father of Buddhist logic. Developed the Hetuchakra (wheel of reasons) determining valid vs invalid inferences, reduced pramanas to perception and inference alone, and formulated the Apoha theory of nominalist meaning.",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-dharmachakra"
    },
    {
      name: "Dharmakirti",
      era: "c. 6th–7th Century CE",
      region: "Valabhi / Nalanda University",
      field: "Pramana & Epistemology",
      majorWorks: ["Pramanavarttika", "Nyayabindu", "Hetubindu"],
      contributions: "Profound philosopher at Nalanda. Formulated the criterion of causal efficacy (Arthakriya-karitva) for ontological reality, rigorous theory of inductive reasoning (Tadratpatti & Tadutpatti), and defended logic as the ultimate instrument of truth.",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-lightbulb"
    },
    {
      name: "Sage Kanada (Uluka)",
      era: "c. 6th–2nd Century BCE",
      region: "Prabhas Kshetra (Gujarat)",
      field: "Vaisheshika Darshana (Physics, Atomism & Ontology)",
      majorWorks: ["Vaisheshika Sutras"],
      contributions: "Pioneered the earliest atomistic physics and natural philosophy (Anuvada). Proposed that all matter is composed of indivisible eternal atoms (Paramanu) combining in dyads (Dvyanuka) and triads (Tryanuka), with laws governing motion (Karma) and causation.",
      category: "nyaya",
      module: "Module 2: Core Disciplines",
      icon: "fa-atom"
    },

    // --- VYAKARANA, LINGUISTICS & PHILOSOPHY OF LANGUAGE ---
    {
      name: "Panini",
      era: "c. 6th–4th Century BCE",
      region: "Shalatula (Gandhara / near modern Attock)",
      field: "Vyakarana (Formal Generative Linguistics & Sanskrit Grammar)",
      majorWorks: ["Ashtadhyayi (8 Chapters, 3,959 Sutras)", "Dhatupatha", "Ganapatha", "Shivasutras"],
      contributions: "Created the world's first formal generative grammar. Uses algebraic brevity, auxiliary symbols (it markers), zero morpheme (lopa), recursive rules, and metarules. Foundational to modern theoretical linguistics, context-free grammars, and BNF (Backus-Naur Form) syntax in computer science.",
      category: "linguistics",
      module: "Module 3: Elective Topics",
      icon: "fa-spell-check"
    },
    {
      name: "Patanjali",
      era: "c. 2nd Century BCE",
      region: "Gonarda / North India",
      field: "Vyakarana, Yoga Philosophy & Ayurveda Synthesis",
      majorWorks: ["Mahabhashya (Great Commentary on Ashtadhyayi)", "Yoga Sutras of Patanjali"],
      contributions: "Author of the definitive philosophical commentary Mahabhashya synthesizing Panini and Katyayana. In philosophy, codified the 8 limbs of Yoga (Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi) and mind-chitta vritti nirodha.",
      category: "linguistics",
      module: "Module 3: Elective Topics",
      icon: "fa-spa"
    },
    {
      name: "Bhartrihari",
      era: "c. 5th Century CE",
      region: "Ujjain / Valabhi",
      field: "Philosophy of Language (Shabdadvaita) & Ethics",
      majorWorks: ["Vakyapadiya", "Shatakatrayam (Niti, Vairagya, Shringara Shataka)"],
      contributions: "Expounded the Sphota theory of linguistic cognition (the instantaneous intuitive flash of meaning / Pratibha beyond individual phonemes) and proposed that ultimate reality is Sabda-Brahman (Cosmic Word Principle).",
      category: "linguistics",
      module: "Module 3: Elective Topics",
      icon: "fa-quote-left"
    },

    // --- EDUCATION, HISTORIOGRAPHY & COLONIAL CRITIQUE ---
    {
      name: "Dharampal",
      era: "1922–2006 CE",
      region: "India / British Archival Records (London)",
      field: "Historiography of Indigenous Indian Education, Science & Technology",
      majorWorks: [
        "The Beautiful Tree: Indigenous Indian Education in the Eighteenth Century (1983)",
        "Indian Science and Technology in the Eighteenth Century (1971)",
        "Civil Disobedience and Indian Tradition (1971)"
      ],
      contributions: "Decoded extensive 18th/19th century British colonial archives (including Sir Thomas Munro's 1822–1826 Madras Presidency survey, William Adam's 1835–1838 Bengal surveys, and G.L. Prendergast's Bombay surveys). Proved that pre-colonial India had a universal, decentralized primary schooling network in every village with high literacy across all communities (Shudras and other backward castes comprised 70-80% of school enrollments in Tamil and Telugu areas) before British policies dismantled the indigenous system.",
      category: "education",
      module: "Module 1: Foundations & Context",
      icon: "fa-tree"
    },
    {
      name: "Thomas Babington Macaulay",
      era: "1800–1859",
      region: "Colonial British Administration",
      field: "Colonial Education Policy & Anglophone Hegemony",
      majorWorks: ["Minute on Indian Education (February 2, 1835)"],
      contributions: "Infamous architect of British cultural hegemony in Indian education. Dismissed Indian and Oriental knowledge ('a single shelf of a good European library was worth the whole native literature of India and Arabia') and established the policy of creating 'a class of persons Indian in blood and colour, but English in tastes, in opinions, in morals and in intellect' via the Downward Filtration Theory.",
      category: "education",
      module: "Module 1: Foundations & Context",
      icon: "fa-building-columns"
    },
    {
      name: "Lord William Bentinck",
      era: "1774–1839",
      region: "Governor-General of India (1828–1835)",
      field: "Colonial Governance & Education Policy Execution",
      majorWorks: ["English Education Act of 1835"],
      contributions: "Enacted Macaulay's proposals into official British government legislation, re-allocating state funds away from traditional Sanskrit Gurukuls, Madrasas, and indigenous village schools toward English-medium instruction.",
      category: "education",
      module: "Module 1: Foundations & Context",
      icon: "fa-landmark-dome"
    },

    // --- ARTS, AESTHETICS, TOWN PLANNING & AGRICULTURE ---
    {
      name: "Bharata Muni",
      era: "c. 500 BCE – 200 CE",
      region: "Ancient India",
      field: "Natya (Dramaturgy), Music (Gandharva) & Aesthetics",
      majorWorks: ["Natyashastra (36 Chapters, 6,000 Shlokas)"],
      contributions: "Foundational treatise on Indian performing arts, theatre architecture, dance, gesture (Abhinaya), and the profound Rasa Siddhanta (the 8 classical Rasas: Shringara, Hasya, Karuna, Raudra, Veera, Bhayanaka, Bibhatsa, Adbhuta) derived from Bhavas.",
      category: "aesthetics",
      module: "Module 3: Elective Topics",
      icon: "fa-masks-theater"
    },
    {
      name: "Abhinavagupta",
      era: "c. 950–1016 CE",
      region: "Kashmir",
      field: "Kashmir Shaivism, Aesthetics & Literary Criticism",
      majorWorks: ["Abhinavabharati (Commentary on Natyashastra)", "Dhvanyalokalocana", "Tantraloka"],
      contributions: "Added the 9th Rasa — Shanta Rasa (peace/liberation) — to classical aesthetics. Proposed that artistic experience (Rasa-asvadana) is a transcendental, spiritual realization mirroring divine bliss (Ananda).",
      category: "aesthetics",
      module: "Module 3: Elective Topics",
      icon: "fa-om"
    },
    {
      name: "Sage Parashara",
      era: "Ancient / Classical Period",
      region: "Ancient India",
      field: "Krishi Shastra (Agricultural Sciences & Meteorology)",
      majorWorks: ["Krishi Parashara", "Vrikshayurveda references"],
      contributions: "Systematized traditional Indian agronomy, cloud classification and rainfall forecasting (Megha-lakshana), seed treatment and preservation, organic composting (Kunapajala), soil classification, cattle management, and seasonal planting rhythms.",
      category: "agriculture",
      module: "Module 3: Elective Topics",
      icon: "fa-seedling"
    },
    {
      name: "Surapala",
      era: "c. 10th Century CE",
      region: "Eastern India / Bengal",
      field: "Vrikshayurveda (Arbori-horticulture & Plant Health)",
      majorWorks: ["Vrikshayurveda"],
      contributions: "Authored dedicated classical manual on plant science. Detailed botanical plant diseases (Tridosha pathology in plants), herbal concoctions, soil preparation, grafting techniques, and organic bio-fertilizers.",
      category: "agriculture",
      module: "Module 3: Elective Topics",
      icon: "fa-leaf"
    }
  ],

  curatedPrompts: [
    {
      category: "Ganita & Astronomy",
      icon: "fa-calculator",
      color: "#F59E0B",
      description: "Aryabhata, Madhava, Brahmagupta, Bhaskara II & Kerala School",
      prompts: [
        "Explain Madhava of Sangamagrama's infinite series for π and how it predated Newton and Leibniz.",
        "How did Aryabhata calculate earth's rotation and explain solar/lunar eclipses?",
        "Explain Brahmagupta's rules for arithmetic with zero and negative numbers in Brahmasphutasiddhanta.",
        "What was the significance of Jyeshthadeva's Yuktibhasa in mathematical history?"
      ]
    },
    {
      category: "Ayurveda & Shalya Tantra",
      icon: "fa-user-doctor",
      color: "#10B981",
      description: "Sushruta, Charaka, Vagbhata, Dhanvantari & Jeevaka",
      prompts: [
        "What surgical procedures and instruments are detailed in the Sushruta Samhita?",
        "Explain the Tridosha and Saptadhatu framework in Charaka Samhita.",
        "How did ancient Indian surgeons perform reconstructive rhinoplasty (forehead flap)?",
        "Describe the physician Jeevaka's training at Takshashila and surgical operations."
      ]
    },
    {
      category: "Arthashastra & Statecraft",
      icon: "fa-crown",
      color: "#EC4899",
      description: "Kautilya (Chanakya), Kamandaka & Somadeva Suri",
      prompts: [
        "Explain Kautilya's Saptanga Theory of State in the Arthashastra.",
        "Compare Kautilya's Arthashastra with Kamandaka's Nitisara.",
        "What were Kautilya's principles of ethical taxation and market regulation?",
        "Explain the Mandala theory of foreign diplomacy in classical Indian statecraft."
      ]
    },
    {
      category: "Education & Historiography",
      icon: "fa-landmark-dome",
      color: "#8B5CF6",
      description: "Dharampal, Takshashila, Nalanda, Macaulay & British surveys",
      prompts: [
        "What does Dharampal's 'The Beautiful Tree' prove about pre-colonial Indian education?",
        "How were ancient universities like Nalanda and Takshashila structured and administered?",
        "Analyze Thomas Babington Macaulay's 1835 Minute and its impact on indigenous knowledge.",
        "Describe the ancient rock-cut water harvesting system at Kanheri Caves."
      ]
    },
    {
      category: "Logic & Epistemology",
      icon: "fa-brain",
      color: "#3B82F6",
      description: "Aksapada Gautama, Gangesha, Dignaga, Dharmakirti & Kanada",
      prompts: [
        "Explain the four Pramanas (means of valid knowledge) in Nyaya philosophy.",
        "How does the five-step Nyaya syllogism (Pancha-Avayava) work with examples?",
        "What was Gangesha Upadhyaya's contribution to Navya-Nyaya formal logic in Mithila?",
        "Explain Sage Kanada's atomistic physics (Anuvada) in Vaisheshika."
      ]
    },
    {
      category: "Rasashastra & Metallurgy",
      icon: "fa-fire-flame-curved",
      color: "#F97316",
      description: "Nagarjuna, Govinda Bhagavatpada & ancient metallurgy",
      prompts: [
        "Explain Nagarjuna's Rasaratnakara and the ancient technique of zinc distillation at Zawar.",
        "What was Wootz steel (Ukku) and how was crucible steel manufactured in ancient India?",
        "How were metallic Bhasmas prepared and safely used in Indian alchemy?",
        "Describe Govinda Bhagavatpada's contributions in Rasahridayatantra."
      ]
    }
  ],

  subhashitas: [
    {
      sanskrit: "विद्या ददाति विनयं विनयाद्याति पात्रताम् ।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥",
      translation: "Knowledge bestows humility; from humility comes worthiness; from worthiness one attains prosperity; from prosperity righteousness, and thence enduring bliss."
    },
    {
      sanskrit: "न चोरहार्यं न च राजहार्यं न भ्रातृभाज्यं न च भारकारि ।\nव्यये कृते वर्धत एव नित्यं विद्याधनं सर्वधनप्रधानम् ॥",
      translation: "It cannot be stolen by thieves, nor seized by rulers, nor divided by kin, nor does it weigh down the bearer. The more it is shared, the more it grows — the wealth of knowledge is supreme among all wealth."
    },
    {
      sanskrit: "विद्वत्वं च नृपत्वं च नैव तुल्ये कदाचन ।\nस्वदेशे पूज्यते राजा विद्वान् सर्वत्र पूज्यते ॥",
      translation: "Scholarship and kingship can never be compared. A king is honored only in his own kingdom, but a scholar is revered across the entire world."
    },
    {
      sanskrit: "आ नो भद्राः क्रतवो यन्तु विश्वतः ।",
      translation: "May auspicious and noble thoughts come to us from every quarter of the universe. (Rigveda 1.89.1)"
    }
  ]
};
