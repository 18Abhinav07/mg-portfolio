/**
 * Bilingual content layer. Hindi is primary, English is the switchable
 * alternate. Both trees share an identical shape so components can read
 * `t.zone.field` directly without key lookups or null guards.
 *
 * All visible copy lives here. Components never hardcode Hindi or English.
 * Copy is placeholder pending final campaign text; structure is final.
 */

export type Lang = 'hi' | 'en';

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface ServiceArea {
  title: string;
  desc: string;
}

export interface Honor {
  title: string;
  org: string;
  year: string;
}

export interface ExploreCard {
  title: string;
  desc: string;
  cta: string;
}

export interface PressItem {
  outlet: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface VideoItem {
  title: string;
  duration: string;
  category: string;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    journey: string;
    seva: string;
    honors: string;
    gallery: string;
    videos: string;
    media: string;
    contact: string;
  };
  brand: {
    party: string;
    name: string;
    role: string;
    constituency: string;
    slogan: string;
  };
  hero: {
    party: string;
    nameLine1: string;
    nameLine2: string;
    constituency: string;
    tagline: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string[];
    quote: string;
    quoteAttribution: string;
    portraitLabel: string;
    chips: { label: string; value: string }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    rssMilestones: Milestone[];
    politicalMilestones: Milestone[];
  };
  seva: {
    eyebrow: string;
    title: string;
    intro: string;
    areas: ServiceArea[];
  };
  honors: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Honor[];
  };
  explore: {
    eyebrow: string;
    title: string;
    gallery: ExploreCard;
    videos: ExploreCard;
    media: ExploreCard;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    officeLabel: string;
    office: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    form: {
      name: string;
      namePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      note: string;
      success: string;
    };
    socialLabel: string;
    socialPending: string;
  };
  footer: {
    tagline: string;
    exploreHeading: string;
    connectHeading: string;
    rights: string;
  };
  preloader: {
    constituency: string;
    loading: string;
  };
  galleryPage: {
    title: string;
    intro: string;
    filters: { key: string; label: string }[];
    close: string;
    empty: string;
  };
  videosPage: {
    title: string;
    intro: string;
    featuredLabel: string;
    items: VideoItem[];
  };
  mediaPage: {
    title: string;
    intro: string;
    readMore: string;
    items: PressItem[];
  };
}

