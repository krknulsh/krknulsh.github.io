# Codex Instructions — Developer Portfolio

## Objective

PORTFOLIO_MASTER.md와 PROJECT_DATA.md를 기반으로
신입 Backend Developer Portfolio를 구현한다.

참고 사이트의 장점인
"한 페이지 세로 스크롤 + 명확한 섹션 구조"는 참고하되
레이아웃이나 스타일을 그대로 복제하지 않는다.

포트폴리오의 목적은:
1. 30~60초 안에 지원자를 이해시키는 것
2. 프로젝트가 가장 먼저 눈에 들어오게 하는 것
3. GitHub README로 자연스럽게 이동시키는 것
4. 새로운 프로젝트를 쉽게 추가할 수 있게 하는 것

---

# Architecture Requirement

콘텐츠를 JSX/HTML 안에 하드코딩하지 않는다.

반드시 다음처럼 데이터와 UI를 분리한다.

```text
src/
├── components/
│   ├── Hero
│   ├── ProjectCard
│   ├── SkillGroup
│   ├── Experience
│   └── Contact
│
├── data/
│   ├── profile
│   ├── projects
│   └── skills
│
├── sections/
│   ├── About
│   ├── Projects
│   ├── Skills
│   ├── Experience
│   └── Contact
│
└── assets/
```

새 프로젝트 추가는
projects data에 객체 하나를 추가하는 것으로 가능해야 한다.

---

# Page Structure

Order:

1. Hero / About
2. Projects
3. Skills
4. Experience / Research
5. Education / Certification
6. Contact

---

# UX

Desktop + Mobile Responsive.

Navigation:
- About
- Projects
- Skills
- Experience
- Contact

Navigation 클릭 시 해당 section으로 scroll.

Optional:
- Sticky navigation

Do not:
- 과도한 animation
- page transition
- particle effect
- loading animation
- 3D
- 기술 badge 과잉 사용

---

# Style Direction

Keywords:

- Clean
- Technical
- Minimal
- Spacious
- Modern
- Backend Developer

Colors:
- neutral background
- dark text
- one accent color

Typography:
- Korean readability first
- clear title hierarchy

---

# Project Card

ProjectCard should accept:

```ts
type Project = {
  id: string;
  title: string;
  summary: string;
  period: string;
  teamSize?: number;
  roles: string[];
  skills: string[];
  coverImage: string;
  github?: string;
  detail?: string;
};
```

Project Card display:
- Cover
- Project title
- One-line description
- Period
- Role
- Main technologies
- GitHub button
- Detail button (optional)

---

# Project Detail Strategy

메인 Portfolio 내부에 기술 세부 설명을 모두 넣지 않는다.

GitHub README:
- Architecture
- Core Features
- API
- Database
- Technical Decisions
- Troubleshooting
- Deployment
- Getting Started

Portfolio:
- Summary
- Role
- Tech
- Main result
- GitHub

---

# Content Integrity

다음 내용을 완료한 기능으로 표시하면 안 된다.

AI Mental Care:
- Image emotion analysis
- Voice emotion analysis

해당 기능은 "future extension" 또는
"multimodal extension design" 정도로만 표현한다.

모르는 정보는 추측하지 말고 TODO로 남긴다.

---

# Future Expansion

프로젝트가 추가돼도 다음은 수정하지 않아야 한다.

- layout
- component structure
- CSS architecture

수정해야 할 것은:
- project data
- images
- links

가능하면 Skills 또한 data-driven 방식으로 만든다.

---

# README

Portfolio repository 자체에도 README.md를 만든다.

README 항목:

1. Portfolio Overview
2. Tech Stack
3. Project Structure
4. Local Development
5. Deployment
6. Content Update Guide

"새 프로젝트 추가 방법"을 반드시 작성한다.

---

# Deployment

GitHub Pages 또는 Vercel 중 하나를 사용할 수 있도록 구성한다.

GitHub Pages를 선택할 경우
repository 이름에 의존하는 base path 문제를 고려한다.

---

# Important

코드를 작성하기 전에:

1. PORTFOLIO_MASTER.md 읽기
2. PROJECT_DATA.md 읽기
3. ASSET_CHECKLIST.md 읽기
4. 구현 계획 작성
5. 필요한 TODO 정리
6. 구현

기능 구현 후:

1. production build
2. broken link 확인
3. mobile layout 확인
4. image fallback 확인
5. console error 확인
