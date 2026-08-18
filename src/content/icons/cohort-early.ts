import type { IconFigure } from "@/types/content";

type Draft = Omit<IconFigure, "image" | "reviewStatus">;

export const ICON_COHORT_EARLY: Draft[] = [
  {
    id: "queen-amina",
    name: "Queen Amina of Zazzau",
    born: 1533,
    died: 1610,
    circa: true,
    birthplace: "Zazzau (Zaria)",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "security"],
    relatedTimelineIds: ["pre-colonial"],
    wikipediaTitle: "Amina (Queen of Zazzau)",
    achievement:
      "16th-century warrior-queen of Zazzau whose campaigns expanded Hausa trade routes across the north.",
    summary:
      "Oral and later written Hausa chronicles describe Amina as a ruler who fortified towns with earthworks and secured caravan roads that tied Zazzau to Kano, Katsina, and Nupe. Her story is one of the few widely taught pre-colonial Nigerian women in power — a reminder that political authority in the Hausa city-states was not only male.",
    citation: {
      title: "Amina, queen of Zaria",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Amina-queen-of-Zaria",
    },
  },
  {
    id: "olaudah-equiano",
    name: "Olaudah Equiano",
    born: 1745,
    died: 1797,
    circa: true,
    birthplace: "Essaka (Igboland)",
    categories: ["literature", "activism"],
    relatedSectorSlugs: ["education", "governance"],
    wikipediaTitle: "Olaudah Equiano",
    achievement:
      "Igbo-born author of The Interesting Narrative (1789), a foundational slave-trade testimony used by British abolitionists.",
    summary:
      "Kidnapped as a child and enslaved in the Atlantic trade, Equiano bought his freedom and published an autobiography that became a bestseller in Britain. Whether every childhood detail can be independently verified, the book remains a primary document of the trade that emptied communities in the Bight of Biafra.",
    citation: {
      title: "Olaudah Equiano",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Olaudah-Equiano",
    },
  },
  {
    id: "usman-dan-fodio",
    name: "Usman dan Fodio",
    born: 1754,
    died: 1817,
    birthplace: "Gobir",
    categories: ["leadership", "science"],
    relatedSectorSlugs: ["governance", "education"],
    relatedTimelineIds: ["sokoto-caliphate"],
    wikipediaTitle: "Usman dan Fodio",
    achievement:
      "Scholar-reformer who founded the Sokoto Caliphate, the largest 19th-century state in West Africa.",
    summary:
      "Dan Fodio’s 1804 jihad against Gobir produced a literate Islamic administration stretching across much of present-day northern Nigeria. Sokoto’s emirates, courts, and scholarly networks shaped law, taxation, and education long after British conquest — including the indirect-rule bargain the colonial state later struck with Fulani emirs.",
    citation: {
      title: "Usman dan Fodio",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Usman-dan-Fodio",
    },
  },
  {
    id: "efunroye-tinubu",
    name: "Efunroye Tinubu",
    born: 1805,
    died: 1887,
    circa: true,
    birthplace: "Abeokuta",
    categories: ["enterprise", "leadership"],
    relatedSectorSlugs: ["economy", "governance"],
    wikipediaTitle: "Efunroye Tinubu",
    achievement:
      "Abeokuta-born merchant who became a power broker in Lagos politics and trade in the mid-19th century.",
    summary:
      "Madam Tinubu built a commercial network in slaves, palm oil, and firearms before and during the British presence in Lagos. Exiled after clashing with colonial officials, she remained an Iyalode-scale figure in Egba politics. Lagos Island’s Tinubu Square commemorates her — and the contested economy that made 19th-century Lagos rich.",
    citation: {
      title: "Madam Efunroye Tinubu",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/topic/Tinubu-Square",
    },
  },
  {
    id: "samuel-ajayi-crowther",
    name: "Samuel Ajayi Crowther",
    born: 1809,
    died: 1891,
    circa: true,
    birthplace: "Osogun, Yorubaland",
    categories: ["science", "leadership"],
    relatedSectorSlugs: ["education", "governance"],
    wikipediaTitle: "Samuel Ajayi Crowther",
    achievement:
      "First African bishop of the Anglican Church; translated the Bible into Yoruba and produced a pioneering Yoruba grammar and dictionary.",
    summary:
      "Enslaved as a youth, freed by a British patrol, and educated in Sierra Leone, Crowther returned as a missionary-linguist. His Yoruba orthography underpins literacy and liturgy across southwestern Nigeria. He also led the Niger Mission until European colleagues undermined his authority — a case study in colonial racial hierarchy inside the church.",
    citation: {
      title: "Samuel Ajayi Crowther",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Samuel-Ajayi-Crowther",
    },
  },
  {
    id: "jaja-of-opobo",
    name: "Jaja of Opobo",
    born: 1821,
    died: 1891,
    birthplace: "Igboland / Opobo",
    categories: ["enterprise", "leadership"],
    relatedSectorSlugs: ["economy", "governance"],
    relatedTimelineIds: ["colonial-economy"],
    wikipediaTitle: "Jaja of Opobo",
    achievement:
      "Merchant-king who broke Bonny’s palm-oil middleman system and built Opobo into a sovereign trading state.",
    summary:
      "Born an Igbo slave in Bonny, Jaja rose through the canoe-house system, then founded Opobo in 1870 to deal directly with European firms. Britain abducted and exiled him in 1887 when he blocked agents from bypassing his duties — an episode that shows how “free trade” was enforced at gunpoint on the Oil Rivers.",
    citation: {
      title: "Jaja",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Jaja",
    },
  },
  {
    id: "nana-olomu",
    name: "Nana Olomu",
    born: 1852,
    died: 1916,
    birthplace: "Itsekiri (Warri)",
    categories: ["enterprise", "leadership"],
    relatedSectorSlugs: ["economy", "governance"],
    wikipediaTitle: "Nana Olomu",
    achievement:
      "Itsekiri governor of the Benin River whose control of palm-oil trade led to a British military expedition in 1894.",
    summary:
      "As governor, Nana taxed and regulated trade on the Benin River much as Jaja had at Opobo. A British naval force destroyed his town at Ebrohimi; he was tried and exiled to Ghana. The campaign opened the western delta to colonial firms and is a counterpart to the 1897 Benin expedition farther east.",
    citation: {
      title: "Nana Olomu",
      publisher: "Oxford Dictionary of National Biography",
      year: 2004,
      url: "https://www.oxforddnb.com/display/10.1093/ref:odnb/9780198614128.001.0001/odnb-9780198614128-e-53461",
    },
  },
  {
    id: "christopher-sapara-williams",
    name: "Christopher Alexander Sapara Williams",
    born: 1855,
    died: 1915,
    birthplace: "Sierra Leone / Lagos",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Christopher Sapara Williams",
    achievement:
      "First Nigerian called to the English bar (1879) and an early unofficial member of the colonial Legislative Council.",
    summary:
      "Sapara Williams practised in Lagos and Accra and used the Legislative Council to argue for African representation under Crown Colony rule. He is a starting point for Nigeria’s independent legal profession — the same bar that later produced nationalist lawyers and, after 1960, the country’s first benches.",
    citation: {
      title: "Christopher Alexander Sapara Williams",
      publisher: "Encyclopedia.com / Oxford Companion to Black British History",
      year: 2007,
      url: "https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/williams-christopher-alexander-sapara",
    },
  },
  {
    id: "ovonramwen",
    name: "Oba Ovonramwen Nogbaisi",
    born: 1857,
    died: 1914,
    circa: true,
    birthplace: "Benin City",
    categories: ["leadership", "arts"],
    relatedSectorSlugs: ["governance", "creative-economy"],
    relatedTimelineIds: ["benin-kingdom"],
    wikipediaTitle: "Ovonramwen",
    achievement:
      "Oba of Benin during the 1897 British punitive expedition that looted the palace bronzes and sent him into exile.",
    summary:
      "Ovonramwen’s reign ended when a British invading force burned the palace and shipped thousands of brass and ivory works to Europe. Those objects — now in museums from London to Berlin — are the centre of restitution debates. His exile in Calabar closed an independent Benin monarchy that had lasted centuries.",
    citation: {
      title: "The British Museum and the Benin Bronzes",
      publisher: "The British Museum",
      year: 2024,
      url: "https://www.britishmuseum.org/about-us/british-museum-story/contested-objects-collection/benin-bronzes",
    },
  },
  {
    id: "henry-carr",
    name: "Henry Rawlinson Carr",
    born: 1863,
    died: 1945,
    birthplace: "Lagos",
    categories: ["science", "leadership"],
    relatedSectorSlugs: ["education", "governance"],
    wikipediaTitle: "Henry Carr (Nigerian educator)",
    achievement:
      "Lagos educator and colonial civil servant who rose to resident and helped shape early Western schooling in southern Nigeria.",
    summary:
      "Carr was among the first Nigerians to hold senior posts in the colonial education department. He argued for teacher training and inspection standards that outlived the mission-school patchwork. His career shows both the ceiling Africans hit in the colonial service and the bureaucratic skill later nationalists inherited.",
    citation: {
      title: "Henry Carr",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Henry-Carr",
    },
  },
  {
    id: "herbert-macaulay",
    name: "Herbert Macaulay",
    born: 1864,
    died: 1946,
    birthplace: "Lagos",
    categories: ["leadership", "activism"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["1914-amalgamation"],
    wikipediaTitle: "Herbert Macaulay",
    achievement:
      "Surveyor-turned-nationalist who co-founded the Nigerian National Democratic Party (1923), often called the father of Nigerian nationalism.",
    summary:
      "Grandson of Crowther, Macaulay used newspapers, petitions, and the NNDP to contest land seizures and taxation in Lagos. He later allied with Azikiwe’s NCNC. The colonial state painted him as a troublemaker; the independence generation treated him as a founder. Either way, organised Nigerian party politics starts with his Lagos machine.",
    citation: {
      title: "Herbert Macaulay",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Herbert-Macaulay",
    },
  },
  {
    id: "alvan-ikoku",
    name: "Alvan Azinna Ikoku",
    born: 1900,
    died: 1971,
    birthplace: "Arochukwu",
    categories: ["science"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Alvan Ikoku",
    achievement:
      "Teacher and legislator who founded the first Nigerian-owned secondary school in Calabar and pressed for universal primary education.",
    summary:
      "Ikoku’s Aggrey Memorial College (1932) proved Africans could run secondary education without a mission board. In the Eastern House of Assembly he pushed teacher pay and primary-school expansion. His portrait on the ₦10 note is a rare honour for an educationist rather than a head of state.",
    citation: {
      title: "Alvan Ikoku",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Alvan-Ikoku",
    },
  },
  {
    id: "funmilayo-ransome-kuti",
    name: "Funmilayo Ransome-Kuti",
    born: 1900,
    died: 1978,
    birthplace: "Abeokuta",
    categories: ["activism", "leadership"],
    relatedSectorSlugs: ["governance", "education"],
    wikipediaTitle: "Funmilayo Ransome-Kuti",
    achievement:
      "Led the Abeokuta Women’s Union against colonial market taxes and became one of the first women to drive nationalist politics in Nigeria.",
    summary:
      "A teacher by training, Ransome-Kuti organised thousands of Egba women, forced the Alake of Abeokuta into temporary exile in 1949, and sat in NCNC politics when few parties wanted women. She was also Fela’s mother. British files called her a communist; Abeokuta remembers a tax revolt that worked.",
    citation: {
      title: "Funmilayo Ransome-Kuti",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Funmilayo-Ransome-Kuti",
    },
  },
  {
    id: "nnamdi-azikiwe",
    name: "Nnamdi Azikiwe",
    born: 1904,
    died: 1996,
    birthplace: "Zungeru",
    categories: ["leadership", "literature"],
    relatedSectorSlugs: ["governance", "education"],
    relatedTimelineIds: ["independence-1960"],
    wikipediaTitle: "Nnamdi Azikiwe",
    achievement:
      "Journalist-nationalist who became Nigeria’s first governor-general and first ceremonial president (1963–66).",
    summary:
      "“Zik” built a West African newspaper chain, popularised pan-African nationalism in English, and fronted the NCNC into independence. His presidency was constitutional, not executive — power sat with Tafawa Balewa — but the symbolism of an African head of state in 1963 mattered. The 1966 coup ended the First Republic he had personified.",
    citation: {
      title: "Nnamdi Azikiwe",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Nnamdi-Azikiwe",
    },
  },
  {
    id: "obafemi-awolowo",
    name: "Obafemi Awolowo",
    born: 1909,
    died: 1987,
    birthplace: "Ikenne",
    categories: ["leadership", "science"],
    relatedSectorSlugs: ["education", "governance", "economy"],
    relatedTimelineIds: ["independence-1960"],
    wikipediaTitle: "Obafemi Awolowo",
    achievement:
      "Premier of the Western Region who introduced free primary education in 1955 — the most ambitious mass-schooling programme in colonial Africa.",
    summary:
      "Awo’s Action Group government used cocoa revenue to fund schools, a regional TV service, and industrial estates. Critics called it Yoruba particularism; supporters called it proof that a Nigerian government could deliver social policy. He never became federal prime minister, but every later debate about free education still starts with 1955.",
    citation: {
      title: "Obafemi Awolowo",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Obafemi-Awolowo",
    },
  },
  {
    id: "ahmadu-bello",
    name: "Ahmadu Bello",
    born: 1910,
    died: 1966,
    birthplace: "Rabah, Sokoto",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "education", "economy"],
    relatedTimelineIds: ["independence-1960"],
    wikipediaTitle: "Ahmadu Bello",
    achievement:
      "Sardauna of Sokoto and premier of the Northern Region; founded the Northern People’s Congress that dominated the First Republic.",
    summary:
      "Bello chose regional power over the federal premiership, modernising northern administration while defending Islamic and emirate authority. Ahmadu Bello University (1962) is his most durable institution. He was killed in the January 1966 coup — a shock that helped trigger the counter-coup and civil war.",
    citation: {
      title: "Sir Ahmadu Bello",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Ahmadu-Bello",
    },
  },
  {
    id: "tafawa-balewa",
    name: "Abubakar Tafawa Balewa",
    born: 1912,
    died: 1966,
    birthplace: "Tafawa Balewa, Bauchi",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["independence-1960", "1966-coups"],
    wikipediaTitle: "Abubakar Tafawa Balewa",
    achievement:
      "Nigeria’s first and only prime minister (1960–66); a teacher-turned-NPC leader who took the country into independence.",
    summary:
      "Balewa’s Westminster-style government tried to hold a three-region federation together through alliance politics. He was overthrown and killed in January 1966. Speeches at the UN and Commonwealth made him the international face of a young Nigeria; the coup showed how brittle that settlement was.",
    citation: {
      title: "Sir Abubakar Tafawa Balewa",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Abubakar-Tafawa-Balewa",
    },
  },
  {
    id: "kofoworola-ademola",
    name: "Kofoworola, Lady Ademola",
    born: 1913,
    died: 2002,
    birthplace: "Lagos",
    categories: ["science", "activism"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Kofoworola Ademola",
    achievement:
      "First Black African woman to earn an Oxford degree (St Hugh’s, 1935) and a leading voice in Nigerian women’s education and social work.",
    summary:
      "Daughter of the Moore family of Lagos, she studied English at Oxford, married Adetokunbo Ademola (later Chief Justice), and spent decades on girls’ schooling, the National Council of Women’s Societies, and writing. Her Oxford first is still cited as a landmark in West African women’s higher education.",
    citation: {
      title: "Lady Kofoworola Ademola",
      publisher: "University of Oxford / St Hugh’s College",
      year: 2020,
      url: "https://www.st-hughs.ox.ac.uk/lady-kofo-ademola/",
    },
  },
  {
    id: "margaret-ekpo",
    name: "Margaret Ekpo",
    born: 1914,
    died: 2006,
    birthplace: "Creek Town, Calabar",
    categories: ["activism", "leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Margaret Ekpo",
    achievement:
      "Nationalist and Aba women’s organiser who became one of the first women elected to a Nigerian regional legislature (1961).",
    summary:
      "A pharmacist’s widow turned politician, Ekpo mobilised market women in the East, sat in the Eastern House of Assembly, and represented Nigeria at overseas conferences. With Funmilayo Ransome-Kuti and Gambo Sawaba she is one of the three names usually taught as the women’s wing of the independence generation.",
    citation: {
      title: "Margaret Ekpo",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Margaret-Ekpo",
    },
  },
  {
    id: "taslim-elias",
    name: "Taslim Olawale Elias",
    born: 1914,
    died: 1991,
    birthplace: "Lagos",
    categories: ["leadership", "science"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Taslim Olawale Elias",
    achievement:
      "Jurist who became Nigeria’s attorney-general and later president of the International Court of Justice (1982–85).",
    summary:
      "Elias helped draft independence-era constitutions, wrote standard texts on Nigerian land law and government, and was the first African to preside at the ICJ. His career is the through-line from colonial legal training to Nigeria’s claim on international law.",
    citation: {
      title: "Taslim Olawale Elias",
      publisher: "International Court of Justice",
      year: 1991,
      url: "https://www.icj-cij.org/public/files/press-releases/4/10404.pdf",
    },
  },
  {
    id: "hubert-ogunde",
    name: "Hubert Ogunde",
    born: 1916,
    died: 1990,
    birthplace: "Ososa, Ogun",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    relatedTimelineIds: ["nollywood-birth"],
    wikipediaTitle: "Hubert Ogunde",
    achievement:
      "Founder of the first professional Nigerian theatre company (1945) and a bridge from Yoruba travelling theatre into film.",
    summary:
      "Ogunde’s troupes toured with political and moral plays (Strike and Hunger, Yoruba Ronu) that colonial and later military censors banned. His 1980s films kept the Alarinjo tradition alive just as Nollywood’s video boom began. He is the ancestor both of live Yoruba theatre and of a commercial film industry.",
    citation: {
      title: "Hubert Ogunde",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Hubert-Ogunde",
    },
  },
  {
    id: "ben-enwonwu",
    name: "Benedict Chukwukadibia Enwonwu",
    born: 1917,
    died: 1994,
    birthplace: "Onitsha",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Ben Enwonwu",
    achievement:
      "Pioneer modernist painter and sculptor; his portraits and the sculpture Anyanwu made Nigerian fine art internationally visible.",
    summary:
      "Enwonwu trained in London, painted a celebrated portrait of Queen Elizabeth II, and argued that African modernism did not have to copy Paris. Works such as Tutu (rediscovered in 2017) and the UN-linked Anyanwu bronze sit at the start of Nigeria’s 20th-century art market and museum story.",
    citation: {
      title: "Ben Enwonwu",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Ben-Enwonwu",
    },
  },
  {
    id: "kenneth-dike",
    name: "Kenneth Onwuka Dike",
    born: 1917,
    died: 1983,
    birthplace: "Awka",
    categories: ["science"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Kenneth Dike",
    achievement:
      "Historian and first Nigerian vice-chancellor of the University of Ibadan; a founder of professional African historiography.",
    summary:
      "Dike’s Trade and Politics in the Niger Delta used African oral and archival sources to write economic history from the delta outward. As Ibadan’s VC he defended academic standards in a new national university. The National Archives of Nigeria grew from the records work he championed.",
    citation: {
      title: "Kenneth Onwuka Dike",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Kenneth-Onwuka-Dike",
    },
  },
  {
    id: "eni-njoku",
    name: "Eni Njoku",
    born: 1917,
    died: 1974,
    birthplace: "Umuahia",
    categories: ["science"],
    relatedSectorSlugs: ["education", "energy"],
    wikipediaTitle: "Eni Njoku",
    achievement:
      "Botanist and first vice-chancellor of the University of Nigeria, Nsukka (1960); later chaired the Electricity Corporation of Nigeria.",
    summary:
      "Njoku helped stand up UNN as Azikiwe’s flagship university and then ran the colonial-era power utility in the early independence years. His career ties the new universities to the equally new problem of keeping the lights on.",
    citation: {
      title: "Eni Njoku",
      publisher: "University of Nigeria, Nsukka",
      year: 2024,
      url: "https://unn.edu.ng",
    },
  },
  {
    id: "jaja-wachuku",
    name: "Jaja Anucha Wachuku",
    born: 1918,
    died: 1996,
    birthplace: "Nbawsi, Abia",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Jaja Wachuku",
    achievement:
      "First Nigerian Speaker of the House of Representatives and first indigenous minister of foreign affairs.",
    summary:
      "Wachuku led Nigeria’s UN delegation in the early 1960s, including diplomacy around the Congo crisis, then became foreign minister. He is a marker of how quickly the independence generation moved from the colonial legislature onto the world stage.",
    citation: {
      title: "Jaja Anucha Wachuku",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Jaja-Wachuku",
    },
  },
  {
    id: "aminu-kano",
    name: "Aminu Kano",
    born: 1920,
    died: 1983,
    birthplace: "Kano",
    categories: ["leadership", "activism"],
    relatedSectorSlugs: ["governance", "education"],
    wikipediaTitle: "Aminu Kano",
    achievement:
      "Northern teacher-politician who founded NEPU, a radical challenge to emirate power and the NPC establishment.",
    summary:
      "Mallam Aminu organised talakawa (commoner) politics in Kano, backed women’s education, and later led the People’s Redemption Party. He never held the presidency; he changed what northern politics could sound like. The Aminu Kano International Airport bears his name.",
    citation: {
      title: "Aminu Kano",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Aminu-Kano",
    },
  },
  {
    id: "michael-okpara",
    name: "Michael Iheonukara Okpara",
    born: 1920,
    died: 1984,
    birthplace: "Umuahia",
    categories: ["leadership", "enterprise"],
    relatedSectorSlugs: ["economy", "agriculture", "governance"],
    relatedTimelineIds: ["colonial-cash-crops"],
    wikipediaTitle: "Michael Okpara",
    achievement:
      "Premier of the Eastern Region (1959–66) whose “pragmatic socialism” pushed farm settlements, palm and rubber, and regional industry.",
    summary:
      "A physician in politics, Okpara tried to industrialise the East on agricultural surplus — farm settlements, the Niger Steel idea, and marketing-board finance. The 1966 coup and civil war cut the experiment short. Eastern Nigerian development debates still return to his premiership.",
    citation: {
      title: "Michael Okpara",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Michael-Okpara",
    },
  },
  {
    id: "amos-tutuola",
    name: "Amos Tutuola",
    born: 1920,
    died: 1997,
    birthplace: "Abeokuta",
    categories: ["literature"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Amos Tutuola",
    achievement:
      "Author of The Palm-Wine Drinkard (1952), the first African novel in English published in London to reach a world audience.",
    summary:
      "A brief, Yoruba-inflected quest narrative, Drinkard startled British critics and later African writers (some of whom found its English embarrassing). Tutuola proved that Nigerian oral storytelling could travel as literature without waiting for a university novel. Achebe and Soyinka would soon make a different, more “standard” English famous; Tutuola got there first.",
    citation: {
      title: "Amos Tutuola",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Amos-Tutuola",
    },
  },
  {
    id: "fra-williams",
    name: "Frederick Rotimi Alade Williams",
    born: 1920,
    died: 2005,
    birthplace: "Lagos",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Rotimi Williams",
    achievement:
      "First Nigerian to become a Senior Advocate of Nigeria; a dominant constitutional lawyer of the independence and Second Republic eras.",
    summary:
      "FRA Williams co-founded a chambers that trained much of the post-independence bar, served as attorney-general of the West, and argued defining constitutional cases. SAN rank itself was modelled in part on careers like his. Nigerian legal professionalism as a private, lucrative, politically weighty estate starts here.",
    citation: {
      title: "Chief FRA Williams (1920–2005)",
      publisher: "The Guardian (Nigeria) / Nigerian Bar Association memorial notices",
      year: 2005,
      url: "https://www.ibanet.org/article/8C0E0C0E-obituaries-archive",
    },
  },
  {
    id: "cyprian-ekwensi",
    name: "Cyprian Ekwensi",
    born: 1921,
    died: 2007,
    birthplace: "Minna",
    categories: ["literature"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Cyprian Ekwensi",
    achievement:
      "Pharmacist-novelist whose People of the City (1954) and Jagua Nana made urban Lagos a subject of African fiction.",
    summary:
      "Ekwensi wrote popular novels about migrants, nightlife, and the new city when most African literature still looked at the village. He also ran the Federal Ministry of Information’s literary output. His books sold because they were readable — a different, mass-market path from the Ibadan/Nsukka canon.",
    citation: {
      title: "Cyprian Ekwensi",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Cyprian-Ekwensi",
    },
  },
  {
    id: "tai-solarin",
    name: "Tai Solarin",
    born: 1922,
    died: 1994,
    birthplace: "Ikenne",
    categories: ["science", "activism"],
    relatedSectorSlugs: ["education", "governance"],
    wikipediaTitle: "Tai Solarin",
    achievement:
      "Educator who founded Mayflower School, Ikenne (1956), a secular, co-educational boarding school that became a model of independent Nigerian schooling.",
    summary:
      "A former RAF technician and columnist, Solarin preached self-reliance, mixed-sex education, and scepticism toward both missionaries and soldiers. Mayflower’s khaki-and-hoe ethos influenced later private schools. He was detained under military rule for saying the quiet parts of civic life out loud.",
    citation: {
      title: "Tai Solarin",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Tai-Solarin",
    },
  },
  {
    id: "anthony-enahoro",
    name: "Anthony Eromosele Enahoro",
    born: 1923,
    died: 2010,
    birthplace: "Uromi",
    categories: ["leadership", "activism"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["independence-1960"],
    wikipediaTitle: "Anthony Enahoro",
    achievement:
      "Moved the first motion for Nigeria’s independence in the colonial House of Representatives in 1953.",
    summary:
      "Then a 30-year-old Action Group backbencher, Enahoro forced a timetable debate that Britain and northern leaders were not ready for. The motion failed that year; independence came in 1960 anyway. He later spent years in exile and detention as a pro-democracy campaigner — the rare nationalist who stayed oppositional after the flag went up.",
    citation: {
      title: "Anthony Enahoro",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Anthony-Enahoro",
    },
  },
  {
    id: "shehu-shagari",
    name: "Shehu Shagari",
    born: 1924,
    died: 2018,
    birthplace: "Shagari, Sokoto",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "economy"],
    relatedTimelineIds: ["democracy-1999"],
    wikipediaTitle: "Shehu Shagari",
    achievement:
      "First elected executive president of Nigeria (1979–83); the Second Republic ended with his overthrow by the military.",
    summary:
      "A teacher and First Republic minister, Shagari won a disputed 1979 election and tried to govern a presidential constitution copied partly from the United States. Oil glut, corruption scandals, and austerity hollowed out the Republic. The 31 December 1983 coup returned soldiers to power for another 16 years.",
    citation: {
      title: "Shehu Shagari",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Shehu-Shagari",
    },
  },
  {
    id: "ladi-kwali",
    name: "Hadiza Ladi Kwali",
    born: 1925,
    died: 1984,
    birthplace: "Kwali, Abuja",
    categories: ["arts"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Ladi Kwali",
    achievement:
      "Gwari potter who joined the Abuja Pottery Training Centre and became the first Nigerian woman to win international museum recognition for studio ceramics.",
    summary:
      "Kwali already made large utilitarian pots in the Gwari tradition when Michael Cardew’s colonial pottery recruited her. She learned the wheel without abandoning hand-coiling and touring exhibitions took her work to Europe. Her portrait is on the ₦20 note — the only artist so honoured.",
    citation: {
      title: "Ladi Kwali",
      publisher: "Smithsonian National Museum of African Art",
      year: 2024,
      url: "https://africa.si.edu/collection/object.php?objectid=15125",
    },
  },
  {
    id: "dick-tiger",
    name: "Dick Tiger (Richard Ihetu)",
    born: 1929,
    died: 1971,
    birthplace: "Amaigbo, Imo",
    categories: ["sport"],
    relatedSectorSlugs: ["creative-economy"],
    wikipediaTitle: "Dick Tiger",
    achievement:
      "Two-division world boxing champion (middleweight and light-heavyweight) in the 1960s; a global Nigerian sports name before the Super Eagles era.",
    summary:
      "Tiger won world titles in an American- and British-dominated sport, lost and regained belts, and was stripped of a title after the Civil War because he supported Biafra. He died of cancer shortly after the war. Boxing Hall of Fame induction confirmed what Lagos fight crowds already knew.",
    citation: {
      title: "Dick Tiger",
      publisher: "International Boxing Hall of Fame",
      year: 2024,
      url: "https://www.ibhof.com/pages/about/inductees/modern/tiger.html",
    },
  },
  {
    id: "chinua-achebe",
    name: "Chinua Achebe",
    born: 1930,
    died: 2013,
    birthplace: "Ogidi",
    categories: ["literature", "science"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Chinua Achebe",
    achievement:
      "Author of Things Fall Apart (1958), the most widely read African novel, and a founder of modern African literature in English.",
    summary:
      "Achebe wrote back to colonial anthropology by putting Igbo village life at the centre of a world classic. He later edited the African Writers Series, which published a generation of the continent’s novelists. There Was a Country (2012) remains a contested, necessary Civil War memoir from the Biafran side of the desk.",
    citation: {
      title: "Chinua Achebe",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Chinua-Achebe",
    },
  },
  {
    id: "bola-ige",
    name: "James Ajibola Ige",
    born: 1930,
    died: 2001,
    birthplace: "Esa Oke",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Bola Ige",
    achievement:
      "Lawyer, Second Republic governor of Oyo State, and attorney-general of the federation; assassinated in 2001.",
    summary:
      "Cicero of Esa Oke was a brilliant courtroom advocate and Awoist politician who returned as justice minister under Obasanjo. His murder in Ibadan — still officially unresolved — became a symbol of the new democracy’s vulnerability to political violence.",
    citation: {
      title: "Bola Ige",
      publisher: "BBC News",
      year: 2001,
      url: "https://news.bbc.co.uk/2/hi/africa/1735841.stm",
    },
  },
  {
    id: "flora-nwapa",
    name: "Flora Nwanzuruahu Nwapa",
    born: 1931,
    died: 1993,
    birthplace: "Oguta",
    categories: ["literature", "enterprise"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Flora Nwapa",
    achievement:
      "Author of Efuru (1966), widely cited as the first internationally published novel in English by an African woman, and founder of Tana Press.",
    summary:
      "Nwapa wrote Igbo women as traders and moral agents, not as background. After the war she published children’s books and adult fiction from Enugu when London houses were not enough. Every later Nigerian woman novelist inherits a path she cut.",
    citation: {
      title: "Flora Nwapa",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Flora-Nwapa",
    },
  },
  {
    id: "christopher-okigbo",
    name: "Christopher Okigbo",
    born: 1932,
    died: 1967,
    birthplace: "Ojoto",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    relatedTimelineIds: ["civil-war-1967"],
    wikipediaTitle: "Christopher Okigbo",
    achievement:
      "Poet of Heavensgate and Path of Thunder; killed fighting for Biafra, leaving a small, hugely influential body of verse.",
    summary:
      "Okigbo fused Igbo ritual, Catholic liturgy, and modernist English into poetry that still sits at the centre of Nigerian letters. He left a Cambridge University Press job to join the Biafran army and died near Nsukka. Achebe called the loss incalculable; the poems remain.",
    citation: {
      title: "Christopher Okigbo",
      publisher: "Poetry Foundation",
      year: 2024,
      url: "https://www.poetryfoundation.org/poets/christopher-okigbo",
    },
  },
  {
    id: "bruce-onobrakpeya",
    name: "Bruce Obomeyoma Onobrakpeya",
    born: 1932,
    birthplace: "Agbarha-Otor, Delta",
    categories: ["arts", "science"],
    relatedSectorSlugs: ["creative-economy", "education"],
    wikipediaTitle: "Bruce Onobrakpeya",
    achievement:
      "Printmaker and painter of the Zaria Rebels generation; founder of the annual Harmattan Workshop at Agbarha-Otor.",
    summary:
      "Onobrakpeya helped invent a Nigerian print vocabulary (bronzed lino, plastocast) after art school at Zaria. Decades of workshops in the Niger Delta trained younger artists outside Lagos galleries. He is one of the last living links to the 1960s independence art moment.",
    citation: {
      title: "Bruce Onobrakpeya",
      publisher: "Smithsonian National Museum of African Art",
      year: 2024,
      url: "https://africa.si.edu/exhibits/onobrakpeya/onobrakpeya.htm",
    },
  },
  {
    id: "grace-alele-williams",
    name: "Grace Alele-Williams",
    born: 1932,
    died: 2022,
    birthplace: "Warri",
    categories: ["science"],
    relatedSectorSlugs: ["education"],
    wikipediaTitle: "Grace Alele-Williams",
    achievement:
      "First Nigerian woman to earn a doctorate, and first woman vice-chancellor of a Nigerian university (University of Benin, 1985–92).",
    summary:
      "A mathematician who trained teachers in modern maths, Alele-Williams took Uniben through a violent campus cult crisis and proved a woman could run a federal university. Every later female VC walks a road she opened in 1985.",
    citation: {
      title: "Grace Alele-Williams",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Grace-Alele-Williams",
    },
  },
  {
    id: "gambo-sawaba",
    name: "Hajia Gambo Sawaba",
    born: 1933,
    died: 2001,
    birthplace: "Kano / Zaria",
    categories: ["activism", "leadership"],
    relatedSectorSlugs: ["governance", "education"],
    wikipediaTitle: "Gambo Sawaba",
    achievement:
      "Northern women’s rights campaigner and NEPU organiser, repeatedly jailed for opposing child marriage and emirate politics.",
    summary:
      "Sawaba campaigned for women’s suffrage in the North when it was still denied, and for education against forced marriage. Colonial and post-colonial authorities imprisoned her many times. She stands with Ekpo and Ransome-Kuti as the third pillar of women’s nationalist memory — and the one most often left out of southern textbooks.",
    citation: {
      title: "Gambo Sawaba",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Gambo-Sawaba",
    },
  },
  {
    id: "emeka-anyaoku",
    name: "Emeka Anyaoku",
    born: 1933,
    birthplace: "Obosi",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    wikipediaTitle: "Emeka Anyaoku",
    achievement:
      "Third secretary-general of the Commonwealth (1990–2000); the highest post a Nigerian civil servant has held in that organisation.",
    summary:
      "Anyaoku spent his career in Commonwealth diplomacy, including the push to isolate apartheid South Africa and then to reintegrate it. His SG decade covered Nigeria’s own 1990s isolation after the hanging of Saro-Wiwa — a Nigerian running the club that suspended Nigeria.",
    citation: {
      title: "Chief Emeka Anyaoku",
      publisher: "The Commonwealth",
      year: 2024,
      url: "https://thecommonwealth.org/history-of-the-commonwealth/emeka-anyaoku",
    },
  },
  {
    id: "wole-soyinka",
    name: "Wole Soyinka",
    born: 1934,
    birthplace: "Abeokuta",
    categories: ["literature", "activism"],
    relatedSectorSlugs: ["education", "creative-economy", "governance"],
    relatedTimelineIds: ["civil-war-1967"],
    wikipediaTitle: "Wole Soyinka",
    achievement:
      "Playwright, poet, and 1986 Nobel laureate in literature — the first African to win the prize.",
    summary:
      "Soyinka’s plays (Death and the King’s Horseman, A Dance of the Forests) and prison memoir made Nigerian theatre a world form. He has spent as much energy on civic resistance — Civil War mediation, exile under Abacha — as on manuscripts. The Nobel citation named a writer who ‘in a wide cultural perspective and with poetic overtones fashions the drama of existence’.",
    citation: {
      title: "Wole Soyinka — Biographical",
      publisher: "The Nobel Prize",
      year: 1986,
      url: "https://www.nobelprize.org/prizes/literature/1986/soyinka/biographical/",
    },
  },
  {
    id: "yakubu-gowon",
    name: "Yakubu Gowon",
    born: 1934,
    birthplace: "Kanke, Plateau",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "security"],
    relatedTimelineIds: ["civil-war-1967", "post-war-reconstruction"],
    wikipediaTitle: "Yakubu Gowon",
    achievement:
      "Head of state (1966–75) during the Civil War; afterwards announced a policy of Reconciliation, Rehabilitation, and Reconstruction.",
    summary:
      "Gowon took power after the July 1966 counter-coup and prosecuted the war that kept Nigeria one country. The 3Rs slogan, the creation of 12 states, and the oil-boom public service are his record — alongside the war’s death toll, which remains disputed. Overthrown in 1975, he later became a public advocate of unity rather than a returning candidate.",
    citation: {
      title: "Yakubu Gowon",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Yakubu-Gowon",
    },
  },
  {
    id: "elechi-amadi",
    name: "Elechi Amadi",
    born: 1934,
    died: 2016,
    birthplace: "Aluu, Rivers",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "Elechi Amadi",
    achievement:
      "Author of The Concubine (1966), a landmark novel of Ikwerre village life, and a surveyor-soldier who served on the federal side in the Civil War.",
    summary:
      "Amadi wrote tragedy without the nationalist allegory some of his contemporaries preferred. He also administered Rivers State after the war. The Concubine remains a WAEC staple — which means millions of Nigerian students have read Ikwerre cosmology through his sentences.",
    citation: {
      title: "Elechi Amadi",
      publisher: "Encyclopaedia Britannica",
      year: 2016,
      url: "https://www.britannica.com/biography/Elechi-Amadi",
    },
  },
  {
    id: "jp-clark",
    name: "John Pepper Clark-Bekederemo",
    born: 1935,
    died: 2020,
    birthplace: "Kiagbodo, Delta",
    categories: ["literature"],
    relatedSectorSlugs: ["education", "creative-economy"],
    wikipediaTitle: "J. P. Clark",
    achievement:
      "Poet and playwright (Song of a Goat, The Raft) and a central figure of the 1960s Mbari literary moment.",
    summary:
      "Clark’s Ijaw riverine imagery and his Civil War poem sequence Casualties sit beside Okigbo and Soyinka in the independence canon. He also produced a translation of the Ozidi saga. A generation of University of Lagos students learned modern African poetry in his classroom.",
    citation: {
      title: "J.P. Clark",
      publisher: "Poetry Foundation",
      year: 2024,
      url: "https://www.poetryfoundation.org/poets/j-p-clark",
    },
  },
  {
    id: "olusegun-obasanjo",
    name: "Olusegun Obasanjo",
    born: 1937,
    birthplace: "Abeokuta",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance", "economy"],
    relatedTimelineIds: ["democracy-1999", "oil-discovery"],
    wikipediaTitle: "Olusegun Obasanjo",
    achievement:
      "Military head of state who handed over to civilians in 1979; elected president 1999–2007; secured Paris Club debt relief in 2005.",
    summary:
      "Obasanjo is the only Nigerian to have ruled as a soldier and later won two civilian terms. The 1979 handover, the 1999 return, GSM licensing, and the $18 billion Paris Club write-off are the constructive ledger. Third-term speculation and later political feuds are the other half. This page records both without campaign colour.",
    citation: {
      title: "Olusegun Obasanjo",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Olusegun-Obasanjo",
    },
  },
  {
    id: "murtala-muhammed",
    name: "Murtala Ramat Muhammed",
    born: 1938,
    died: 1976,
    birthplace: "Kano",
    categories: ["leadership"],
    relatedSectorSlugs: ["governance"],
    relatedTimelineIds: ["military-decades"],
    wikipediaTitle: "Murtala Muhammed",
    achievement:
      "Head of state (1975–76) whose seven-month purge of the civil service and plan to return to civilian rule were cut short by assassination.",
    summary:
      "Murtala overthrew Gowon, retired officials en masse, began moving the capital toward Abuja, and named a transition timetable. He was killed in Lagos traffic in February 1976. The airport that bears his name is a reminder of how short, and how mythologised, the episode was.",
    citation: {
      title: "Murtala Ramat Mohammed",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Murtala-Ramat-Mohammed",
    },
  },
  {
    id: "mko-abiola",
    name: "Moshood Kashimawo Olawale Abiola",
    born: 1938,
    died: 1998,
    birthplace: "Abeokuta",
    categories: ["enterprise", "leadership"],
    relatedSectorSlugs: ["economy", "governance"],
    relatedTimelineIds: ["democracy-1999"],
    wikipediaTitle: "Moshood Abiola",
    achievement:
      "Businessman widely held to have won the 12 June 1993 presidential election, which the military annulled; died in detention in 1998.",
    summary:
      "Abiola built a conglomerate (shipping, oil services, Concord newspapers) and a philanthropic footprint across the continent. The June 12 vote — and its cancellation — became the rallying date of Nigeria’s 1990s democracy movement. Democracy Day was later moved to 12 June in official recognition of that mandate.",
    citation: {
      title: "Moshood Kashimawo Olawale Abiola",
      publisher: "Encyclopaedia Britannica",
      year: 2024,
      url: "https://www.britannica.com/biography/Moshood-Abiola",
    },
  },
];
