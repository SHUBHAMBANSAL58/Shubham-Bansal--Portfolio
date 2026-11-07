import { ContactFormValues, FormErrors, Project } from '../types/portfolio';

export function validateContactForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please provide your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const trimmedEmail = values.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  const trimmedSubject = values.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please provide a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please provide a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters for meaningful detail.';
  }

  return errors;
}

export function filterProjects(
  projects: Project[],
  activeCategory: string = 'All',
  activeTech: string = 'All',
  selectedTags: string[] = []
): Project[] {
  let result = projects;
  if (activeCategory && activeCategory !== 'All') {
    const normCategory = activeCategory.toLowerCase().trim();
    result = result.filter((project) => {
      // Direct category equality
      if (project.category.toLowerCase() === normCategory) return true;
      // Tagged projectTypes match
      if (project.projectTypes?.some((pt) => pt.toLowerCase() === normCategory)) return true;

      // Smart semantic category grouping
      if (normCategory === 'web') {
        return (
          project.projectTypes?.includes('Web') ||
          project.category.toLowerCase().includes('web') ||
          project.category.toLowerCase().includes('full stack') ||
          project.category.toLowerCase().includes('e-commerce')
        );
      }
      if (normCategory === 'ai/ml' || normCategory === 'ai') {
        return (
          project.projectTypes?.includes('AI/ML') ||
          project.category.toLowerCase().includes('ai') ||
          project.primaryTechnologies?.some((t) => t.toLowerCase().includes('ai')) ||
          project.technologies.some((t) => t.toLowerCase().includes('ai'))
        );
      }
      if (normCategory === 'tools' || normCategory === 'tool') {
        return (
          project.projectTypes?.includes('Tools') ||
          project.category.toLowerCase().includes('tool') ||
          project.category.toLowerCase().includes('team') ||
          project.title.toLowerCase().includes('tool') ||
          project.title.toLowerCase().includes('management')
        );
      }

      return project.category.toLowerCase().includes(normCategory);
    });
  }
  if (activeTech && activeTech !== 'All') {
    const normalizedTech = activeTech.toLowerCase().trim();
    result = result.filter((project) => {
      const matchPrimary = project.primaryTechnologies?.some((t) => {
        const norm = t.toLowerCase();
        return norm.includes(normalizedTech) || normalizedTech.includes(norm);
      });
      if (matchPrimary) return true;
      return project.technologies.some((t) => {
        const norm = t.toLowerCase();
        return norm.includes(normalizedTech) || normalizedTech.includes(norm);
      });
    });
  }
  if (selectedTags && selectedTags.length > 0) {
    result = result.filter((project) => {
      const allProjectTech = [
        ...(project.primaryTechnologies || []),
        ...project.technologies,
        ...(project.projectTypes || [])
      ].map((t) => t.toLowerCase());

      return selectedTags.every((tag) => {
        const normTag = tag.toLowerCase().trim();
        return allProjectTech.some(
          (t) => t.includes(normTag) || normTag.includes(t)
        );
      });
    });
  }
  return result;
}


export function searchSkills(
  categories: { title: string; skills: { name: string; description: string }[] }[],
  query: string
) {
  if (!query || !query.trim()) {
    return categories;
  }
  const normalized = query.toLowerCase().trim();
  return categories
    .map((category) => ({
      ...category,
      skills: category.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(normalized) ||
          skill.description.toLowerCase().includes(normalized)
      )
    }))
    .filter((cat) => cat.skills.length > 0);
}
