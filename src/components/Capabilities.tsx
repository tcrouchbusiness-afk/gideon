import { Link } from 'react-router-dom'
import { CAPS } from '../data/capabilities'

export default function Capabilities() {
  return (
    <div className="cap-grid">
      {CAPS.map(c => (
        <Link key={c.n} to="/contact" className="cap-cell">
          <div>
            <div className="cap-num">CAP / {c.n}</div>
            <h3 className="cap-title">{c.t}</h3>
            <p className="cap-desc">{c.d}</p>
          </div>
          <div className="cap-foot">→ ENGAGE</div>
        </Link>
      ))}
    </div>
  )
}
