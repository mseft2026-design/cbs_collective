// ─────────────────────────────────────────────────────────────────────────────
// Faculty and Leadership Configuration
// Verified institutional leadership for Centre for Budget Studies (CBS), CUSAT
// ─────────────────────────────────────────────────────────────────────────────

export interface Faculty {
  id: string;
  name: string;
  title: string;
  department?: string;
  qualification?: string;
  specialisation?: string;
  email?: string;
  photo: string;
  bio?: string;
}

export const faculty: Faculty[] = [
  {
    id: "faculty-junaid-bushiri",
    name: "Prof. (Dr.) M. Junaid Bushiri",
    title: "Vice Chancellor, CUSAT",
    photo: "/images/faculty/prof-m-junaid-bushiri.png",
  },
  {
    id: "faculty-santhosh-kumar-pk",
    name: "Prof. (Dr.) Santhosh Kumar P K",
    title: "Director",
    department: "Centre for Budget Studies",
    photo: "/images/faculty/prof-santhosh-kumar-pk.png",
  },
  {
    id: "faculty-elizabeth-joy",
    name: "Dr. Elizabeth Joy",
    title: "Assistant Professor",
    department: "Centre for Budget Studies",
    photo: "/images/faculty/dr-elizabeth-joy.png",
  },
];
