/* =====================================================================
   SITE / PROFILE SETTINGS
   ---------------------------------------------------------------------
   Edit the values below to change your basic information.
   Text inside quotes "..." can be changed freely.
   ===================================================================== */
window.SITE = {
  name: "Behrooz Taheri",
  shortName: "B. Taheri",
  title: "Ph.D. in Electrical Engineering · Power System Protection",
  tagline:
    "I design protection and detection methods that keep modern power grids — with HVDC links, microgrids and inverter-based resources — stable, secure and reliable, often with the help of artificial intelligence.",
  location: "Qazvin, Iran",
  email: "behrooztaheri1372@gmail.com",
  phone: "+98 933 518 2676", // leave "" to hide the phone number
  cv: "assets/cv/Behrooz-Taheri-CV.pdf", // replace this PDF with your latest CV
  badge: "IEEE Senior Member",

  /* Social / academic profiles — leave url "" to hide an item.
     Optional "display" = text shown on the Contact page.
     Available icons: scholar, linkedin, researchgate, orcid, github, email, scopus */
  links: [
    { label: "Google Scholar", icon: "scholar", url: "https://scholar.google.com/citations?hl=en&user=fUH2u0gAAAAJ&view_op=list_works&sortby=pubdate", display: "Publications & citations" },
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/behrooz-taheri-phd-smieee-b41b26113/", display: "Behrooz Taheri, Ph.D., SMIEEE" },
    { label: "ResearchGate", icon: "researchgate", url: "" },
    { label: "ORCID", icon: "orcid", url: "" },
    { label: "GitHub", icon: "github", url: "" },
    { label: "Email", icon: "email", url: "mailto:behrooztaheri1372@gmail.com" }
  ],

  /* Top menu. Add a new page here after creating its .html file. */
  nav: [
    { label: "Home", href: "index.html", page: "home" },
    { label: "Publications", href: "publications.html", page: "publications" },
    { label: "Experience", href: "experience.html", page: "experience" },
    { label: "Projects", href: "projects.html", page: "projects" },
    { label: "Honors & Service", href: "honors.html", page: "honors" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ],

  /* "About me" paragraphs on the home page */
  about: [
    "I am an electrical engineer and researcher from Qazvin, Iran, born in 1993. I received both my M.Sc. (2018) and Ph.D. (2025) in Electrical Engineering from Qazvin Islamic Azad University (QIAU), specializing in power systems and renewable energy technologies.",
    "My work sits where protection engineering meets data-driven methods: power swing detection, fault detection and location, transformer differential protection, DC and AC microgrid protection, and non-intrusive load monitoring. I have authored more than 40 papers in international journals and conferences, and I serve as a reviewer for leading journals in the field.",
    "Alongside research, I have spent years in industry with Vebko Amirkabir R&D Co., testing protection relays at power plants, oil fields and hydroelectric dams, and I teach electrical engineering courses at university level. I have twice been named the top student researcher in Qazvin province, and in 2024 I was elevated to Senior Member of IEEE."
  ],

  /* Research interest cards. icon options: shield, hvdc, inverter, ai, grid, wave */
  interests: [
    { icon: "shield", title: "Power System Protection", text: "Distance and differential relays, power swing detection, fault detection, classification and location." },
    { icon: "hvdc", title: "HVDC Systems", text: "Fault detection in VSC-HVDC transmission lines and protection of DC networks." },
    { icon: "inverter", title: "Inverter-Based Resources", text: "Protection challenges introduced by wind, PV and grid-following inverters." },
    { icon: "ai", title: "Artificial Intelligence", text: "Deep learning, LSTM, SVR and hybrid models applied to protection and load monitoring." },
    { icon: "grid", title: "Microgrids & Smart Grids", text: "DC/AC microgrid protection, EV chargers, load forecasting and smart homes." },
    { icon: "wave", title: "Transient Analysis", text: "Signal processing — Hilbert transform, EMD, wavelets — for fast transient detection." }
  ],

  /* Highlight numbers on the home page. "auto" = counted from publications.js */
  stats: [
    { value: "auto", label: "Publications" },
    { value: "16", label: "Journals reviewed for" },
    { value: "10+", label: "Years in industry & research" },
    { value: "2×", label: "Top researcher, Qazvin province" }
  ],

  /* Skills. level is out of 6 (0 = fundamental awareness, 6 = expert) */
  skills: [
    { group: "Simulation & Analysis", items: [
      { name: "PSCAD", level: 5.5 },
      { name: "MATLAB / Simulink", level: 5.5 },
      { name: "DIgSILENT PowerFactory", level: 4.5 },
      { name: "Protection relay testing", level: 5.5 }
    ]},
    { group: "Programming", items: [
      { name: "Python", level: 5.2 },
      { name: "C++", level: 5 },
      { name: "C#", level: 4.5 }
    ]},
    { group: "Tools & Soft skills", items: [
      { name: "LaTeX", level: 5 },
      { name: "Microsoft Office", level: 5.5 },
      { name: "Team working", level: 5.5 }
    ]}
  ],

  languages: [
    { name: "Persian", level: "Native" },
    { name: "English", level: "Intermediate" }
  ]
};
