export interface TeamMember {
  department: string;
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
  linkedin: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  // ─────────────────────────────────────────
  // LEADERSHIP DEPT
  // ─────────────────────────────────────────

  {
    department: "Leadership Dept",
    id: "varsha-gaikwad",
    name: "Dr. Varsha Gaikwad",
    role: "Faculty Coordinator",
    bio: "Guiding the AWS Student Builder Group and supporting student initiatives at GCOEK.",
    skills: ["Mentorship", "Leadership", "Cloud Computing"],
    email: "",
    linkedin: "",
    image: "https://i.ibb.co/xqY0bSS3/Varsha-maam.jpg",
  },

  {
    department: "Leadership Dept",
    id: "shardul-kolekar",
    name: "Shardul Kolekar",
    role: "Captain (President)",
    bio: "Leading the AWS Student Builder Group with a vision to build a strong cloud computing community at GCOEK. Passionate about serverless architectures and cloud-native development.",
    skills: [
      "AWS",
      "Leadership",
      "Cloud Architecture",
      "Serverless",
      "React",
      "Node.js",
    ],
    email: "kolekarshardul23@gmail.com",
    linkedin: "https://www.linkedin.com/in/shardulkolekar",
    image:
      "https://i.ibb.co/YBzRTFVx/Chat-GPT-Image-Sep-4-2026-12-34-54-PM.png",
  },

  {
    department: "Leadership Dept",
    id: "apeksha",
    name: "Apeksha Khodave",
    role: "Vice President",
    bio: "Supporting the President in club leadership, coordinating activities, and helping drive the club’s growth and initiatives.",
    skills: ["Leadership", "Event Coordination", "Team Management"],
    email: "apekshakhodave1106@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/apeksha-khodave-9644b32b9?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "https://i.ibb.co/tw7N7xCJ/Apeksha-Khodave.jpg",
  },

  {
    department: "Leadership Dept",
    id: "vidula",
    name: "Vidula Powar",
    role: "General Secretary",
    bio: "Managing club operations and ensuring smooth execution of all activities.",
    skills: ["Operations", "Communication", "Event Management"],
    email: "powarvidula11@gmail.com",
    linkedin: "https://www.linkedin.com/in/vidula-p-372734294",
    image:
      "https://i.ibb.co/5W0h4c8y/Whats-App-Image-2026-03-17-at-9-01-47-AM.jpg",
  },

  {
    department: "Leadership Dept",
    id: "gopal",
    name: "Gopal Lakwal",
    role: "Joint Secretary",
    bio: "Supporting the General Secretary in daily club operations.",
    skills: ["Management", "Coordination"],
    email: "gopallakwal526@gmail.com",
    linkedin: "https://www.linkedin.com/in/gopal-lakwal-461467383",
    image:
      "https://i.ibb.co/4wBwTHtx/file-000000002ef871fab1e8c53a2708be68-Gopal-lakwal.png",
  },

  {
    department: "Leadership Dept",
    id: "shubham",
    name: "Shubham Sonwane",
    role: "Joint Secretary",
    bio: "Supporting the General Secretary in daily club operations.",
    skills: ["Management", "Coordination"],
    email: "sonwaneshubham38@gmail.com",
    linkedin: "https://www.linkedin.com/in/shubham-sonwane-b9b056312",
    image:
      "https://i.ibb.co/LDDfM6hn/Gemini-Generated-Image-nbpxu8nbpxu8nbpx-Shubham-Sonwane.png",
  },

  // ─────────────────────────────────────────
  // TECHNICAL DEPT
  // ─────────────────────────────────────────

  {
    department: "Technical Dept",
    id: "atharv-patil",
    name: "Atharv Patil",
    role: "Technical Lead",
    bio: "Assisting in the strategic direction and operations of the club.",
    skills: ["Cloud Computing", "Management", "AWS"],
    email: "atharvpatil1808@gmail.com",
    linkedin: "https://www.linkedin.com/in/atharvpatilw",
    image:
      "https://i.ibb.co/wZYNhv1R/Whats-App-Image-2026-04-18-at-1-54-07-PM.jpg",
  },