const hi: Translation = {
  nav: {
    home: 'मुख्य',
    about: 'परिचय',
    journey: 'यात्रा',
    seva: 'सेवा',
    honors: 'दायित्व',
    gallery: 'गैलरी',
    videos: 'वीडियो',
    media: 'मीडिया',
    contact: 'संपर्क',
  },
  brand: {
    party: 'भारतीय जनता पार्टी',
    name: 'मनोज कुमार गौतम',
    role: 'सदस्य, अनुसूचित जाति आयोग, उत्तराखण्ड सरकार',
    constituency: 'विधानसभा क्षेत्र २७, ज्वालापुर, हरिद्वार',
    slogan: 'सेवा, समर्पण, संगठन',
  },
  hero: {
    party: 'भारतीय जनता पार्टी',
    nameLine1: 'मनोज कुमार',
    nameLine2: 'गौतम',
    constituency: 'विधानसभा क्षेत्र २७, ज्वालापुर',
    tagline: 'सेवा, समर्पण, संगठन यही मेरा संकल्प। उत्तराखण्ड का नया विश्वास।',
  },
  about: {
    eyebrow: 'परिचय',
    title: 'जनता के बीच से, जनता के लिए',
    lead: 'ज्वालापुर की मिट्टी से जुड़ा एक जीवन, जो संगठन और समाज सेवा के संकल्प पर टिका है।',
    body: [
      'मनोज कुमार गौतम का जीवन सहज भाषा में कहें तो परिश्रम और प्रतिबद्धता की कहानी है। वर्षों के संगठनात्मक अनुभव और जमीनी कार्य ने उन्हें ज्वालापुर की जरूरतों का गहरा बोध दिया है।',
      'अनुसूचित जाति आयोग, उत्तराखण्ड सरकार के सदस्य के रूप में वे वंचित वर्गों के अधिकारों और कल्याण के लिए निरंतर कार्यरत हैं। उनका ध्यान शिक्षा, स्वास्थ्य और सम्मानजनक अवसरों तक हर परिवार की पहुँच पर केंद्रित है।',
    ],
    quote: 'ब्रह्म की प्राप्ति, भ्रम का समाप्ति। सेवा ही मेरा संकल्प है।',
    quoteAttribution: 'मनोज कुमार गौतम',
    portraitLabel: 'परिचय चित्र',
    chips: [
      { label: 'दल', value: 'भारतीय जनता पार्टी' },
      { label: 'दायित्व', value: 'सदस्य, अनुसूचित जाति आयोग' },
      { label: 'पिता का नाम', value: 'श्री ऋषिपाल सिंह' },
      { label: 'माता का नाम', value: 'स्व. ममता देवी' },
      { label: 'शैक्षिक स्तर', value: 'स्नातक (Graduation)' },
      { label: 'पता', value: '152, तपोवन नगर पाण्डेवाला, निकट गुघाल मंदिर, ज्वालापुर, हरिद्वार, उत्तराखण्ड' },
      { label: 'संकल्प', value: 'सेवा, समर्पण, संगठन' },
    ],
  },
  journey: {
    eyebrow: 'यात्रा',
    title: 'सेवा एवं समर्पण का पथ',
    intro: 'राष्ट्रीय स्वयंसेवक संघ (RSS) के स्वयंसेवक से लेकर शासन में महत्वपूर्ण दायित्व तक का सफर।',
    rssMilestones: [
      { year: '२००२', title: 'प्राथमिक शिक्षा वर्ग', desc: 'सरस्वती शिशु मन्दिर सेक्टर 2, बीएचएल से संघ का प्राथमिक प्रशिक्षण।' },
      { year: '२००४-०६', title: 'पूर्णकालिक विस्तारक', desc: 'श्री गुरू जी के जन्म शताब्दी वर्ष के निमित्त संघ कार्य में पूर्णकालिक योगदान।' },
      { year: '२००७', title: 'संघ शिक्षा वर्ग (प्रथम वर्ष)', desc: 'झाझरा देहरादून से संघ शिक्षा वर्ग प्रथम वर्ष का प्रशिक्षण।' },
      { year: '२००९', title: 'संघ शिक्षा वर्ग (द्वितीय वर्ष)', desc: 'सरस्वती विद्या मन्दिर, नैनीताल से संघ शिक्षा वर्ग द्वितीय वर्ष पूर्ण किया।' },
      { year: '२०१०', title: 'विद्यार्थी परिषद (ABVP)', desc: 'अखिल भारतीय विद्यार्थी परिषद में सक्रिय भूमिका एवं छात्र संगठन कार्य।' },
    ],
    politicalMilestones: [
      { year: '१९९८', title: 'अनुसूचित मोर्चा वार्ड महामंत्री', desc: 'वार्ड महामंत्री के रूप में राजनीतिक सफर की शुरुआत।' },
      { year: '२०००', title: 'मंडल महामंत्री, हरिद्वार', desc: 'अनुसूचित मोर्चा मंडल महामंत्री, हरिद्वार के रूप में जिम्मेदारी।' },
      { year: '२००३', title: 'मंडल अध्यक्ष, हरिद्वार', desc: 'अनुसूचित मोर्चा मंडल अध्यक्ष, हरिद्वार के रूप में संगठन विस्तार।' },
      { year: '२००६', title: 'जिला उपाध्यक्ष, हरिद्वार', desc: 'अनुसूचित मोर्चा जिला उपाध्यक्ष, हरिद्वार की जिम्मेदारी।' },
      { year: '२००९', title: 'प्रदेश सदस्य, उत्तराखंड', desc: 'अनुसूचित मोर्चा प्रदेश सदस्य, उत्तराखंड के रूप में राज्य स्तर पर कार्य।' },
      { year: '२०१२', title: 'जिला उपाध्यक्ष (पुनः)', desc: 'अनुसूचित मोर्चा जिला उपाध्यक्ष, हरिद्वार के रूप में पुनः कार्यभार।' },
      { year: '२०१५', title: 'जिला महामंत्री, हरिद्वार', desc: 'अनुसूचित मोर्चा जिला महामंत्री, हरिद्वार के रूप में संगठनात्मक नेतृत्व।' },
      { year: '२०१५-२४', title: 'सांसद प्रतिनिधि', desc: 'लोकसभा हरिद्वार में सांसद प्रतिनिधि के रूप में क्षेत्रीय जनसमस्याओं का निवारण।' },
      { year: '२०१८', title: 'प्रदेश सदस्य, उत्तराखंड', desc: 'प्रदेश सदस्य, अनुसूचित मोर्चा, उत्तराखंड के रूप में राज्य स्तरीय नीतियां।' },
      { year: '२०१९', title: 'रेल मंत्रालय सदस्य', desc: 'सदस्य, रेल मंत्रालय, भारत सरकार (मुरादाबाद जोन) के अंतर्गत जनसेवा।' },
      { year: 'वर्तमान', title: 'आयोग सदस्य (उत्तराखंड सरकार)', desc: 'सदस्य, अनुसूचित जाति आयोग, उत्तराखंड सरकार (दायित्वधारी) के रूप में कार्यरत।' },
    ],
  },
  seva: {
    eyebrow: 'सेवा कार्य',
    title: 'धरातल पर किया गया कार्य',
    intro: 'घोषणाओं से अधिक, परिणामों में विश्वास। ये वे क्षेत्र हैं जहाँ निरंतर कार्य ने जीवन बदले हैं।',
    areas: [
      { title: 'राशन एवं सहायता वितरण', desc: 'जरूरतमंद लोगों को राशन, वस्त्र एवं अन्य आवश्यक सामग्री का नियमित वितरण।' },
      { title: 'मेधावी छात्र सहायता', desc: 'गरीब एवं मेधावी छात्रों को शिक्षा सामग्री, छात्रवृत्ति एवं आर्थिक सहायता प्रदान करना।' },
      { title: 'स्वास्थ्य शिविर', desc: 'नियमित स्वास्थ्य शिविरों का आयोजन और लोगों को स्वास्थ्य के प्रति जागरूक करना।' },
      { title: 'नशा मुक्त समाज', desc: 'समाज में एकता, भाईचारा और युवाओं को नशे के चंगुल से बचाने के लिए लगातार जन अभियान।' },
      { title: 'धार्मिक-सांस्कृतिक आयोजन', desc: 'धार्मिक एवं सांस्कृतिक आयोजनों में सक्रिय सहभागिता और सामाजिक समरसता को बढ़ावा।' },
      { title: 'अनुसूचित कल्याण', desc: 'अनुसूचित जातियों के अधिकारों की रक्षा, शोषण के खिलाफ आवाज उठाना और सरकारी योजनाओं की पहुँच।' },
    ],
  },
  honors: {
    eyebrow: 'सामाजिक सेवा',
    title: 'संबद्ध संस्थाएं एवं दायित्व',
    intro: 'समाज सेवा के क्षेत्र में विभिन्न अग्रणी ट्रस्टों एवं सामाजिक संस्थाओं के माध्यम से सक्रिय योगदान।',
    items: [
      { title: 'राष्ट्रीय अध्यक्ष', org: 'श्री सांई सेवा संस्थान (रजि०)', year: 'सेवा संस्थान' },
      { title: 'राष्ट्रीय अध्यक्ष', org: 'भगवान श्री अम्बेडकर सेवा संस्थान (रजि०)', year: 'सामाजिक न्याय' },
      { title: 'राष्ट्रीय अध्यक्ष', org: 'श्री खातू श्याम सेवा ट्रस्ट', year: 'धार्मिक न्यास' },
      { title: 'पूर्व राष्ट्रीय उपाध्यक्ष', org: 'मानवाधिकार संगठन', year: 'नागरिक अधिकार' },
      { title: 'राष्ट्रीय संगठन मंत्री', org: 'अखिल भारतीय रविदास अखाड़ा परिषद (महंत श्री रवीन्द्रपुरी जी महाराज द्वारा संस्थापित)', year: 'धार्मिक संगठन' },
      { title: 'प्रदेश अध्यक्ष', org: 'सनातन रक्षक परिषद, उत्तराखण्ड (महंत श्री रवीन्द्रपुरी जी महाराज द्वारा संस्थापित)', year: 'सनातन संस्कृति' },
    ],
  },
  explore: {
    eyebrow: 'और देखें',
    title: 'कार्य, स्वयं देखिए',
    gallery: { title: 'गैलरी', desc: 'जनसंपर्क, कार्यक्रम और क्षेत्र के क्षणों की झलक।', cta: 'तस्वीरें देखें' },
    videos: { title: 'वीडियो', desc: 'भाषण, अभियान और संदेशों का संग्रह।', cta: 'वीडियो देखें' },
    media: { title: 'मीडिया', desc: 'समाचार पत्रों और प्रेस में प्रकाशित कवरेज।', cta: 'प्रेस पढ़ें' },
  },
  contact: {
    eyebrow: 'संपर्क',
    title: 'आपकी आवाज़, हमारा संकल्प',
    intro: 'क्षेत्र की हर समस्या और सुझाव का स्वागत है। हम तक पहुँचिए।',
    officeLabel: 'कार्यालय',
    office: '152, तपोवन नगर पाण्डेवाला, ज्वालापुर, हरिद्वार, उत्तराखण्ड',
    phoneLabel: 'दूरभाष',
    phone: '+91 99274 72120',
    emailLabel: 'ईमेल',
    email: 'info@manojgautambjp.org',
    form: {
      name: 'आपका नाम',
      namePlaceholder: 'नाम लिखें',
      message: 'आपका संदेश',
      messagePlaceholder: 'अपनी बात लिखें',
      send: 'संदेश भेजें',
      note: 'आपकी जानकारी सुरक्षित रहेगी।',
      success: 'धन्यवाद, आपका संदेश हम तक पहुँच गया है। हम शीघ्र संपर्क करेंगे।',
    },
    socialLabel: 'सोशल मीडिया पर जुड़ें',
    socialPending: 'लिंक शीघ्र उपलब्ध होगा',
  },
  footer: {
    tagline: 'सेवा, समर्पण, संगठन। उत्तराखण्ड का नया विश्वास।',
    exploreHeading: 'अन्वेषण',
    connectHeading: 'जुड़ें',
    rights: 'सर्वाधिकार सुरक्षित।',
  },
  preloader: {
    constituency: 'विधानसभा क्षेत्र २७ - ज्वालापुर',
    loading: 'अनुभव लोड हो रहा है...',
  },
  galleryPage: {
    title: 'गैलरी',
    intro: 'क्षेत्र, कार्यक्रम और जनसंपर्क के चयनित क्षण।',
    filters: [
      { key: 'all', label: 'सभी' },
      { key: 'events', label: 'कार्यक्रम' },
      { key: 'public', label: 'जनसंपर्क' },
      { key: 'party', label: 'संगठन' },
      { key: 'service', label: 'सेवा' },
    ],
    close: 'बंद करें',
    empty: 'इस श्रेणी में अभी कोई तस्वीर नहीं।',
  },
  videosPage: {
    title: 'वीडियो',
    intro: 'भाषण, अभियान और जनसंवाद के चयनित वीडियो।',
    featuredLabel: 'मुख्य वीडियो',
    items: [
      { title: 'अभियान संदेश', duration: '2:30', category: 'अभियान' },
      { title: 'जनसभा संबोधन', duration: '5:10', category: 'भाषण' },
      { title: 'क्षेत्र भ्रमण', duration: '3:45', category: 'जनसंपर्क' },
      { title: 'सेवा कार्य झलक', duration: '1:55', category: 'सेवा' },
      { title: 'कार्यकर्ता संवाद', duration: '4:20', category: 'संगठन' },
      { title: 'त्योहार शुभकामना', duration: '1:10', category: 'संदेश' },
    ],
  },
  mediaPage: {
    title: 'मीडिया',
    intro: 'समाचार पत्रों और प्रेस में प्रकाशित कवरेज।',
    readMore: 'पूरा पढ़ें',
    items: [
      { outlet: 'हरिद्वार जागरण', date: '१० मार्च २०२४', title: 'हरिद्वार पहुंचे डीआरएम, लक्सर फाटक पर वरिष्ठ भाजपा नेता मनोज गौतम ने किया कार्यकारी राष्ट्रीय अध्यक्ष का स्वागत', excerpt: 'लक्सर फाटक पर रेलवे सुविधाओं के निरीक्षण हेतु पहुंचे डीआरएम का भाजपा नेता मनोज गौतम ने भव्य स्वागत किया।' },
      { outlet: 'AMRIT', date: '२८ फरवरी २०२४', title: 'यूसीसी प्रदेश के विकास और सामाजिक एकता की दिशा में एक महत्वपूर्ण कदमःमनोज गौतम', excerpt: 'यूनीफॉर्म सिविल कोड लागू होना समाज में समरसता और समानता को बढ़ावा देगा: मनोज गौतम।' },
      { outlet: 'दैनिक भास्कर', date: '१५ फरवरी २०२४', title: 'भाजपा नेता मनोज गौतम ने निकाली तिरंगा यात्रा निकाली', excerpt: 'हरिद्वार में राष्ट्रभक्ति और सामाजिक एकता के संकल्प के साथ तिरंगा यात्रा निकाली।' },
      { outlet: 'दैनिक भास्कर', date: '१२ फरवरी २०२४', title: 'शिविरों में को दिलाई गई स्वच्छता की शपथ', excerpt: 'स्वच्छ भारत अभियान के अंतर्गत स्थानीय लोगों को स्वच्छता बनाए रखने की प्रतिज्ञा दिलाई गई।' },
      { outlet: 'हरिद्वार जागरण', date: '०५ फरवरी २०२४', title: 'सनातन रक्षक परिषद ने किया संगठन का विस्तार', excerpt: 'सनातन रक्षक परिषद की राज्य स्तरीय कार्यकारिणी की बैठक में संगठन के नए दायित्वों की घोषणा की गई।' },
      { outlet: 'AMRIT', date: '०२ फरवरी २०२४', title: 'गाम गढ़ में गुरु रविदास शोभा यात्रा भाजपा नेता मनोज गौतम ने किया शुभारंभ', excerpt: 'ग्राम गढ़ में आयोजित गुरु रविदास जयंती शोभा यात्रा का शुभारंभ कर समाज को समरसता का संदेश दिया।' },
      { outlet: 'दैनिक भास्कर', date: '२८ जनवरी २०२४', title: 'मुख्यमंत्री धामी के नेतृत्व में प्रदेश का हो रहा तेजी से विकास- मनोज गीतम', excerpt: 'उत्तराखंड सरकार के द्वारा अनुसूचित जातियों और पिछड़े क्षेत्रों के लिए किए जा रहे ऐतिहासिक कार्यों की सराहना।' },
      { outlet: 'हरिद्वार जागरण', date: '१५ जनवरी २०२४', title: '? निशंक किया जलभराव प्रभावित इलाकों का दौरा', excerpt: 'पूर्व मुख्यमंत्री निशंक और स्थानीय प्रतिनिधियों ने बाढ़ प्रभावित क्षेत्रों का दौरा कर सहायता प्रदान की।' },
    ],
  },
};

