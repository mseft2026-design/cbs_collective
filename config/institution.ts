// ─────────────────────────────────────────────────────────────────────────────
// Institutional Configuration — Centre for Budget Studies (CBS), CUSAT
// Primary Source of Truth based on Approved Institutional Content
// ─────────────────────────────────────────────────────────────────────────────

export interface ResearchArea {
  title: string;
  description: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
}

export interface SocialLinks {
  website: string;
  linkedin: string;
  twitter: string;
}

export interface CusatProfile {
  name: string;
  shortName: string;
  reconstituted: string;
  overview: string;
  nirf2025: {
    universityRank: number;
    overallRank: number;
    statePublicRank: number;
  };
  rankingsOverview: string;
  researchFunding: string[];
  collaborations: string;
  placementHighlights: string;
}

export interface Institution {
  name: string;
  shortName: string;
  university: string;
  universityShortName: string;
  established: string;
  location: string;
  officialWebsite: string;
  email: string;
  phone: string;
  address: string;
  introduction: string;
  vision: string;
  mission: string;
  about: string;
  programmeOverview: string;
  programmeObjectives: string[];
  researchAreas: ResearchArea[];
  achievements: Achievement[];
  socialLinks: SocialLinks;
  cusat: CusatProfile;
}

export const institution: Institution = {
  name: "Centre for Budget Studies",
  shortName: "CBS",
  university: "Cochin University of Science and Technology",
  universityShortName: "CUSAT",

  established: "2012",
  location: "Kalamassery, Kochi, Kerala, India",
  officialWebsite: "https://cusat.ac.in",
  email: "cbs@cusat.ac.in",
  phone: "+91 484 2577290",
  address: "Centre for Budget Studies, Cochin University of Science and Technology, South Kalamassery, Kochi, Kerala 682022, India",

  introduction: `The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India. As one of the few institutions in the country specializing in budget studies, CBS aims to address gaps in budgeting practices at the national, state and local levels.

Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade.`,

  vision:
    "To establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade, positioning itself as a leader in budget studies and fiscal governance in India.",

  mission:
    "CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.",

  about: `The Centre for Budget Studies (CBS), established in 2012 by Cochin University of Science and Technology (CUSAT), is a pioneering institution dedicated to studying budgetary processes, fiscal management and their implications for governance in India. As one of the few institutions in the country specializing in budget studies, CBS aims to address gaps in budgeting practices at the national, state and local levels.

Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement. Its vision is to establish itself as a Centre of Excellence in teaching, research and community outreach within the next decade.

To achieve this, CBS is committed to academic scholarship, rigorous research and meaningful social engagement while upholding institutional integrity, openness to knowledge and change, quality education and societal welfare. By fostering a safe environment that encourages freedom of inquiry and continuous improvement, the Centre aims to overcome challenges through strategic planning and innovation, ultimately positioning itself as a leader in budget studies and fiscal governance in India.`,

  programmeOverview:
    "Through its flagship M.Sc. programme, the Centre provides advanced training in quantitative analysis, econometrics and financial technology, emphasizing research excellence and community engagement.",

  programmeObjectives: [
    "Advanced training in quantitative analysis, mathematical modeling, and empirical methods",
    "Econometric estimation of public revenue, state budgets, and fiscal transfers",
    "Application of financial technology (FinTech) and data analytics to public finance systems",
    "Comprehensive evaluation of budgeting practices across national, state, and local tiers",
    "Rigorous research and meaningful community engagement promoting societal welfare",
  ],

  researchAreas: [
    {
      title: "Budgetary Processes & Multi-Tier Governance",
      description:
        "Analyzing budgetary formulation, resource mobilization, and fiscal administration at the national, state, and local levels to enhance transparency and governance.",
    },
    {
      title: "Quantitative Analysis & Applied Econometrics",
      description:
        "Applying rigorous statistical econometrics and quantitative economic methodologies to public spending patterns, fiscal sustainability, and macroeconomic trends.",
    },
    {
      title: "Financial Technology in Fiscal Management",
      description:
        "Investigating modern financial technology architectures, computational analytics, and digital systems transforming public financial management.",
    },
    {
      title: "Community Engagement & Societal Welfare",
      description:
        "Bridging academic scholarship with community outreach, examining participatory budgeting, and assessing public expenditure impacts on social equity.",
    },
  ],

  achievements: [
    {
      year: "1986",
      title: "Reconstitution of CUSAT",
      description:
        "The University of Cochin was reconstituted as Cochin University of Science and Technology (CUSAT) in February 1986, advancing postgraduate studies and research across applied sciences, technology, commerce, management, and social sciences.",
    },
    {
      year: "2012",
      title: "Establishment of CBS",
      description:
        "The Centre for Budget Studies was established by CUSAT as a pioneering institution dedicated to budgetary processes, fiscal management, and governance in India.",
    },
    {
      year: "2017",
      title: "Global University Rankings Inclusion",
      description:
        "CUSAT recognized in the Times Higher Education (THE) World University Rankings among the top 1,500 universities globally, alongside QS World Rankings.",
    },
    {
      year: "2025",
      title: "NIRF Top National Rankings",
      description:
        "In the NIRF India Rankings 2025, CUSAT secured the 32nd rank in the university category, 50th in the overall category, and 6th among state public universities in India.",
    },
    {
      year: "2026–2028",
      title: "Academic Batch 2026–2028",
      description:
        "Active cohort of 26 scholars enrolled in the flagship M.Sc. programme at CBS, trained in quantitative analysis, econometrics, and financial technology.",
    },
  ],

  cusat: {
    name: "Cochin University of Science and Technology",
    shortName: "CUSAT",
    reconstituted: "February 1986",
    overview:
      "The University of Cochin was reconstituted as Cochin University of Science and Technology (CUSAT) in February 1986, with the objective of promoting graduate and postgraduate studies and advanced research in Applied Sciences, Technology, Industry, Commerce, Management and Social Sciences.",
    nirf2025: {
      universityRank: 32,
      overallRank: 50,
      statePublicRank: 6,
    },
    rankingsOverview:
      "Since 2017, CUSAT has been featured in the Times Higher Education World University Rankings, placing it among the top 1,500 universities globally, and has also been included in the QS World University Rankings and the National Institutional Ranking Framework (NIRF). In the NIRF India Rankings 2025, CUSAT secured the 32nd rank in the university category, 50th in the overall category and 6th among state public universities.",
    researchFunding: ["UGC", "DST", "DBT", "MHRD"],
    collaborations:
      "The University has established collaborations with reputed universities and institutions worldwide and hosts numerous national and international academic discussions, seminars and workshops every year. Its research activities receive support and funding from central government agencies such as UGC, DST, DBT and MHRD, as well as international research partners through various Memoranda of Understanding (MoUs).",
    placementHighlights:
      "For recruiters, CUSAT provides access to an exceptional talent pool, with a strong record of successful campus placements and graduates equipped with cutting-edge knowledge and industry-ready skills across technology, engineering, commerce and management, prepared to excel in a globally competitive professional environment.",
  },

  socialLinks: {
    website: "https://cusat.ac.in",
    linkedin: "https://linkedin.com",
    twitter: "",
  },
};
