export type OptionalUrl = string | null

export type Profile = {
  name: string | null
  title: string
  introduction: string
  highlights: string[]
  links: {
    github: OptionalUrl
    email: OptionalUrl
    resume: OptionalUrl
    blog: OptionalUrl
    linkedIn: OptionalUrl
  }
}

export type Project = {
  id: string
  title: string
  summary: string
  period: string
  teamSize: number
  type: string
  roles: string[]
  skills: string[]
  result: string
  recognition?: string[]
  github: OptionalUrl
  detail: OptionalUrl
  demo: OptionalUrl
  architecture: 'daseo' | 'mental-care'
  stories: Array<{
    id: string
    title: string
    kind?: '후속 구조 개선'
    focus: string[]
    problem: string
    cause: string
    process: string[]
    result: string
    verification: string
    note?: string
  }>
}

export type SkillCategory = {
  id: string
  title: string
  skills: string[]
}

export type TimelineItem = {
  id: string
  title: string
  organization: string | null
  period: string | null
  description: string
  details?: Array<{
    title: string
    items: string[]
  }>
  learning?: string
}

export type NavigationItem = {
  label: string
  target: string
}
