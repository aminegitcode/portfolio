// types/index.ts

export type Profile = {
  id: number;
  full_name: string;
  subtitle: string;
  subtitle_en: string;
  hero_texts: string[];
  hero_texts_en: string[];
  bio: string;
  bio_en: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  photo_url: string;
};

export type Project = {
  id: number;
  title: string;
  description: string | null;
  description_en: string | null;
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  category: string;
  tags: string[] | null;
  created_at: string;
};

export type Skill = {
  id: number;
  name: string;
  category: string | null;
  icon_url: string | null;
  slug: string | null;
  created_at: string;
};

export type Education = {
  id: number;
  school_name: string;
  school_name_an: string;
  degree: string;
  degree_an: string;
  field: string | null;
  field_en: string | null;
  description: string | null;
  description_en: string | null;
  period: string;
  period_en: string;
  location: string;
  logo_url: string | null;
  school_url: string | null;
  tags: string[] | null;
  order_index: number;
  created_at: string;
};

export type Experience = {
  id: number;
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  logo_url: string | null;
  location: string | null;
  created_at: string;
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  certificate_url: string | null;
  img_url: string | null;
  description: string | null;
  created_at: string;
};

export type Comment = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export type Contact = {
  name: string;
  email: string;
  message: string;
  subject: string | null;
};