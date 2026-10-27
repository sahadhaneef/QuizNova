export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type Category =
  | 'Science'
  | 'Geography'
  | 'History'
  | 'Technology'
  | 'Mathematics'
  | 'General Knowledge'
  | 'Nature'
  | 'Entertainment';

export interface Question {
  id: string;
  text: string;
  category: Category;
  difficulty: Difficulty;
  options: string[];
  correctAnswer: number; // index 0-3
}

export const ALL_CATEGORIES: Category[] = [
  'Science',
  'Geography',
  'History',
  'Technology',
  'Mathematics',
  'General Knowledge',
  'Nature',
  'Entertainment',
];

export const QUESTIONS: Question[] = [
  // ===== SCIENCE =====
  // Easy
  { id: 'sci_e1', text: 'What is the chemical symbol for water?', category: 'Science', difficulty: 'easy', options: ['H2O', 'CO2', 'NaCl', 'O2'], correctAnswer: 0 },
  { id: 'sci_e2', text: 'How many planets are in our solar system?', category: 'Science', difficulty: 'easy', options: ['7', '8', '9', '10'], correctAnswer: 1 },
  { id: 'sci_e3', text: 'What gas do plants absorb during photosynthesis?', category: 'Science', difficulty: 'easy', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2 },
  { id: 'sci_e4', text: 'What is the closest star to Earth?', category: 'Science', difficulty: 'easy', options: ['Alpha Centauri', 'Sirius', 'The Sun', 'Betelgeuse'], correctAnswer: 2 },
  { id: 'sci_e5', text: 'What force keeps us on the ground?', category: 'Science', difficulty: 'easy', options: ['Magnetism', 'Gravity', 'Friction', 'Tension'], correctAnswer: 1 },
  // Medium
  { id: 'sci_m1', text: 'What is the atomic number of carbon?', category: 'Science', difficulty: 'medium', options: ['6', '8', '12', '14'], correctAnswer: 0 },
  { id: 'sci_m2', text: 'What is the speed of light in a vacuum (approximate)?', category: 'Science', difficulty: 'medium', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '250,000 km/s'], correctAnswer: 0 },
  { id: 'sci_m3', text: 'Which organ produces insulin?', category: 'Science', difficulty: 'medium', options: ['Liver', 'Kidney', 'Pancreas', 'Spleen'], correctAnswer: 2 },
  { id: 'sci_m4', text: 'What is the most abundant element in the human body by mass?', category: 'Science', difficulty: 'medium', options: ['Carbon', 'Hydrogen', 'Oxygen', 'Nitrogen'], correctAnswer: 2 },
  { id: 'sci_m5', text: 'What type of wave is sound?', category: 'Science', difficulty: 'medium', options: ['Transverse', 'Electromagnetic', 'Longitudinal', 'Surface'], correctAnswer: 2 },
  // Hard
  { id: 'sci_h1', text: 'What is the half-life of Carbon-14?', category: 'Science', difficulty: 'hard', options: ['1,570 years', '5,730 years', '10,000 years', '25,000 years'], correctAnswer: 1 },
  { id: 'sci_h2', text: "What is Avogadro's number?", category: 'Science', difficulty: 'hard', options: ['6.022 × 10²³', '3.14 × 10²⁴', '1.38 × 10²³', '9.81 × 10²²'], correctAnswer: 0 },
  { id: 'sci_h3', text: 'Which subatomic particle has no electric charge?', category: 'Science', difficulty: 'hard', options: ['Proton', 'Electron', 'Neutron', 'Positron'], correctAnswer: 2 },
  { id: 'sci_h4', text: 'What phenomenon explains why the sky is blue?', category: 'Science', difficulty: 'hard', options: ['Reflection', 'Rayleigh Scattering', 'Refraction', 'Diffraction'], correctAnswer: 1 },
  { id: 'sci_h5', text: 'What is the SI unit of electric charge?', category: 'Science', difficulty: 'hard', options: ['Ampere', 'Volt', 'Coulomb', 'Farad'], correctAnswer: 2 },
  // Expert
  { id: 'sci_x1', text: 'Which quantum number describes the orientation of an orbital in space?', category: 'Science', difficulty: 'expert', options: ['Principal (n)', 'Azimuthal (l)', 'Magnetic (ml)', 'Spin (ms)'], correctAnswer: 2 },
  { id: 'sci_x2', text: 'The Chandrasekhar limit (1.4 solar masses) applies to which stellar remnant?', category: 'Science', difficulty: 'expert', options: ['Neutron Star', 'White Dwarf', 'Black Hole', 'Brown Dwarf'], correctAnswer: 1 },
  { id: 'sci_x3', text: 'What does the Heisenberg Uncertainty Principle state about position and momentum?', category: 'Science', difficulty: 'expert', options: ['They are always equal', 'They cannot both be precisely known simultaneously', 'Momentum is always greater', 'Position is always certain'], correctAnswer: 1 },
  { id: 'sci_x4', text: 'In chemistry, what is the VSEPR theory used to predict?', category: 'Science', difficulty: 'expert', options: ['Reaction rates', 'Electron configurations', 'Molecular geometry', 'Ionic bond strengths'], correctAnswer: 2 },
  { id: 'sci_x5', text: 'Which process describes the conversion of light energy into chemical energy in a photosynthetic organism?', category: 'Science', difficulty: 'expert', options: ['Oxidative phosphorylation', 'Glycolysis', 'Photophosphorylation', 'Substrate-level phosphorylation'], correctAnswer: 2 },

  // ===== GEOGRAPHY =====
  // Easy
  { id: 'geo_e1', text: 'What is the largest country in the world by area?', category: 'Geography', difficulty: 'easy', options: ['China', 'USA', 'Russia', 'Canada'], correctAnswer: 2 },
  { id: 'geo_e2', text: 'What is the capital of France?', category: 'Geography', difficulty: 'easy', options: ['Berlin', 'Madrid', 'Rome', 'Paris'], correctAnswer: 3 },
  { id: 'geo_e3', text: 'Which is the longest river in the world?', category: 'Geography', difficulty: 'easy', options: ['Amazon', 'Mississippi', 'Nile', 'Yangtze'], correctAnswer: 2 },
  { id: 'geo_e4', text: 'On which continent is the Sahara Desert located?', category: 'Geography', difficulty: 'easy', options: ['Asia', 'Australia', 'South America', 'Africa'], correctAnswer: 3 },
  { id: 'geo_e5', text: 'What is the smallest country in the world?', category: 'Geography', difficulty: 'easy', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], correctAnswer: 2 },
  // Medium
  { id: 'geo_m1', text: 'What is the capital of Australia?', category: 'Geography', difficulty: 'medium', options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'], correctAnswer: 3 },
  { id: 'geo_m2', text: 'Which country has the most natural lakes?', category: 'Geography', difficulty: 'medium', options: ['Russia', 'Canada', 'Finland', 'USA'], correctAnswer: 1 },
  { id: 'geo_m3', text: 'What is the tallest mountain in Africa?', category: 'Geography', difficulty: 'medium', options: ['Mount Kenya', 'Mount Kilimanjaro', 'Ras Dashen', 'Mount Elgon'], correctAnswer: 1 },
  { id: 'geo_m4', text: 'Which ocean is the largest?', category: 'Geography', difficulty: 'medium', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3 },
  { id: 'geo_m5', text: 'In which country is Machu Picchu located?', category: 'Geography', difficulty: 'medium', options: ['Bolivia', 'Chile', 'Peru', 'Ecuador'], correctAnswer: 2 },
  // Hard
  { id: 'geo_h1', text: 'What is the capital of Kazakhstan?', category: 'Geography', difficulty: 'hard', options: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'], correctAnswer: 1 },
  { id: 'geo_h2', text: 'Which country is home to the Namib Desert?', category: 'Geography', difficulty: 'hard', options: ['Botswana', 'Angola', 'Namibia', 'South Africa'], correctAnswer: 2 },
  { id: 'geo_h3', text: 'What is the deepest lake in the world?', category: 'Geography', difficulty: 'hard', options: ['Lake Tanganyika', 'Lake Superior', 'Lake Baikal', 'Caspian Sea'], correctAnswer: 2 },
  { id: 'geo_h4', text: 'Which strait separates Europe from Africa?', category: 'Geography', difficulty: 'hard', options: ['Bosphorus', 'Strait of Gibraltar', 'Strait of Messina', 'Dardanelles'], correctAnswer: 1 },
  { id: 'geo_h5', text: 'What is the capital of Bhutan?', category: 'Geography', difficulty: 'hard', options: ['Kathmandu', 'Thimphu', 'Dhaka', 'Colombo'], correctAnswer: 1 },
  // Expert
  { id: 'geo_x1', text: 'The Atacama Desert is primarily in which South American country?', category: 'Geography', difficulty: 'expert', options: ['Peru', 'Bolivia', 'Argentina', 'Chile'], correctAnswer: 3 },
  { id: 'geo_x2', text: 'Which African country has the most pyramids?', category: 'Geography', difficulty: 'expert', options: ['Egypt', 'Sudan', 'Ethiopia', 'Libya'], correctAnswer: 1 },
  { id: 'geo_x3', text: 'What is the name of the tectonic plate that primarily underlies the Pacific Ocean?', category: 'Geography', difficulty: 'expert', options: ['Pacific Plate', 'Nazca Plate', 'Philippine Plate', 'Cocos Plate'], correctAnswer: 0 },
  { id: 'geo_x4', text: 'The Mekong River does NOT flow through which country?', category: 'Geography', difficulty: 'expert', options: ['Vietnam', 'India', 'Cambodia', 'Laos'], correctAnswer: 1 },
  { id: 'geo_x5', text: 'Which is the highest navigable lake in the world?', category: 'Geography', difficulty: 'expert', options: ['Lake Titicaca', 'Lake Maracaibo', 'Issyk-Kul', 'Tso Moriri'], correctAnswer: 0 },

  // ===== HISTORY =====
  // Easy
  { id: 'his_e1', text: 'In which year did World War II end?', category: 'History', difficulty: 'easy', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2 },
  { id: 'his_e2', text: 'Who was the first President of the United States?', category: 'History', difficulty: 'easy', options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'Benjamin Franklin'], correctAnswer: 2 },
  { id: 'his_e3', text: 'The ancient wonder the Great Wall is located in which country?', category: 'History', difficulty: 'easy', options: ['Japan', 'India', 'China', 'Korea'], correctAnswer: 2 },
  { id: 'his_e4', text: 'Which civilization built the Pyramids of Giza?', category: 'History', difficulty: 'easy', options: ['Romans', 'Greeks', 'Mesopotamians', 'Egyptians'], correctAnswer: 3 },
  { id: 'his_e5', text: 'In which year did Christopher Columbus reach the Americas?', category: 'History', difficulty: 'easy', options: ['1388', '1492', '1512', '1620'], correctAnswer: 1 },
  // Medium
  { id: 'his_m1', text: 'The French Revolution began in what year?', category: 'History', difficulty: 'medium', options: ['1776', '1789', '1799', '1812'], correctAnswer: 1 },
  { id: 'his_m2', text: 'Who wrote the Communist Manifesto alongside Friedrich Engels?', category: 'History', difficulty: 'medium', options: ['Lenin', 'Stalin', 'Karl Marx', 'Trotsky'], correctAnswer: 2 },
  { id: 'his_m3', text: 'The Berlin Wall fell in which year?', category: 'History', difficulty: 'medium', options: ['1987', '1988', '1989', '1991'], correctAnswer: 2 },
  { id: 'his_m4', text: 'Which empire was ruled by Genghis Khan?', category: 'History', difficulty: 'medium', options: ['Ottoman', 'Mongol', 'Persian', 'Byzantine'], correctAnswer: 1 },
  { id: 'his_m5', text: 'The Battle of Hastings took place in which year?', category: 'History', difficulty: 'medium', options: ['1016', '1066', '1096', '1152'], correctAnswer: 1 },
  // Hard
  { id: 'his_h1', text: 'Which treaty ended World War I?', category: 'History', difficulty: 'hard', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Ghent', 'Treaty of Berlin'], correctAnswer: 1 },
  { id: 'his_h2', text: 'The Meiji Restoration of 1868 occurred in which country?', category: 'History', difficulty: 'hard', options: ['China', 'Korea', 'Japan', 'Vietnam'], correctAnswer: 2 },
  { id: 'his_h3', text: 'Who was the last Tsar of Russia?', category: 'History', difficulty: 'hard', options: ['Alexander III', 'Nicholas I', 'Nicholas II', 'Alexander II'], correctAnswer: 2 },
  { id: 'his_h4', text: 'The Peloponnesian War was fought between Athens and which city-state?', category: 'History', difficulty: 'hard', options: ['Corinth', 'Thebes', 'Sparta', 'Macedonia'], correctAnswer: 2 },
  { id: 'his_h5', text: 'Which Roman emperor converted the empire to Christianity?', category: 'History', difficulty: 'hard', options: ['Augustus', 'Nero', 'Constantine', 'Hadrian'], correctAnswer: 2 },
  // Expert
  { id: 'his_x1', text: 'The Defenestration of Prague (1618) sparked which major European conflict?', category: 'History', difficulty: 'expert', options: ['Thirty Years War', 'Hundred Years War', 'Seven Years War', 'War of Spanish Succession'], correctAnswer: 0 },
  { id: 'his_x2', text: 'Which Carthaginian general famously crossed the Alps with war elephants?', category: 'History', difficulty: 'expert', options: ['Hasdrubal', 'Hamilcar', 'Hannibal', 'Mago'], correctAnswer: 2 },
  { id: 'his_x3', text: 'The Sykes-Picot Agreement of 1916 primarily divided which region?', category: 'History', difficulty: 'expert', options: ['Africa', 'Central Asia', 'Eastern Europe', 'The Middle East'], correctAnswer: 3 },
  { id: 'his_x4', text: 'Which Byzantine emperor issued the Corpus Juris Civilis legal code?', category: 'History', difficulty: 'expert', options: ['Theodosius', 'Justinian I', 'Constantine XI', 'Basil II'], correctAnswer: 1 },
  { id: 'his_x5', text: 'The Scramble for Africa was primarily initiated at which 1884-85 conference?', category: 'History', difficulty: 'expert', options: ['Berlin Conference', 'Vienna Congress', 'Paris Conference', 'Brussels Conference'], correctAnswer: 0 },

  // ===== TECHNOLOGY =====
  // Easy
  { id: 'tec_e1', text: 'What does "CPU" stand for?', category: 'Technology', difficulty: 'easy', options: ['Central Processing Unit', 'Computer Power Unit', 'Core Processing Unit', 'Central Program Utility'], correctAnswer: 0 },
  { id: 'tec_e2', text: 'What does "HTML" stand for?', category: 'Technology', difficulty: 'easy', options: ['HyperText Markup Language', 'High-Tech Modern Language', 'HyperText Modern Layout', 'Hyper Transfer Markup Language'], correctAnswer: 0 },
  { id: 'tec_e3', text: 'Who founded Microsoft?', category: 'Technology', difficulty: 'easy', options: ['Steve Jobs', 'Elon Musk', 'Bill Gates', 'Mark Zuckerberg'], correctAnswer: 2 },
  { id: 'tec_e4', text: 'What does "URL" stand for?', category: 'Technology', difficulty: 'easy', options: ['Uniform Resource Locator', 'Universal Resource Link', 'Uniform Reference Locator', 'Universal Remote Locator'], correctAnswer: 0 },
  { id: 'tec_e5', text: 'What does "RAM" stand for?', category: 'Technology', difficulty: 'easy', options: ['Read Access Memory', 'Random Access Memory', 'Rapid Access Module', 'Remote Access Memory'], correctAnswer: 1 },
  // Medium
  { id: 'tec_m1', text: 'What programming language is primarily used for Android app development?', category: 'Technology', difficulty: 'medium', options: ['Swift', 'Python', 'Kotlin', 'JavaScript'], correctAnswer: 2 },
  { id: 'tec_m2', text: 'What does "SQL" stand for?', category: 'Technology', difficulty: 'medium', options: ['System Query Language', 'Structured Query Language', 'Sequential Query Logic', 'Standard Query Lookup'], correctAnswer: 1 },
  { id: 'tec_m3', text: 'In networking, what does "IP" stand for in "IP address"?', category: 'Technology', difficulty: 'medium', options: ['Internet Protocol', 'Internal Port', 'Integrated Pathway', 'Internet Port'], correctAnswer: 0 },
  { id: 'tec_m4', text: 'Which company developed the Python programming language?', category: 'Technology', difficulty: 'medium', options: ['Google', 'Microsoft', 'It was created by Guido van Rossum independently', 'IBM'], correctAnswer: 2 },
  { id: 'tec_m5', text: 'What does "GPU" stand for?', category: 'Technology', difficulty: 'medium', options: ['General Processing Unit', 'Graphical Program Utility', 'Graphics Processing Unit', 'Global Processing Unit'], correctAnswer: 2 },
  // Hard
  { id: 'tec_h1', text: 'What is the time complexity of a binary search algorithm?', category: 'Technology', difficulty: 'hard', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], correctAnswer: 2 },
  { id: 'tec_h2', text: 'In computer science, what does "LIFO" stand for?', category: 'Technology', difficulty: 'hard', options: ['Last In First Out', 'Linear Input First Output', 'Last Input File Operation', 'Linked Input Flow Order'], correctAnswer: 0 },
  { id: 'tec_h3', text: 'Which data structure uses pointers to connect nodes?', category: 'Technology', difficulty: 'hard', options: ['Array', 'Linked List', 'Stack', 'Queue'], correctAnswer: 1 },
  { id: 'tec_h4', text: 'What is a "hash collision" in computer science?', category: 'Technology', difficulty: 'hard', options: ['When RAM overflows', 'When two inputs produce the same hash output', 'When the CPU overheats', 'A network connection failure'], correctAnswer: 1 },
  { id: 'tec_h5', text: 'What does "REST" stand for in web APIs?', category: 'Technology', difficulty: 'hard', options: ['Remote Execution State Transfer', 'Representational State Transfer', 'Resource Entity State Transaction', 'Remote State Transfer'], correctAnswer: 1 },
  // Expert
  { id: 'tec_x1', text: 'In cryptography, what is the RSA algorithm primarily based on?', category: 'Technology', difficulty: 'expert', options: ['Discrete logarithm problem', 'Elliptic curve mathematics', 'Difficulty of factoring large prime products', 'Symmetric key exchange'], correctAnswer: 2 },
  { id: 'tec_x2', text: 'Which sorting algorithm has the best average-case time complexity?', category: 'Technology', difficulty: 'expert', options: ['Bubble Sort O(n²)', 'Merge Sort O(n log n)', 'Insertion Sort O(n²)', 'Selection Sort O(n²)'], correctAnswer: 1 },
  { id: 'tec_x3', text: 'What does the CAP theorem state in distributed systems?', category: 'Technology', difficulty: 'expert', options: ['A system can have unlimited performance', 'You can have at most 2 of: Consistency, Availability, Partition Tolerance', 'All 3 C/A/P are always achievable', 'Consistency always beats Availability'], correctAnswer: 1 },
  { id: 'tec_x4', text: 'In machine learning, what does "backpropagation" compute?', category: 'Technology', difficulty: 'expert', options: ['Forward pass outputs', 'Gradients of the loss with respect to weights', 'Data normalization values', 'Hyperparameter tuning results'], correctAnswer: 1 },
  { id: 'tec_x5', text: 'Which consensus algorithm does Bitcoin use?', category: 'Technology', difficulty: 'expert', options: ['Proof of Stake', 'Delegated Proof of Stake', 'Proof of Work', 'Byzantine Fault Tolerance'], correctAnswer: 2 },

  // ===== MATHEMATICS =====
  // Easy
  { id: 'mat_e1', text: 'What is 15% of 200?', category: 'Mathematics', difficulty: 'easy', options: ['25', '30', '35', '40'], correctAnswer: 1 },
  { id: 'mat_e2', text: 'What is the square root of 144?', category: 'Mathematics', difficulty: 'easy', options: ['11', '12', '13', '14'], correctAnswer: 1 },
  { id: 'mat_e3', text: 'How many degrees are in a right angle?', category: 'Mathematics', difficulty: 'easy', options: ['45°', '60°', '90°', '180°'], correctAnswer: 2 },
  { id: 'mat_e4', text: 'What is 2 to the power of 10?', category: 'Mathematics', difficulty: 'easy', options: ['512', '1000', '1024', '2048'], correctAnswer: 2 },
  { id: 'mat_e5', text: 'What is the value of π (pi) to two decimal places?', category: 'Mathematics', difficulty: 'easy', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1 },
  // Medium
  { id: 'mat_m1', text: 'If a triangle has angles of 45° and 65°, what is the third angle?', category: 'Mathematics', difficulty: 'medium', options: ['60°', '65°', '70°', '75°'], correctAnswer: 2 },
  { id: 'mat_m2', text: 'What is the derivative of x² with respect to x?', category: 'Mathematics', difficulty: 'medium', options: ['x', '2x', 'x²', '2x²'], correctAnswer: 1 },
  { id: 'mat_m3', text: 'What is the formula for the area of a circle?', category: 'Mathematics', difficulty: 'medium', options: ['2πr', 'πr²', '4πr²', 'πd'], correctAnswer: 1 },
  { id: 'mat_m4', text: 'Solve for x: 3x + 7 = 22', category: 'Mathematics', difficulty: 'medium', options: ['3', '4', '5', '6'], correctAnswer: 2 },
  { id: 'mat_m5', text: 'What is the sum of interior angles of a hexagon?', category: 'Mathematics', difficulty: 'medium', options: ['540°', '660°', '720°', '900°'], correctAnswer: 2 },
  // Hard
  { id: 'mat_h1', text: 'What is the integral of sin(x) dx?', category: 'Mathematics', difficulty: 'hard', options: ['cos(x) + C', '-cos(x) + C', 'sin(x) + C', '-sin(x) + C'], correctAnswer: 1 },
  { id: 'mat_h2', text: 'What is the 10th Fibonacci number?', category: 'Mathematics', difficulty: 'hard', options: ['34', '55', '89', '21'], correctAnswer: 1 },
  { id: 'mat_h3', text: 'In probability, two fair dice are rolled. What is P(sum = 7)?', category: 'Mathematics', difficulty: 'hard', options: ['1/6', '1/8', '5/36', '7/36'], correctAnswer: 0 },
  { id: 'mat_h4', text: 'What is the determinant of the 2×2 matrix [[3,2],[1,4]]?', category: 'Mathematics', difficulty: 'hard', options: ['8', '10', '12', '14'], correctAnswer: 1 },
  { id: 'mat_h5', text: 'Euler\'s formula e^(iπ) + 1 = ?', category: 'Mathematics', difficulty: 'hard', options: ['1', '-1', '0', 'i'], correctAnswer: 2 },
  // Expert
  { id: 'mat_x1', text: 'The Basel problem (sum of 1/n² from n=1 to ∞) equals?', category: 'Mathematics', difficulty: 'expert', options: ['π/6', 'π²/6', 'π²/12', 'π/4'], correctAnswer: 1 },
  { id: 'mat_x2', text: 'What is the Riemann Hypothesis about?', category: 'Mathematics', difficulty: 'expert', options: ['Prime gaps', 'Non-trivial zeros of the Riemann zeta function lying on the critical line', 'Infinite series convergence', 'Elliptic curve properties'], correctAnswer: 1 },
  { id: 'mat_x3', text: 'In group theory, a group where ab = ba for all elements is called?', category: 'Mathematics', difficulty: 'expert', options: ['Cyclic', 'Normal', 'Abelian', 'Simple'], correctAnswer: 2 },
  { id: 'mat_x4', text: 'What is the order of the Monster Group?', category: 'Mathematics', difficulty: 'expert', options: ['A number with 54 digits', 'A number with 39 digits', 'A prime number', 'Exactly 10^100'], correctAnswer: 0 },
  { id: 'mat_x5', text: 'Fermat\'s Last Theorem states there are no integer solutions for xⁿ + yⁿ = zⁿ when n is...', category: 'Mathematics', difficulty: 'expert', options: ['Any even number', 'Greater than 2', 'Greater than 10', 'Any prime number'], correctAnswer: 1 },

  // ===== GENERAL KNOWLEDGE =====
  // Easy
  { id: 'gnk_e1', text: 'How many colors are in a rainbow?', category: 'General Knowledge', difficulty: 'easy', options: ['5', '6', '7', '8'], correctAnswer: 2 },
  { id: 'gnk_e2', text: 'What is the fastest land animal?', category: 'General Knowledge', difficulty: 'easy', options: ['Lion', 'Cheetah', 'Horse', 'Greyhound'], correctAnswer: 1 },
  { id: 'gnk_e3', text: 'How many sides does a hexagon have?', category: 'General Knowledge', difficulty: 'easy', options: ['5', '6', '7', '8'], correctAnswer: 1 },
  { id: 'gnk_e4', text: 'What is the currency of Japan?', category: 'General Knowledge', difficulty: 'easy', options: ['Won', 'Yuan', 'Yen', 'Baht'], correctAnswer: 2 },
  { id: 'gnk_e5', text: 'In which sport is a "hole-in-one" achieved?', category: 'General Knowledge', difficulty: 'easy', options: ['Tennis', 'Golf', 'Cricket', 'Baseball'], correctAnswer: 1 },
  // Medium
  { id: 'gnk_m1', text: 'What is the national animal of Canada?', category: 'General Knowledge', difficulty: 'medium', options: ['Moose', 'Grizzly Bear', 'Beaver', 'Caribou'], correctAnswer: 2 },
  { id: 'gnk_m2', text: 'Who painted the "Mona Lisa"?', category: 'General Knowledge', difficulty: 'medium', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'], correctAnswer: 2 },
  { id: 'gnk_m3', text: 'In which city are the headquarters of the United Nations?', category: 'General Knowledge', difficulty: 'medium', options: ['Geneva', 'Brussels', 'Washington D.C.', 'New York'], correctAnswer: 3 },
  { id: 'gnk_m4', text: 'What element has the chemical symbol "Au"?', category: 'General Knowledge', difficulty: 'medium', options: ['Silver', 'Gold', 'Aluminum', 'Argon'], correctAnswer: 1 },
  { id: 'gnk_m5', text: 'How many bones are in the adult human body?', category: 'General Knowledge', difficulty: 'medium', options: ['186', '196', '206', '216'], correctAnswer: 2 },
  // Hard
  { id: 'gnk_h1', text: 'The Nobel Prize is NOT awarded in which field?', category: 'General Knowledge', difficulty: 'hard', options: ['Physics', 'Mathematics', 'Literature', 'Peace'], correctAnswer: 1 },
  { id: 'gnk_h2', text: 'What is the only flag with a different design on its obverse and reverse?', category: 'General Knowledge', difficulty: 'hard', options: ['Nepal', 'Vatican', 'Paraguay', 'Switzerland'], correctAnswer: 2 },
  { id: 'gnk_h3', text: 'What is the Coriolis Effect?', category: 'General Knowledge', difficulty: 'hard', options: ['The deflection of objects due to Earth\'s rotation', 'The bending of light near massive objects', 'The movement of tectonic plates', 'The effect of tides on coastlines'], correctAnswer: 0 },
  { id: 'gnk_h4', text: 'The Beaufort Scale measures what?', category: 'General Knowledge', difficulty: 'hard', options: ['Earthquake intensity', 'Ocean depth', 'Wind speed', 'River flow rate'], correctAnswer: 2 },
  { id: 'gnk_h5', text: 'What does "POTUS" stand for?', category: 'General Knowledge', difficulty: 'hard', options: ['Parliamentary Official of the United States', 'President of the United States', 'Power of the United States', 'Principal Officer of the United States'], correctAnswer: 1 },
  // Expert
  { id: 'gnk_x1', text: 'The Overton Window refers to what concept?', category: 'General Knowledge', difficulty: 'expert', options: ['A type of architectural window', 'The range of policies politically acceptable to the mainstream population', 'A phenomenon in quantum mechanics', 'A military tactical concept'], correctAnswer: 1 },
  { id: 'gnk_x2', text: 'Who developed the concept of "Six Degrees of Separation"?', category: 'General Knowledge', difficulty: 'expert', options: ['Stanley Milgram', 'Frigyes Karinthy', 'Duncan Watts', 'Albert-László Barabási'], correctAnswer: 1 },
  { id: 'gnk_x3', text: 'In philosophy, what is "Occam\'s Razor"?', category: 'General Knowledge', difficulty: 'expert', options: ['Simplest explanation is most likely correct', 'All assumptions must be tested empirically', 'Moral decisions are relative to culture', 'Consciousness cannot be reduced to physics'], correctAnswer: 0 },
  { id: 'gnk_x4', text: 'What is the Dunning-Kruger effect?', category: 'General Knowledge', difficulty: 'expert', options: ['More knowledge leads to more confidence', 'People with limited knowledge tend to overestimate their competence', 'Experts always perform better under pressure', 'Group decisions are always superior to individual ones'], correctAnswer: 1 },
  { id: 'gnk_x5', text: 'The Flynn Effect describes which phenomenon?', category: 'General Knowledge', difficulty: 'expert', options: ['Declining literacy rates globally', 'Rising average IQ scores over time', 'Increasing height of the human population', 'Growing political polarization'], correctAnswer: 1 },

  // ===== NATURE =====
  // Easy
  { id: 'nat_e1', text: 'What is the largest living structure on Earth?', category: 'Nature', difficulty: 'easy', options: ['Amazon Rainforest', 'Great Barrier Reef', 'Sahara Desert', 'The Himalayas'], correctAnswer: 1 },
  { id: 'nat_e2', text: 'What do caterpillars transform into?', category: 'Nature', difficulty: 'easy', options: ['Beetles', 'Moths or Butterflies', 'Dragonflies', 'Bees'], correctAnswer: 1 },
  { id: 'nat_e3', text: 'What is the tallest type of grass?', category: 'Nature', difficulty: 'easy', options: ['Sugarcane', 'Bamboo', 'Corn', 'Wheat'], correctAnswer: 1 },
  { id: 'nat_e4', text: 'Which planet is known as the Red Planet?', category: 'Nature', difficulty: 'easy', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctAnswer: 2 },
  { id: 'nat_e5', text: 'How many legs does a spider have?', category: 'Nature', difficulty: 'easy', options: ['6', '8', '10', '12'], correctAnswer: 1 },
  // Medium
  { id: 'nat_m1', text: 'What is the process by which water vapor turns into liquid water?', category: 'Nature', difficulty: 'medium', options: ['Evaporation', 'Sublimation', 'Condensation', 'Precipitation'], correctAnswer: 2 },
  { id: 'nat_m2', text: 'Which animal has the longest gestation period?', category: 'Nature', difficulty: 'medium', options: ['Blue Whale', 'Elephant', 'Giraffe', 'Rhinoceros'], correctAnswer: 1 },
  { id: 'nat_m3', text: 'What type of tree produces acorns?', category: 'Nature', difficulty: 'medium', options: ['Maple', 'Pine', 'Elm', 'Oak'], correctAnswer: 3 },
  { id: 'nat_m4', text: 'What is the term for an animal that eats only plants?', category: 'Nature', difficulty: 'medium', options: ['Omnivore', 'Carnivore', 'Herbivore', 'Detritivore'], correctAnswer: 2 },
  { id: 'nat_m5', text: 'The Amazon rainforest produces approximately what percentage of Earth\'s oxygen?', category: 'Nature', difficulty: 'medium', options: ['10%', '20%', '30%', '40%'], correctAnswer: 1 },
  // Hard
  { id: 'nat_h1', text: 'What is the scientific term for the study of fungi?', category: 'Nature', difficulty: 'hard', options: ['Botany', 'Mycology', 'Phycology', 'Entomology'], correctAnswer: 1 },
  { id: 'nat_h2', text: 'What is the Milankovitch cycle?', category: 'Nature', difficulty: 'hard', options: ['Ocean current patterns', 'Periodic variations in Earth\'s orbit affecting climate', 'Volcanic eruption cycles', 'Magnetic pole reversal patterns'], correctAnswer: 1 },
  { id: 'nat_h3', text: 'Which gas is responsible for the greenhouse effect primarily?', category: 'Nature', difficulty: 'hard', options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'], correctAnswer: 2 },
  { id: 'nat_h4', text: 'What is symbiosis in ecology?', category: 'Nature', difficulty: 'hard', options: ['Competition between species', 'Long-term close interaction between different organisms', 'Predator-prey relationships only', 'Migration patterns of birds'], correctAnswer: 1 },
  { id: 'nat_h5', text: 'What is the term for the zone of transition between two biomes?', category: 'Nature', difficulty: 'hard', options: ['Ecotone', 'Biosphere', 'Lithosphere', 'Thermocline'], correctAnswer: 0 },
  // Expert
  { id: 'nat_x1', text: 'The Krebs cycle (citric acid cycle) occurs in which part of the cell?', category: 'Nature', difficulty: 'expert', options: ['Nucleus', 'Endoplasmic reticulum', 'Cytoplasm', 'Mitochondrial matrix'], correctAnswer: 3 },
  { id: 'nat_x2', text: 'What is "quorum sensing" in microbiology?', category: 'Nature', difficulty: 'expert', options: ['Bacterial cell division rate', 'Chemical signaling that allows bacteria to coordinate behavior based on population density', 'Antibiotic resistance mechanism', 'Viral replication process'], correctAnswer: 1 },
  { id: 'nat_x3', text: 'Which plant hormone primarily promotes cell elongation?', category: 'Nature', difficulty: 'expert', options: ['Cytokinin', 'Ethylene', 'Abscisic acid', 'Auxin'], correctAnswer: 3 },
  { id: 'nat_x4', text: 'The albedo of an object describes its...', category: 'Nature', difficulty: 'expert', options: ['Magnetic field strength', 'Chemical composition', 'Ratio of reflected radiation to incident radiation', 'Thermal conductivity'], correctAnswer: 2 },
  { id: 'nat_x5', text: 'In evolutionary biology, what is "inclusive fitness"?', category: 'Nature', difficulty: 'expert', options: ['Personal survival and reproduction only', 'An organism\'s reproductive success plus its effect on relatives\' reproduction weighted by relatedness', 'The fitness of the entire species', 'Fitness under optimal environmental conditions'], correctAnswer: 1 },

  // ===== ENTERTAINMENT =====
  // Easy
  { id: 'ent_e1', text: 'Who played Iron Man in the Marvel Cinematic Universe?', category: 'Entertainment', difficulty: 'easy', options: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'], correctAnswer: 2 },
  { id: 'ent_e2', text: 'What animated film features the songs "Let It Go"?', category: 'Entertainment', difficulty: 'easy', options: ['Tangled', 'Brave', 'Moana', 'Frozen'], correctAnswer: 3 },
  { id: 'ent_e3', text: 'Which band performed "Bohemian Rhapsody"?', category: 'Entertainment', difficulty: 'easy', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Rolling Stones'], correctAnswer: 2 },
  { id: 'ent_e4', text: 'In the Harry Potter series, what is the name of Harry\'s owl?', category: 'Entertainment', difficulty: 'easy', options: ['Crookshanks', 'Hedwig', 'Pigwidgeon', 'Errol'], correctAnswer: 1 },
  { id: 'ent_e5', text: 'How many Academy Awards did Titanic (1997) win?', category: 'Entertainment', difficulty: 'easy', options: ['9', '11', '13', '15'], correctAnswer: 1 },
  // Medium
  { id: 'ent_m1', text: 'Who directed "The Dark Knight" trilogy?', category: 'Entertainment', difficulty: 'medium', options: ['Tim Burton', 'Joel Schumacher', 'Christopher Nolan', 'Zack Snyder'], correctAnswer: 2 },
  { id: 'ent_m2', text: 'In Game of Thrones, who sits on the Iron Throne at the end of the series?', category: 'Entertainment', difficulty: 'medium', options: ['Jon Snow', 'Daenerys Targaryen', 'Cersei Lannister', 'Bran Stark'], correctAnswer: 3 },
  { id: 'ent_m3', text: 'Which artist holds the record for the most Grammy wins?', category: 'Entertainment', difficulty: 'medium', options: ['Jay-Z', 'Adele', 'Beyoncé', 'Taylor Swift'], correctAnswer: 2 },
  { id: 'ent_m4', text: 'In which fictional universe does the character "The Mandalorian" exist?', category: 'Entertainment', difficulty: 'medium', options: ['Star Trek', 'Star Wars', 'Mass Effect', 'Dune'], correctAnswer: 1 },
  { id: 'ent_m5', text: 'What video game franchise features the character "Master Chief"?', category: 'Entertainment', difficulty: 'medium', options: ['Call of Duty', 'Doom', 'Halo', 'Gears of War'], correctAnswer: 2 },
  // Hard
  { id: 'ent_h1', text: 'Which Kubrick film is based on a Stephen King novel?', category: 'Entertainment', difficulty: 'hard', options: ['2001: A Space Odyssey', 'A Clockwork Orange', 'The Shining', 'Full Metal Jacket'], correctAnswer: 2 },
  { id: 'ent_h2', text: 'Who composed the original score for Star Wars?', category: 'Entertainment', difficulty: 'hard', options: ['Hans Zimmer', 'John Williams', 'Ennio Morricone', 'James Horner'], correctAnswer: 1 },
  { id: 'ent_h3', text: 'The TV series "Breaking Bad" is primarily set in which US city?', category: 'Entertainment', difficulty: 'hard', options: ['Phoenix', 'Las Vegas', 'Albuquerque', 'El Paso'], correctAnswer: 2 },
  { id: 'ent_h4', text: 'Which Radiohead album is considered one of the greatest of all time and features "Karma Police"?', category: 'Entertainment', difficulty: 'hard', options: ['The Bends', 'Pablo Honey', 'Kid A', 'OK Computer'], correctAnswer: 3 },
  { id: 'ent_h5', text: 'Who wrote the novel "1984" (Nineteen Eighty-Four)?', category: 'Entertainment', difficulty: 'hard', options: ['Aldous Huxley', 'Ray Bradbury', 'George Orwell', 'H.G. Wells'], correctAnswer: 2 },
  // Expert
  { id: 'ent_x1', text: 'The Dogme 95 movement in filmmaking was founded by which director?', category: 'Entertainment', difficulty: 'expert', options: ['Werner Herzog', 'Lars von Trier', 'Jean-Luc Godard', 'Ingmar Bergman'], correctAnswer: 1 },
  { id: 'ent_x2', text: 'In music theory, a "tritone" is an interval spanning how many semitones?', category: 'Entertainment', difficulty: 'expert', options: ['4', '5', '6', '7'], correctAnswer: 2 },
  { id: 'ent_x3', text: 'Akira Kurosawa\'s film "Rashomon" (1950) is famous for pioneering which narrative technique?', category: 'Entertainment', difficulty: 'expert', options: ['Non-linear chronology', 'Fourth wall breaking', 'Multiple contradictory perspectives of the same event', 'Real-time storytelling'], correctAnswer: 2 },
  { id: 'ent_x4', text: 'The literary technique "stream of consciousness" is most associated with which author?', category: 'Entertainment', difficulty: 'expert', options: ['Ernest Hemingway', 'James Joyce', 'F. Scott Fitzgerald', 'T.S. Eliot'], correctAnswer: 1 },
  { id: 'ent_x5', text: 'What is the time signature of Dave Brubeck\'s famous jazz composition "Take Five"?', category: 'Entertainment', difficulty: 'expert', options: ['3/4', '4/4', '5/4', '7/8'], correctAnswer: 2 },
];
