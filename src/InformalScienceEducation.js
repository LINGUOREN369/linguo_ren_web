import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/InformalScienceEducation.css';

const infoItems = [
  'Citizen and community science projects',
  'Technology-enhanced learning',
  'Zoos, aquariums, and nature centers',
  'Making and tinkering activities',
  'Media like TV, film, radio, and podcasts',
  'Public libraries and science events',
  'Science centers, museums, and communication efforts',
  'Youth, afterschool, and out-of-school programs',
];

const whySections = [
  {
    title: 'Foster Interest in Stem',
    paragraphs: [
      "Participants in an informal science education program found the projects and scientific concepts intriguing, with many learning about topics they hadn't encountered before. The informal STEM education program can create a low-stress learning environment. As a result, participants felt more confident entering the new school year, expressed a stronger interest in exploring topics beyond basic STEM subjects, and reported increased self-efficacy in their ability to learn advanced concepts. Many also expressed a desire to continue exploring STEM both during the school year and in informal learning environments. This interest will eventually lead students to develop identity in STEM and see themselves as scientists.",
    ],
    link: {
      href: 'https://hammer.purdue.edu/articles/thesis/EFFECTS_OF_INFORMAL_STEM_EDUCATION_ON_UNDERREPRESENTED_STUDENTS/22651201?file=40217401',
      prefix:
        'Learn more about how fostering interest in STEM through informal STEM education by visiting this',
      text: 'article',
    },
  },
  {
    title: 'Foster Science Identity',
    paragraphs: [
      'Research shows that informal stem education programs such as summer schools, internships, and university-connected activities provide important resources that help students develop a strong science identity. Unlike traditional classrooms, these informal settings offer richer opportunities for students to build supportive relationships, see themselves as part of the scientific community, and imagine real futures in science. Identity formation happens not just through academic achievement but through experiences of belonging, recognition, and participation in authentic scientific practices.',
      'Building a strong informal science identity is essential because it lays the foundation for long-term engagement in STEM. When students experience science as something they belong to rather than just a subject they study they are more likely to persist, thrive, and see themselves as future scientists, engineers, and innovators. Implementing informal science education can bridge opportunity gaps, nurture diverse talent, and expand access to meaningful STEM careers.',
    ],
    link: {
      href: 'https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.18.020118',
      prefix:
        'Learn more about how fostering STEM identity through informal STEM education by visiting this',
      text: 'article',
    },
  },
  {
    title: 'Among Underrepresented Minorities & Young Women',
    quote:
      "\"Access to programs that provide the possibility to practice physicist identities (in more than just 'hands-on activities') can support their imagined futures - and at times even refigure those futures\" (Gonsalves et al., 2022)",
    paragraphs: [
      'There are a lot of research mentioning the importance of role model in the science education for underrepresented minorities (URM) and young women. However, simply providing role models is not enough to increase participation in STEM, especially for young women and underrepresented minorities. Instead, building meaningful relationships where students connect with physicists who offer real insight into the culture of physics and foster a sense of belonging has a much stronger impact. Informal science education creates vital spaces outside traditional classrooms, such as clubs, online communities, and outreach programs, where these authentic, supportive relationships can naturally form.',
      'For young women and URM students, these relationships are critical for developing confidence, combating feelings of isolation or imposter syndrome, and seeing pathways into physics that feel accessible and welcoming. By creating environment of resilience, informal science experiences help students persist in science not by demanding individual toughness but by surrounding them with support, encouragement, and a sense of community.',
    ],
    link: {
      href: 'https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.18.020118',
      prefix:
        'Learn more about how fostering STEM identity through informal STEM education by visiting this',
      text: 'article',
    },
  },
];

