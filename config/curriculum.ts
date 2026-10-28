// TODO: Replace placeholder content with official CBS/CUSAT information

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface Course {
  code: string;
  title: string;
  credits: number | string;
}

export interface Semester {
  number: number;
  title: string;
  courses: Course[];
}

export interface Curriculum {
  programName: string;
  duration: string;
  intake: string;
  eligibility: string;
  semesters: Semester[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data Export
// ─────────────────────────────────────────────────────────────────────────────

export const curriculum: Curriculum = {
  programName: 'M.Sc. Budget Studies',
  duration: '2 Years (4 Semesters)',
  intake: '26 Enrolled Scholars (Batch 2026–2028)',
  eligibility: 'Bachelor\'s degree with university entrance qualification in Quantitative Economics, Mathematics, Commerce, or allied disciplines',

  // TODO: Replace every course entry (code, title, credits) with data from the
  //       official syllabus/scheme of study approved by CUSAT.
  //       Add or remove courses per semester to match the actual curriculum.
  semesters: [
    {
      number: 1,
      title: 'Semester 1',
      courses: [
        {
          // TODO: Add official course code (e.g., CBS1C01)
          code: '[TODO: Course Code]',
          // TODO: Add official course title
          title: '[TODO: Course Title — Semester 1, Course 1]',
          // TODO: Add credit value (integer) from the syllabus
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 1, Course 2]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 1, Course 3]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 1, Course 4]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 1, Course 5]',
          credits: '[TODO: Credits]',
        },
      ],
    },
    {
      number: 2,
      title: 'Semester 2',
      courses: [
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 2, Course 1]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 2, Course 2]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 2, Course 3]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 2, Course 4]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 2, Course 5]',
          credits: '[TODO: Credits]',
        },
      ],
    },
    {
      number: 3,
      title: 'Semester 3',
      courses: [
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 3, Course 1]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 3, Course 2]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 3, Course 3]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 3, Course 4]',
          credits: '[TODO: Credits]',
        },
      ],
    },
    {
      number: 4,
      title: 'Semester 4',
      courses: [
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 4, Course 1]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 4, Course 2]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          title: '[TODO: Course Title — Semester 4, Course 3]',
          credits: '[TODO: Credits]',
        },
        {
          code: '[TODO: Course Code]',
          // TODO: Semester 4 often includes a dissertation/project — verify from syllabus
          title: '[TODO: Course Title — Semester 4, Course 4 (e.g., Dissertation/Project)]',
          credits: '[TODO: Credits]',
        },
      ],
    },
  ],
};