  {
    department: "Technical Dept",
    id: "anas",
    name: "Anas Pathan",
    role: "Project Lead",
    bio: "Leading project development, coordinating the team, and building scalable applications with modern cloud technologies.",
    skills: [
      "AWS",
      "Project Leadership",
      "Cloud Development",
      "Node.js",
      "Docker",
    ],
    email: "pathananas2007@gmail.com",
    linkedin: "https://www.linkedin.com/in/anas-pathan-91a6b3368",
    image:
      "https://i.ibb.co/YBDxDXfV/Chat-GPT-Image-Sep-4-2026-12-44-21-AM.png",
  },

  {
    department: "Technical Dept",
    id: "Yash",
    name: "Yash Nawal",
    role: "Technical Associate",
    bio: "Passionate about cloud computing and eager to contribute to the club's technical initiatives.",
    skills: ["AWS", "Python", "Cloud Native"],
    email: "yashsanjaynawal810@gmail.com",
    linkedin: "https://www.linkedin.com/in/yash-nawal-51b5a228b/",
    image:
      "https://i.ibb.co/gFrBmXJv/Whats-App-Image-2026-04-18-at-8-14-43-AM-2.jpg",
  },

  {
    department: "Technical Dept",
    id: "diksha",
    name: "Diksha Remulkar",
    role: "Technical Associate",
    bio: "Passionate about cloud technologies and helping others learn.",
    skills: ["AWS", "Python", "Cloud Native"],
    email: "diksharemulkar@gmail.com",
    linkedin: "https://www.linkedin.com/in/diksha-remulkar-4b76a8338",
    image: "https://i.ibb.co/DfZngMw0/1773671193720-Diksha-Remulkar.png",
  },

  {
    department: "Technical Dept",
    id: "srushti",
    name: "Srushti Shinde",
    role: "Technical Associate",
    bio: "Exploring the depths of AWS services and building robust solutions.",
    skills: ["AWS", "JavaScript", "Serverless"],
    email: "srushti4326@gmail.com",
    linkedin: "https://www.linkedin.com/in/srushti-shinde-692326338",
    image:
      "https://i.ibb.co/whnVPdBh/IMG-20260316-142303-Srushti-Shinde.png",
  },

  {
    department: "Technical Dept",
    id: "aditi",
    name: "Aditi",
    role: "Project Associate",
    bio: "Leading technical projects and guiding members in hands-on learning.",
    skills: ["Project Management", "AWS", "React"],
    email: "jadhavaditi8176@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditi-jadhav-622843388",
    image: "https://i.ibb.co/DBRgNyb/aditi.jpg",
  },

  // ─────────────────────────────────────────
  // EVENTS & OPERATIONS DEPT
  // ─────────────────────────────────────────

  {
    department: "Events & Operations Dept",
    id: "punam",
    name: "Punam Age",
    role: "Event Coordinator",
    bio: "Organizing engaging and educational events for the community.",
    skills: ["Event Planning", "Public Speaking", "Coordination"],
    email: "punamage123@gmail.com",
    linkedin: "https://www.linkedin.com/in/punam-age-5219a52b6",
    image:
      "https://i.ibb.co/spsQqkZ3/Professional-passport-style-headshot-with-smile-1-Punam-age.png",
  },

  {
    department: "Events & Operations Dept",
    id: "chaitanya",
    name: "Chaitanya",
    role: "Logistics Lead",
    bio: "Ensuring all events run smoothly with proper logistical support.",
    skills: ["Logistics", "Management", "Problem Solving"],
    email: "chhaitanyaaz@gmail.com",
    linkedin: "https://www.linkedin.com/in/chhaitanyaa-zanjurne-84976a24",
    image: "https://i.ibb.co/KjLPBGnt/chaitanya.png",
  },

