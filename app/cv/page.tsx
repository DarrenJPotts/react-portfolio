import Link from 'next/link';
import { ResumeContent } from '../components/resume-content';
import PrintButton from './print-button';

export default function CvPage() {
  return (
    <main className="cv-page">
      <header>
        <span>DP_OS / DOCUMENTS / CV</span>
        <nav aria-label="CV actions">
          <Link href="/">Close</Link>
          <PrintButton />
        </nav>
      </header>
      <article>
        <p>CURRICULUM VITAE / DARREN POTTS</p>
        <h1>Darren Potts</h1>
        <h2>Software Engineer · Mobile &amp; Full Stack</h2>
        <ResumeContent />
      </article>
    </main>
  );
}
