import { navigationItems } from '../../data/navigation'

export function Navigation() {
  return (
    <header className="site-header">
      <nav aria-label="주요 메뉴" className="container navigation">
        <a className="navigation__brand" href="#about">
          Portfolio
        </a>
        <ul className="navigation__list">
          {navigationItems.map((item) => (
            <li key={item.target}>
              <a href={`#${item.target}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
