import type { IconFigure } from "@/types/content";

type Draft = Omit<IconFigure, "image" | "reviewStatus">;

export const ICON_COHORT_MODERN: Draft[] = [
  {
    id: "fela-kuti",
    name: "Fela Anikulapo-Kuti",
    born: 1938,
    died: 1997,
    birthplace: "Abeokuta",
    categories: ["arts", "activism"],
    relatedSectorSlugs: ["creative-economy", "governance"],
    wikipediaTitle: "Fela Kuti",
    achievement:
      "Composer who created Afrobeat and used the Kalakuta Republic as a running critique of military rule.",
    summary:
      "Fela fused highlife, jazz, and Yoruba rhythm into marathon songs that named soldiers and presidents. Raids on Kalakuta, the killing of his mother Funmilayo after a 1977 assault, and Zombie made him Africa’s most political pop musician. Afrobeat is now a global export; the anger in the records is still domestic.",
    citation: {
      title: "Fela Kuti",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Fela-Kuti",
    },
  },
  {
    id: "gani-fawehinmi",
    name: "Abdul-Ganiyu Oyesola Fawehinmi",
    born: 1938,
    died: 2009,
    birthplace: "Ondo",
    categories: ["activism", "leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Gani Fawehinmi",
    achievement:
      "Human-rights lawyer who sued governments, defended journalists and students, and published Nigerian law reports from his own chambers.",
    summary:
      "Gani made public-interest litigation a popular sport: he sued over elections, detentions, and fuel prices, and was detained repeatedly under military decrees. Nigerian Weekly Law Reports, which he founded, is still how many lawyers read judgments. Senior Advocate rank came late, after he had already become a civic title in his own right.",
    citation: {
      title: "Gani Fawehinmi",
      publisher: "BBC News",
      year: 2009,
      url: "https://news.bbc.co.uk/2/hi/africa/8232183.stm",
    },
  },
  {
    id: "pascal-dozie",
    name: "Pascal Gatuno Dozie",
    born: 1939,
    birthplace: "Oguta",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "technology", "economy"],
    relatedTimelineIds: ["telecom-revolution"],
    wikipediaTitle: "Pascal Dozie",
    achievement:
      "Founder of Diamond Bank and founding chairman of MTN Nigeria, a pillar of the 2000s GSM rollout.",
    summary:
      "Dozie moved from consulting into banking (Diamond Bank, 1990) and then into telecoms as MTN Nigeria’s pioneer chairman after the 2001 digital-mobile licences. GSM did more to shrink distance in Nigeria than any road programme of that decade. Diamond was later acquired; the phone in your pocket is the more lasting monument.",
    citation: {
      title: "Pascal Dozie",
      publisher: "MTN Nigeria — leadership history",
      year: 2024,
      url: "https://www.mtn.ng",
    },
  },
  {
    id: "beko-ransome-kuti",
    name: "Beko Ransome-Kuti",
    born: 1940,
    died: 2006,
    birthplace: "Abeokuta",
    categories: ["activism", "science"],
    relatedSectorSlugs: ["governance", "healthcare"],
    wikipediaTitle: "Beko Ransome-Kuti",
    achievement:
      "Physician and chair of the Campaign for Democracy; a central civilian opponent of 1990s military rule.",
    summary:
      "Brother of Fela and son of Funmilayo, Beko organised doctors and human-rights groups when detention without trial was routine. He was jailed after the 1995 treason trials. The family is sometimes reduced to Afrobeat; Beko’s work was hospitals, petitions, and prison.",
    citation: {
      title: "Beko Ransome-Kuti",
      publisher: "The Guardian",
      year: 2006,
      url: "https://www.theguardian.com/news/2006/feb/15/guardianobituaries.nigeria",
    },
  },
  {
    id: "ken-saro-wiwa",
    name: "Kenule Beeson Saro-Wiwa",
    born: 1941,
    died: 1995,
    birthplace: "Bori, Ogoni",
    categories: ["activism", "literature"],
    relatedSectorSlugs: ["energy", "governance", "creative-economy"],
    wikipediaTitle: "Ken Saro-Wiwa",
    achievement:
      "Writer and Ogoni organiser whose Movement for the Survival of the Ogoni People made Niger Delta oil politics a world human-rights case; executed in 1995.",
    summary:
      "Saro-Wiwa wrote Sozaboy and satirical TV (Basi and Company) before MOSOP’s 1990 Ogoni Bill of Rights demanded a share of oil wealth and an end to spills. A special tribunal hanged him with eight others. Commonwealth suspension of Nigeria followed. The environmental brief he filed is still open.",
    citation: {
      title: "Ken Saro-Wiwa",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Ken-Saro-Wiwa",
    },
  },
  {
    id: "muhammadu-buhari",
    name: "Muhammadu Buhari",
    born: 1942,
    died: 2025,
    birthplace: "Daura",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "security"],
    relatedTimelineIds: ["military-decades", "reform-era"],
    wikipediaTitle: "Muhammadu Buhari",
    achievement:
      "Head of the 1983–85 military government and elected president (2015–23); 2015 was the first time a sitting Nigerian president lost and conceded.",
    summary:
      "Buhari’s first period in power is remembered for War Against Indiscipline and decrees. His 2015 election, after three failed civilian runs, was a democratic first: an incumbent (Jonathan) accepted defeat. The 2015–23 record — security, recession, currency, and anti-corruption — is contested and belongs in sourced histories, not on a campaign poster. He died in 2025.",
    citation: {
      title: "Muhammadu Buhari",
      publisher: "Encyclopaedia Britannica",
      year: 2025,
      url: "https://www.britannica.com/biography/Muhammadu-Buhari",
    },
  },
  {
    id: "buchi-emecheta",
    name: "Buchi Emecheta",
    born: 1944,
    died: 2017,
    birthplace: "Lagos",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Buchi Emecheta",
    achievement:
      "Novelist of In the Ditch, Second Class Citizen, and The Joys of Motherhood, who wrote Nigerian women’s migration and motherhood into the London canon.",
    summary:
      "Emecheta left a violent marriage in Britain, raised children, earned a degree, and published novels that treated Igbo patriarchy and British racism as the same story told twice. She is taught worldwide as a Black British and African writer at once — a reminder that Nigerian literature has always been a diaspora literature too.",
    citation: {
      title: "Buchi Emecheta",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Buchi-Emecheta",
    },
  },
  {
    id: "king-sunny-ade",
    name: "Sunday Adeniyi Adegeye (King Sunny Adé)",
    born: 1946,
    birthplace: "Ondo",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "King Sunny Adé",
    achievement:
      "Jùjú bandleader who took talking drums and pedal steel to world stages; Grammy-nominated and a UNESCO artist for peace.",
    summary:
      "Sunny Adé modernised jùjú with huge guitar bands and, in the 1980s, Island Records releases that put Yoruba popular music on the same shelves as reggae. He never became a London pop star; he did prove that a Nigerian genre could tour as itself, not as ‘world music’ costume.",
    citation: {
      title: "King Sunny Ade",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/King-Sunny-Ade",
    },
  },
  {
    id: "dele-giwa",
    name: "Dele Giwa",
    born: 1946,
    died: 1986,
    birthplace: "Ondo",
    categories: ["literature", "activism"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Dele Giwa",
    achievement:
      "Co-founder of Newswatch magazine; killed by a parcel bomb in 1986 in a still-unresolved attack on the press.",
    summary:
      "Giwa brought American newsmagazine pacing to Lagos and made Newswatch required reading in the Babangida years. The bomb that killed him is one of Nigeria’s most cited crimes against journalists. No one has been convicted. The case is why later media-freedom arguments still start with a name.",
    citation: {
      title: "Dele Giwa",
      publisher: "Committee to Protect Journalists",
      year: 1986,
      url: "https://cpj.org/data/people/dele-giwa/",
    },
  },
  {
    id: "tunde-kelani",
    name: "Tunde Kelani",
    born: 1948,
    birthplace: "Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Tunde Kelani",
    achievement:
      "Cinematographer-director (Saworoide, Thunderbolt, Dazzling Mirage) who treated Yoruba literature and politics as cinema, not straight-to-video filler.",
    summary:
      "Kelani trained as a cameraman, then made films that adapted Fagunwa, Adebayo Faleti, and contemporary novels with a craftsman’s eye. Saworoide remains the sharpest popular allegory of military-era corruption in Nigerian film. Nollywood’s volume is someone else’s story; Kelani is its conscience about language and light.",
    citation: {
      title: "Tunde Kelani",
      publisher: "British Film Institute",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "umaru-yaradua",
    name: "Umaru Musa Yar’Adua",
    born: 1951,
    died: 2010,
    birthplace: "Katsina",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "energy"],
    wikipediaTitle: "Umaru Musa Yar'Adua",
    achievement:
      "President (2007–10) who publicly admitted that the election which brought him in was flawed, and launched an amnesty for Niger Delta militants.",
    summary:
      "Yar’Adua’s short term included a seven-point agenda, the 2009 Delta amnesty, and an unusually frank comment on his own election. Illness and a constitutional crisis over acting powers overshadowed policy. He died in office — the first elected Nigerian president to do so.",
    citation: {
      title: "Umaru Musa Yar'Adua",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Umaru-Musa-YarAdua",
    },
  },
  {
    id: "folorunso-alakija",
    name: "Folorunso Alakija",
    born: 1951,
    birthplace: "Ikorodu",
    categories: ["enterprise"],
    relatedSectorSlugs: ["economy", "energy"],
    wikipediaTitle: "Folorunso Alakija",
    achievement:
      "Founder of Famfa Oil, one of the few Nigerian women to control a substantial deep-water oil interest, and a major philanthropic donor.",
    summary:
      "Alakija moved from fashion (Supreme Stitches) into an oil-prospecting licence that became a producing asset after a long dispute with government and partners. Forbes has repeatedly listed her among Africa’s richest women. The Rose of Sharon Foundation is the public-facing half of that fortune.",
    citation: {
      title: "Folorunso Alakija",
      publisher: "Forbes",
      year: 2024,
      url: "https://www.forbes.com/profile/folorunso-alakija/",
    },
  },
  {
    id: "jim-ovia",
    name: "Jim Ovia",
    born: 1951,
    birthplace: "Agbor",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "economy", "technology"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Jim Ovia",
    achievement:
      "Founder of Zenith Bank (1990), now one of Nigeria’s largest financial institutions by assets and a training ground for later fintech founders.",
    summary:
      "Ovia built Zenith on technology and retail expansion after the 1980s bank failures. The bank listed in Lagos and London and seeded a generation of operators who later started payment firms. His visafone/M-Tech interests also sat at the edge of the GSM boom.",
    citation: {
      title: "Jim Ovia",
      publisher: "Zenith Bank Plc — founder biography",
      year: 2024,
      url: "https://www.zenithbank.com",
    },
  },
  {
    id: "nike-davies-okundaye",
    name: "Chief Nike Davies-Okundaye",
    born: 1951,
    birthplace: "Ogidi, Kogi",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Nike Davies-Okundaye",
    achievement:
      "Adire artist who built workshops and galleries that trained thousands of women in indigo dyeing and kept Osogbo textile knowledge commercial.",
    summary:
      "Raised in a family of weavers, Nike turned a craft into schools in Ogidi, Osogbo, Lagos, and Abuja. Her galleries made adire visible to collectors without stripping the work of its Yoruba design grammar. She is an industrialist of a handmade industry.",
    citation: {
      title: "Nike Davies-Okundaye",
      publisher: "National Museum of African Art / Smithsonian",
      year: 2024,
      url: "https://africa.si.edu",
    },
  },
  {
    id: "kudirat-abiola",
    name: "Kudirat Abiola",
    born: 1951,
    died: 1996,
    birthplace: "Zaria",
    categories: ["activism"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["democracy-1999"],
    wikipediaTitle: "Kudirat Abiola",
    achievement:
      "Democracy campaigner who kept June 12 alive while MKO Abiola was in detention; assassinated in Lagos in 1996.",
    summary:
      "Alhaja Kudirat organised protests and international pressure after the 1993 election was annulled. Gunmen killed her in traffic on 4 June 1996. A Lagos square carries her name. The murder trials that followed remain a test of whether 1990s political killings can be prosecuted.",
    citation: {
      title: "Kudirat Abiola",
      publisher: "The New York Times",
      year: 1996,
      url: "https://www.nytimes.com/1996/06/06/world/nigerian-opposition-leader-s-wife-is-shot-dead.html",
    },
  },
  {
    id: "onyeka-onwenu",
    name: "Onyeka Onwenu",
    born: 1952,
    died: 2024,
    birthplace: "Arondizuogu",
    categories: ["arts", "activism"],
    relatedSectorSlugs: ["creative-economy", "governance"],
    wikipediaTitle: "Onyeka Onwenu",
    achievement:
      "Singer, actress, and journalist whose 1984 BBC film Nigeria: A Squandering of Riches remains a landmark civic documentary; later headed the National Centre for Women Development.",
    summary:
      "Onwenu’s songs (Iyogogo, Ekwe) and Nollywood roles made her a cross-generational face. The BBC documentary she presented on oil and waste is still shown in classrooms. She died in 2024 shortly after performing at a concert — a public exit equal to the public life.",
    citation: {
      title: "Onyeka Onwenu",
      publisher: "BBC News",
      year: 2024,
      url: "https://www.bbc.com/news/articles/c0vv4x41d19o",
    },
  },
  {
    id: "mike-adenuga",
    name: "Mike Adenuga Jr.",
    born: 1953,
    birthplace: "Ibadan",
    categories: ["enterprise"],
    relatedSectorSlugs: ["technology", "energy", "economy"],
    relatedTimelineIds: ["telecom-revolution"],
    wikipediaTitle: "Mike Adenuga",
    achievement:
      "Founder of Globacom and Conoil; the second GSM operator to take on the early MTN/Econet duopoly with per-second billing.",
    summary:
      "Adenuga’s Glo (2003) cut call tariffs and built a West African submarine-cable footprint. Conoil gave him an upstream energy base. Together they made him one of Africa’s longest-running billionaire operators — a reminder that Nigerian private capital, not only foreign telcos, built the mobile era.",
    citation: {
      title: "Mike Adenuga",
      publisher: "Forbes",
      year: 2024,
      url: "https://www.forbes.com/profile/mike-adenuga/",
    },
  },
  {
    id: "dora-akunyili",
    name: "Dora Nkem Akunyili",
    born: 1954,
    died: 2014,
    birthplace: "Makurdi / Agulu",
    categories: ["science", "leadership"],
    relatedSectorSlugs: ["healthcare", "governance"],
    wikipediaTitle: "Dora Akunyili",
    achievement:
      "Pharmacist who, as NAFDAC director-general (2001–08), led a public war on counterfeit drugs that had flooded Nigerian markets.",
    summary:
      "Akunyili used raids, publicity, and ugly television ads to make fake drugs a national scandal rather than a quiet killer. She survived an assassination attempt in 2002. Later, as information minister, she was a more conventional politician; NAFDAC is the reason her name is still said with respect in hospitals.",
    citation: {
      title: "Dora Akunyili",
      publisher: "The Lancet (obituary)",
      year: 2014,
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(14)61698-6/fulltext",
    },
  },
  {
    id: "ngozi-okonjo-iweala",
    name: "Ngozi Okonjo-Iweala",
    born: 1954,
    birthplace: "Ogwashi-Uku",
    categories: ["leadership", "enterprise"],
    relatedSectorSlugs: ["economy", "governance"],
    wikipediaTitle: "Ngozi Okonjo-Iweala",
    achievement:
      "Two-time Nigerian finance minister who helped negotiate Paris Club debt relief; first woman and first African director-general of the World Trade Organization (2021–).",
    summary:
      "A World Bank lifer, Okonjo-Iweala brought budget transparency tools (including a published monthly federation account) into Abuja and was a principal in the 2005 Paris Club deal. At the WTO she is the most senior Nigerian in the multilateral system. This page lists her as a public-finance technocrat, not as a party figure.",
    citation: {
      title: "Ngozi Okonjo-Iweala, Director-General",
      publisher: "World Trade Organization",
      year: 2024,
      url: "https://www.wto.org/english/thewto_e/dg_e/dg_e.htm",
    },
  },
  {
    id: "fola-adeola",
    name: "Tajudeen Afolabi Adeola",
    born: 1954,
    birthplace: "Lagos",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "economy"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Fola Adeola",
    achievement:
      "Co-founder of Guaranty Trust Bank (1990) and later of the FATE Foundation for entrepreneurship training.",
    summary:
      "Adeola and Femi Adekoya’s GTBank set a service and branding standard that later Nigerian banks copied. He left operational management and turned to enterprise education and public-service commissions. GTBank’s later fintech children (including a generation of GT alumni at startups) are part of his spillover.",
    citation: {
      title: "Fola Adeola",
      publisher: "FATE Foundation",
      year: 2024,
      url: "https://fatefoundation.org",
    },
  },
  {
    id: "bart-nnaji",
    name: "Bartholomew Nnaji",
    born: 1956,
    birthplace: "Enugu State",
    categories: ["science", "enterprise"],
    relatedSectorSlugs: ["energy", "technology"],
    wikipediaTitle: "Bart Nnaji",
    achievement:
      "Robotics professor and founder of Geometric Power, developer of the Aba Independent Power Project — a rare Nigerian embedded-power plant built around a city grid.",
    summary:
      "Nnaji taught automation in the United States, served briefly as power minister, and then spent years assembling gas-to-power infrastructure in Aba. Geometric’s plant is a test of whether private generation can bypass a failing national grid for a defined set of customers.",
    citation: {
      title: "Bart Nnaji / Geometric Power",
      publisher: "African Development Bank — power-sector briefings",
      year: 2023,
      url: "https://www.afdb.org",
    },
  },
  {
    id: "aliko-dangote",
    name: "Aliko Dangote",
    born: 1957,
    birthplace: "Kano",
    categories: ["enterprise"],
    relatedSectorSlugs: ["economy", "manufacturing", "energy"],
    wikipediaTitle: "Aliko Dangote",
    achievement:
      "Founder of Dangote Cement, Africa’s largest cement producer, and of a refining complex at Lekki aimed at cutting petrol imports.",
    summary:
      "Dangote started in commodities trading, then built factories — cement, sugar, flour — on a continental scale. The Lekki refinery is the largest single industrial bet in Nigeria’s post-civil-war history. Whether it ends the import-dependent fuel system is an empirical question this site will keep sourcing, not a slogan.",
    citation: {
      title: "Aliko Dangote",
      publisher: "Forbes",
      year: 2024,
      url: "https://www.forbes.com/profile/aliko-dangote/",
    },
  },
  {
    id: "goodluck-jonathan",
    name: "Goodluck Ebele Jonathan",
    born: 1957,
    birthplace: "Otuoke",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["reform-era"],
    wikipediaTitle: "Goodluck Jonathan",
    achievement:
      "President (2010–15) who conceded the 2015 election — the first time a sitting Nigerian president lost at the ballot box and handed over.",
    summary:
      "Jonathan, a zoologist from Bayelsa, became president after Yar’Adua’s death. His term included the 2012 fuel-subsidy protests, the Chibok kidnapping, and an oil-price crash. The concession speech in March 2015 is the civic fact that belongs on a history site: a defeated incumbent chose the constitution over the barracks.",
    citation: {
      title: "Goodluck Jonathan",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Goodluck-Jonathan",
    },
  },
  {
    id: "ben-okri",
    name: "Ben Okri",
    born: 1959,
    birthplace: "Minna",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Ben Okri",
    achievement:
      "Author of The Famished Road (1991), which won the Booker Prize — the first by a Black African novelist.",
    summary:
      "Okri’s spirit-child novel made Nigerian mythic realism a Booker-era event. He has lived mainly in Britain while remaining a Nigerian writer in subject and self-description. The prize put a Nigerian title into every late-20th-century Commonwealth literature syllabus.",
    citation: {
      title: "Ben Okri",
      publisher: "The Booker Prizes",
      year: 1991,
      url: "https://thebookerprizes.com/the-booker-library/books/the-famished-road",
    },
  },
  {
    id: "akinwumi-adesina",
    name: "Akinwumi Ayodeji Adesina",
    born: 1960,
    birthplace: "Ibadan",
    categories: ["leadership", "science"],
    relatedSectorSlugs: ["agriculture", "economy"],
    wikipediaTitle: "Akinwumi Adesina",
    achievement:
      "Agricultural economist; Nigerian agriculture minister (2011–15) and president of the African Development Bank (2015–).",
    summary:
      "Adesina’s ministerial brief was on input reform and food production; at AfDB he has pushed High 5s infrastructure lending across the continent. He is the most senior Nigerian in African public finance after Okonjo-Iweala’s WTO post. Bank presidents are not above controversy; the institution’s annual reports are the checkable record.",
    citation: {
      title: "Akinwumi A. Adesina, President",
      publisher: "African Development Bank",
      year: 2024,
      url: "https://www.afdb.org/en/about-us/organisational-structure/president",
    },
  },
  {
    id: "amina-mohammed",
    name: "Amina Jane Mohammed",
    born: 1961,
    birthplace: "Gombe / Liverpool",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "energy"],
    wikipediaTitle: "Amina J. Mohammed",
    achievement:
      "Nigerian diplomat who became deputy secretary-general of the United Nations (2017–) after coordinating the 2030 Sustainable Development Goals.",
    summary:
      "Mohammed worked in Nigerian development planning and as environment minister before Ban Ki-moon brought her into the SDG drafting process. As António Guterres’s deputy she is the highest-ranking Nigerian in the UN Secretariat. The SDGs are the global checklist Nigeria’s own Agenda 2050 has to answer to.",
    citation: {
      title: "Deputy Secretary-General Amina J. Mohammed",
      publisher: "United Nations",
      year: 2024,
      url: "https://www.un.org/sg/en/dsg/index.shtml",
    },
  },
  {
    id: "innocent-chukwuma",
    name: "Innocent Ifediaso Chukwuma",
    born: 1961,
    birthplace: "Nnewi",
    categories: ["enterprise"],
    relatedSectorSlugs: ["manufacturing", "economy"],
    wikipediaTitle: "Innocent Chukwuma",
    achievement:
      "Founder of Innoson Vehicle Manufacturing, Nigeria’s first home-grown car and bus assembly plant at Nnewi.",
    summary:
      "Chukwuma went from motorcycle spare parts in Nnewi to assembling buses and saloon cars under the IVM badge. Local content, court fights with foreign banks, and quality debates all come with the story. The industrial fact is that a Nigerian-owned plant exists in Anambra and sells into government and private fleets.",
    citation: {
      title: "Innoson Vehicle Manufacturing",
      publisher: "Innoson Group",
      year: 2024,
      url: "https://www.innosonvehicles.com",
    },
  },
  {
    id: "ibukun-awosika",
    name: "Ibukunoluwa Abiodun Awosika",
    born: 1962,
    birthplace: "Ibadan",
    categories: ["enterprise"],
    relatedSectorSlugs: ["economy", "education", "financial-inclusion"],
    wikipediaTitle: "Ibukun Awosika",
    achievement:
      "Furniture entrepreneur who became the first woman to chair First Bank of Nigeria (2016–21).",
    summary:
      "Awosika built The Chair Centre after a banking job, then spent years on SME advocacy (FATE Foundation) before the First Bank board. A woman chairing Nigeria’s oldest bank was a first; the later boardroom crisis at the bank is also part of the public record. Entrepreneurship plus stewardship, not a fairy tale.",
    citation: {
      title: "Ibukun Awosika",
      publisher: "First Bank of Nigeria — historical board notices",
      year: 2021,
      url: "https://www.firstbanknigeria.com",
    },
  },
  {
    id: "oby-ezekwesili",
    name: "Obiageli Katryn Ezekwesili",
    born: 1963,
    birthplace: "Anambra / Lagos",
    categories: ["leadership", "activism"],
    relatedSectorSlugs: ["governance", "education"],
    wikipediaTitle: "Obiageli Ezekwesili",
    achievement:
      "Co-founder of Transparency International, former education and solid-minerals minister, World Bank VP for Africa, and a founder of the Bring Back Our Girls campaign.",
    summary:
      "Ezekwesili’s ‘Due Process’ office in the early Obasanjo years was an attempt to put procurement rules where discretion had been. After government she helped lead the 2014 campaign to find the Chibok schoolgirls. She later ran for president and lost — listed here for the public-integrity and education record, not for party politics.",
    citation: {
      title: "Oby Ezekwesili",
      publisher: "World Bank (alumni / leadership biographies)",
      year: 2024,
      url: "https://www.worldbank.org",
    },
  },
  {
    id: "tony-elumelu",
    name: "Tony Onyemaechi Elumelu",
    born: 1963,
    birthplace: "Jos",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "economy", "energy"],
    wikipediaTitle: "Tony Elumelu",
    achievement:
      "Banker who led the creation of United Bank for Africa as a pan-African group and founded the Tony Elumelu Foundation entrepreneurship programme.",
    summary:
      "Elumelu’s Standard Trust Bank merger into UBA (2005) is a case study in Nigerian bank consolidation. He later framed ‘Africapitalism’ — private investment as development strategy — and used TEF to fund thousands of early-stage founders across the continent. Heals and hype both apply; the foundation’s published alumni numbers are the checkable part.",
    citation: {
      title: "Tony Elumelu Foundation",
      publisher: "Tony Elumelu Foundation",
      year: 2024,
      url: "https://www.tonyelumelufoundation.org",
    },
  },
  {
    id: "hakeem-olajuwon",
    name: "Hakeem Abdul Olajuwon",
    born: 1963,
    birthplace: "Lagos",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Hakeem Olajuwon",
    achievement:
      "Lagos-born NBA Hall of Famer; two-time champion with the Houston Rockets and the first Nigerian-born global superstar of American basketball.",
    summary:
      "Olajuwon learned the game in Lagos, played at the University of Houston, and anchored the Rockets’ 1994–95 titles. He remains the most successful African-born player in NBA history by championships and defensive awards. For a generation of Nigerian athletes he proved the pipeline could end in a world league, not only in European football.",
    citation: {
      title: "Hakeem Olajuwon",
      publisher: "Naismith Memorial Basketball Hall of Fame",
      year: 2008,
      url: "https://www.hoophall.com/hall-of-famers/hakeem-olajuwon/",
    },
  },
  {
    id: "rashidi-yekini",
    name: "Rashidi Yekini",
    born: 1963,
    died: 2012,
    birthplace: "Kaduna",
    categories: ["sport"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Rashidi Yekini",
    achievement:
      "Nigeria’s all-time leading men’s international goalscorer and scorer of the country’s first FIFA World Cup goal (1994).",
    summary:
      "Yekini played in Africa, Portugal, and Greece, won the 1993 African Footballer of the Year award, and then scored against Bulgaria in the USA ’94 World Cup — the net-climbing celebration is still the image. His later illness and death in 2012 were a public grief. The record of 37 Super Eagles goals stood for decades.",
    citation: {
      title: "Rashidi Yekini",
      publisher: "FIFA",
      year: 2012,
      url: "https://www.fifa.com",
    },
  },
  {
    id: "mo-abudu",
    name: "Mosunmola Abudu",
    born: 1964,
    birthplace: "London / Lagos",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Mo Abudu",
    achievement:
      "Founder of EbonyLife TV and EbonyLife Studios, which took Nigerian series and films (Fifty, The Wedding Party) into global co-production and streaming deals.",
    summary:
      "Abudu moved from HR and talk-show hosting (Moments with Mo) into a production company that treated Nollywood as an export industry with budgets and lawyers. Netflix and Sony deals followed. She is a media industrialist as much as a presenter.",
    citation: {
      title: "Mo Abudu / EbonyLife",
      publisher: "EbonyLife Media",
      year: 2024,
      url: "https://www.ebonylifetv.com",
    },
  },
  {
    id: "jelani-aliyu",
    name: "Jelani Aliyu",
    born: 1966,
    birthplace: "Kaduna",
    categories: ["science"],
    relatedSectorSlugs: ["manufacturing", "technology"],
    wikipediaTitle: "Jelani Aliyu",
    achievement:
      "Industrial designer who led exterior design on the Chevrolet Volt and later directed Nigeria’s National Automotive Design and Development Council.",
    summary:
      "Aliyu’s GM career made him one of the few Nigerians with a named role on a mass-production American car. He returned to public service in the auto policy space. The Volt itself is a US story; the Nigerian interest is that a Kaduna-born designer sat at that table.",
    citation: {
      title: "Jelani Aliyu",
      publisher: "General Motors design histories / NADDC",
      year: 2020,
      url: "https://naddc.gov.ng",
    },
  },
  {
    id: "chioma-ajunwa",
    name: "Chioma Ajunwa",
    born: 1970,
    birthplace: "Imo",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Chioma Ajunwa",
    achievement:
      "First Nigerian Olympic gold medallist — long jump, Atlanta 1996 — and the first Black African woman to win Olympic gold in a field event.",
    summary:
      "Ajunwa had been a footballer before concentrating on athletics. The 7.12 m jump in Atlanta is still the national record. She later became a police officer and athletics official. For girls’ sport in Nigeria, 1996 is year zero of an Olympic title.",
    citation: {
      title: "Chioma Ajunwa",
      publisher: "Olympics.com",
      year: 2024,
      url: "https://www.olympics.com/en/athletes/chioma-ajunwa",
    },
  },
  {
    id: "jay-jay-okocha",
    name: "Augustine Azuka ‘Jay-Jay’ Okocha",
    born: 1973,
    birthplace: "Enugu",
    categories: ["sport"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Jay-Jay Okocha",
    achievement:
      "Playmaker for Nigeria’s 1994 and 1996 golden generation and a Premier League cult figure at Bolton Wanderers.",
    summary:
      "Okocha’s career ran through Eintracht Frankfurt, Fenerbahçe, Paris Saint-Germain, and Bolton. The 1996 Olympic football gold and the 1994 World Cup run are national memory; the stepovers are the global brand. He later entered club administration and punditry — listed here as an athlete, not as a politician.",
    citation: {
      title: "Jay-Jay Okocha",
      publisher: "Premier League",
      year: 2024,
      url: "https://www.premierleague.com/players/1607/Jay-Jay-Okocha/overview",
    },
  },
  {
    id: "mitchell-elegbe",
    name: "Mitchell Elegbe",
    born: 1971,
    birthplace: "Benin City",
    categories: ["enterprise", "science"],
    relatedSectorSlugs: ["technology", "financial-inclusion"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Mitchell Elegbe",
    achievement:
      "Founder of Interswitch (2002), the payments switch that made domestic card and later mobile transactions possible at Nigerian scale.",
    summary:
      "Before Paystack and Flutterwave, Interswitch built the rails: Verve cards, Quickteller, and a switch connecting banks. Elegbe’s company is infrastructure, not an app. Visa’s later investment confirmed that Nigerian payments had become an asset class.",
    citation: {
      title: "Interswitch",
      publisher: "Interswitch Group",
      year: 2024,
      url: "https://www.interswitchgroup.com",
    },
  },
  {
    id: "kunle-afolayan",
    name: "Kunle Afolayan",
    born: 1974,
    birthplace: "Irapa, Kwara",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Kunle Afolayan",
    achievement:
      "Director-producer (The Figurine, October 1, Citation) who pushed Nollywood toward cinema-scale production and streaming deals.",
    summary:
      "Son of theatre-film patriarch Adeyemi Afolayan (Ade Love), Kunle treated genre — thriller, historical crime, campus drama — as something that could look expensive. Golden Effects and later Netflix titles made him a bridge between Yoruba travelling-theatre bloodlines and the global platform era.",
    citation: {
      title: "Kunle Afolayan",
      publisher: "British Film Institute",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "tayo-oviosu",
    name: "Tayo Oviosu",
    born: 1975,
    birthplace: "Lagos",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "technology"],
    relatedTimelineIds: ["fintech-boom", "agent-banking-boom"],
    wikipediaTitle: "Tayo Oviosu",
    achievement:
      "Founder of Paga (2009), a mobile-money and agent network built for Nigerians without full bank access.",
    summary:
      "Oviosu, an engineer trained in the United States, came home to build a cash-in/cash-out network that treated agents as the product. Paga’s bet was financial inclusion as a payments graph, years before mobile money had a friendly regulator. The CBN licence path that followed is part of the same story.",
    citation: {
      title: "Paga",
      publisher: "Paga",
      year: 2024,
      url: "https://www.paga.com",
    },
  },
  {
    id: "nwankwo-kanu",
    name: "Nwankwo Kanu",
    born: 1976,
    birthplace: "Owerri",
    categories: ["sport"],
    relatedSectorSlugs: ["healthcare"],
    wikipediaTitle: "Nwankwo Kanu",
    achievement:
      "Olympic gold medallist (1996), two-time African Footballer of the Year, and Arsenal/Inter forward who later founded a heart foundation after his own valve surgery.",
    summary:
      "Kanu’s career almost ended before Europe’s peak: a congenital heart defect discovered at Inter required surgery. He returned to win the UEFA Champions League (with Ajax, earlier) and Premier League titles at Arsenal, then used the Kanu Heart Foundation to fund paediatric cardiac care in Nigeria.",
    citation: {
      title: "Nwankwo Kanu",
      publisher: "Premier League",
      year: 2024,
      url: "https://www.premierleague.com/players/1392/Nwankwo-Kanu/overview",
    },
  },
  {
    id: "ameyo-adadevoh",
    name: "Ameyo Stella Adadevoh",
    born: 1956,
    died: 2014,
    birthplace: "Lagos",
    categories: ["science"],
    relatedSectorSlugs: ["healthcare"],
    wikipediaTitle: "Ameyo Adadevoh",
    achievement:
      "Physician who, in 2014, insisted on isolating Nigeria’s first known Ebola patient against political pressure; she died of the virus.",
    summary:
      "Adadevoh treated Patrick Sawyer at First Consultants Medical Centre in Lagos and refused to discharge him when officials wanted him released. Contact tracing that followed kept Nigeria’s outbreak to 20 cases. WHO later called the response a template. She is listed among the dead, not among the speeches.",
    citation: {
      title: "Dr Stella Ameyo Adadevoh",
      publisher: "World Health Organization",
      year: 2014,
      url: "https://www.who.int/news/item/20-10-2014-nigeria-is-now-free-of-ebola-virus-transmission",
    },
  },
  {
    id: "chimamanda-adichie",
    name: "Chimamanda Ngozi Adichie",
    born: 1977,
    birthplace: "Enugu",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Chimamanda Ngozi Adichie",
    achievement:
      "Author of Half of a Yellow Sun, Americanah, and the essay We Should All Be Feminists; the most widely read Nigerian novelist of her generation.",
    summary:
      "Adichie made the Civil War and the Nigerian-American immigrant novel into global bestsellers and TED-era public argument. Purple Hibiscus announced her; Half of a Yellow Sun remains the war book most non-Nigerians actually finish. She is a literary figure and a contested public voice — this page cites the books.",
    citation: {
      title: "Chimamanda Ngozi Adichie",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Chimamanda-Ngozi-Adichie",
    },
  },
  {
    id: "genevieve-nnaji",
    name: "Genevieve Nnaji",
    born: 1979,
    birthplace: "Mbaise / Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Genevieve Nnaji",
    achievement:
      "Actor and director whose Lionheart (2018) became Netflix’s first Original feature from Nigeria.",
    summary:
      "Nnaji spent the 2000s as Nollywood’s most bankable lead, then directed Lionheart — a company-succession drama shot with a restraint that streaming buyers could understand. Oscar disqualification over language rules became its own news cycle. The industrial fact is the Netflix deal.",
    citation: {
      title: "Lionheart",
      publisher: "Netflix / Academy language-eligibility reporting (BBC)",
      year: 2019,
      url: "https://www.bbc.com/news/world-africa-50342774",
    },
  },
  {
    id: "jason-njoku",
    name: "Jason Njoku",
    born: 1980,
    birthplace: "London / Lagos",
    categories: ["enterprise", "arts"],
    relatedSectorSlugs: ["technology", "creative-economy"],
    wikipediaTitle: "Jason Njoku",
    achievement:
      "Co-founder of iROKOtv (2010), which licensed Nollywood catalogues for streaming years before global platforms arrived.",
    summary:
      "Njoku and Bikiya Graham-Douglas (later with others) treated Nigerian film as a rights business: pay producers, stream legally, chase bandwidth. iROKO’s path was messy — piracy, funding, pivots — but it proved a worldwide Igbo- and English-language audience existed. Netflix did not invent that demand.",
    citation: {
      title: "iROKOtv",
      publisher: "iROKO Partners",
      year: 2024,
      url: "https://iroko.ng",
    },
  },
  {
    id: "shola-akinlade",
    name: "Shola Akinlade",
    born: 1985,
    birthplace: "Lagos",
    categories: ["enterprise", "science"],
    relatedSectorSlugs: ["technology", "financial-inclusion"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Shola Akinlade",
    achievement:
      "Co-founder of Paystack (with Ezra Olubi), the payments API Stripe acquired in 2020 in Africa’s then-largest startup exit.",
    summary:
      "Paystack made it trivial for Nigerian websites to take cards. The $200 million Stripe acquisition was a proof-of-liquidity moment for Lagos tech. Akinlade stayed on to run the African business. The deeper claim is infrastructure: other startups could charge money without becoming a bank.",
    citation: {
      title: "Stripe acquires Paystack",
      publisher: "Stripe",
      year: 2020,
      url: "https://stripe.com/newsroom/news/stripe-acquires-paystack",
    },
  },
  {
    id: "burna-boy",
    name: "Damini Ebunoluwa Ogulu (Burna Boy)",
    born: 1991,
    birthplace: "Port Harcourt",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Burna Boy",
    achievement:
      "Afrobeats artist whose album Twice as Tall won the Grammy Award for Best Global Music Album (2021).",
    summary:
      "Burna Boy made Port Harcourt, Fela’s political inheritance, and dance-floor maximalism into a touring stadium act. The Grammy was a category win, not Album of the Year — still the clearest institutional marker that Afrobeats had a name the American academy would print. Listed as culture industry, not as a government programme.",
    citation: {
      title: "Burna Boy",
      publisher: "Recording Academy / Grammy Awards",
      year: 2021,
      url: "https://www.grammy.com/artists/burna-boy/249442",
    },
  },
  {
    id: "iyinoluwa-aboyeji",
    name: "Iyinoluwa Aboyeji",
    born: 1991,
    birthplace: "Ilesa",
    categories: ["enterprise"],
    relatedSectorSlugs: ["technology", "education", "financial-inclusion"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Iyinoluwa Aboyeji",
    achievement:
      "Co-founder of Andela and first CEO of Flutterwave; later founded Future Africa, a vehicle for African startup capital and policy argument.",
    summary:
      "Aboyeji’s through-line is institution-building: training African engineers for global teams (Andela), then pan-African payments (Flutterwave), then a fund. Flutterwave’s later governance fights are public. The checkable early fact is that both companies became default nouns in Lagos tech.",
    citation: {
      title: "Andela",
      publisher: "Andela",
      year: 2024,
      url: "https://andela.com",
    },
  },
  {
    id: "odunayo-eweniyi",
    name: "Odunayo Eweniyi",
    born: 1993,
    birthplace: "Ogbomoso",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "technology"],
    relatedTimelineIds: ["fintech-boom"],
    wikipediaTitle: "Odunayo Eweniyi",
    achievement:
      "Co-founder and COO of PiggyVest, a consumer savings product that made retail investment and dollar saving ordinary for young Nigerians.",
    summary:
      "Eweniyi (with Joshua Chibueze and Somto Ifezue) productised thrift — locking money away from impulsive spending — at smartphone scale. PiggyVest’s growth is a data point in the CBN-era savings-and-fintech story. She is also a visible advocate for women in Nigerian tech without being reduced to that brief.",
    citation: {
      title: "PiggyVest",
      publisher: "PiggyVest",
      year: 2024,
      url: "https://www.piggyvest.com",
    },
  },
  {
    id: "asisat-oshoala",
    name: "Asisat Lamina Oshoala",
    born: 1994,
    birthplace: "Ikorodu",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Asisat Oshoala",
    achievement:
      "Forward for Nigeria’s Super Falcons and FC Barcelona; multiple African Women’s Footballer of the Year and a UEFA Champions League winner.",
    summary:
      "Oshoala went from Rivers Angels to Liverpool, Arsenal, Dalian, and Barcelona, scoring in Europe’s hardest women’s league. The Falcons have long outperformed the men’s team in African trophies; she is the face of that continuity. Endorsements and a football academy are the business layer on top of the goals.",
    citation: {
      title: "Asisat Oshoala",
      publisher: "FC Barcelona",
      year: 2024,
      url: "https://www.fcbarcelona.com/en/football/womens-football/players/asisat-oshoala",
    },
  },
  {
    id: "don-jazzy",
    name: "Michael Collins Ajereh (Don Jazzy)",
    born: 1982,
    birthplace: "Umuahia / Lagos",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Don Jazzy",
    achievement:
      "Producer who co-founded Mo’ Hits and later Mavin Records, a label system that industrialised Nigerian pop star-making in the 2010s.",
    summary:
      "Don Jazzy’s Mo’ Hits era (D’banj, Wande Coal) and Mavin roster (Tiwa Savage, Reekado Banks, later Ayra Starr) treated Afrobeats as a studio-and-label business, not a one-hit hustle. The 2012–14 radio saturation of Mavin singles is a documented industry peak. He is listed as a founder-producer, not merely a celebrity.",
    citation: {
      title: "Don Jazzy",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Don-Jazzy",
    },
  },
];