  {
    department: "Events & Operations Dept",
    id: "suhani",
    name: "Suhani Varma",
    role: "Event Coordination",
    bio: "Helping to plan and execute club events.",
    skills: ["Coordination", "Teamwork"],
    email: "suhanivarma33@gmail.com",
    linkedin: "https://www.linkedin.com/in/suhani-varma-09810a214",
    image:
      "https://i.ibb.co/7t7JXFhg/IMG-20260316-WA0011-Suhani-Varma.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "arya",
    name: "Arya Patil",
    role: "Event Coordination Associate",
    bio: "Helping to plan and execute club events.",
    skills: ["Coordination", "Teamwork"],
    email: "aryap010406@gmail.com",
    linkedin: "https://www.linkedin.com/in/arya-patil-4b85b73a5",
    image:
      "https://i.ibb.co/vCRQfL3T/IMG-20260316-WA0026-Arya-Patil-1.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "palak",
    name: "Palak Vedi",
    role: "Event Coordination Associate",
    bio: "Helping to plan and execute club events.",
    skills: ["Coordination", "Teamwork"],
    email: "kayavedi7@gmail.com",
    linkedin: "https://www.linkedin.com/in/palak-vedi-284821388",
    image:
      "https://cdn.phototourl.com/member/2026-10-01-5d69814e-8e5f-4eab-8955-d8b0c75181bb.png",
  },

  // ─────────────────────────────────────────
  // MEDIA & CONTENT DEPT
  // ─────────────────────────────────────────

  {
    department: "Media & Content Dept",
    id: "shekhar",
    name: "Shekhar",
    role: "Social Media & Content Lead",
    bio: "Creating engaging content and managing our social media presence.",
    skills: ["Content Creation", "Social Media", "Writing"],
    email: "varekarshekhar@gmail.com",
    linkedin: "https://www.linkedin.com/in/shekhar-varekar-530b97384",
    image: "https://i.ibb.co/HpV9qJwH/shekhar.jpg",
  },

  {
    department: "Media & Content Dept",
    id: "amruta",
    name: "Amruta Kole",
    role: "Social Media Associate",
    bio: "Assisting in content creation and social media management to enhance our online presence.",
    skills: ["Content Creation", "Social Media", "Graphic Design"],
    email: "koleamruta836@gmail.com",
    linkedin: "https://www.linkedin.com/in/amruta-kole-907958388",
    image:
      "https://i.ibb.co/C5g4Mm7x/Whats-App-Image-2026-04-18-at-8-14-43-AM.jpg",
  },

  {
    department: "Media & Content Dept",
    id: "dhrupata",
    name: "Dhrupata Wankhede",
    role: "Design & Branding Lead",
    bio: "Designing visually appealing graphics and maintaining our brand identity.",
    skills: ["Graphic Design", "Figma", "Branding"],
    email: "dhrupatawankhede@gmail.com",
    linkedin: "https://www.linkedin.com/in/dhrupata-wankhede-b68b323a3",
    image:
      "https://i.ibb.co/9mS6qrPr/IMG-20260316-WA0033-Dhrupata-Wankhede.jpg",
  },

  {
    department: "Media & Content Dept",
    id: "vedika",
    name: "Vedika Desai",
    role: "Social Media Associate",
    bio: "Assisting in social media management and content distribution.",
    skills: ["Social Media", "Communication"],
    email: "vedikad21@gmail.com",
    linkedin: "https://www.linkedin.com/in/vedika-desai-8095b732a",
    image:
      "https://i.ibb.co/qY73yh3F/Scanned-20260316-2043-Vedika-Desai.jpg",
  },

  {
    department: "Media & Content Dept",
    id: "aniket-mohite",
    name: "Aniket Mohite",
    role: "Design and graphics lead",
    bio: "Contributing to design and visual content for the club.",
    skills: ["Design", "Creativity", "Branding"],
    email: "mohiteaniket248@gmail.com",
    linkedin: "https://www.linkedin.com/in/aniket-mohite-7082b3289",
    image:
      "https://i.ibb.co/TBNp3tJm/Whats-App-Image-2026-04-12-at-6-27-55-PM.jpg",
  },

