import {
  enase,
  fracBG,
  nature,
  wiley,
  gaitBG,
  ctBG,
  pexp,
} from "../../ThemeControlers";
//Icons
import {
  VscAccount,
  VscActivateBreakpoints,
  VscGithub,
  VscGitStashApply,
} from "react-icons/vsc";
import { IoMdBarcode } from "react-icons/io";
import { SiNotist, SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
//icons

let Mydata = {
  Works: [
    {
      Name: "United International University (UIU), Dhaka",
      Role: "Lecturer",
      Dep: "Department of CSE",
      current: true,
      since: "Oct 2022 - Present",
      work: "Working as a full-time faculty in the department of Computer Science and Engineering.",
      webLink: "https://cse.uiu.ac.bd/faculty/abedeen-iftekharul/",
    },
    {
      Name: "InfluencerAds, UK",
      Role: "Front-end Developer (Part-time)",
      current: false,
      since: "Oct 2021 - Aug 2022",
      work: "Worked as a part-time web developer of an advertisement distribution platform for some of the major social media. (via Upwork)",
    },
    {
      Name: "Streamstech Ltd., Dhaka",
      Role: "Developer Intern",
      current: false,
      since: "2021 (Mar - Jun)",
      work: "Worked as a software developer of multiple in-house and client projects.",
    },
    {
      Name: "Insight Labs, Dhaka",
      Role: "Developer Intern",
      current: false,
      since: "2020 (Oct - Dec)",
      work: "Developed an LMS integrated with video conferencing.",
    },
  ],
  edu: [
    {
      Name: "Islamic University of Technology (IUT)",
      webLink: "https://iutoic-dhaka.edu",
      Cert: "B.Sc. in Software Engineering",
      GPType: "CGPA",
      GP: "3.84/4.00 (5th Among 82 Students)",
      Time: "2017-2022",
      Thesis: true,
      Thesis_title: "Multi Locale Bone Fracture Radiographs and Localization",
      Thesis_supervisor: "Tareque Mohmud Chowdhury & Tasnim Ahmed",
    },
    {
      Name: "Saint Joseph Higher Secondary School",
      webLink: "https://sjs.edu.bd/new/index.php",
      Cert: "Higher Secondary Certificate (Science)",
      GPType: "GPA",
      GP: "4.83/5.00",
      Time: "2015-2017",
      Thesis: false,
    },
    {
      Name: "Greenfield College",
      webLink: "https://www.gfsc.edu.bd",
      Cert: "Secondary School Certificate  (Science)",
      GPType: "GPA",
      GP: "5.00/5.00",
      Time: "2013-2015",
      Thesis: false,
    },
  ],
  ResearchDetails: {
    subHead:
      "My focus is in the area of Reinforcement Learning, Interaction Design, Human computer Interaction and Explainable AI.",
    Interests: [
      "Applied Machine Learning",
      "Biomedical Engineering",
      "User Experience",
      "Reinforcement Learning",
      "Explainable AI",
    ],
    Published: [
      {
        Title:
          "FracAtlas: A Dataset for Fracture Classification, Localization and Segmentation of Musculoskeletal Radiographs",
        Authors: [
          "Iftekharul Abedeen",
          "Md. Ashiqur Rahman",
          "Fatema Zohra Prottyasha",
          "Tasnim Ahmed",
          "Tareque Mohmud Chowdhury",
          "Swakkhar Shatabda",
        ],
        Publisher: "Scientific Data, Nature (2023)",
        Type: "Journal",
        Link: "https://www.nature.com/articles/s41597-023-02432-4",
        PDF: "https://www.nature.com/articles/s41597-023-02432-4.pdf",
        PubLogo: nature,
        tags: [
          "Computer Vision",
          "Dataset",
          "Localization",
          "Segmentation",
          "Biomedical Engineering",
        ],
      },
      {
        Title:
          "Analysis of Software Developers’ Programming LanguagePreferences and Community Behavior From Big5Personality Traits",
        Authors: [
          "Md. Saddam Hossain Mukta",
          "Badrun Nessa Antu",
          "Nasreen Azad",
          "Iftekharul Abedeen",
          "Najmul Islam",
        ],
        Publisher: "Software: Practice and Experience, Wiley (2024)",
        Type: "Journal",
        Link: "http://doi.org/10.1002/spe.3381",
        PDF: "https://onlinelibrary.wiley.com/doi/epdf/10.1002/spe.3381",
        PubLogo: wiley,
        tags: [
          "NLP",
          "Personality Analysis",
          "Software Practices",
          "Exlainable AI",
          "Behavior Analysis",
          "Social Computing",
        ],
      },
      {
        Title:
          "Decoding Code Quality: A Software Metric Analysis of Open-Source JavaScript Projects.",
        Authors: ["Suzad Mohammad", "Abdullah Al Jobair", "Iftekharul Abedeen"],
        Publisher: "ENASE (2024)",
        Type: "Conference",
        Link: "https://www.scitepress.org/Documents/2024/126188/",
        PDF: "http://www.scitepress.org/Papers/2024/126188/126188.pdf",
        PubLogo: enase,
        tags: ["Software Development", "Coding Analysis", "Code Quality"],
      },
    ],
    Ongoing: [
      {
        title:
          "Enhancing Typing Speed and Ergonomics Through Optimal Keyboard Design: A Reinforcement Learning Approach",
        Status: "Under Review",
        Spervisor: "Prof. Dr. Swakkhar Shatabda",
        SupLink:
          "https://cse.sds.bracu.ac.bd/faculty_profile/333/swakkhar_shatabda",
        abstract:
          "This research tackles the problem of optimizing keyboard design for improved typing speed and ergonomics by employing reinforcement learning techniques. While existing keyboard layouts are often designed arbitrarily without following standardized approaches, this study aims to develop an optimal layout that maximizes typing efficiency and user comfort. Previous works have explored multi-objective function optimization and maintaining similarity with standard layouts using algorithms like Ant Colony Optimization, deep learning with genetic algorithms, and multi-objective optimization problems. However, accurate ergonomic criteria across different keyboard types and objective functions for optimal layout design remain unexplored. By considering the six ergonomic criteria proposed by Eggers et al. (2003) and leveraging reinforcement learning algorithms, we aim to apply reinforcement-based optimization methods to the keyboard design problem, paving the way for a more comprehensive and data-driven approach to optimizing keyboard layouts.",
        tags: [
          "Ergonomics",
          "Accessibility",
          "Product Design",
          "Design Optimization",
          "Reinforcement Learning",
        ],
      },
      {
        title:
          '"Can I enjoy my hobbies like before?" Designing a Context-aware To-Do App for Improving Hobby Engagement and Well-being',
        Status: "Under Review",
        Spervisor: null,
        abstract:
          "Hobbies play a vital role in mental well-being and work-life balance, yet they are often neglected due to poor time management and the planning fallacy. Traditional task management apps rely on rigid schedules, leading to disengagement and deprioritization of hobbies. Furthermore, our study has found that despite the willingness to engage with hobbies, the rise of social media and content platforms further diverts idle time from creative pursuits. To address this gap, we propose Hobbify, an AI-driven task management system that intelligently integrates hobbies into users’ daily routines. Hobbify utilizes a context-aware AI agent to recommend personalized hobbies based on user preferences, past interactions, and real-time contextual factors such as time, weather, and location. It also provides reminders and insights to encourage sustained engagement. By dynamically optimizing hobby participation, Hobbify fosters better mental well-being and healthier work-life balance.",
        tags: ["Interaction Design", "Well-being", "Mental Health", "LLM"],
      },
      {
        title:
          '"Can AI help me with healthy eating?" Designing a Personalized LLM-based Food Recommender System',
        Status: "Under Review",
        Spervisor: null,
        abstract:
          "Consumers rely on food labels (i.e., ingredients and nutritional facts) to make informed dietary choices, yet navigating health constraints remains challenging. Existing food recommendation systems lack personalized, health-aware insights, creating a research gap in leveraging Large Language Models (LLMs) for precise food selection. We propose FoodChooser, an AI-based food recommender system that analyzes packaged food labels and provides customized recommendations based on health factors. Our approach evaluates multiple prompting techniques—role-based, shot-based, instruction-based, and chain-of-thought—to determine optimal LLM performance. The system generates responses in four key components: Decision (Yes/No), Explanation, Reasons, and Consultations, incorporating user profiles, health conditions, and dietary needs. Using Google’s Gemini LLM, we collaborate with dietitians in a post-evaluation phase to assess response accuracy, clarity, and reliability. Findings indicate that while LLMs aid food selection, reducing biases and improving accuracy remain critical for real-world adoption. This study advances AI-driven dietary assistance for individuals with health constraints.",
        tags: [
          "Supportive System",
          "Well-being",
          "Recommendation System",
          "Health and Nutrition",
          "LLM",
        ],
      },
      {
        title:
          "A study to enhance the useability of farmer to consumer e-commerce platforms for rural people of Bangladesh.",
        Status: "Under Review",
        Spervisor: null,
        SupLink:
          "https://cse.sds.bracu.ac.bd/faculty_profile/333/swakkhar_shatabda",
        abstract:
          "With the rise of technology and automation, many of our day-to-day activities and systems we rely on have become automated. Though this makes our lives more efficient, these systems are primarily developed for the masses, leaving specific groups and ethnicities behind. The rural farmers in Bangladesh lack the proper education and technological literacy, which can place them at a disadvantage in adjusting to the current trends in the digital marketplace. As they contribute significantly to the nation's economy, it is crucial to address their needs with specific consideration of accessibility, usability, and economic empowerment. We conducted a two-phase study to minimize this gap. The study examined the design and implementation of an enhanced Farmer-to-Consumer (F2C) marketplace. In the first phase, we conducted semi-structured interviews with 47 participants, with small-scale farmers, women, and elderly users. This gave us an understanding of their decision-making processes, digital platform adoption barriers, and market participation challenges. Our study finds a significant gap between existing digital marketplace solutions and farmers' technological capabilities. Farmers also strongly desire direct market access without intermediary dependence.  The second phase involved user testing with 30 participants, followed by in-depth interviews to evaluate and iterate on our proposed system. Our research contributes to the understanding of digital marketplaces and how they can be redesigned to accommodate users with varying levels of technological proficiency. We propose a socio-technical framework that incorporates voice commands in local languages, icon-based interfaces, simplified layouts, and audio guides supplemented by community partnerships and logistical support systems. Our findings expand the discourse on inclusive digital marketplace design, highlighting the importance of aligning technological solutions with existing practices while minimizing barriers. This work offers implications for researchers and practitioners working on digital inclusion initiatives in agricultural communities, suggesting pathways for creating more equitable and accessible digital marketplaces in the Global South.",
        tags: ["HCI", "Accessible Technology", "CSCW", "UX Design"],
      },
      {
        title:
          "Enhancing Computer Literacy in First-Year CSE Students: Analyzing the Impact of Technological Interventions on Academic Success",
        Status: "Ongoing",
        Spervisor: "Dr. Novia Nurain",
        SupLink: "https://novia-nurain.github.io/",
        abstract:
          "This study investigates the factors influencing students in Bangladesh to pursue Computer Science (CS) as a field of study and the challenges they face during their first year of university. As CS enrollments continue to rise globally, driven by career opportunities in an increasingly technology-driven world, Bangladesh has seen a significant uptick in CS enrollment, especially in public and private universities. Despite this growth, a notable skills gap exists, with employers citing a shortage of qualified CS professionals and high dropout rates among CS students. This research seeks to understand why students choose CS post-Higher Secondary Certificate (HSC) and examines the academic, personal, and institutional challenges that impact their first-year experience. Drawing on surveys and semi-structured interviews with first-year CS students from diverse socioeconomic and geographical backgrounds, this study explores how factors like family support, career prospects, intrinsic interest, and technological exposure influence students’ decision-making processes. Additionally, the study examines challenges that may hinder their academic performance, particularly the disparity in academic preparation among students from urban versus rural areas and varying socioeconomic backgrounds. Findings from this research could inform policy interventions to improve the quality and retention rates of CS students, addressing both motivation and skill development to bridge the gap between industry demand and graduate readiness in Bangladesh’s IT sector.",
        tags: ["CSCW", "Teaching and Learning Experience", "HCI"],
      },
    ],
  },
  TeachingSemesters: {
    1: "Fall 2022",
    2: "Spring 2023",
    3: "Summer 2023",
    4: "Fall 2023",
    5: "Spring 2024",
    6: "Summer 2024",
    7: "Fall 2024",
  },
  TaughtCourses: [
    {
      courseTitle: "CSE 4945: UI: Design and Concepts",
      semesters: [7, 6, 5],
    },
    {
      courseTitle: "EEE 4261: Green Computing",
      semesters: [5],
    },
    {
      courseTitle: "CSE 2233: Theory of Computation",
      semesters: [6, 5, 4, 3, 2],
    },
    {
      courseTitle: "CSE 2217: Data Structure and Algorithms II",
      semesters: [6],
    },
    {
      courseTitle: "CSE 2218: Data Structure and Algorithms II Laboratory",
      semesters: [6, 5],
    },
    {
      courseTitle: "CSE 2216: Data Structure and Algorithms I Laboratory",
      semesters: [7, 5, 4, 3],
    },
    {
      courseTitle: "CSE 2213: Discrete Mathematics",
      semesters: [4, 1],
    },
    {
      courseTitle: "CSE 2118: Advanced Object Oriented Programming Laboratory",
      semesters: [1],
    },
    {
      courseTitle: "CSE 1325: Digital Logic Design",
      semesters: [3],
    },
    {
      courseTitle: "CSE 1326: Digital Logic Design Laboratory",
      semesters: [3, 2],
    },
    {
      courseTitle: "CSE 1115: Object Oriented Programming",
      semesters: [7, 6, 2, 1],
    },
    {
      courseTitle: "CSE 1112: Structured Programming Language Laboratory",
      semesters: [5, 4, 3, 2],
    },
    {
      courseTitle: "CSE 1110: Introduction to Computer Systems",
      semesters: [1],
    },
  ],
  Advising: {
    UnderGrad: [
      "Mahabub Alam Khan",
      "Suriya Najnine Nisamoni",
      "AHM Emramul Pasha",
      "Sumiya Tabussum Dristy",
      "Raj Shekhar Karmaker",
      "Fatema",
    ],
  },
  Awards: [
    {
      Topic: "Finalist in Datathon 2.0",
      Desc: [
        "Qualified within top 10 among 423 teams in nation's largest data analysis and data engineering competition co-arranged by Robi Axiata, Amazon & Huawei (2022)",
      ],
      link: [false],
    },
    {
      Topic: "IUT Mars Rover (Team Avijatrik)",
      Desc: [
        "Stood 15th globally and 1st among Asian teams in European Rover Challenge (ERC-2019)",
      ],
      link: [false],
    },
    {
      Topic: "4th in Science Olympiad",
      Desc: [
        "Bangladesh Academy of Science (BAS) Science Olympiad, Secondary School Group (Dhaka-2015)",
      ],
      link: [false],
    },
    {
      Topic: "2 years of Govt. Scholarship",
      Desc: [
        "Awarded by Education Board for Junior School Certificate examination result",
      ],
      link: [false],
    },
    {
      Topic: "Special Mention at 'Call for Nation'",
      Desc: [
        "Co-developed Tracie, a robust contact tracing app for mobile platforms to minimize the impact of COVID-19. Got a special mention for the most innovative ideas in the nationwide competition.",
      ],
      link: [false],
    },
    {
      Topic: "Educational Assessment by UNSW Global, Australia",
      Desc: ["Achieved Distinction class in science (top 80% globally), 2015"],
      link: [false],
    },
  ],
  ECAs: [
    {
      Topic: "Web Development Executive",
      Desc: ["IUT Computer Society 2021-22"],
      link: [false],
    },
    {
      Topic: "Software Developer and Designer",
      Desc: [
        "Rover's user interface, telecommunication, and remote control module for Avijatrik",
      ],
      link: [false],
    },
    {
      Topic: "Web Development Mentor",
      Desc: ["IUT Computer Society 2020-21"],
      link: [false],
    },
    {
      Topic: "Open-source Contributor",
      Desc: [
        "Question setter and moderator on OOkata an Object-Oriented question catalog on concepts like SOLID principles and Design Patterns.",
      ],
      link: [false],
    },
    {
      Topic: "Executive Committee Member",
      Desc: ["Josephite Cultural Forum (2015-16)"],
      link: [false],
    },
  ],
  Projects: [
    {
      title: "FracAtlas",
      bgim: fracBG,
      Description:
        "This is a medical imaging project intended for the detection of bone fractures by using advanced image processing techniques. This project is a companion to the FracAtlas dataset published for research purposes. It focuses on developing and implementing algorithms that can localize and segment potential bone fracture areas in X-ray images. The primary objective is to assist radiologists and healthcare professionals in making more accurate and timely diagnoses by providing precise delineations of fractured regions within medical images.",
      Links: [
        { site: <VscGithub />, link: "https://github.com/XLR8-07/FracAtlas" },
        {
          site: <IoMdBarcode />,
          link: "https://paperswithcode.com/dataset/fracatlas",
        },
        {
          site: <SiNotist />,
          link: "https://www.nature.com/articles/s41597-023-02432-4",
        },
      ],
      TS: ["Python,", "YOLO,", "PyTorch"],
      FeatureList: [
        "Improvement of Healthcare",
        "Accuracy Benchmarking",
        "Clinical Validation",
      ],
    },
    {
      title: "Behavioural analysis and AI Model Explainability",
      Description:
        "This project aims to develop a machine learning model using Scikit-learn classification to predict the Big Five personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism) from tweets. To ensure transparency and interpretability of the model Python's SHAP library was utilied. This helped in finding out the decision making factors of the model.",
      bgim: pexp,
      Links: [
        {
          site: <VscGithub />,
          link: "https://github.com/Abedeen25/Multiclass-classifiation-and-explainability",
        },
      ],
      TS: ["Python,", "SHAP"],
      FeatureList: [
        "Personality Analysis",
        "Interpretable AI Models",
        "Explainable Artificial Intelligence (XAI)",
        "Social Media Data Analysis",
      ],
    },
    {
      title: "Gait Analysis",
      bgim: gaitBG,
      Description:
        "In this project, we developed a gait analysis system leveraging machine learning and computer vision using Microsoft Kinect to enhance security. The primary aim of the system is to analyze the unique walking pattern of individuals as a novel biometric aspect for authentication purposes while also monitoring the user's health.",
      Links: [
        {
          site: <VscGithub />,
          link: "https://github.com/Abedeen25/Gait_analysis",
        },
      ],
      TS: ["Python,", "OpenCV,", "Kinect V2"],
      FeatureList: [
        "Biometric Authentication",
        "Health Monitoring",
        "Real-time Analysis",
      ],
    },
    {
      title: "Tracie",
      Description:
        "Tracie is a contact tracing solution designed during the COVID-19 pandemic, utilizing low-energy Bluetooth and ultrasound technology on mobile devices to ensure user privacy and effective monitoring of close encounters. The app enables users to minimize the risk of transmission by alerting them when they have been in close proximity to someone who has tested positive for the virus. This project aims to empower individuals with tools to protect themselves and their communities, while maintaining privacy and data security.",
      bgim: ctBG,
      Links: [
        {
          site: <VscGithub />,
          link: "https://github.com/arifulislamiut/AmraiBangladesh ",
        },
      ],
      TS: ["Java,", "Swift,", "Firebase"],
      FeatureList: ["COVID-19", "Contact Tracing", "Public Health", "Privacy"],
    },
  ],
  Connect: [
    {
      icon: <MdEmail className="ico" />,
      link: "mailto:iftekharul@iut-dhaka.edu",
      text: "iftekharul@iut-dhaka.edu",
    },
    {
      icon: <FaLinkedin className="ico" />,
      link: "https://www.linkedin.com/in/iftekharul-abedeen",
      text: "Linkedin",
    },
    {
      icon: <SiTelegram className="ico" />,
      link: "https://t.me/KUGELBLlTZ",
      text: "Telegram",
    },
  ],
  TechStack: [
    { logo: <VscGitStashApply />, name: "Blender" },
    { logo: <VscAccount />, name: "Blender" },
    { logo: <VscActivateBreakpoints />, name: "Blender" },
    { logo: <VscGitStashApply />, name: "Blender" },
    { logo: <VscAccount />, name: "Blender" },
    { logo: <VscActivateBreakpoints />, name: "Blender" },
    { logo: <VscGitStashApply />, name: "Blender" },
    { logo: <VscAccount />, name: "Blender" },
    { logo: <VscActivateBreakpoints />, name: "Blender" },
  ],
};

export { Mydata };