const en: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    journey: 'Journey',
    seva: 'Service',
    honors: 'NGOs',
    gallery: 'Gallery',
    videos: 'Videos',
    media: 'Media',
    contact: 'Contact',
  },
  brand: {
    party: 'Bharatiya Janata Party',
    name: 'Manoj Kumar Gautam',
    role: 'Member, SC Commission, Government of Uttarakhand',
    constituency: 'Assembly Constituency 27, Jwalapur, Haridwar',
    slogan: 'Service, Dedication, Organisation',
  },
  hero: {
    party: 'Bharatiya Janata Party',
    nameLine1: 'Manoj Kumar',
    nameLine2: 'Gautam',
    constituency: 'Assembly Constituency 27, Jwalapur',
    tagline: 'Service, Dedication, Organisation—this is my resolve. The new trust of Uttarakhand.',
  },
  about: {
    eyebrow: 'About',
    title: 'From the people, for the people',
    lead: 'A life rooted in the soil of Jwalapur, built on a commitment to organisation and public service.',
    body: [
      'Manoj Kumar Gautam carries a story of hard work and conviction. Years of organisational experience and grassroots work have given him a deep understanding of what Jwalapur needs.',
      'As a Member of the SC Commission, Government of Uttarakhand, he works steadily for the rights and welfare of underserved communities. His focus is access for every family to education, health, and dignified opportunity.',
    ],
    quote: 'Attainment of Brahma, end of illusion. Service is my supreme duty.',
    quoteAttribution: 'Manoj Kumar Gautam',
    portraitLabel: 'Portrait',
    chips: [
      { label: 'Party', value: 'Bharatiya Janata Party' },
      { label: 'Role', value: 'Member, SC Commission' },
      { label: 'Father\'s Name', value: 'Shri Rishipal Singh' },
      { label: 'Mother\'s Name', value: 'Late Mamata Devi' },
      { label: 'Education Level', value: 'Graduation' },
      { label: 'Address', value: '152, Tapovan Nagar Pandewala, Near Gughal Temple, Jwalapur, Haridwar, Uttarakhand' },
      { label: 'Resolve', value: 'Service, Dedication, Organisation' },
    ],
  },
  journey: {
    eyebrow: 'Journey',
    title: 'A Path of Service & Dedication',
    intro: 'Tracing the path from a dedicated Rashtriya Swayamsevak Sangh (RSS) volunteer to a governance representative.',
    rssMilestones: [
      { year: '2002', title: 'Primary Training Camp', desc: 'Completed basic RSS training at Saraswati Shishu Mandir Sector 2, BHEL.' },
      { year: '2004-06', title: 'Full-time Expansionist', desc: 'Served as a full-time expansionist (Vistarak) for the Birth Centenary of Shri Guru Ji.' },
      { year: '2007', title: 'Sangh Education (1st Year)', desc: 'Completed the first-year RSS training camp at Jhajhra, Dehradun.' },
      { year: '2009', title: 'Sangh Education (2nd Year)', desc: 'Finished second-year RSS training camp at Saraswati Vidya Mandir, Nainital.' },
      { year: '2010', title: 'ABVP Active Member', desc: 'Played an active role in student wing Akhil Bharatiya Vidyarthi Parishad.' },
    ],
    politicalMilestones: [
      { year: '1998', title: 'SC Morcha Ward Gen Sec', desc: 'Started public service as Ward General Secretary, Scheduled Caste Morcha.' },
      { year: '2000', title: 'Mandal Gen Sec, Haridwar', desc: 'Appointed Mandal General Secretary, SC Morcha, Haridwar.' },
      { year: '2003', title: 'Mandal President, Haridwar', desc: 'Led as Mandal President, SC Morcha, Haridwar.' },
      { year: '2006', title: 'Dist Vice President, Haridwar', desc: 'Elevated to District Vice President, SC Morcha, Haridwar.' },
      { year: '2009', title: 'State Member, Uttarakhand', desc: 'Represented SC Morcha as State Member, Uttarakhand.' },
      { year: '2012', title: 'Dist Vice President (Re-elected)', desc: 'Served again as District Vice President, SC Morcha, Haridwar.' },
      { year: '2015', title: 'District Gen Sec, Haridwar', desc: 'Appointed District General Secretary, SC Morcha, Haridwar.' },
      { year: '2015-24', title: 'MP Representative', desc: 'Acted as Member of Parliament Representative in Haridwar Lok Sabha.' },
      { year: '2018', title: 'State Member, SC Morcha', desc: 'Served as State Member, SC Morcha, Uttarakhand.' },
      { year: '2019', title: 'Ministry of Railways Member', desc: 'Member of the Ministry of Railways, Government of India (Moradabad Zone).' },
      { year: 'Current', title: 'Commission Member', desc: 'Currently serving as Member, SC Commission, Government of Uttarakhand.' },
    ],
  },
  seva: {
    eyebrow: 'Service',
    title: 'Work done on the ground',
    intro: 'Belief in results over announcements. These are the areas where steady work has changed lives.',
    areas: [
      { title: 'Relief & Distribution', desc: 'Distribution of rations, clothes, and other essential items to families in need.' },
      { title: 'Educational Assistance', desc: 'Providing study materials, scholarships, and financial aid to underprivileged students.' },
      { title: 'Health Camps', desc: 'Organizing free health checkups and raising healthcare awareness across Jwalapur.' },
      { title: 'Drug-Free Society', desc: 'Continuous work for social brotherhood, drug-free campaigns, and youth orientation.' },
      { title: 'Cultural Support', desc: 'Support and active participation in local religious and cultural events to build harmony.' },
      { title: 'SC Welfare Advocacy', desc: 'Protecting Scheduled Caste rights, addressing grievances, and ensuring welfare access.' },
    ],
  },
  honors: {
    eyebrow: 'Social Work',
    title: 'Affiliated NGOs & Responsibilities',
    intro: 'Active contributions through leading social trusts and non-governmental welfare organizations.',
    items: [
      { title: 'National President', org: 'Shri Sai Seva Sansthan (Regd.)', year: 'Welfare' },
      { title: 'National President', org: 'Bhagwan Shri Ambedkar Seva Sansthan (Regd.)', year: 'Social Justice' },
      { title: 'National President', org: 'Shri Khatu Shyam Seva Trust', year: 'Spiritual Trust' },
      { title: 'Former National VP', org: 'Human Rights Organization', year: 'Human Rights' },
      { title: 'National Org Secretary', org: 'Akhil Bharatiya Ravidas Akhara Parishad (Founded by Mahant Shri Ravindrapuri Ji)', year: 'Organization' },
      { title: 'State President', org: 'Sanatan Rakshak Parishad, Uttarakhand (Founded by Mahant Shri Ravindrapuri Ji)', year: 'Culture' },
    ],
  },
  explore: {
    eyebrow: 'Explore',
    title: 'See the work for yourself',
    gallery: { title: 'Gallery', desc: 'Glimpses of outreach, events, and moments from the field.', cta: 'View photos' },
    videos: { title: 'Videos', desc: 'A collection of speeches, campaigns, and messages.', cta: 'Watch videos' },
    media: { title: 'Media', desc: 'Coverage published in newspapers and the press.', cta: 'Read press' },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Your voice, our resolve',
    intro: 'Every concern and suggestion from the region is welcome. Reach out to us.',
    officeLabel: 'Office',
    office: '152, Tapovan Nagar Pandewala, Jwalapur, Haridwar, Uttarakhand',
    phoneLabel: 'Phone',
    phone: '+91 99274 72120',
    emailLabel: 'Email',
    email: 'info@manojgautambjp.org',
    form: {
      name: 'Your name',
      namePlaceholder: 'Enter your name',
      message: 'Your message',
      messagePlaceholder: 'Write your message',
      send: 'Send message',
      note: 'Your information stays secure.',
      success: 'Thank you. Your message has reached us, and we will be in touch soon.',
    },
    socialLabel: 'Connect on social media',
    socialPending: 'link coming soon',
  },
  footer: {
    tagline: 'Service, Dedication, Organisation. The new trust of Uttarakhand.',
    exploreHeading: 'Explore',
    connectHeading: 'Connect',
    rights: 'All rights reserved.',
  },
  preloader: {
    constituency: 'Assembly 27 - Jwalapur',
    loading: 'Loading experience...',
  },
  galleryPage: {
    title: 'Gallery',
    intro: 'Selected moments from the field, events, and public outreach.',
    filters: [
      { key: 'all', label: 'All' },
      { key: 'events', label: 'Events' },
      { key: 'public', label: 'Outreach' },
      { key: 'party', label: 'Organisation' },
      { key: 'service', label: 'Service' },
    ],
    close: 'Close',
    empty: 'No photos in this category yet.',
  },
  videosPage: {
    title: 'Videos',
    intro: 'Selected videos of speeches, campaigns, and public dialogue.',
    featuredLabel: 'Featured',
    items: [
      { title: 'Campaign message', duration: '2:30', category: 'Campaign' },
      { title: 'Public address', duration: '5:10', category: 'Speech' },
      { title: 'Field visit', duration: '3:45', category: 'Outreach' },
      { title: 'Service work glimpse', duration: '1:55', category: 'Service' },
      { title: 'Worker dialogue', duration: '4:20', category: 'Organisation' },
      { title: 'Festival greeting', duration: '1:10', category: 'Message' },
    ],
  },
  mediaPage: {
    title: 'Media',
    intro: 'Coverage published in newspapers and the press.',
    readMore: 'Read more',
    items: [
      { outlet: 'Haridwar Jagran', date: '10 March 2024', title: 'DRM arrived in Haridwar; senior BJP leader Manoj Gautam welcomed Executive National President at Laksar Gate', excerpt: 'BJP leader Manoj Gautam warmly welcomed the DRM arriving for railway inspection at Laksar Gate.' },
      { outlet: 'AMRIT', date: '28 February 2024', title: 'UCC is an important step toward the state\'s development and social unity: Manoj Gautam', excerpt: 'Implementation of UCC in Uttarakhand will promote social harmony and equal rights: Manoj Gautam.' },
      { outlet: 'Dainik Bhaskar', date: '15 February 2024', title: 'BJP leader Manoj Gautam took out [took out] Tiranga Yatra', excerpt: 'A grand Tiranga Yatra was organized across Haridwar promoting patriotism and unity.' },
      { outlet: 'Dainik Bhaskar', date: '12 February 2024', title: 'Cleanliness oath was administered in the camps', excerpt: 'Under the Swachh Bharat Abhiyan, local residents were administered a cleanliness pledge.' },
      { outlet: 'Haridwar Jagran', date: '05 February 2024', title: 'Sanatan Rakshak Parishad expanded the organization', excerpt: 'State committee of Sanatan Rakshak Parishad announced new office bearers and goals.' },
      { outlet: 'AMRIT', date: '02 February 2024', title: 'BJP leader Manoj Gautam inaugurated Guru Ravidas Shobha Yatra in Village Garh', excerpt: 'Inaugurating the Guru Ravidas Jayanti Shobha Yatra, Manoj Gautam emphasized communal harmony.' },
      { outlet: 'Dainik Bhaskar', date: '28 January 2024', title: 'Under the leadership of CM Dhami, state is developing rapidly—Manoj Geetam [Gautam]', excerpt: 'Manoj Gautam praised government initiatives for Scheduled Caste welfare and infrastructure.' },
      { outlet: 'Haridwar Jagran', date: '15 January 2024', title: 'Nishank toured waterlogging-affected areas', excerpt: 'Former Chief Minister Ramesh Pokhriyal Nishank along with BJP leaders visited waterlogged zones.' },
    ],
  },
};

export const translations: Record<Lang, Translation> = { hi, en };