  // ─────────────────────────────────────────
  // PR, OUTREACH & CORPORATE DEPT
  // ─────────────────────────────────────────

  {
    department: "PR, Outreach & Corporate Dept",
    id: "siddhi",
    name: "Siddhi",
    role: "PR Lead",
    bio: "Managing public relations and outreach to grow our community.",
    skills: ["Public Relations", "Networking", "Communication"],
    email: "siddhiagedkar22@gmail.com",
    linkedin: "https://www.linkedin.com/in/siddhi-agedkar-35b042385",
    image:
      "https://i.ibb.co/4RnZt8mK/IMG-20260316-WA0049-Shruti-Paul-41.jpg",
  },

  {
    department: "PR, Outreach & Corporate Dept",
    id: "renuka",
    name: "Renuka",
    role: "PR Lead",
    bio: "Managing public relations and outreach to grow our community.",
    skills: ["Public Relations", "Networking", "Communication"],
    email: "renukabansode592@gmail.com",
    linkedin: "https://www.linkedin.com/in/renuka-bansode-674a4232a",
    image: "https://i.ibb.co/MkRr4m0Q/renuka.jpg",
  },

  // ─────────────────────────────────────────
  // FINANCE & MARKETING DEPT
  // ─────────────────────────────────────────

  {
    department: "Finance & Marketing Dept",
    id: "tushant",
    name: "Tushant Tagade",
    role: "Marketing Lead",
    bio: "Leading marketing campaigns to promote club activities.",
    skills: ["Marketing", "Strategy", "Analytics"],
    email: "awssbggcoek@gmail.com",
    linkedin: "https://www.linkedin.com/in/tushant-tagade-06a210254",
    image: "https://i.ibb.co/zWbTwkBX/tushant-Tagade.jpg",
  },

  {
    department: "Finance & Marketing Dept",
    id: "Ankita",
    name: "Ankita Pujari",
    role: "Marketing Associate",
    bio: "Assisting in marketing campaigns and promotional activities.",
    skills: ["Marketing", "Analytics", "Content Creation"],
    email: "ankitapujari711@gmail.com",
    linkedin: "https://www.linkedin.com/in/ankita-pujari-821230398",
    image:
      "https://i.ibb.co/VcnZRZKS/Whats-App-Image-2026-04-18-at-9-02-28-PM.jpg",
  },

  {
    department: "Finance & Marketing Dept",
    id: "vaishnavi2",
    name: "Vaishnavi Kodag",
    role: "Marketing Associate",
    bio: "Driving the club's outreach, promoting events, and building a strong presence across the student community.",
    skills: ["Marketing", "Social Media", "Communication"],
    email: "kodagvaishnavi26@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/vaishnavi-kodag-766010389?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image:
      "https://i.ibb.co/rRW7fXjn/Whats-App-Image-2026-09-03-at-8-38-17-AM.jpg",
  },

  {
    department: "Finance & Marketing Dept",
    id: "bhushan-jadhav",
    name: "Bhushan Jadhav",
    role: "Treasurer",
    bio: "Managing club finances and budgeting for events.",
    skills: ["Finance", "Budgeting", "Accounting"],
    email: "aj6244249@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/bhushan-jadhav-93b94630b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "https://i.ibb.co/4Ztn2gvb/Bhushan-png.png",
  },

  {
    department: "Finance & Marketing Dept",
    id: "vaishnavi",
    name: "Vaishnavi",
    role: "Treasurer Associate",
    bio: "Managing club finances and budgeting for events.",
    skills: ["Finance", "Budgeting", "Accounting"],
    email: "awssbggcoek@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/vaishnavi-sawant-70845833b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image:
      "https://i.ibb.co/JRBSNVZL/Whats-App-Image-2026-04-12-at-11-02-42-PM.jpg",
  },
];