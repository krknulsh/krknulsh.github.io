# Portfolio

## Overview

신입 Software Engineer 지원을 위한 단일 페이지 포트폴리오입니다.

프로젝트 경험을 중심으로 지원자의 역할과 사용 기술을 빠르게 확인할 수 있도록 구성했습니다. 콘텐츠와 UI를 분리하여 프로젝트, 기술, 프로필 정보를 화면 컴포넌트를 수정하지 않고 관리할 수 있습니다.

현재 페이지는 다음 섹션으로 구성됩니다.

- Hero / About
- Projects
- Skills
- Experience / Research
- Education / Certification
- Contact

확인되지 않은 정보와 링크는 임의로 채우지 않습니다. URL은 `null`, 아직 정리되지 않은 목록은 빈 배열로 유지하며 UI에서 숨기거나 placeholder로 처리합니다.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- ESLint

## Project Structure

```text
portfolio/
├── docs/                          # 포트폴리오 원본 정보 및 작성 지침
├── public/
│   └── assets/
│       ├── profile/               # 프로필 이미지
│       └── projects/              # 프로젝트별 이미지
├── src/
│   ├── components/                # 재사용 가능한 UI 컴포넌트
│   │   ├── Navigation/
│   │   ├── ProjectCard/
│   │   ├── SectionTitle/
│   │   ├── SkillGroup/
│   │   └── TimelineList/
│   ├── sections/                  # 페이지 섹션 컴포넌트
│   │   ├── Hero/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Education/
│   │   └── Contact/
│   ├── data/                      # UI와 분리된 포트폴리오 콘텐츠
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   └── navigation.ts
│   ├── types/
│   │   └── portfolio.ts           # 콘텐츠 데이터 타입
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

필요 환경:

- Node.js
- npm

의존성을 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 엽니다.

코드 품질 검사는 다음 명령으로 실행합니다.

```bash
npm run lint
```

## Build

TypeScript 검사와 production build를 실행합니다.

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. 로컬에서 production build를 확인하려면 다음 명령을 사용합니다.

```bash
npm run preview
```

## Deployment

이 프로젝트는 GitHub Actions를 통해 GitHub Pages에 배포됩니다.

- Repository: `krknulsh/krknulsh.github.io`
- Production URL: <https://krknulsh.github.io/>
- Workflow: `.github/workflows/deploy.yml`
- Trigger: `main` 브랜치 push 또는 수동 실행

배포 workflow는 다음 순서로 실행됩니다.

1. 저장소 checkout
2. Node.js 설정
3. `npm ci`로 의존성 설치
4. `npm run build` 실행
5. `dist/`를 GitHub Pages artifact로 업로드
6. `github-pages` environment에 배포

이 저장소는 `https://krknulsh.github.io/` 루트에서 제공되는 사용자 페이지 저장소이므로 Vite의 `base`는 `/`입니다.

처음 배포하기 전 GitHub 저장소의 **Settings → Pages → Build and deployment → Source**가 **GitHub Actions**로 설정되어 있는지 확인합니다.

## How to Update Content

포트폴리오 콘텐츠는 `src/data`에서 관리합니다. 텍스트나 링크를 변경하기 위해 section 또는 component JSX를 수정하지 않습니다.

- 프로필, 소개, 연락처: `src/data/profile.ts`
- 프로젝트: `src/data/projects.ts`
- 기술: `src/data/skills.ts`
- 연구 및 경험: `src/data/experience.ts`
- 학력 및 자격: `src/data/education.ts`
- 내비게이션: `src/data/navigation.ts`

확인되지 않은 URL은 `null`로 유지합니다. 프로젝트 링크가 `null`이면 해당 버튼은 표시되지 않습니다.

### Add Project

1. `src/data/projects.ts`의 `projects` 배열에 `Project` 객체 하나를 추가합니다.
2. `id`는 다른 프로젝트와 중복되지 않는 값으로 지정합니다.
3. 확인된 역할과 기술만 `roles`, `skills` 배열에 입력합니다.
4. 이미지가 있다면 `public/assets/projects/<project-id>/`에 저장하고 `coverImage`에 공개 경로를 입력합니다.
5. 확인된 링크만 `github`, `detail`, `demo`에 입력합니다. 미확정 링크는 `null`로 둡니다.

예시:

아래의 `TODO_*` 값은 실제 확인된 정보로 교체해야 하는 표식입니다.

```ts
{
  id: 'project-id',
  title: TODO_TITLE,
  summary: TODO_SUMMARY,
  period: TODO_PERIOD,
  teamSize: TODO_TEAM_SIZE,
  type: TODO_PROJECT_TYPE,
  roles: [],
  skills: [],
  result: TODO_VERIFIED_RESULT,
  recognition: [],
  coverImage: null,
  github: null,
  detail: null,
  demo: null,
}
```

프로젝트를 추가할 때 `Projects` section, `ProjectCard`, 레이아웃 CSS는 수정하지 않습니다.

### Update Skills

`src/data/skills.ts`의 `skillCategories`를 수정합니다.

- 기존 카테고리에 기술을 추가하려면 해당 `skills` 배열에 값을 추가합니다.
- 새로운 카테고리가 필요하면 고유한 `id`, 표시할 `title`, `skills` 배열을 가진 객체를 추가합니다.
- 실제 프로젝트에서 사용한 것이 확인된 기술만 표시합니다.
- 숙련도를 별점이나 퍼센트로 표현하지 않습니다.

### Replace Images

이미지는 `public/assets` 아래에서 관리합니다.

```text
public/assets/
├── profile/
│   └── profile.png
└── projects/
    └── <project-id>/
        └── cover.png
```

프로필 이미지를 적용하려면 `src/data/profile.ts`의 `profileImage`에 다음과 같이 공개 경로를 입력합니다.

```ts
profileImage: '/assets/profile/profile.png'
```

프로젝트 대표 이미지는 해당 프로젝트의 `coverImage`에 입력합니다.

```ts
coverImage: '/assets/projects/<project-id>/cover.png'
```

이미지 값이 `null`이거나 파일을 불러오지 못하면 broken image icon 대신 neutral placeholder가 표시됩니다. 프로젝트 placeholder에는 해당 프로젝트명이 표시됩니다.
