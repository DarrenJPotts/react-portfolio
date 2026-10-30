import Link from 'next/link';
import { getExperience } from '../../lib/content';

export default function Experience() {
  return (
    <section
      className="experience section wrap"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">THE WORK BEHIND THE WORK</p>
          <h2 id="experience-title">
            Experience<span className="accent">.</span>
          </h2>
        </div>
        <Link className="button" href="/cv">
          View my CV ↗
        </Link>
      </div>
      <div className="experience-list">
        {getExperience().map((item) => (
          <article className="experience-entry" key={item.id}>
            <div className="experience-date">
              <span>{item.period}</span>
              {item.sample && <span className="content-label">EXAMPLE ENTRY</span>}
            </div>
            <div>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.organization}</p>
              <p>{item.description}</p>
              <ul>
                {item.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
