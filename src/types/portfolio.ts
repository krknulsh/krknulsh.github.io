export type OptionalUrl = string | null

export type Profile = {
  name: string | null
  title: string
  introduction: string
  highlights: string[]
  profileImage: string | null
  links: {
    phone: string | null
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
  domain?: string
  roles: string[]
  skills: string[]
  result: string
  recognition?: string[]
  coverImage: string | null
  github: OptionalUrl
  detail: OptionalUrl
  demo: OptionalUrl
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
