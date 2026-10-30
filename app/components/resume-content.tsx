import { contactDetails } from './desktop/data';

const experience = [
  {
    role: 'Software Engineer',
    company: 'Agile Bridge',
    period: '2022 — Present',
    note: 'Progressed from Junior through Intermediate to Software Engineer.',
    clients: [
      {
        name: 'TFN',
        details: [
          'Led mobile application and frontend development.',
          'Designed modular architecture across React and React Native codebases.',
          'Worked with a designer on a reusable design system and component library; published and maintained NPM packages.',
        ],
      },
      {
        name: 'King Price · EasySure Denmark',
        details: [
          'Built and maintained cross-platform mobile features with Flutter and supporting .NET services.',
          'Worked on .NET services that support the mobile applications.',
        ],
      },
      {
        name: 'KCS',
        details: [
          'Developed mobile applications using Flutter and .NET MAUI.',
          'Built .NET microservices and integrations with external services.',
        ],
      },
      {
        name: 'CropSure · Lafeki',
        details: [
          'Developed the Lafeki/CropSure mobile application using .NET MAUI.',
          'Built the CropSure admin portal with Angular and .NET.',
        ],
      },
      {
        name: 'Dashpay',
        details: [
          'Contributed to the Flutter mobile application in an agile, cross-functional team.',
        ],
      },
      {
        name: 'WeBuyCars',
        details: [
          'Contributed to the Buy Lead Management System, Buyers Mobile App, and Dynamic Rules Engine.',
        ],
      },
    ],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Flowtech',
    period: '2020 — 2022',
    details: [
      'Developed full-stack applications using .NET Core, MVC, and React.',
      'Built cross-platform mobile applications with React Native.',
      'Worked across frontend and backend development.',
    ],
  },
];

const skillGroups = [
  { label: 'Mobile', values: 'Flutter · Dart · .NET MAUI · React Native' },
  { label: 'Frontend', values: 'Angular · React · JavaScript' },
  { label: 'Backend', values: 'C# · .NET · REST APIs · Microservices' },
  { label: 'Practices', values: 'Agile · Git · CI/CD · MVVM' },
];

export function ResumeContent() {
  return (
    <div className="resume-content">
      <p className="resume-profile">
        Software engineer with 5+ years of full-stack experience, specialising in mobile
        development. Experienced in cross-platform applications with Flutter, .NET MAUI,
        and React Native, supported by .NET services and modern web frontends. I work
        across architecture, reusable UI systems, delivery, and maintenance.
      </p>

      <div className="resume-contact-list" aria-label="Contact details">
        <a href={`tel:${contactDetails.phone.replaceAll(' ', '')}`}>
          <span>PHONE</span>
          {contactDetails.phone}
        </a>
        <a href={`mailto:${contactDetails.email}`}>
          <span>EMAIL</span>
          {contactDetails.email}
        </a>
        <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">
          <span>LINKEDIN</span>
          Darren Potts ↗
        </a>
        <a href={contactDetails.github} target="_blank" rel="noreferrer">
          <span>GITHUB</span>
          DarrenJPotts ↗
        </a>
        <span className="resume-location">
          <span>LOCATION</span>
          {contactDetails.location}
        </span>
      </div>

      <section>
        <h3>Experience</h3>
        {experience.map((job) => (
          <article className="resume-job" key={job.company}>
            <header>
              <strong>{job.company}</strong>
              <span>
                {job.role} · {job.period}
              </span>
            </header>
            {job.note && <p className="resume-job-note">{job.note}</p>}
            {job.clients ? (
              <div className="resume-clients">
                {job.clients.map((client) => (
                  <div key={client.name}>
                    <h4>{client.name}</h4>
                    <ul>
                      {client.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul>
                {job.details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section>
        <h3>Skills</h3>
        <div className="resume-skills">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h4>{group.label}</h4>
              <p>{group.values}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Education</h3>
        <p>
          <strong>National Certificate</strong>
          <br />
          3D Animation, Visual Effects and Game Development
          <br />
          WW.IT-IQ Training &amp; Solutions
        </p>
      </section>

      <section>
        <h3>Languages</h3>
        <p>English · Afrikaans</p>
      </section>
    </div>
  );
}
