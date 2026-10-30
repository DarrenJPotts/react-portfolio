import Link from 'next/link';

export default function CvPage() {
  return (
    <main className="cv-page">
      <header>
        <span>DP_OS / DOCUMENTS / CV</span>
        <Link href="/">Close</Link>
      </header>
      <article>
        <p>CURRICULUM_VITAE.txt</p>
        <h1>Darren Potts</h1>
        <h2>Mobile developer</h2>
        <p>
          Replace this page with your experience, education, selected projects and contact
          details.
        </p>
        <section>
          <h3>Experience</h3>
          <p>Your role · Company · Dates</p>
          <p>Describe your responsibilities and measurable outcomes.</p>
        </section>
        <section>
          <h3>Skills</h3>
          <p>Mobile development · UI implementation · APIs · Testing · Motion</p>
        </section>
      </article>
    </main>
  );
}
