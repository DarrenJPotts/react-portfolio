// File-backed content boundary. A CMS can replace these readers later.
import { profile, projects, experience, education, caseStudies } from '../data/portfolio';

export function getProfile() {
  return profile;
}
export function getProjects() {
  return projects;
}
export function getProject(slug: string) {
  return projects.find((project) => project.id === slug);
}
export function getCaseStudy(slug: string) {
  return caseStudies[slug];
}
export function getExperience() {
  return experience;
}
export function getEducation() {
  return education;
}
