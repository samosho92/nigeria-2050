import type { IconFigure } from "@/types/content";

type Draft = Omit<IconFigure, "image" | "reviewStatus">;

export const ICON_COHORT_LATER: Draft[] = [
  {
    id: "dennis-osadebay",
    name: "Dennis Chukude Osadebay",
    born: 1911,
    died: 1994,
    birthplace: "Asaba",
    categories: ["leadership", "literature"],
    relatedSectorSlugs: ["governance", "education"],
    wikipediaTitle: "Dennis Osadebay",
    achievement:
      "Poet-politician; premier of the Mid-Western Region (1964–66) and a founder of the National Council of Nigeria and the Cameroons.",
    summary:
      "Osadebay’s Africa Sings (1952) is an early English-language Nigerian poetry collection. As premier of the newly created Mid-West he tried to give a small region a civil service of its own before the 1966 coup. Asaba still treats him as the town’s most famous nationalist.",
    citation: {
      title: "Dennis Osadebay",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Dennis-Osadebay",
    },
  },
  {
    id: "babatunde-jose",
    name: "Ismail Babatunde Jose",
    born: 1925,
    died: 2008,
    birthplace: "Lagos",
    categories: ["literature"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Babatunde Jose",
    achievement:
      "Editor and later managing director of the Daily Times, the paper that defined Nigerian print journalism from the 1950s to the 1970s.",
    summary:
      "Jose professionalised a mass daily, trained a generation of reporters, and made the Times the paper soldiers and civilians both had to read. His later memoir is a primary source for how the press met the military. Dele Giwa and Newswatch came after a path he had already paved.",
    citation: {
      title: "Alhaji Babatunde Jose",
      publisher: "The Guardian",
      year: 2008,
      url: "https://www.theguardian.com/media/2008/sep/04/pressandpublishing",
    },
  },
  {
    id: "gabriel-okara",
    name: "Gabriel Imomotimi Okara",
    born: 1921,
    died: 2019,
    birthplace: "Bumoundi, Bayelsa",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Gabriel Okara",
    achievement:
      "Poet and novelist (The Voice, 1964) who brought Ijaw syntax into written English and remains a WAEC/JAMB poetry staple.",
    summary:
      "Okara’s Piano and Drums and The Call of the River Nun are among the most anthologised Nigerian poems. The Voice experimented with translating Ijaw thought-patterns rather than polishing them into BBC English. He worked as an information officer and survived the Civil War in the East.",
    citation: {
      title: "Gabriel Okara",
      publisher: "Poetry Foundation",
      year: 2024,
      url: "https://www.poetryfoundation.org/poets/gabriel-okara",
    },
  },
  {
    id: "adeoye-lambo",
    name: "Thomas Adeoye Lambo",
    born: 1923,
    died: 2004,
    birthplace: "Abeokuta",
    categories: ["science"],
    relatedSectorSlugs: ["healthcare", "education"],
    wikipediaTitle: "Thomas Adeoye Lambo",
    achievement:
      "Psychiatrist who pioneered village-based treatment at Aro, Abeokuta, and later became deputy director-general of the World Health Organization.",
    summary:
      "Lambo’s Aro Village scheme (1954) treated patients in the community rather than locking them in asylums — a model WHO later cited. He was the first African to hold WHO’s number-two post. Nigerian psychiatry as a public-health field starts with his clinic, not with imported Victorian wards.",
    citation: {
      title: "Thomas Adeoye Lambo",
      publisher: "The Lancet (obituary)",
      year: 2004,
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(04)16288-5/fulltext",
    },
  },
  {
    id: "olikoye-ransome-kuti",
    name: "Olikoye Ransome-Kuti",
    born: 1927,
    died: 2003,
    birthplace: "Ifo / Abeokuta",
    categories: ["science", "leadership"],
    relatedSectorSlugs: ["healthcare", "governance"],
    wikipediaTitle: "Olikoye Ransome-Kuti",
    achievement:
      "Paediatrician and health minister (1985–92) who made primary health care and childhood immunisation a federal programme; later a UNICEF envoy.",
    summary:
      "Brother of Fela and Beko, Olikoye used the Bamako Initiative logic — essential drugs, clinics, vaccines — rather than hospital palaces. Nigeria’s immunisation coverage rose on his watch, then fell after he left. He was among the first senior officials to speak plainly about HIV. The family produced music, protest, and this quieter public-health record.",
    citation: {
      title: "Olikoye Ransome-Kuti",
      publisher: "The Lancet (obituary)",
      year: 2003,
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)14015-2/fulltext",
    },
  },
  {
    id: "akin-mabogunje",
    name: "Akinlawon Ladipo Mabogunje",
    born: 1931,
    died: 2022,
    birthplace: "Kano / Ijebu-Ode",
    categories: ["science"],
    relatedSectorSlugs: ["education", "real-estate", "governance"],
    relatedTimelineIds: ["land-use-act-1978"],
    wikipediaTitle: "Akin Mabogunje",
    achievement:
      "Geographer whose work on urbanisation and development made him the first African elected to the U.S. National Academy of Sciences (1999) in that field.",
    summary:
      "Mabogunje’s Urbanization in Nigeria (1968) is still the starting monograph for how Nigerian cities actually grew. He advised on the new federal capital and on poverty-mapping. If the Icons page has a scholar of space — markets, migration, slums — it is him.",
    citation: {
      title: "Akin Mabogunje",
      publisher: "National Academy of Sciences",
      year: 2022,
      url: "https://www.nasonline.org",
    },
  },
  {
    id: "hogan-bassey",
    name: "Hogan Bassey",
    born: 1932,
    died: 1998,
    birthplace: "Calabar",
    categories: ["sport"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Hogan Bassey",
    achievement:
      "First Nigerian world boxing champion — featherweight title, 1957 — and later a national coach.",
    summary:
      "Bassey won the world featherweight belt in Paris against Cherif Hamia, defended it, and lost it to Davey Moore. He boxed out of Liverpool while remaining a Calabar name. Dick Tiger followed; Bassey was the proof that a Nigerian could be world champion in the first place.",
    citation: {
      title: "Hogan Bassey",
      publisher: "International Boxing Hall of Fame",
      year: 2024,
      url: "https://www.ibhof.com/pages/about/inductees/modern/bassey.html",
    },
  },
  {
    id: "victor-olaiya",
    name: "Victor Abimbola Olaiya",
    born: 1930,
    died: 2020,
    birthplace: "Calabar / Ibadan",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Victor Olaiya",
    achievement:
      "Trumpeter billed as the ‘Evil Genius of Highlife’; his All Stars band was a finishing school for Fela and other 1960s Lagos musicians.",
    summary:
      "Olaiya’s brass-led highlife sat between Ghanaian dance-band style and the Afrobeat that followed. He played at independence ceremonies and kept a residency culture alive when highlife lost the youth market to jùjú and Afrobeat. The trumpet lines are the missing link on every Nigerian popular-music family tree.",
    citation: {
      title: "Victor Olaiya",
      publisher: "The Guardian",
      year: 2020,
      url: "https://www.theguardian.com/music/2020/mar/18/victor-olaiya-obituary",
    },
  },
  {
    id: "duro-ladipo",
    name: "Durodola Adebola Ladipo",
    born: 1931,
    died: 1978,
    birthplace: "Oshogbo",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy", "education"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Duro Ladipo",
    achievement:
      "Playwright-actor whose Yoruba historical tragedies (Oba Koso, Oba Moro, Oba Waja) took travelling theatre into ritual drama of a new seriousness.",
    summary:
      "Ladipo’s Mbari Mbayo club in Osogbo sat next to the art-school experiment around Ulli Beier. Oba Koso toured Europe and Africa. He died in his forties; the plays remain the high-water mark of Yoruba opera before video Nollywood.",
    citation: {
      title: "Duro Ladipo",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Duro-Ladipo",
    },
  },
  {
    id: "mabel-segun",
    name: "Mabel Dorothy Segun",
    born: 1930,
    birthplace: "Ondo",
    categories: ["literature", "science"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Mabel Segun",
    achievement:
      "Author and children’s-literature advocate; a pioneer of Nigerian writing for young readers and a founding figure of the Children’s Literature Association of Nigeria.",
    summary:
      "Segun wrote My Father’s Daughter and spent decades arguing that Nigerian children deserved books about their own streets, not only imported Enid Blyton. She also broadcast and played table tennis for Nigeria. The children’s shelf in Nigerian English letters is hers more than anyone’s.",
    citation: {
      title: "Mabel Segun",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Mabel-Segun",
    },
  },
  {
    id: "zulu-sofola",
    name: "Nwazuluwa Onuekwuke Sofola",
    born: 1935,
    died: 1995,
    birthplace: "Issele-Uku",
    categories: ["arts", "literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Zulu Sofola",
    achievement:
      "First published female Nigerian playwright and the first woman professor of theatre arts in a Nigerian university (University of Ilorin).",
    summary:
      "Sofola’s Wedlock of the Gods and King Emene treated custom, gender, and tragedy without waiting for a London producer. She trained actors at Ibadan and Ilorin. The academic theatre department as a place Nigerian women could run starts with her chair.",
    citation: {
      title: "Zulu Sofola",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Zulu-Sofola",
    },
  },
  {
    id: "rex-lawson",
    name: "Erekosima Cardinal Rex Jim Lawson",
    born: 1935,
    died: 1971,
    birthplace: "New Calabar (Rivers)",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Rex Lawson",
    achievement:
      "Highlife bandleader whose Rivers-accented songs (Yellow Sisi, Love Grows Cold) were the soundtrack of 1960s eastern and delta Nigeria.",
    summary:
      "Lawson sang in English, Kalabari, and Igbo over a dance-band that rivalled Olaiya’s in popularity. He died in a car crash at 36. Highlife histories that only name Ghana leave him out; Nigerian ones cannot.",
    citation: {
      title: "Cardinal Rex Lawson",
      publisher: "Music In Africa",
      year: 2024,
      url: "https://www.musicinafrica.net/magazine/rex-lawson",
    },
  },
  {
    id: "osita-osadebe",
    name: "Chief Stephen Osita Osadebe",
    born: 1936,
    died: 2007,
    birthplace: "Atani, Anambra",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Osita Osadebe",
    achievement:
      "Igbo highlife composer of Osondi Owendi and dozens of social-commentary dance records that defined eastern Nigerian popular music after the war.",
    summary:
      "Osadebe’s long, talking songs treated money, marriage, and pretence as comic philosophy. Osondi Owendi (1984) became a proverb as much as a hit. He kept highlife commercially alive in the East when Lagos had moved on to jùjú and Afrobeat.",
    citation: {
      title: "Chief Stephen Osita Osadebe",
      publisher: "The Guardian",
      year: 2007,
      url: "https://www.theguardian.com/news/2007/jun/22/guardianobituaries.obituaries",
    },
  },
  {
    id: "ola-rotimi",
    name: "Olawale Gladstone Emmanuel Rotimi",
    born: 1938,
    died: 2000,
    birthplace: "Sapele",
    categories: ["arts", "literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Ola Rotimi",
    achievement:
      "Playwright of The Gods Are Not to Blame, an Oedipus recast in Yoruba kingship, and a director who built university theatre into a national form.",
    summary:
      "Rotimi trained in the United States, then staged politics and myth at Ife and Port Harcourt. The Gods Are Not to Blame is the most performed Nigerian play after Soyinka. He died in 2000 with a body of history plays (Ovonramwen Nogbaisi, Hopes of the Living Dead) still in the syllabus.",
    citation: {
      title: "Ola Rotimi",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Ola-Rotimi",
    },
  },
  {
    id: "tony-allen",
    name: "Tony Oladipo Allen",
    born: 1940,
    died: 2020,
    birthplace: "Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Tony Allen (musician)",
    achievement:
      "Drummer who, with Fela, invented the Afrobeat rhythm section; later a solo artist whose beat is sampled across global pop.",
    summary:
      "Allen’s kit — the broken, dancing independence of the hi-hat and snare — is what makes Afrobeat feel like Afrobeat rather than highlife with politics. He left Egypt 80 and recorded in Paris for decades. Obituaries called him the greatest drummer on earth; the records are the evidence.",
    citation: {
      title: "Tony Allen",
      publisher: "The Guardian",
      year: 2020,
      url: "https://www.theguardian.com/music/2020/may/01/tony-allen-obituary",
    },
  },
  {
    id: "victor-uwaifo",
    name: "Sir Victor Efosa Uwaifo",
    born: 1941,
    died: 2021,
    birthplace: "Benin City",
    categories: ["arts", "science"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Victor Uwaifo",
    achievement:
      "Guitarist of Joromi (1969) — a pan-African hit — sculptor, and later professor of art at the University of Benin.",
    summary:
      "Uwaifo mixed highlife, akwete, and a virtuoso guitar style that still sounds like nobody else. Joromi crossed the continent. He also built a museum-studio in Benin City and taught. Few Nigerian pop stars collected academic ranks without leaving the guitar.",
    citation: {
      title: "Sir Victor Uwaifo",
      publisher: "The Guardian",
      year: 2021,
      url: "https://www.theguardian.com/music/2021/aug/25/sir-victor-uwaifo-obituary",
    },
  },
  {
    id: "ebenezer-obey",
    name: "Ebenezer Remilekun Aremu Olasupo Obey-Fabiyi",
    born: 1942,
    birthplace: "Idogo, Ogun",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Ebenezer Obey",
    achievement:
      "Jùjú bandleader (Inter-Reformers) whose 1970s–80s records were the soundtrack of Yoruba social life — weddings, politics, and proverb.",
    summary:
      "Chief Commander Obey’s guitar jùjú was less electric-showman than King Sunny Adé’s and more sermon-and-proverb. The two names still divide Lagos stereo arguments. He later became a gospel artist without erasing the secular catalogue that made him.",
    citation: {
      title: "Ebenezer Obey",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Ebenezer-Obey",
    },
  },
  {
    id: "olu-jacobs",
    name: "Oludotun Baiyewu Jacobs",
    born: 1942,
    birthplace: "Abeokuta",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Olu Jacobs",
    achievement:
      "Stage and screen actor whose Nollywood patriarch roles, after a British television career, helped give the industry a trained, recognisable elder face.",
    summary:
      "Jacobs worked with the Royal National Theatre and on BBC television before returning into the video boom. With Joke Silva he ran a training school. Africa Movie Academy Awards later named a lifetime prize after him. He is listed as craft, not as gossip-column illness coverage.",
    citation: {
      title: "Olu Jacobs",
      publisher: "British Film Institute",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "ibrahim-gambari",
    name: "Ibrahim Agboola Gambari",
    born: 1944,
    birthplace: "Ilorin",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Ibrahim Gambari",
    achievement:
      "Diplomat who served as Nigeria’s UN ambassador, UN under-secretary-general, and later chief of staff to the president (2020–23).",
    summary:
      "Gambari’s career is the professional foreign-service path: UN Africa department, Myanmar envoy, then a late return to Aso Villa. This page records the multilateral record, not a sitting office — he left the villa in 2023. He is a reminder that Nigerian diplomacy has a bench beyond politicians.",
    citation: {
      title: "Ibrahim Gambari",
      publisher: "United Nations",
      year: 2024,
      url: "https://www.un.org",
    },
  },
  {
    id: "niyi-osundare",
    name: "Niyi Osundare",
    born: 1947,
    birthplace: "Ikere-Ekiti",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Niyi Osundare",
    achievement:
      "Poet of The Eye of the Earth and Village Voices; winner of the Noma Award and the Nigerian National Order of Merit.",
    summary:
      "Osundare writes public, readable verse about land, debt, and power — the opposite of closed-circuit modernism. He taught at Ibadan and later in New Orleans, surviving Hurricane Katrina. For a generation of students he is the poet who still sounds like someone speaking.",
    citation: {
      title: "Niyi Osundare",
      publisher: "Poetry Foundation",
      year: 2024,
      url: "https://www.poetryfoundation.org/poets/niyi-osundare",
    },
  },
  {
    id: "pete-edochie",
    name: "Pete Edochie",
    born: 1947,
    birthplace: "Enugu / Zaria",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Pete Edochie",
    achievement:
      "Actor whose Okonkwo in the 1980s television adaptation of Things Fall Apart made him the face of Igbo patriarchal tragedy for a mass audience.",
    summary:
      "Edochie came from broadcasting into Nollywood as the default village elder and king. The Achebe serial is still how many Nigerians first ‘see’ Okonkwo. Africa Movie Academy recognised the body of work. He is craft memory, not a trending topic.",
    citation: {
      title: "Pete Edochie",
      publisher: "Africa Movie Academy Awards / BFI notes",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "demas-nwoko",
    name: "Demas N. Nwoko",
    born: 1935,
    birthplace: "Idumuje-Ugboko, Delta",
    categories: ["arts", "science"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Demas Nwoko",
    achievement:
      "Artist-architect of the Zaria Rebels generation; designer of the Dominican Chapel at Ibadan and a theorist of climate-sensible Nigerian building.",
    summary:
      "Nwoko helped found the Natural Synthesis idea in Zaria painting, then built. The Ibadan chapel and his New Culture Studios in Ibadan argue that modern Nigerian space need not be glass boxes. He received a lifetime award from the Nigerian Institute of Architects. Form and climate, not just canvas.",
    citation: {
      title: "Demas Nwoko",
      publisher: "Aga Khan Award for Architecture / ArchNet",
      year: 2024,
      url: "https://www.archnet.org",
    },
  },
  {
    id: "christy-essien-igbokwe",
    name: "Christy Uduak Essien-Igbokwe",
    born: 1960,
    died: 2011,
    birthplace: "Okon, Akwa Ibom",
    categories: ["arts", "activism"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Christy Essien-Igbokwe",
    achievement:
      "Singer of Seun Rere and a founding president of the Performing Musicians Association of Nigeria (PMAN).",
    summary:
      "The First Lady of Nigerian Music sang in Igbo, Yoruba, Hausa, and English, and treated copyright and association politics as part of the job. Seun Rere remains a public-service lullaby. She died in 2011; PMAN’s later fights still happen inside a union she helped to imagine.",
    citation: {
      title: "Christy Essien-Igbokwe",
      publisher: "The Guardian",
      year: 2011,
      url: "https://www.theguardian.com/world/2011/jun/23/christy-essien-igbokwe-obituary",
    },
  },
  {
    id: "sade-adu",
    name: "Helen Folasade Adu",
    born: 1959,
    birthplace: "Ibadan",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Sade (singer)",
    achievement:
      "Ibadan-born singer whose band Sade made Diamond Life (1984) a global pop standard and a template for cool, understated Black stardom.",
    summary:
      "Raised in England after an Ibadan childhood, Sade never marketed herself as world music. Smooth Operator and The Sweetest Taboo were simply pop. Nigerian audiences still claim the birthplace; the records are British studio craft with a Nigerian name on the sleeve.",
    citation: {
      title: "Sade",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Sade",
    },
  },
  {
    id: "joke-silva",
    name: "Joke Silva",
    born: 1961,
    birthplace: "Lagos",
    categories: ["arts", "science"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Joke Silva",
    achievement:
      "Actor and director who, with Olu Jacobs, founded the Lufodo acting academy and became one of Nollywood’s most trained screen presences.",
    summary:
      "Silva’s career runs from stage to film to television with a diction that still sounds like repertory theatre. The school is the institutional fact: Nigerian screen acting as something you can teach, not only something you fall into.",
    citation: {
      title: "Joke Silva",
      publisher: "British Film Institute",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "richard-mofe-damijo",
    name: "Richard Mofe-Damijo",
    born: 1961,
    birthplace: "Warri",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Richard Mofe-Damijo",
    achievement:
      "Actor (Violated, The CEO) and later Delta State commissioner for culture; an Africa Movie Academy Award best-actor winner who helped professionalise Nollywood leads.",
    summary:
      "RMD came from television drama into the video boom as a romantic and corporate lead, then into state culture policy. The AMAA and the later streaming titles are the checkable craft record. He is not a sitting federal officeholder.",
    citation: {
      title: "Richard Mofe-Damijo",
      publisher: "Africa Movie Academy Awards",
      year: 2024,
      url: "https://www.amaawards.com",
    },
  },
  {
    id: "stephen-keshi",
    name: "Stephen Okechukwu Keshi",
    born: 1962,
    died: 2016,
    birthplace: "Azagba, Delta",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Stephen Keshi",
    achievement:
      "Super Eagles captain at USA ’94 and later the coach who won the 2013 Africa Cup of Nations — the first African to win the cup as both player and coach.",
    summary:
      "Keshi played in France and the United States, lifted the 1994 AFCON as captain, then rebuilt the national team on a diet of home-based and less-fashionable names in 2013. He died in 2016. The Big Boss nickname was earned twice.",
    citation: {
      title: "Stephen Keshi",
      publisher: "FIFA",
      year: 2016,
      url: "https://www.fifa.com",
    },
  },
  {
    id: "femi-kuti",
    name: "Olufela Olufemi Anikulapo Kuti",
    born: 1962,
    birthplace: "London / Lagos",
    categories: ["arts", "activism"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Femi Kuti",
    achievement:
      "Saxophonist who took over the Afrobeat brief after Fela, ran the New Afrika Shrine, and earned multiple Grammy nominations without becoming a nostalgia act.",
    summary:
      "Femi left Egypt 80, built Positive Force, and kept Kalakuta’s politics in a shorter, radio-length form. The Shrine in Ikeja is a working club, not a museum. Listed as a musician who maintained an institution, not as a son in parentheses.",
    citation: {
      title: "Femi Kuti",
      publisher: "Recording Academy / Grammy Awards",
      year: 2024,
      url: "https://www.grammy.com/artists/femi-kuti/3853",
    },
  },
  {
    id: "amaka-igwe",
    name: "Amaka Isaac-Igwe",
    born: 1963,
    died: 2014,
    birthplace: "Enugu / Port Harcourt",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Amaka Igwe",
    achievement:
      "Director-producer of Checkmate and Fuji House of Commotion; a founder of modern Nigerian television drama and of the BOBTV workshop.",
    summary:
      "Igwe treated serial television as structure — writers’ rooms, production design, audience — when most video films were one-week wonders. Checkmate remains the reference 1990s soap. She died in 2014; every later Netflix Nigerian series inherits a grammar she rehearsed on NTA.",
    citation: {
      title: "Amaka Igwe",
      publisher: "The Guardian",
      year: 2014,
      url: "https://www.theguardian.com/world/2014/may/02/amaka-igwe",
    },
  },
  {
    id: "sefi-atta",
    name: "Sefi Atta",
    born: 1964,
    birthplace: "Lagos",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Sefi Atta",
    achievement:
      "Novelist of Everything Good Will Come (2005), a landmark of contemporary Nigerian women’s fiction, and a dramatist of Lagos middle-class life.",
    summary:
      "Atta trained as an accountant, then wrote novels and BBC radio plays. Everything Good Will Come won the Wole Soyinka Prize. She is part of the generation that made post-SAPs Lagos a literary subject without waiting for the Civil War novel.",
    citation: {
      title: "Sefi Atta",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Sefi-Atta",
    },
  },
  {
    id: "arunma-oteh",
    name: "Arunma Oteh",
    born: 1965,
    birthplace: "Abia / Lagos",
    categories: ["leadership", "enterprise"],
    relatedSectorSlugs: ["economy", "governance", "financial-inclusion"],
    wikipediaTitle: "Arunma Oteh",
    achievement:
      "Director-general of Nigeria’s Securities and Exchange Commission (2010–15) during post-crisis market cleanup; later treasurer of the World Bank.",
    summary:
      "Oteh’s SEC tenure included the prosecution push after the 2008–09 capital-market crash and a noisy fight with the National Assembly. She then ran the World Bank’s treasury. Listed as a markets regulator and multilateral treasurer, not as a campaign surname.",
    citation: {
      title: "Arunma Oteh",
      publisher: "World Bank",
      year: 2018,
      url: "https://www.worldbank.org",
    },
  },
  {
    id: "oluyinka-olutoye",
    name: "Oluyinka Olutoye",
    born: 1965,
    birthplace: "Lagos",
    categories: ["science"],
    relatedSectorSlugs: ["healthcare", "education"],
    wikipediaTitle: "Oluyinka Olutoye",
    achievement:
      "Paediatric surgeon who led teams performing open fetal surgery, including a widely reported 2016 operation that removed a sacrococcygeal tumour and returned the fetus to the womb.",
    summary:
      "Olutoye trained in Nigeria and the United States and became a reference name in fetal surgery at Texas Children’s Hospital, later taking a leadership post at Nationwide Children’s. The 2016 case made the technique vivid to a lay public. He is listed as medicine, not as miracle copy.",
    citation: {
      title: "Oluyinka Olutoye",
      publisher: "Texas Children’s Hospital / academic profiles",
      year: 2016,
      url: "https://www.texaschildrens.org",
    },
  },
  {
    id: "herbert-wigwe",
    name: "Herbert Onyewumbu Wigwe",
    born: 1966,
    died: 2024,
    birthplace: "Ibadan / Rivers",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "economy", "education"],
    wikipediaTitle: "Herbert Wigwe",
    achievement:
      "Co-founder and later group chief executive of Access Bank; turned a mid-tier lender into one of Africa’s largest banks by assets before his death in 2024.",
    summary:
      "With Aigboje Aig-Imoukhuede, Wigwe acquired Access in 2002 and expanded it across the continent, including the 2019 merger with Diamond Bank. He founded Wigwe University. He died in a helicopter crash in the United States in February 2024. The bank’s published statements are the corporate record.",
    citation: {
      title: "Herbert Wigwe",
      publisher: "Access Bank Plc",
      year: 2024,
      url: "https://www.accessbankplc.com",
    },
  },
  {
    id: "aigboje-aig-imoukhuede",
    name: "Aigboje Aig-Imoukhuede",
    born: 1966,
    birthplace: "Ibadan",
    categories: ["enterprise"],
    relatedSectorSlugs: ["financial-inclusion", "economy"],
    wikipediaTitle: "Aigboje Aig-Imoukhuede",
    achievement:
      "Banker who, with Herbert Wigwe, acquired and scaled Access Bank, then moved into Africa’s finance-leadership and philanthropy circuits (Aig-Imoukhuede Foundation).",
    summary:
      "Aig-Imoukhuede’s post-bank career has been public-service reform philanthropy and African finance diplomacy. The checkable industrial fact remains the Access story: a 2002 reverse takeover that became a pan-African balance sheet.",
    citation: {
      title: "Aig-Imoukhuede Foundation",
      publisher: "Aig-Imoukhuede Foundation",
      year: 2024,
      url: "https://www.aigimoukhuedefoundation.org",
    },
  },
  {
    id: "helon-habila",
    name: "Helon Habila",
    born: 1967,
    birthplace: "Kaltungo, Gombe",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Helon Habila",
    achievement:
      "Novelist of Waiting for an Angel, Measuring Time, and Oil on Water; a Caine Prize winner who made the Niger Delta novel a global literary object.",
    summary:
      "Habila came from poetry and journalism into novels that treat military-era Lagos, Gombe family history, and oil-delta violence without tourist prose. He teaches in the United States. Oil on Water is the Delta book many syllabuses actually assign.",
    citation: {
      title: "Helon Habila",
      publisher: "The Caine Prize for African Writing",
      year: 2001,
      url: "https://www.caineprize.com",
    },
  },
  {
    id: "mary-onyali",
    name: "Mary Onyali-Omagbemi",
    born: 1968,
    birthplace: "Aboh",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Mary Onyali-Omagbemi",
    achievement:
      "Sprinter who competed at five Olympic Games and won Nigeria’s first Olympic track medal (4×100 m bronze, 1992) plus individual 200 m bronze in 1996.",
    summary:
      "Onyali was the face of Nigerian women’s sprinting before Ajunwa’s long-jump gold. Five Olympics is a longevity record few Nigerian athletes match. She later went into sports administration. The medals are in the IOC database, not in folklore.",
    citation: {
      title: "Mary Onyali-Omagbemi",
      publisher: "Olympics.com",
      year: 2024,
      url: "https://www.olympics.com/en/athletes/mary-onyali-omagbemi",
    },
  },
  {
    id: "nnedi-okorafor",
    name: "Nnedi Okorafor",
    born: 1974,
    birthplace: "Cincinnati (raised between the U.S. and Nigeria)",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Nnedi Okorafor",
    achievement:
      "Novelist of Who Fears Death, Binti, and Akata Witch; a Hugo and Nebula winner who made Nigerian and West African futures a centre of world science fiction.",
    summary:
      "Okorafor’s parents are Nigerian; her settings run from Nigeria to Sudan to outer space without treating Africa as scenery. Binti changed what a space opera protagonist could look like. She is listed as a Nigerian writer in the diaspora, not as an American footnote.",
    citation: {
      title: "Nnedi Okorafor",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Nnedi-Okorafor",
    },
  },
  {
    id: "teju-cole",
    name: "Teju Cole",
    born: 1975,
    birthplace: "Kalamazoo (raised in Lagos)",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Teju Cole",
    achievement:
      "Author of Open City and Every Day Is for the Thief; a novelist-essayist-photographer who made Lagos and the migrant city a contemporary art form.",
    summary:
      "Cole grew up in Lagos, studied in the United States, and writes in a cool, essayistic novel form that critics compared to Sebald. Every Day Is for the Thief is one of the best short books about returning to Lagos. He is a Nigerian writer whose career is transatlantic on purpose.",
    citation: {
      title: "Teju Cole",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Teju-Cole",
    },
  },
  {
    id: "innocent-idibia",
    name: "Innocent Ujah Idibia (2Baba)",
    born: 1975,
    birthplace: "Jos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "2Baba",
    achievement:
      "Afropop singer whose African Queen (2004) was an early pan-African radio standard of the digital-era Nigerian pop boom.",
    summary:
      "2Baba (formerly 2Face Idibia) came from Plantashun Boiz and then a solo career that made Lagos pop exportable before Afrobeats had the name. African Queen still functions as a regional wedding song. Later advocacy (including electoral participation campaigns) is secondary to the catalogue.",
    citation: {
      title: "2Baba",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/2Baba",
    },
  },
  {
    id: "sound-sultan",
    name: "Olanrewaju Fasasi (Sound Sultan)",
    born: 1976,
    died: 2021,
    birthplace: "Jos / Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Sound Sultan",
    achievement:
      "Rapper and singer whose socially comic records (Jagbajantis, Backbone) made Nigerian hip-hop a moral commentary form; died of lymphoma in 2021.",
    summary:
      "Sound Sultan’s humour was never only jokes — Jagbajantis is a pidgin sermon about inverted values. He mentored younger artists and kept a low-ego public presence. His death produced a rare, uncynical industry mourning.",
    citation: {
      title: "Sound Sultan",
      publisher: "BBC News",
      year: 2021,
      url: "https://www.bbc.com/news/world-africa-57821622",
    },
  },
  {
    id: "perpetua-nkwocha",
    name: "Perpetua Eileen Nkwocha",
    born: 1976,
    birthplace: "Lagos / Abia",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Perpetua Nkwocha",
    achievement:
      "Super Falcons forward; seven-time African Women’s Footballer of the Year and a record goalscorer at the Women’s Africa Cup of Nations.",
    summary:
      "Nkwocha’s peak was the 2000s Falcons sides that dominated the continental championship. She later coached in Sweden. Before Oshoala, she was the statistical argument that Nigerian women’s football had world-class finishers.",
    citation: {
      title: "Perpetua Nkwocha",
      publisher: "FIFA",
      year: 2024,
      url: "https://www.fifa.com",
    },
  },
  {
    id: "funke-akindele",
    name: "Funke Akindele-Bello",
    born: 1977,
    birthplace: "Ikorodu",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Funke Akindele",
    achievement:
      "Creator-star of Jenifa and the A Tribe Called Judah box-office phenomenon; a producer who proved Yoruba-language comedy could dominate Nigerian cinemas.",
    summary:
      "Akindele’s Jenifa persona moved from television to film to a production company that treats opening-weekend numbers as the point. A Tribe Called Judah (2023) set a local box-office mark. She briefly held a Lagos political appointment and left it — listed here as an entertainment industrialist.",
    citation: {
      title: "Funke Akindele",
      publisher: "Africa Movie Academy Awards / box-office reporting",
      year: 2024,
      url: "https://www.bfi.org.uk",
    },
  },
  {
    id: "tiwa-savage",
    name: "Tiwatope Omolara Savage",
    born: 1980,
    birthplace: "Isale Eko, Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Tiwa Savage",
    achievement:
      "Singer-songwriter who became Mavin Records’ flagship female artist and a face of Afrobeats’ global touring decade.",
    summary:
      "Savage trained in London (including work with the production world around George Michael) then came home to Lagos pop. If I Start to Talk and later albums made her a headliner rather than a featured verse. Listed as a recording artist who professionalised the female Afrobeats lane.",
    citation: {
      title: "Tiwa Savage",
      publisher: "Recording Academy / Grammy Awards",
      year: 2024,
      url: "https://www.grammy.com/artists/tiwa-savage/24909",
    },
  },
  {
    id: "vincent-enyeama",
    name: "Vincent Enyeama",
    born: 1982,
    birthplace: "Abia / Lagos",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Vincent Enyeama",
    achievement:
      "Super Eagles goalkeeper (101 caps) and a Lille OSC staple; among the most-capped players in Nigerian men’s football history.",
    summary:
      "Enyeama’s penalty saves and longevity made him the default number one across multiple AFCON and World Cup cycles. At Lille he was Ligue 1’s face of a Nigerian keeper who started every week. Caps and club appearances are the record; social-media feuds are not.",
    citation: {
      title: "Vincent Enyeama",
      publisher: "Ligue 1 / FIFA",
      year: 2024,
      url: "https://www.ligue1.com",
    },
  },
  {
    id: "asa",
    name: "Bukola Elemide (Aṣa)",
    born: 1982,
    birthplace: "Paris / Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Aṣa",
    achievement:
      "Singer of Fire on the Mountain and Jailer, whose bilingual soul-folk made a Nigerian woman’s voice ordinary on European radio without Afrobeats branding.",
    summary:
      "Aṣa grew up between Paris and Lagos and writes in English and Yoruba. The 2007 debut was a different export path from the later Afrobeats boom — smaller rooms, heavier lyrics. She is proof that Nigerian pop is not one genre.",
    citation: {
      title: "Aṣa",
      publisher: "Radio France Internationale",
      year: 2024,
      url: "https://www.rfi.fr",
    },
  },
  {
    id: "john-mikel-obi",
    name: "John Michael Nchekwube Obinna (Mikel Obi)",
    born: 1987,
    birthplace: "Jos",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Mikel John Obi",
    achievement:
      "Chelsea midfielder who won the UEFA Champions League (2012) and captained Nigeria to the 2013 Africa Cup of Nations.",
    summary:
      "Mikel’s career is the Premier League generation after Okocha: fewer stepovers, more trophies. The 2005 transfer tug-of-war between United and Chelsea is sports-law folklore; the medals are why he is here. He later played in China and Turkey.",
    citation: {
      title: "Mikel John Obi",
      publisher: "Chelsea FC / Premier League",
      year: 2024,
      url: "https://www.premierleague.com/players/2746/John-Obi-Mikel/overview",
    },
  },
  {
    id: "wizkid",
    name: "Ayodeji Ibrahim Balogun (Wizkid)",
    born: 1990,
    birthplace: "Surulere, Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Wizkid",
    achievement:
      "Afrobeats artist whose feature on Drake’s One Dance (2016) and the album Made in Lagos took Lagos pop to global chart infrastructure.",
    summary:
      "Wizkid’s Superstar (2011) was a local coronation; One Dance was the statistical break — a Nigerian voice on a Billboard Hot 100 number one. Essence with Tems later did similar work in the U.S. Listed as an export industrialist of sound, not as a tabloid.",
    citation: {
      title: "Wizkid",
      publisher: "Recording Academy / Grammy Awards",
      year: 2024,
      url: "https://www.grammy.com/artists/wizkid/18950",
    },
  },
  {
    id: "davido",
    name: "David Adedeji Adeleke (Davido)",
    born: 1992,
    birthplace: "Atlanta (raised in Lagos)",
    categories: ["arts", "enterprise"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Davido",
    achievement:
      "Singer-entrepreneur whose DMW label and singles (Fall, If) made Afrobeats a stadium touring business; a Grammy-nominated headliner.",
    summary:
      "Davido’s public life is noisy; the industrial fact is catalogue plus a label that broke other acts, plus tours that sell arenas. Born in the U.S., raised in Lagos, he is a Nigerian pop businessman whose numbers are on Billboard and in box reports, not in press releases alone.",
    citation: {
      title: "Davido",
      publisher: "Recording Academy / Grammy Awards",
      year: 2024,
      url: "https://www.grammy.com/artists/davido/24908",
    },
  },
  {
    id: "tems",
    name: "Temilade Openiyi (Tems)",
    born: 1995,
    birthplace: "Lagos",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Tems",
    achievement:
      "Singer-songwriter whose features on Wizkid’s Essence and Future/Drake’s Wait for U, plus a James Bond song, made a Lagos alto a global pop instrument; Grammy winner.",
    summary:
      "Tems writes and produces with a slower, darker tone than party Afrobeats. Essence was a U.S. radio event; Wait for U went to number one on the Hot 100. She is listed for the records, not for the fashion copy.",
    citation: {
      title: "Tems",
      publisher: "Recording Academy / Grammy Awards",
      year: 2024,
      url: "https://www.grammy.com/artists/tems/39422",
    },
  },
  {
    id: "tobi-amusan",
    name: "Oluwatobiloba Ayomide Amusan",
    born: 1997,
    birthplace: "Ijebu Ode",
    categories: ["sport"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Tobi Amusan",
    achievement:
      "Hurdler who won world gold in the 100 m hurdles (Eugene 2022) and set a world record of 12.12 seconds in the semi-final.",
    summary:
      "Amusan’s 2022 championships made her the first Nigerian world champion in a track event. The 12.12 record was later a technical footnote in wind/ratification debate; the gold medal is not. She is the post-Onyali, post-Ajunwa argument that Nigerian women still own global championships.",
    citation: {
      title: "Tobi Amusan",
      publisher: "World Athletics",
      year: 2022,
      url: "https://worldathletics.org/athletes/nigeria/tobi-amusan-14431889",
    },
  },
];
