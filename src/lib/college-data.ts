export type CollegePlacement = {
  highestPackage?: string | null;
  medianPackage?: string | null;
  recruiters?: string[];
  internshipRate?: string | null;
};

export type CollegeReview = {
  author: string;
  role: string;
  rating: number | null;
  quote: string;
};

export type College = {
  slug: string;
  name: string;
  location: string;
  feesText: string;
  feesValue: number;
  rating: number | null;
  image: string | null;
  overview: string;
  highlights: string[];
  courses: string[];
  placement: CollegePlacement;
  reviews: CollegeReview[];
};

export const collegeData: College[] = [
  { slug: 'iit-bombay', name: 'Indian Institute of Technology Bombay', location: 'Mumbai, Maharashtra', feesText: '₹2.3 LPA', feesValue: 230000, rating: 4.8, image: 'https://placehold.co/1400x900/07111f/d5f8eb', overview: 'A consistently top-ranked engineering institution known for innovation, strong industry ties, and a campus culture that rewards experimentation.', highlights: ['Premier engineering brand', 'Strong startup ecosystem', 'Top recruiter network'], courses: ['B.Tech', 'M.Tech', 'Dual Degree', 'PhD'], placement: { highestPackage: '₹1.3 Cr', medianPackage: '₹23.5 LPA', recruiters: ['Google', 'Microsoft', 'Apple', 'Goldman Sachs'], internshipRate: '92%' }, reviews: [{ author: 'Aarav Sharma', role: 'Computer Engineering, 2025', rating: 5, quote: 'The peer group and projects here push you hard, but the placements and research exposure make it worth it.' }] },
  { slug: 'vit-vellore', name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', feesText: '₹1.9 LPA', feesValue: 190000, rating: 4.3, image: 'https://placehold.co/1400x900/0c1728/1bbf89', overview: 'A large-scale private university with broad course choices, structured academics, and strong participation in national-level coding and design events.', highlights: ['Large campus', 'Broad program range', 'Active student clubs'], courses: ['B.Tech', 'MCA', 'MBA', 'M.Tech'], placement: { highestPackage: '₹88 LPA', medianPackage: '₹8.4 LPA', recruiters: ['Amazon', 'Infosys', 'Cisco', 'Deloitte'], internshipRate: '86%' }, reviews: [{ author: 'Karan Mehta', role: 'Software Engineering, 2025', rating: 4, quote: 'You get many opportunities here if you stay proactive and build consistently from the first year.' }] },
  { slug: 'bits-pilani', name: 'BITS Pilani', location: 'Pilani, Rajasthan', feesText: '₹5.8 LPA', feesValue: 580000, rating: 4.7, image: 'https://placehold.co/1400x900/14243a/d7a21b', overview: 'A rigorous, industry-forward campus known for flexible academics, strong alumni support, and a culture that values product thinking.', highlights: ['Flexible academics', 'Strong alumni network', 'Product-driven projects'], courses: ['B.E.', 'M.Sc.', 'MBA', 'PhD'], placement: { highestPackage: '₹60.7 LPA', medianPackage: '₹18.9 LPA', recruiters: ['Adobe', 'NVIDIA', 'Flipkart', 'McKinsey'], internshipRate: '89%' }, reviews: [{ author: 'Ritika Agarwal', role: 'Mechanical Engineering, 2024', rating: 5, quote: 'The workload is intense, but the flexibility and alumni help are incredibly valuable.' }] },
  { slug: 'christ-university', name: 'Christ University', location: 'Bengaluru, Karnataka', feesText: '₹3.1 LPA', feesValue: 310000, rating: 4.2, image: null, overview: 'Known for disciplined academics, a polished campus experience, and strong commerce, management, and media programs.', highlights: ['Balanced academics', 'Modern campus life', 'Industry-oriented programs'], courses: ['BBA', 'B.Com', 'MBA', 'BCA'], placement: { highestPackage: '₹21 LPA', medianPackage: '₹7.2 LPA', recruiters: ['KPMG', 'EY', 'Deloitte', 'HDFC'], internshipRate: '79%' }, reviews: [{ author: 'Meera Nair', role: 'BBA, 2025', rating: 4, quote: 'The structure is strict, but it helps you stay focused and job-ready.' }] },
  { slug: 'nit-trichy', name: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu', feesText: '₹1.5 LPA', feesValue: 150000, rating: 4.6, image: 'https://placehold.co/1400x900/14243a/ffffff', overview: 'A high-value public institute with excellent engineering outcomes, active student societies, and dependable placements across branches.', highlights: ['Best ROI', 'Strong campus culture', 'Reliable placements'], courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'], placement: { highestPackage: '₹52 LPA', medianPackage: '₹14.1 LPA', recruiters: ['Intel', 'L&T', 'TCS', 'Bosch'], internshipRate: '91%' }, reviews: [{ author: 'Arjun Das', role: 'Instrumentation, 2024', rating: 5, quote: 'If you want solid academics plus strong returns for the fee, this is one of the best options.' }] },
  { slug: 'symbiosis-pune', name: 'Symbiosis Institute of Business Management', location: 'Pune, Maharashtra', feesText: '₹8.4 LPA', feesValue: 840000, rating: 4.4, image: 'https://placehold.co/1400x900/0c1728/ffebbf', overview: 'A premium management institute with polished corporate connections, case-based learning, and strong campus recruitment support.', highlights: ['Corporate focus', 'Case-learning culture', 'Strong alumni base'], courses: ['MBA', 'Executive MBA', 'PhD'], placement: { highestPackage: '₹38 LPA', medianPackage: '₹14.8 LPA', recruiters: ['BCG', 'PwC', 'Nestle', 'Mahindra'], internshipRate: '84%' }, reviews: [{ author: 'Shreya Kulkarni', role: 'MBA, 2025', rating: 4, quote: 'The exposure is premium and the case discussions sharpen your business thinking every week.' }] },
  { slug: 'st-xaviers-mumbai', name: "St. Xavier's College", location: 'Mumbai, Maharashtra', feesText: '₹1.2 LPA', feesValue: 120000, rating: null, image: 'https://placehold.co/1400x900/07111f/d5f8eb', overview: 'A legacy institution with excellent arts, commerce, and science programs, plus a distinctly vibrant city-campus experience.', highlights: ['Legacy reputation', 'City-center campus', 'Strong academic culture'], courses: ['BA', 'B.Com', 'B.Sc', 'M.Sc'], placement: { highestPackage: null, medianPackage: null, recruiters: ['Grant Thornton', 'TCS', 'Schbang'], internshipRate: null }, reviews: [{ author: 'Aisha Khan', role: 'Commerce, 2024', rating: null, quote: 'The college feels alive every day, and the peer energy is one of its biggest strengths.' }] },
  { slug: 'amity-noida', name: 'Amity University Noida', location: 'Noida, Uttar Pradesh', feesText: '₹2.8 LPA', feesValue: 280000, rating: 4.0, image: 'https://placehold.co/1400x900/14243a/1bbf89', overview: 'A large, feature-rich private campus with many streams, vibrant student life, and broad placement outreach.', highlights: ['Large campus', 'Diverse programs', 'Wide recruiter outreach'], courses: ['B.Tech', 'BBA', 'MBA', 'MCA'], placement: { highestPackage: '₹61 LPA', medianPackage: '₹6.8 LPA', recruiters: ['Accenture', 'Capgemini', 'Adobe', 'Flipkart'], internshipRate: '75%' }, reviews: [{ author: 'Dev Patel', role: 'CSE, 2025', rating: 4, quote: 'If you engage with clubs and internships early, the campus gives you a strong launchpad.' }] },
  { slug: 'presidency-bengaluru', name: 'Presidency University', location: 'Bengaluru, Karnataka', feesText: '₹2.0 LPA', feesValue: 200000, rating: 3.9, image: 'https://placehold.co/1400x900/0c1728/d7a21b', overview: 'A growing university with a practical curriculum, professional exposure, and accessible fee structure.', highlights: ['Practical curriculum', 'Accessible fee structure', 'Growing employer interest'], courses: ['B.Tech', 'BBA', 'B.Com', 'MCA'], placement: { highestPackage: '₹18 LPA', medianPackage: '₹5.3 LPA', recruiters: ['Wipro', 'TCS', 'Infosys'], internshipRate: '72%' }, reviews: [{ author: 'Pooja Reddy', role: 'BBA, 2024', rating: 4, quote: 'A sensible choice for students who want structure and an affordable route into professional roles.' }] }
];

export const getCollegeBySlug = (slug: string) => collegeData.find((college) => college.slug === slug) ?? null;

export const getLocations = () => Array.from(new Set(collegeData.map((college) => college.location))).sort();