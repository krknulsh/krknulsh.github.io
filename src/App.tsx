import { Navigation } from './components/Navigation/Navigation'
import { Contact } from './sections/Contact/Contact'
import { Education } from './sections/Education/Education'
import { Experience } from './sections/Experience/Experience'
import { Hero } from './sections/Hero/Hero'
import { Projects } from './sections/Projects/Projects'
import { Skills } from './sections/Skills/Skills'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  )
}
