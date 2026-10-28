import { StudentWithUrls } from "@/types/student";

// 26 placeholder students for display when the database is empty or not configured.
// Replace these by adding real students via the Admin dashboard.
export const placeholderStudents: StudentWithUrls[] = Array.from(
  { length: 26 },
  (_, i) => ({
    id: `placeholder-${i + 1}`,
    full_name: `Student ${String(i + 1).padStart(2, "0")}`,
    photo_path: null,
    photo_url: null,
    interests: [
      i % 5 === 0 ? "Public Finance" :
      i % 5 === 1 ? "Fiscal Policy" :
      i % 5 === 2 ? "Budget Analysis" :
      i % 5 === 3 ? "Development Economics" :
      "Political Economy",
    ],
    introduction:
      "[Profile not yet added. Profiles are managed via the Admin dashboard.]",
    linkedin_url: null,
    cv_path: null,
    cv_url: null,
    published: true,
    display_order: i + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
);
