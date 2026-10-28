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
    bio: "Supporting the President in club leadership, coordinating activities, and helping drive the club's growth and initiatives.",
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
      "https://i.ibb.co/KxvXGph2/file-00000000125c81fb92046550f24b9154-1.png",
  },

  {
    department: "Leadership Dept",
    id: "bhushan-jadhav",
    name: "Bhushan Jadhav",
    role: "Joint Secretary",
    bio: "Supporting the General Secretary in daily club operations, leadership coordination, and club activities.",
    skills: ["Leadership", "Management", "Coordination", "Finance"],
    email: "aj6244249@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/bhushan-jadhav-93b94630b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "https://i.ibb.co/4Ztn2gvb/Bhushan-png.png",
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
    id: "anas",
    name: "Anas Pathan",
    role: "Technical Lead",
    bio: "Leading technical initiatives, cloud project architectures, and guiding members in building scalable cloud solutions.",
    skills: [
      "AWS",
      "Technical Leadership",
      "Cloud Architecture",
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
    id: "diksha-patil",
    name: "Diksha Patil",
    role: "Technical Co-Lead",
    bio: "Co-leading technical initiatives and supporting members in developing practical technology solutions.",
    skills: [
      "Technical Leadership",
      "Project Coordination",
      "Problem Solving",
    ],
    email: "dikshasp101729@gmail.com",
    linkedin: "https://www.linkedin.com/in/diksha-patil-s1729",
    image: "https://i.ibb.co/DDp4ch74/Dikasha-Patil.png",
  },

  {
    department: "Technical Dept",
    id: "atharv-patil",
    name: "Atharv Patil",
    role: "Project Lead",
    bio: "Leading project development, coordinating technical teams, and driving hands-on cloud building initiatives.",
    skills: ["Project Management", "Cloud Computing", "AWS", "Leadership"],
    email: "atharvpatil1808@gmail.com",
    linkedin: "https://www.linkedin.com/in/atharvpatilw",
    image:
      "https://i.ibb.co/wZYNhv1R/Whats-App-Image-2026-04-18-at-1-54-07-PM.jpg",
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
    id: "aditi",
    name: "Aditi",
    role: "Project Associate",
    bio: "Leading technical projects and guiding members in hands-on learning.",
    skills: ["Project Management", "AWS", "React"],
    email: "jadhavaditi8176@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditi-jadhav-622843388",
    image: "https://i.ibb.co/DBRgNyb/aditi.jpg",
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
    id: "harsh",
    name: "Harsh Pisal",
    role: "Technical Associate",
    bio: "Contributing to technical initiatives and supporting the development of practical solutions for club projects.",
    skills: ["Technical Support", "Problem Solving", "Teamwork"],
    email: "harshpisal0809@gmail.com",
    linkedin: "https://www.linkedin.com/in/harsh-pisal-b03450441",
    image: "https://i.ibb.co/N2nz01zX/Harsh-Pisal.png",
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
  {
    department: "Events & Operations Dept",
    id: "gopal",
    name: "Gopal Lakwal",
    role: "Event Associate",
    bio: "Assisting in planning, coordinating, and executing engaging club events and community activities.",
    skills: ["Event Coordination", "Management", "Operations"],
    email: "gopallakwal526@gmail.com",
    linkedin: "https://www.linkedin.com/in/gopal-lakwal-461467383",
    image:
      "https://i.ibb.co/4wBwTHtx/file-000000002ef871fab1e8c53a2708be68-Gopal-lakwal.png",
  },

  {
    department: "Events & Operations Dept",
    id: "prapti",
    name: "Prapti Patil",
    role: "Event Associate",
    bio: "Assisting in planning and executing engaging events and activities for the club community.",
    skills: ["Event Coordination", "Teamwork", "Communication"],
    email: "praptiarchanapatil@gmail.com",
    linkedin: "https://www.linkedin.com/in/prapti-patil-2504a5434",
    image:
      "https://i.ibb.co/Q7qZfBFq/Whats-App-Image-2026-10-20-at-6-33-15-AM.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "aaryavardhan",
    name: "Aaryavardhan Santosh Shinde",
    role: "Event Associate",
    bio: "Supporting event planning and execution to ensure smooth and engaging club activities.",
    skills: ["Event Coordination", "Teamwork", "Organization"],
    email: "shindeaaryavardhan8@gmail.com",
    linkedin: "https://www.linkedin.com/in/aaryavardhan-shinde-a4477b437",
    image: "https://i.ibb.co/1Y8pg0zn/Santosh-Patil.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "santosh",
    name: "Shubham Vijay Pandagale",
    role: "Event Associate",
    bio: "Helping coordinate club events and supporting their smooth execution.",
    skills: ["Event Coordination", "Teamwork", "Logistics"],
    email: "shubhampandagale00@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/shubham-pandagale-a422b73a0?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "https://i.ibb.co/zVqqqjxq/Shubham-Vijay-Pandagale.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "asmita",
    name: "Asmita Anant Ugale",
    role: "Event Associate",
    bio: "Supporting the planning and coordination of club events and community activities.",
    skills: ["Event Planning", "Coordination", "Teamwork"],
    email: "asmitaugale07@gmail.com",
    linkedin: "https://www.linkedin.com/in/asmita-ugale-b5a4412a4",
    image: "https://i.ibb.co/ccZ9C5Dh/Asmita-Ugale.png",
  },

  {
    department: "Events & Operations Dept",
    id: "kedar",
    name: "Kedar Gurav",
    role: "Event Associate",
    bio: "Assisting with event preparation and coordination to help deliver successful club activities.",
    skills: ["Event Coordination", "Organization", "Teamwork"],
    email: "gkedar321@gmail.com",
    linkedin: "https://www.linkedin.com/in/kedar-gurav-811264416",
    image: "https://i.ibb.co/Jw3kq7gb/Kedar-Gurav.jpg",
  },

  {
    department: "Events & Operations Dept",
    id: "tejas",
    name: "Tejas Satish Mahant",
    role: "Event Associate",
    bio: "Helping organize club events and coordinate activities for the student community.",
    skills: ["Event Coordination", "Teamwork", "Communication"],
    email: "tejasmahant95@gmail.com",
    linkedin: "https://www.linkedin.com/in/tejas-mahant-a26583440",
    image: "https://i.ibb.co/tp6N08P9/Tejas-mahant.jpg",
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
    id: "sumit",
    name: "Sumit Tipane",
    role: "Social Media Associate",
    bio: "Creating and supporting social media content to promote club activities and engage the student community.",
    skills: [
      "Social Media Management",
      "Content Creation",
      "Communication",
    ],
    email: "Sumittipane123@gmail.com",
    linkedin: "https://www.linkedin.com/in/sumit-tipane-292520441",
    image: "https://i.ibb.co/d4jyp05y/Sumit-Tipane.jpg",
  },

  {
    department: "Media & Content Dept",
    id: "dattatray",
    name: "Dattatray Dhole",
    role: "Social Media Associate",
    bio: "Supporting social media activities and creating content to promote club updates and engage the student community.",
    skills: [
      "Social Media Management",
      "Content Creation",
      "Communication",
    ],
    email: "dattadhole1911@gmail.com",
    linkedin: "",
    image:
      "https://i.ibb.co/0y5QRFLp/IMG-20261011-190533-Dattatray-Dhole.png",
  },
  {
    department: "Media & Content Dept",
    id: "abdul-samad",
    name: "Abdul Samad",
    role: "Associate Designer",
    bio: "Supporting visual design and creative content creation for club events and communications.",
    skills: ["Graphic Design", "Visual Communication", "Creativity"],
    email: "mr.zaid.1029@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdul-samad-354023362/",
    image:
      "https://i.ibb.co/Cp8q0Sfw/file-00000000f1bc82118b681c8769c3c154-Abdul-Samad-Zaid.png",
  },

  {
    department: "Media & Content Dept",
    id: "shruti",
    name: "Shruti Paul",
    role: "Design Associate",
    bio: "Supporting the creation of visual designs and creative content for club events and communications.",
    skills: ["Graphic Design", "Visual Communication", "Creativity"],
    email: "shrutipaul53@gmail.com",
    linkedin: "",
    image:
      "https://i.ibb.co/tPDc952j/file-0000000013688211a26f79127c663c9d-Shruti-Paul-41.png",
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
    id: "digvijay-ronghe",
    name: "Digvijay Ronghe",
    role: "Public Relations Co-Lead",
    bio: "Co-leading public relations initiatives and building relationships to strengthen the club's outreach and visibility.",
    skills: ["Public Relations", "Outreach Strategy", "Communication"],
    email: "digvijaya.ronghe@gmail.com",
    linkedin: "",
    image: "https://i.ibb.co/bg27x5WZ/1791724153696-Digvijaya-Ronghe.png",
  },

  {
    department: "PR, Outreach & Corporate Dept",
    id: "vaishnavi-kale",
    name: "Vaishnavi Kale",
    role: "PR Associate",
    bio: "Supporting public relations and outreach initiatives to build connections and increase awareness of club activities.",
    skills: ["Public Relations", "Communication", "Networking"],
    email: "vk4578526@gmail.com",
    linkedin: "https://www.linkedin.com/in/vaishnavi-kale-762014389",
    image: "https://i.ibb.co/Nd4KqTqj/Whats-App-Image-2026-10-20-at-9-21-46-PM.jpg",
  },

  {
    department: "PR, Outreach & Corporate Dept",
    id: "sairaj",
    name: "Sairaj Mali",
    role: "PR Associate",
    bio: "Supporting public relations and outreach activities to build connections and promote club initiatives.",
    skills: ["Public Relations", "Communication", "Networking"],
    email: "sairajmali43@gmail.com",
    linkedin: "",
    image:
      "https://i.ibb.co/j9WtHb4J/file-000000002eb482118dcd7c92f75ef9c9-Sairaj-Mali.png",
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
    id: "ayushi",
    name: "Ayushi Patil",
    role: "Marketing Co-Lead",
    bio: "Co-leading marketing initiatives to promote club events, strengthen outreach, and increase community engagement.",
    skills: [
      "Marketing Strategy",
      "Campaign Planning",
      "Communication",
    ],
    email: "patilayushi738@gmail.com",
    linkedin: "https://www.linkedin.com/in/ayushi-patil-a9867a3b7",
    image:
      "https://i.ibb.co/TBTVFM9G/Whats-App-Image-2026-10-20-at-9-13-01-AM.jpg",
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
    id: "yogita",
    name: "Yogita Mandhare",
    role: "Marketing Associate",
    bio: "Assisting in marketing campaigns and promoting club activities to strengthen student engagement.",
    skills: ["Marketing", "Content Creation", "Communication"],
    email: "yogitamandhare264@gmail.com",
    linkedin: "https://www.linkedin.com/in/yogita-mandhare-00923439b",
    image: "https://i.ibb.co/vxmp1HCr/Yogita.jpg",
  },

  {
    department: "Finance & Marketing Dept",
    id: "digvijay",
    name: "Digvijay Patil",
    role: "Marketing Associate",
    bio: "Contributing to marketing initiatives and promotional campaigns for club events and activities.",
    skills: [
      "Marketing",
      "Campaign Planning",
      "Content Creation",
    ],
    email: "digvijaypatil6321@gmail.com",
    linkedin: "https://www.linkedin.com/in/digvijay-patil-668360441",
    image: "https://i.ibb.co/fVQW52dV/Digviay-Patil.jpg",
  },

];
