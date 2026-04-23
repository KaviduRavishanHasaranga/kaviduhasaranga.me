export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  verificationCode?: string;
  badge?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  badge?: string;
}

export const certifications: Certification[] = [
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    date: "May 2022",
    verificationCode: "uWhn3lS2lH",
    credentialUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    date: "Aug 2022",
    verificationCode: "29ipKlaxiU",
    credentialUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
  },
  {
    title: "Java Fundamentals for Beginners",
    issuer: "Udemy",
    date: "13 August 2023",
    credentialUrl: "https://www.udemy.com/certificate/UC-fae36a36-56a0-49b0-ad32-ca85caa99565/",
  },
  {
    title: "EF SET English Certificate 48/100 (B1 Intermediate)",
    issuer: "EF SET",
    date: "May 2025",
    credentialUrl: "https://cert.efset.org/uUcK8H",
  },
];

export const achievements: Achievement[] = [
  {
    title: "",
    description: "",
    date: "",
    badge: "",
  },
];