const citations = [
  {
    prefix: 'Baxter Academy for Technology and Science. (2020, October).',
    href: 'https://www.greatschoolspartnership.org/wp-content/uploads/2021/06/Grading_And_Reporting_Sample_Baxter.pdf?utm_source=chatgpt.com',
  },
  {
    prefix:
      'Community Science Education | Schoodic Institute. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://schoodicinstitute.org/education/community-science-education/',
  },
  {
    prefix:
      'Discover Sustainable Learning at The Ecology School, Saco, Maine. (n.d.). The Ecology School. Retrieved May 9, 2025, from',
    href: 'https://theecologyschool.org',
  },
  {
    prefix:
      'Education, M. D. of. (2025, May 6). Climate Education. Maine DOE Newsroom.',
    href: 'https://mainedoenews.net/category/climate-education/',
  },
  {
    prefix:
      'EL Education - Fieldwork and Experts: The Branching Out Expedition at King Middle School. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://eleducation.org/resources/fieldwork-and-experts-the-branching-out-expedition-at-king-middle-school?utm_source=chatgpt.com',
  },
  {
    prefix:
      "Gonsalves, A. J., Johansson, A., Nystrom, A.-S., & Danielsson, A. T. (2022). Other spaces for young women's identity work in physics: Resources accessed through university-adjacent informal physics learning contexts in Sweden. Physical Review Physics Education Research, 18(2), 020118.",
    href: 'https://doi.org/10.1103/PhysRevPhysEducRes.18.020118',
  },
  {
    prefix: 'Home. (n.d.-a). Robertsfarm. Retrieved May 9, 2025, from',
    href: 'https://www.robertsfarmlearning.com',
  },
  {
    prefix:
      'Home. (n.d.-b). Gulf Of Maine Research Institute. Retrieved May 9, 2025, from',
    href: 'https://www.gmri.org/',
  },
  {
    prefix:
      'Home - Cooperative Extension: 4-H - University of Maine Cooperative Extension. (n.d.). Cooperative Extension: 4-H. Retrieved May 9, 2025, from',
    href: 'https://extension.umaine.edu/4h/',
  },
  {
    prefix: 'Home Page. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://mdibl.org/',
  },
  {
    prefix: 'Home - Chewonki. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://chewonki.org/',
  },
  {
    prefix: 'Learning Ecosystems Northeast. (n.d.). Retrieved May 9, 2025, from',
    href: 'http://www.learningecosystemsnortheast.org/',
  },
  {
    prefix: 'Maine Climate Education Hub. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://maineclimatehub.org/',
  },
  {
    prefix:
      'Maine Outdoor Learning Initiative | Department of Education. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://www.maine.gov/doe/innovation/MaineOutdoorLearning',
  },
  {
    prefix:
      'Maine STEM Partnership - Maine Center for Research in STEM Education - University of Maine. (n.d.). Https://Umaine.Edu/Risecenter/. Retrieved May 9, 2025, from',
    href: 'https://umaine.edu/risecenter/maine-stem-partnership/',
  },
  {
    prefix:
      'State Championship Conners Emerson Olympiads Bring in STEAM Week With Over 30 Wins. (2024, April 15). Bar Harbor Story.',
    href: 'https://barharborstory.com/2024/04/15/state-championship-conners-emerson-olympiads-bring-in-steam-week-with-over-30-wins/',
  },
  {
    prefix:
      'Summer Camp 2025 - Maine School of Science and Mathematics. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://www.mssm.org/summer/summer-camp-2025',
  },
  {
    prefix:
      'Tedeschi, B. D. (2023). EFFECTS OF INFORMAL STEM EDUCATION ON UNDERREPRESENTED STUDENTS [Thesis, Purdue University Graduate School].',
    href: 'https://doi.org/10.25394/PGS.22651201.v1',
  },
  {
    prefix: 'Tremont Middle School. (n.d.). Retrieved May 9, 2025, from',
    href: 'https://www.tremont702.net/o/middle-school/page/lego-league',
  },
  {
    prefix: "Visitor Education & Experience. (n.d.). Wolfe's Neck. Retrieved May 9, 2025, from",
    href: 'https://www.wolfesneck.org/education/',
  },
  {
    prefix:
      'What is Informal STEM Education? - Informalscience.org. (n.d.). Retrieved April 27, 2025, from',
    href: 'https://informalscience.org/what-is-informal-stem-ed/',
  },
];

