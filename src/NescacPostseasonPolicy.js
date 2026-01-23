import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/NescacPostseasonPolicy.css';

const navSections = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'literature-review', label: 'Literature review' },
  { id: 'results', label: 'Results' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'references', label: 'References' },
];

export default function NescacPostseasonPolicy() {
  const pdfUrl = process.env.PUBLIC_URL + '/docs/nescac_policy.pdf';
  const [activeSection, setActiveSection] = useState(navSections[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setActiveSection(navSections[0]?.id || '');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        const best = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best && best.target && best.target.id) {
          setActiveSection(best.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container edg-container nescac-container">
      <header className="edg-hero nescac-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <h1 className="edg-title">NESCAC Postseason Policy</h1>
            <p className="edg-subtitle">An iceberg analysis of institutional change, stakeholder complexity, and academic–athletic constraints in liberal arts colleges</p>
            <div className="edg-cta">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open the NESCAC Postseason Policy PDF"
              >
                Download PDF
              </a>
              <Link
                to="/project"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Back to project list"
              >
                Back to Projects
              </Link>
            </div>
          </div>

          <div className="edg-hero-panel nescac-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent nescac-hero-card">
              <span className="edg-label">At a glance</span>
              <ul className="nescac-glance">
                <li>Founded in 1971 with 11 liberal arts colleges in Northeast America.</li>
                <li>Chose "Conference" (not "League") to avoid championship pressure and arms races.</li>
                <li>Early rules limited practices, season length, recruiting, travel, budgets, and postseason play.</li>
                <li>Postseason ban lasted 22 years; lifted in 1993 as a three-year experiment.</li>
                <li>Individuals could qualify with waivers while team sports were barred, raising equity concerns.</li>
                <li>Title IX and national visibility arguments added momentum for NCAA postseason participation.</li>
                <li>121 Division III national titles as of Apr 1, 2024; second-highest nationally (+49 over third).</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="edg-layout">
        <nav className="edg-side-nav" aria-label="NESCAC Postseason Policy sections">
          <div className="edg-side-title">Paper sections</div>
          <ul className="edg-side-list">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  className={`edg-side-link${activeSection === section.id ? ' is-active' : ''}`}
                  href={`#${section.id}`}
                  aria-current={activeSection === section.id ? 'location' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nescac-side-cta">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button nescac-side-button"
              aria-label="Open the NESCAC Postseason Policy PDF"
            >
              View PDF
            </a>
          </div>
        </nav>

        <main className="edg-main nescac-main">
          <section className="edg-section edg-panel" id="abstract">
            <div className="edg-section-header">
              <span className="edg-kicker">Abstract</span>
              <h2 className="edg-h2">Balancing academic excellence and athletic competition</h2>
            </div>
            <div className="nescac-prose">
              <p>
                The New England Small College Athletic Conference (NESCAC) was established in 1971. It was founded on the
                principles of balancing the harmony between academics and athletics. Its main mission was to prevent toxic
                athletic arms races and safeguard the rigorous academic standards of the member schools. For two decades,
                the NESCAC members opted not to compete in any NCAA team postseason competition due to their concern about
                imposing excessive pressure and tensions among students, coaches, admission officers, faculties,
                administrators, and many other stakeholders. Despite the potential negative impacts the postseason
                competition would bring to NESCAC schools, due to internal pressure from students and coaches as well as
                external pressure from competitive peer institutions, the NESCAC presidents voted to lift the postseason
                ban in 1993. This paper explores the intricate interplay among multiple stakeholders as higher education
                undergoes changes.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="introduction">
            <div className="edg-section-header">
              <span className="edg-kicker">Introduction</span>
              <h2 className="edg-h2">From a postseason ban to national titles</h2>
            </div>
            <div className="nescac-prose">
              <p>
                New England Small College Athletic Conference, also known as NESCAC, comprises eleven liberal arts colleges
                in Northeast America. The conference first permitted NCAA team championship participation as a three-year
                experiment in 1993. As of April 1, 2024, NESCAC has amassed 121 Division III national titles, ranking second
                highest in the nation, surpassing the third place by an additional 49 titles (National Championships 2024).
                This is an impressive result for a conference where academics always come first, despite lifting the
                postseason competition ban just thirty years ago. The transition from no-postseason to postseason took a
                long time and a lot of negotiations. This raises questions about why a conference with successful teams
                would prefer to abstain from NCAA national competition for the first twenty-two years and what factors
                facilitated the transition to the postseason era. Answering those questions would help researchers
                understand the history and development of NESCAC.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="literature-review">
            <div className="edg-section-header">
              <span className="edg-kicker">Literature review</span>
              <h2 className="edg-h2">Prestige, donors, and institutional change</h2>
            </div>
            <div className="nescac-prose">
              <p>
                Higher education is more than a place where students go after high school. It is at the intersection that
                connects high school students, professors, administrators, social status, alumni, and many other
                stakeholders, and thereby it is "a hub, connecting multiple social processes that often are regarded as
                distinct" (Stevens 2008:128). To operate a higher education institution, the public schools have federal and
                state funding, and the private institutions have donations from their generous alumni. With more money and
                donations, the colleges would be able to build more facilities, hire more well-known professors, and attract
                more high-achieving students. These factors will lead to an increase in admission selectivity and name
                recognition.
              </p>
              <p>
                The more prestigious the colleges become, the more money they would receive especially from their alumni
                because wealthy philanthropists love to "serve on the board of the alma mater as it gains prestige from
                increasingly selective admissions" (Eaton 2022:34). After all, even when a donor has familiarity with an
                organization, its prestige will still be a factor in eliciting largest contributions (Ostrower 1995:41). For
                wealthy people, donating to prestigious universities is an investment and exchange that buys them a seat and
                social status at the board of prestigious institutions and makes connections with other wealthy people on
                the board.
              </p>
              <p>
                As a result, this would lead to a positive cycle in that wealthy and well-known schools such as the Ivy
                League universities accumulate more and more wealth and name recognition while low-ranking and endowment
                schools may face the possibility of shutting down.
              </p>
              <p>
                However, attracting philanthropists to donate is the first step. The most challenging aspect for the
                administration of the institutions is to keep the donors to donate continuously. To attract more applicants
                and improve the prestigiousness of the schools, it would be unavoidable to modify the current admission,
                academic, and administrative policy. However, it is far more complicated to make changes in higher
                education because there are so many stakeholders. It is not just the donors but also the students,
                professors, and alumni.
              </p>
              <p>
                Trying to make some changes to the current status of higher education, is like an iceberg that "most of the
                danger lies below the surface" (Buller 2014:5). While the iceberg above the water consists of the cost,
                time, and quality of the change, the iceberg below the surface is far more complicated, and to manage the
                process smoothly, it is necessary to "understand the political environment and power dynamics of the
                organization in which they work" (Buller 2014:7). If the administration does not handle it well, it may lead
                to serious, irretrievable consequences. As a result, the change in higher education would take a
                considerable amount of time and analysis before putting into action.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="results">
            <div className="edg-section-header">
              <span className="edg-kicker">Results</span>
              <h2 className="edg-h2">Why NESCAC resisted postseason play</h2>
            </div>
            <div className="nescac-prose">
              <h3 className="nescac-subhead">Founding principles and early restrictions</h3>
              <p>
                In 1971, due to the increasing competitiveness in college athletics, the presidents of eleven small liberal
                arts colleges believed that these athletics arm race phenomena "worked against small liberal arts colleges,
                and some form of athletic organization between these schools would provide a necessary" (Velez 1997:4), so
                the presidents of those colleges came together and established the New England Small College Athletic
                Conference to ensure that:
              </p>
              <blockquote className="nescac-quote">
                <p>
                  Intercollegiate athletics is to be kept in harmony with the essential education purposes of the
                  institution, competing players are to be representative of the student body, and the academic authority
                  in each college is to control intercollegiate athletic policy.
                </p>
                <cite>Witteman, 1971</cite>
              </blockquote>
              <p>
                All of the NESCAC member schools shared two common characteristics: small size and similarly highly
                selective admission profiles, along with rigorous academic standards. The conference had restricted
                regulations on the number of practices, the length of the season, foreign travels, budget spending,
                recruitment, and especially postseason competition. Those restrictions were to prevent an athletics arms
                race and safeguard the unshakable priority of academics in those institutions.
              </p>
              <p>
                This explains why NESCAC chose "Conference" instead of "League" in its name because "presidents feared that
                a league would imply championships, increasing pressure to win" (A Reflection 1995:2). As a result, the
                underlying philosophy of NESCAC was to foster a balanced relationship between academics and athletics as
                well as protect the member schools from excessive athletic rivalry.
              </p>
              <p>
                However, since the founding of NESCAC, the conversation and the discussion of allowing teams to join the
                postseason competition were always brought up during presidents' meetings, but the majority of the
                presidents would always "reaffirm their commitment to the prohibition of team participation to allay
                growing competitive pressure on teams" (Velez 1997:14). The presidents argued that allowing NCAA
                participation would undermine NESCAC's founding principle by creating a lot of pressure on colleges
                including the admissions office, coaches, student-athletes, and many other stakeholders.
              </p>

              <h3 className="nescac-subhead">Academic impact and faculty concerns</h3>
              <p>
                First of all, participating in postseason competitions would result in more class time loss and exam
                absences for students. President Sawyer of Williams College emphasized this concern and stated that such
                circumstances could "put more pressure on students and on the total system than current conditions will
                stand, and can generate the kind of faculty or student alienation from the intercollegiate athletic program
                that could threaten the whole" (N.E.S.C.A.C. PHILOSOPHY 1971). President Sawyer's concern underscored the
                delicate balance between academics and athletics within NESCAC institutions. Due to time conflicts between
                NESCAC school schedules and NCAA postseason competitions, student-athletes would have a higher chance of
                missing classes and exams. Additionally, his statement pointed out that maintaining this balance between
                academics and athletics is crucial for receiving continued support from faculty members who are essential
                stakeholders in higher education and collegiate athletics.
              </p>
              <p>
                Indeed, in 1996, three years after the lift of the postseason ban, President Payne of Williams College
                expressed frustration to other NESCAC presidents, stating, "We suddenly had many applications for waivers
                for full teams right through the heart of examinations. I challenged the Presidents on this, indicating we
                were essentially destroying the rule by continuous exemption" (Velez 1997:35). As the primary decision
                makers at Williams College, both President Sawyer and President Payne were central figures in gathering
                substantial and important feedback. They both gauged the negative impact of postseason competitions on the
                school, especially its erosion on NESCAC's commitment to protect and centralize academic priorities. Their
                concerns resonated among NESCAC presidents and reaffirmed their decision to maintain the prohibition on
                postseason participation. Furthermore, since there is a fixed annual running budget, increasing the
                athletic budget means spending less budget on academics including research, paychecks, and facilities, which
                runs counter to the principle "academic comes first." This would lead to more tension between the
                administrators and the faculty members at the college.
              </p>

              <h3 className="nescac-subhead">Admissions and financial aid pressures</h3>
              <p>
                In addition, the postseason policy would add more pressure on the admission office and administrator.
                NESCAC schools were small colleges, and most of the members only had five hundred new incoming students each
                year. If the goal of the admission office was to build a few teams that would qualify for nationals, this
                would lead to accepting students with less qualified academic backgrounds, which would be hypocritical for a
                NESCAC school that was proud of its rigorous academics.
              </p>
              <p>
                When the postseason was allowed, schools such as Trinity College "allotted severity-one spots to athletics
                prospects who would otherwise not be able to gain admission" (Covell 2022:164). What's more, NESCAC has a
                strict scholarship policy that "financial aid to students shall be determined solely on the basis of need as
                computed by the College Scholarship Service and controlled by the Financial Aid Officer" (Athletic
                Conference Agreement 1970:5). This would direct more pressure on the admission office because not only would
                they have to admit less qualified applicants, but also provide financial aid to those recruited athletes.
                For NESCAC schools, a large amount of financial aid was donated by alumni because the alumni endorsed the
                mission and the philosophy of the college, and providing admission and financial aid to recruiting athletes
                while rejecting qualified applicants would deteriorate the relationship between the school and generous
                alumni.
              </p>

              <h3 className="nescac-subhead">Athletes, coaches, and competitive pressure</h3>
              <p>
                The policy also posed more pressure on student-athletes and coaches that would eventually disrupt their
                longstanding strong relationships. The NESCAC schools have always been proud of their reputation for great
                relationships between coaches and student-athletes. In an editorial "Ivy League Should Follow Example Set
                by NESCAC," Woody Anderson of the Hartford Courant described NESCAC in 1980 as:
              </p>
              <blockquote className="nescac-quote">
                <p>
                  They don't waste time filling their teams with top athletes but rather work with what walks in the front
                  door. They don't have to worry about getting so and so past the admissions department. They are not
                  blinded by a "must win" philosophy.
                </p>
                <cite>NESCAC in the Media</cite>
              </blockquote>
              <p>
                However, this sustainable and healthy connection deteriorated once the door opened for athletes to pursue
                national championships. The athletic program lost its purity; it shifted focus from enabling athletes to
                continue playing the sports they loved to be competitive and pursue victory. The nature of competition would
                force coaches to spend more time recruiting athletes instead of focusing on the personal and athletic
                growth of the current players. The players would have higher pressure to perform well in the tournament even
                at the beginning of the regular season because "losing early games defeats morale for the rest of the season
                and makes the remaining NESCAC games all the more stressful" (Covell 2022:155). This violated the role and
                mission of athletics in NESCAC schools to promote student's physical and mental health because it certainly
                posed more stress and anxiety to students.
              </p>
              <p>
                Moreover, more attention on the winning record due to the postseason policy would also increase the
                conflicts among coaches, athletes, and alumni. Several years after the ban was lifted, this concern indeed
                became a reality, as the athletic director of Amherst College Peter Gooding complained that he "grew tired
                of meeting with parents and athletes who wanted a coach fired because the team didn't make the NCAAs"
                (Covell 2022:158). This certainly broke the founding principle of NESCAC as it crossed the boundaries since
                it would trigger an athletics arms race among all of the NESCAC schools.
              </p>
              <p>
                Nonetheless, despite all of the disadvantages and conflicts that might occur, the pressure of having a
                postseason was much stronger both internally and externally.
              </p>

              <h3 className="nescac-subhead">Equity, visibility, and Title IX</h3>
              <p>
                The most important argument for pro-postseason was for consistency and equity. Even though NESCAC
                prohibited the teams from attending national championships, the individual qualifiers would still be
                allowed to compete if obtaining the waiver from NESCAC. This was unfair to team sports such as lacrosse,
                hockey, and soccer. Meanwhile, it also reduced the number of qualifiers for teams such as cross country and
                track that could attend national if allowing team competition. The major push to change came from the
                coaches. In an angry letter addressing the unfair postseason policy from Bowdoin Cross Country Coach Peter
                Slovenski to Bowdoin President Edwards in 1992:
              </p>
              <blockquote className="nescac-quote">
                <p>
                  I do not understand how a sweeping rule capping off excellence in athletics fits into the governance of a
                  group of colleges. Setting rules for equality of practice sessions, competitions, scholarships, academic
                  obligations, and recruiting makes perfect sense. When a team follows these rules, and excels, it does not
                  make any sense to limit the height of their success... How do I get this rule changed without complaining?
                  I am so frustrated about trying to change this rule through channels that I am ready to quit over it. I
                  cannot find the channel. The students cannot find the channels. Do the channels exist, and will they
                  seriously and thoughtfully consider student options?
                </p>
                <cite>Slovenski 1992</cite>
              </blockquote>
              <p>
                Witnessing their athletes not obtaining deserving awards frustrated the coaches because they could not find
                a way or an alternative to help their athletes reach the stage they deserved. Similarly, student-athletes
                were dissatisfied and angered by its effects. A student-athlete at Hamilton College complained, "We are
                deluding ourselves if we think we will be able to attract these same quality individuals by creating our own
                organization outside the parameters of mainstream competition" (Response from student athlete). For
                dedicated athletes, the unreasonable policy of the conference became the sole barrier preventing them from
                competing at a higher level. The student-athletes felt that they were forced to be in the bubble and
                isolated from athletes of institutions outside NESCAC, and they believed such isolation would hinder their
                personal growth. Those disappointments from the students would lead NESCAC to lose prospective
                student-athletes to its competitor schools such as MIT, a place that provides both excellent academic and
                athletics programs. The pressure of losing quality student-athletes along with the coaches' threat to
                resign add a certain amount of pressure to the administrators of NESCAC.
              </p>
              <p>
                What's more, other than losing great student-athletes to other schools, not competing in the NCAA would
                also lose non-student athletes to schools in other conferences because competing at the national level would
                increase the visibility of NESCAC. One great example was the squash program at Trinity College. Due to its
                unsafe geographic location and small endowment, Trinity suffered from a low yield rate. Trinity President
                Dobelle had identified squash as a sport in which his school could compete against the Ivies and
                potentially share and steal some of the Ivies ideal brand equity (Covell 2022:162) because most of the
                squash programs were supported by the Ivy League schools. The president hired coach Assaiante to heavily
                recruit from overseas and built a successful team that captivated a lot of national attention. In an article
                from the New York Times Magazine in 2011, the title was "Squashing the Ivies" (Wachter 2011) telling the
                story of the Trinity squash team beating the Ivy League schools and dominating the national titles for
                twelve years. Being exposed to the spotlight of media enabled NESCAC schools to have broader audiences
                outside New England and New York areas, and thereby the philosophy of NESCAC would reach more potential
                applicants. With a larger pool of candidates, NESCAC schools would have more excellent and diverse student
                bodies to pick from.
              </p>
              <p>
                The third force that incentivized the transition was to promote its national image. For example, Title IX
                was an anti-discriminatory federal regulation that prohibits any type of gender-based discrimination in
                educational settings. In the college sports context, this implied that there should not be any unequal
                opportunities based on gender including funding and schedules. Joining the NCAA would be a great path to
                implement actions that ensure gender equality because "NCAA Division III provided ample resources for both
                women's and men's competitions at a time when college funding for athletics was stretched to the limit in
                attempts to satisfy Title IX" (Velez 1997:15). Beyond obtaining more resources from NCAA to facilitate the
                growth of the women teams, NESCAC schools received even more name recognition when their women's teams became
                successful in the national competition because when Title IX was first introduced, women athletes were
                treated unfairly at other universities:
              </p>
              <blockquote className="nescac-quote">
                <p>
                  Women participating in intercollegiate athletics believe they are treated and perceived as second class
                  citizens. Some women athletes are stereotyped in regard to their assumed sexual preference, and are
                  considered to be different by their peers. Indeed, women may choose not to participate in athletics
                  because of their anxiety of being categorized.
                </p>
                <cite>Overview: Gender Equity</cite>
              </blockquote>
              <p>
                The success of the women's teams at the national level is an indicator of the successful implementation of
                Title IX at NESCAC schools. This proved that NESCAC women's teams were able to receive funding, equipment,
                practice time, and competing opportunities. This was an effective way to demonstrate the values of NESCAC
                and build a great national reputation. This tied back to the prior argument that the more national exposure
                of the conference value, the more name recognition and potential appreciation the NESCAC schools would
                receive, and thereby the school could have a larger pool to hand pick the most high-achieving students.
              </p>
              <p>
                The issue of equity, the desire for more national visibility, and the implementation of Title IX, the big
                environment that prospective students looked for larger stage to compete as well as "conditions surround
                post-season play in Division III have changed markedly in the past twenty years" (Edwards, Oakley, & Payne
                1992) eventually drove the NESCAC schools to play in the postseason.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="discussion">
            <div className="edg-section-header">
              <span className="edg-kicker">Discussion</span>
              <h2 className="edg-h2">The hidden stakeholders beneath the surface</h2>
            </div>
            <div className="nescac-prose">
              <p>
                The transition from a no postseason conference to the time when the ban was lifted took a lot of time,
                discussion, and negotiations among different parties. This process of change was like the iceberg. The part
                we could see was the debates among the presidents and students about the pros and cons of having a
                postseason. However, below the sea level, there were so many stakeholders that were involved that were not
                obvious. The jobs of the presidents were not just simply to please the students, coaches, and administrators
                of each member school. They had to understand the intertwined situation at that moment because the school is
                a hub that channels so many parties - government, alumni, and generous donors.
              </p>
              <p>
                The transition to the postseason for NESCAC schools was a significant deal. This change might break the
                founding principle of NESCAC that ensured the priority of academics and avoided athletics arms race, which
                would lead to admitting academically unqualified students and potentially harming the reputation of the
                schools and discourage philosophist from donating to the schools because they would not receive the
                exchange of the social status. Current donors might withdraw support if they felt their contributions were
                being allocated to academically unqualified athletes.
              </p>
              <p>
                Nonetheless, based on the fact that the presidents decided to lift the postseason ban in 1993, it was clear
                that the presidents believed the benefits outweighed the disadvantages. In other words, allowing a
                postseason conference had a higher chance of increasing name recognition and prestige for NESCAC schools.
                Reality also confirmed that. The success and the domination of the NESCAC schools received so much more
                exposure in the country. The value of the conference went beyond New England and New York and reached more
                potential applicants, which brought down the admission rate and increased the selectivity for all schools in
                the conference. The name recognition and high selectivity drove wealthy people to donate, and the money was
                put to good use to improve the facilities, hire faculties, and provide generous financial aid to attract
                high-archiving students from all socio-economic backgrounds. This is the reason underlying the transition
                to the postseason, and the positive cycle caused by the transition eventually led to the highly selective,
                wealthy NESCAC schools we know nowadays.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="conclusion">
            <div className="edg-section-header">
              <span className="edg-kicker">Conclusion</span>
              <h2 className="edg-h2">Sources, gaps, and future research</h2>
            </div>
            <div className="nescac-prose">
              <p>
                This research was mostly based on the report The New England Small College Athletic Conference, 1971-1997:
                A Retrospective written by Karin Velez on August 9, 1997, and the book The New England Small College
                Athletic Conference: A History written by Daniel Covell in 2022 along with archival documents from report of
                Bowdoin Presidents Howell and Edwards from 1964 to 1995, and historical NESCAC documents. The sources used
                for this research were well-represented; however, they were all official documents such as letters between
                presidents. Many important ones may be missing due to inappropriate storage or intentional cleaning, which
                might lead to missing some important information about the factors that push the final transition.
              </p>
              <p>
                Beyond the official documents, in the future, it would be important to investigate the opinions of the
                students from student-run newspapers. Furthermore, comparative studies with the histories of other
                conferences such as the IVY League and Claremont Colleges could also provide valuable insights into the
                broader context of collegiate athletics and its transitions.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="references">
            <div className="edg-section-header">
              <span className="edg-kicker">References</span>
              <h2 className="edg-h2">Sources cited</h2>
            </div>
            <ol className="nescac-ref-list">
              <li>"Appendix E: NESCAC in the Media." Robert H. Edwards Administrative Records: A.01.02.13.03, b24, f2.</li>
              <li>
                "A Reflection About NESCAC Football 1985-1994." 1995. Robert H. Edwards Administrative Records:
                A.01.02.13.03, b24, f2.
              </li>
              <li>"Athletic Conference Agreement." 1970. Roger Howell Administrative Records: A01.02.10.01, b3, f4.</li>
              <li>Buller, Jeffrey L. 2014. <em>Change Leadership in Higher Education: A Practical Guide to Academic Transformation.</em> First edition. Wiley.</li>
              <li>
                Covell, Daniel, and Stephen Hardy. 2022. <em>The New England Small College Athletic Conference: A History.</em>
                McFarland &amp; Company, Inc., Publishers.
              </li>
              <li>
                Eaton, Charlie. 2022. <em>Bankers in the Ivory Tower: The Troubling Rise of Financiers in US Higher Education.</em>
                The University of Chicago Press.
              </li>
              <li>
                Edwards, Robert H., Oakley, Francis, &amp; Payne, Harry C. 1992. "Letter to President William M. Chace." Robert
                H. Edwards Administrative Records: A01.02.13.03, b23, f3.
              </li>
              <li>
                "N.E.S.C.A.C. PHILOSOPHY President Sawyer's Remarks." 1971. Robert H. Edwards Administrative Records:
                A.01.02.13.03, b24, f2.
              </li>
              <li>Ostrower, Francie. 1995. <em>Why the Wealthy Give: The Culture of Elite Philanthropy.</em> Princeton University Press.</li>
              <li>
                "Overview: Gender Equity in Intercollegiate Athletics." 1994. Robert H. Edwards Administrative Records:
                A.01.02.13.03, b24, f1&amp;2.
              </li>
              <li>
                "Response from student athlete, Hamilton College." Robert H. Edwards Administrative Records: A.01.02.13.03,
                b24, f2.
              </li>
              <li>
                Slovenski, Peter. 1992. "Letter to President Robert H. Edwards." Robert H. Edwards Administrative Records:
                A01.02.13.03, b23, f3.
              </li>
              <li>
                Stevens, Mitchell L., et al. 2008. "Sieve, Incubator, Temple, Hub: Empirical and Theoretical Advances in
                the Sociology of Higher Education." <em>Annual Review of Sociology</em>, 34, 127-151.
              </li>
              <li>
                Velez, Karin. 1997. "The New England Small College Athletic Conference, 1971-1997: A Retrospective." Williams
                College. Robert H. Edwards Administrative Records: A.01.02.13.03, b24, f2.
              </li>
              <li>
                Wachter, Paul. 2011. "Squashing the Ivies." <em>The New York Times Magazine.</em> Retrieved May 13, 2024.
                <a
                  href="https://www.nytimes.com/2011/02/20/magazine/20Squash-t.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.nytimes.com/2011/02/20/magazine/20Squash-t.html
                </a>
              </li>
              <li>
                Wisconsin Intercollegiate Athletic Conference. 2024. "National Championships By Conference." Retrieved May
                13, 2024.
                <a
                  href="https://wiacsports.com/sports/2014/12/22/GEN_1222142439.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://wiacsports.com/sports/2014/12/22/GEN_1222142439.aspx
                </a>
              </li>
              <li>
                Witteman, Paul A. 1971. "Middlebury College News Services." Roger Howell Administrative Records:
                A01.02.10.01, b3, f4.
              </li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
