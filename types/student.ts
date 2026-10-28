// CBS Collective — Student type definitions

export interface Student {
  id: string;
  full_name: string;
  photo_path: string | null;
  interests: string[] | null;
  introduction: string | null;
  linkedin_url: string | null;
  cv_path: string | null;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  full_name: string;
  interests: string[];
  introduction: string;
  linkedin_url: string;
  display_order: number;
  published: boolean;
}

export type StudentWithUrls = Student & {
  photo_url: string | null;
  cv_url: string | null;
};