const educatorSections = [
  {
    title: 'Inspiring Informal Curriculum in Action',
    intro: [
      'These Maine schools exemplify innovative, hands-on STEM education through project-based learning, technology integration, and community collaboration. They offer students opportunities to engage in interdisciplinary, real-world challenges that foster critical thinking, creativity, and technological fluency.',
    ],
    groups: [
      {
        heading: '1. Project-Based & Real-World Learning',
        entries: [
          {
            name: 'Baxter Academy for Technology and Science (Portland, ME)',
            href: 'https://www.greatschoolspartnership.org/wp-content/uploads/2021/06/Grading_And_Reporting_Sample_Baxter.pdf?utm_source=chatgpt.com',
            paragraphs: [
              'This public charter high school emphasizes project-based learning, allowing students to engage in long-term STEM projects like software development and robotics, often collaborating with professionals in the field.',
              'Flex Friday Program: Students dedicate time each week to long-term projects, such as developing experimental models for fish hatcheries or creating database programs in collaboration with local companies, emphasizing real-world problem-solving.',
            ],
          },
          {
            name: 'King Middle School (Portland, ME)',
            href: 'https://eleducation.org/resources/fieldwork-and-experts-the-branching-out-expedition-at-king-middle-school?utm_source=chatgpt.com',
            paragraphs: [
              'King Middle School employs an expeditionary learning model, where students engage in interdisciplinary projects that address real-world issues. This approach has been recognized nationally for its effectiveness in promoting deep understanding and student engagement.',
              '"Branching Out" Expedition: Seventh-grade students collaborated with the city arborist to study local trees, contributing data to a municipal database. This project integrated science, data analysis, and community engagement.',
            ],
          },
        ],
      },
      {
        heading: '2. Technology Integration & Digital Literacy',
        entries: [
          {
            name: 'Conners Emerson School (Bar Harbor, ME)',
            href: 'https://barharborstory.com/2024/04/15/state-championship-conners-emerson-olympiads-bring-in-steam-week-with-over-30-wins/?utm_source=chatgpt.com',
            paragraphs: [
              'As part of the Maine Learning Technology Initiative, Conners Emerson School integrates technology into its curriculum to allow students to undertake projects like digital storytelling and scientific investigations. This integration enhances technological fluency and creativity among students.',
              'STEAM Week: The school organized a week-long event featuring activities like an inflatable planetarium and interactive sessions with local scientists, fostering enthusiasm for science and technology among students.',
            ],
          },
          {
            name: 'Tremont School (Mount Desert Island, ME)',
            href: 'https://www.tremont702.net/o/middle-school/page/lego-league',
            paragraphs: [
              'Leveraging the Maine Learning Technology Initiative, students at Tremont Consolidated School utilize laptops for diverse projects, including robotics, digital storytelling, and scientific investigations, enhancing technological fluency and creativity.',
              'LEGO League Teams: The school hosts two FIRST LEGO League teams that participate in competitions, engaging students in robotics and engineering challenges that promote problem-solving and teamwork.',
            ],
          },
        ],
      },
      {
        heading: '3. Advanced STEM & Enrichment Programs',
        entries: [
          {
            name: 'Maine School of Science and Mathematics (Limestone, ME)',
            href: 'https://www.mssm.org/summer/summer-camp-2025',
            paragraphs: [
              'The Maine School of Science and Mathematics (MSSM) is a public residential magnet high school dedicated to providing advanced STEM education to students from across the state. MSSM offers a rigorous curriculum in science, technology, engineering, and mathematics, coupled with unique extracurricular programs that foster hands-on learning and research.',
              "STEM Summer Camp: MSSM hosts an annual STEM summer camp for middle school students, offering immersive experiences in various STEM fields. Participants engage in activities such as robotics, environmental science, and computer programming, designed to spark interest and build foundational skills in STEM disciplines. This initiative extends MSSM's impact beyond its high school program, reaching younger students and promoting early engagement in STEM education.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Partnerships with Community Organizations',
    intro: [
      "Schools can partner with organizations like Wolfe's Neck Center to bring learning to life beyond the classroom. Many local organizations provides free, public, and school-based programs that offer students hands-on experiences connecting food systems, agriculture, climate change, and the environment.",
      'By collaborating with community resources, schools can:',
    ],
    introList: [
      'Integrate real-world, experiential learning into science and environmental studies.',
      'Expand access to high-quality, equitable informal STEM education for all students.',
      'Engage students and families in sustainability and food system education through field trips, after-school, and summer programs.',
    ],
    groups: [
      {
        heading: '1. Experiential Environmental & Agricultural Education',
        entries: [
          {
            name: "Wolfe's Neck Center (Freeport, ME)",
            href: 'https://www.wolfesneck.org/education/',
            paragraphs: [
              'Provides experiential education for all ages including free, public, and school programs to make connections between food, food systems, agriculture, climate change, and the environment.',
            ],
          },
          {
            name: 'The Ecology School (Saco, ME)',
            href: 'https://theecologyschool.org',
            paragraphs: [
              'Offers immersive programs in ecology, conservation, sustainable farming, and environmental science. Their River Bend Farm campus is a model of sustainability, providing students with hands-on experiences in natural ecosystems.',
            ],
          },
          {
            name: 'Roberts Farm Experiential Learning Center (Norway, ME)',
            href: 'https://www.robertsfarmlearning.com',
            paragraphs: [
              'A collaboration between the Western Foothills Land Trust and Oxford Hills School District, this center integrates outdoor education with the school curriculum, emphasizing agriculture and environmental stewardship.',
            ],
          },
        ],
      },
      {
        heading: '2. Marine & Environmental Science Engagement',
        entries: [
          {
            name: 'Gulf of Maine Research Institute (Portland, ME)',
            href: 'https://www.gmri.org/',
            paragraphs: [
              'Engages students in marine science and climate education through programs like LabVenture, which offers interactive learning about the Gulf of Maine ecosystem.',
            ],
          },
          {
            name: 'Schoodic Institute (Winter Harbor, ME)',
            href: 'https://schoodicinstitute.org/education/community-science-education/',
            paragraphs: [
              "Partners with schools and local communities to involve students in environmental research projects such as Community Shellfish Investigations, encouraging authentic scientific inquiry and stewardship of Maine's coastal ecosystems.",
            ],
          },
          {
            name: 'MDI Biological Laboratory (Bar Harbor, ME)',
            href: 'https://mdibl.org/',
            paragraphs: [
              'Supports citizen science initiatives through Anecdata.org and empower communities to participate in environmental data collection and real-world science projects including water quality monitoring and invasive species tracking.',
            ],
          },
        ],
      },
      {
        heading: '3. Outdoor Leadership & Residential Immersion',
        entries: [
          {
            name: 'Chewonki Foundation (Wiscasset, ME)',
            href: 'https://chewonki.org/',
            paragraphs: [
              'Provides environmental education programs, including the Maine Coast Semester, summer camps, and school group experiences focusing on sustainability, ecology, and outdoor leadership.',
            ],
          },
        ],
      },
      {
        heading: '4. STEM Educator Support & Statewide Collaboration',
        entries: [
          {
            name: 'Maine STEM Partnership at the RiSE Center, University of Maine (Orono, ME)',
            href: 'https://umaine.edu/risecenter/maine-stem-partnership/',
            paragraphs: [
              'Facilitates professional development and curriculum support for PK-16+ educators, building a statewide network to enhance STEM teaching and learning through research-driven practices and community collaboration.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'State initiatives & resources',
    intro: [
      'These statewide initiatives and resources in Maine form a comprehensive climate and outdoor learning ecosystem. They are designed to make STEM and environmental education more accessible, culturally relevant, and experiential. They combine youth programming, educator support, and statewide infrastructure to promote hands-on learning into both formal and informal education settings.',
    ],
    groups: [
      {
        heading: '1. Youth-Focused Climate & STEM Programming',
        entries: [
          {
            name: 'Learning Ecosystems Northeast',
            href: 'https://www.learningecosystemsnortheast.org/',
            paragraphs: [
              'Develops culturally relevant, community-based climate education programs that connect STEM learning to local knowledge and experiences so to make environmental science accessible and meaningful to diverse populations.',
            ],
          },
          {
            name: 'University of Maine Cooperative Extension - 4-H',
            href: 'https://extension.umaine.edu/4h/',
            paragraphs: [
              'Through programs like 4-H Summer of Science offers hands-on STEM learning experiences to youth across Maine particularly in underserved/rural areas by partnering with schools, libraries, and community organizations.',
            ],
          },
          {
            name: 'Maine Outdoor Learning Initiative (MOLI)',
            href: 'https://www.maine.gov/doe/innovation/MaineOutdoorLearning',
            paragraphs: [
              'Administered by the Maine Department of Education, MOLI provides hands-on, interdisciplinary outdoor learning experiences for middle and high school students. The program emphasizes place-based education, environmental stewardship, and career exploration through activities like hiking, kayaking, and orienteering. It also supports the development of outdoor learning spaces in schools across the state.',
            ],
          },
        ],
      },
      {
        heading: '2. Professional Development & School Capacity Building',
        entries: [
          {
            name: 'Climate Education Professional Development Grants',
            href: 'https://mainedoenews.net/category/climate-education/?utm_source=chatgpt.com',
            paragraphs: [
              'This grant program established under LD 1902 funds partnerships between schools and community organizations to enhance climate education. It supports professional development for educators and integrate climate-related, interdisciplinary learning into classrooms. The program has reached thousands of students and continues to expand its impact statewide.',
            ],
          },
          {
            name: 'Maine Climate Education Hub',
            href: 'https://maineclimatehub.org/',
            paragraphs: [
              "A collaboration between the Maine Environmental Education Association and SubjectToClimate. This online resource offers free, high-quality climate education materials for educators. The hub includes lesson plans, multimedia resources, and professional learning opportunities, all tailored to Maine's educational standards and environmental context.",
            ],
          },
        ],
      },
    ],
  },
];

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getResourceId = (title) => `resources-${toSlug(title)}`;

const resourceNavItems = educatorSections.map((section) => ({
  id: getResourceId(section.title),
  label: section.title,
}));

const resourceIdSet = new Set(resourceNavItems.map((item) => item.id));

const navSections = [
  { id: 'why-informal-stem-education', label: 'Why informal STEM education' },
  { id: 'resources-for-maine-educators', label: 'Resources for Maine educators' },
  { id: 'reference-list', label: 'Reference list' },
];

export default function InformalScienceEducation() {
  const [activeSection, setActiveSection] = useState(navSections[0]?.id || '');
  const resourcesActive =
    activeSection === 'resources-for-maine-educators' || resourceIdSet.has(activeSection);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const sectionIds = [
      ...navSections.map((section) => section.id),
      ...resourceNavItems.map((section) => section.id),
    ];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setActiveSection(sectionIds[0] || '');
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
    <div className="container ise-container">
      <header className="ise-hero">
        <div className="ise-hero-head">
          <p className="ise-byline">Linguo Ren</p>
          <h1 className="ise-title">Informal STEM Education</h1>
          <h2 className="ise-subtitle">For Maine</h2>
        </div>
        <div className="ise-hero-body">
          <p className="ise-lede">
            Informal STEM education refers to lifelong learning in science, technology,
            engineering, and math (STEM) that happens outside traditional classrooms. It
            includes a broad range of experiences, settings, and programs designed by
            trained practitioners to promote STEM learning across all ages.
          </p>
          <ul className="ise-list">
            {infoItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="ise-more">
            Learn more about informal STEM education from{' '}
            <a
              href="https://informalscience.org/what-is-informal-stem-ed/"
              target="_blank"
              rel="noopener noreferrer"
            >
              InformalScience.org
            </a>
            .
          </p>
        </div>
      </header>

      <div className="ise-layout">
        <nav className="ise-side-nav" aria-label="Informal STEM education navigation">
          <div className="ise-side-title">On this page</div>
          <ul className="ise-side-list">
            {navSections.map((section) => {
              const isResources = section.id === 'resources-for-maine-educators';
              const isActive = isResources ? resourcesActive : activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    className={`ise-side-link${isActive ? ' is-active' : ''}`}
                    href={`#${section.id}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {section.label}
                  </a>
                  {isResources && (
                    <ul className="ise-side-sublist">
                      {resourceNavItems.map((item) => (
                        <li key={item.id}>
                          <a
                            className={`ise-side-sublink${activeSection === item.id ? ' is-active' : ''}`}
                            href={`#${item.id}`}
                            aria-current={activeSection === item.id ? 'location' : undefined}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ise-main">
          <section className="ise-subpage" id="why-informal-stem-education">
            <div className="ise-subpage-header">
              <h2 className="ise-subpage-title">Why Infomral STEM Education</h2>
            </div>
            {whySections.map((section) => (
              <article
                key={section.title}
                className={`ise-subsection${section.image ? ' ise-subsection--media' : ''}`}
              >
                <div className="ise-subsection-copy">
                  <h3>{section.title}</h3>
                  {section.quote && <p className="ise-quote">{section.quote}</p>}
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                  {section.link && (
                    <p>
                      {section.link.prefix}{' '}
                      <a href={section.link.href} target="_blank" rel="noopener noreferrer">
                        {section.link.text}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section className="ise-subpage" id="resources-for-maine-educators">
            <div className="ise-subpage-header">
              <h2 className="ise-subpage-title">Resources for Maine Educators</h2>
              <p className="ise-subpage-subtitle">Informal STEM EDUCATION in Maine</p>
            </div>
            <div className="ise-resource-sections">
              {educatorSections.map((section) => (
                <article
                  className="ise-resource-section"
                  key={section.title}
                  id={getResourceId(section.title)}
                >
                  <h3 className="ise-resource-title">{section.title}</h3>
                  {section.intro.map((paragraph, index) => (
                    <p key={`${section.title}-intro-${index}`}>{paragraph}</p>
                  ))}
                  {section.introList && (
                    <ol className="ise-resource-list">
                      {section.introList.map((item, index) => (
                        <li key={`${section.title}-list-${index}`}>{item}</li>
                      ))}
                    </ol>
                  )}
                  {section.groups.map((group) => (
                    <div className="ise-resource-group" key={group.heading}>
                      <h4>{group.heading}</h4>
                      {group.entries.map((entry) => (
                        <div className="ise-resource-entry" key={entry.name}>
                          <p className="ise-resource-entry-title">
                            <a href={entry.href} target="_blank" rel="noopener noreferrer">
                              {entry.name}
                            </a>
                          </p>
                          {entry.paragraphs.map((paragraph, index) => (
                            <p key={`${entry.name}-${index}`}>{paragraph}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section className="ise-subpage" id="reference-list">
            <div className="ise-subpage-header">
              <h2 className="ise-subpage-title">Reference List</h2>
            </div>
            <ol className="ise-citation-list">
              {citations.map((citation) => (
                <li key={citation.href}>
                  {citation.prefix}{' '}
                  <a href={citation.href} target="_blank" rel="noopener noreferrer">
                    {citation.href}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="ise-footer-nav">
        <Link to="/project" className="portfolio-button" aria-label="Back to projects">
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
