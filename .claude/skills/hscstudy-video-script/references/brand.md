# HSC Study — motion & social brand

এই ফাইল ভিডিও, থাম্বনেইল আর সোশ্যাল মিডিয়ার জন্য। ওয়েবসাইট/অ্যাপের UI-র নিজস্ব ডিজাইন সিস্টেম আছে
(সেখানে gradient নেই, সলিড রং)। ভিডিও আর থাম্বনেইলে নিচের "motion brand" মানবে।

## ব্র্যান্ড এক নজরে
- নাম: **HSC Study** · ওয়েবসাইট: **hscstudy.com**
- কী: বাংলাদেশের একাদশ-দ্বাদশ শ্রেণির (HSC) শিক্ষার্থীদের প্র্যাকটিস ও পরীক্ষার প্ল্যাটফর্ম, শিক্ষকদের মাধ্যমে পৌঁছায়।
- কনটেন্টের ভিত্তি: NCTB পাঠ্যবই (বর্তমান সংস্করণ)।
- দর্শক: ১৬–১৮ বছরের শিক্ষার্থী, বেশিরভাগ ফোনে দেখে, অনেকে মফস্বল ও গ্রামের।
- চরিত্র: শান্ত, নির্ভরযোগ্য, পরিষ্কার, বন্ধুর মতো একজন শিক্ষক। চটকদার নয়, বিশ্বাসযোগ্য।

## Colors (theme tokens)
| Token | HEX | ব্যবহার |
|---|---|---|
| brand | #1E3A5F | প্রধান নেভি |
| brandStrong | #152B47 | গাঢ় নেভি, ছায়া, depth |
| deep | #0B1220 | gradient-এর গভীর প্রান্ত, vignette |
| brandLift | #2B5384 | gradient-এর আলোকিত কেন্দ্র |
| ink | #14202F | হালকা পটভূমিতে লেখা |
| inkMuted | #575F6B | হালকা পটভূমিতে secondary লেখা |
| paper | #FAF8F4 | হালকা scene-এর ground |
| surface | #FFFFFF | card |
| brandSoft | #E8EEF6 | হালকা নীল tint (সংজ্ঞা লেবেল, highlight row) |
| navyText | #A9C4E6 | নেভিতে secondary লেখা, "STUDY" শব্দ |
| onNavyMuted | #D3DCE8 | নেভিতে subtitle |
| amber | #F59E0B | **একমাত্র accent** |
| amberText | #FBBF24 | নেভিতে অ্যাম্বার লেখা |
| amberLight | #FDE68A | অ্যাম্বার gradient-এর উজ্জ্বল প্রান্ত |
| onAmber | #3B2506 | অ্যাম্বারের উপর লেখা (কখনো সাদা নয়) |
| line | #E5E0D5 | card hairline |
| go | #15803D | শুধু সঠিক / সুবিধা |
| hot | #DC2626 | শুধু ভুল / ঝুঁকি |

## Named gradients (নতুন gradient বানাবে না, এগুলোই)
- `bgNavyRadial`: radial-gradient(ellipse 75% 70% at 50% 45%, #2B5384 0%, #1E3A5F 45%, #0B1220 100%)
- `paperSoft`: linear-gradient(160deg, #FAF8F4 0%, #EEF2F7 100%)
- `glowBlue`: radial-gradient(circle, rgba(169,196,230,.22), transparent 65%), blur 30–40px
- `glowAmber`: radial-gradient(circle, rgba(245,158,11,.30), transparent 62%), blur 30–40px
- `keywordAmber` (লেখার জন্য): linear-gradient(180deg, #FDE68A 0%, #FBBF24 35%, #F59E0B 100%) + হালকা amber drop-shadow
- Grid overlay: 1px রেখা, নেভিতে rgba(169,196,230,.08–.09), পেপারে rgba(30,58,95,.06); ঘরের মাপ 1080p ভিডিওতে 44px, 1280×720 থাম্বনেইলে 40px; কিনারায় radial mask দিয়ে মিলিয়ে যাবে।

## Color rules
- Gradient শুধু নেভি আর অ্যাম্বার পরিবারে। **বেগুনি, গোলাপি, রংধনু বা neon কখনো নয়।**
- অ্যাম্বার প্রতি scene/থাম্বনেইলে একটাই hero জিনিসে (মূল keyword, উত্তর, মূল সংখ্যা)।
- সবুজ/লাল শুধু সঠিক/ভুল বা সুবিধা/ঝুঁকি বোঝাতে।
- লেখা সবসময় পরিষ্কার পড়া যাবে (WCAG AA-র মতো contrast); gradient-এর উপর লেখায় দরকার হলে পেছনে card বা গাঢ় আভা।
- **লোগো সবসময় সলিড**, কখনো gradient, বিকৃতি, ঘোরানো বা ছায়া নয়।

## Typography
- বাংলা: **Hind Siliguri** (500/600/700/800)
- English শব্দ, সংখ্যা, গণিত: **Outfit** (600/700/800)
- সাহিত্যের উদ্ধৃতি / উদ্দীপক: **Noto Serif Bengali**
- Code: **Fira Code**
- বাংলায় `letterSpacing: 0`, line-height ≥ 1.35।

## Logo (নেটওয়ার্ক H)
দুটো খুঁটি, একটা আড়াআড়ি ধাপ, ছয়টা নোড, মাঝে একটা অ্যাম্বার নোড। অর্থ: H (HSC), মই (ধাপে ধাপে সাফল্য),
সংযোগ (শিক্ষক-শিক্ষার্থী-জ্ঞান), মাঝখানে সঠিক উত্তর।
- জ্যামিতি (viewBox 0 0 64 64): path `M14 10V54M50 10V54M14 32H50`, stroke-width 4.5, round cap;
  নোড r=6.5 at x∈{14,50}, y∈{10,32,54}; মাঝের নোড (32,32) r=7.5 fill #F59E0B।
- নেভি পটভূমিতে খুঁটি/নোড সাদা (#FFFFFF), হালকা পটভূমিতে কালি (#14202F)। মাঝের নোড সবসময় অ্যাম্বার।
- Wordmark: "HSC" Outfit 800 + "STUDY" Outfit 600 (নেভিতে #A9C4E6, হালকায় #1E3A5F), letter-spacing .04em।
- SVG ফাইল দেওয়া থাকলে সেগুলোই ব্যবহার করবে; না থাকলে উপরের জ্যামিতি দিয়ে আঁকা যাবে (এটা আমাদের নিজের লোগো)।

## Signature motifs
1. নেটওয়ার্ক H: intro/end card-এ তৈরি হওয়ার animation (নোড pop → রেখা আঁকা → অ্যাম্বার নোড জ্বলে); transition-এ নোড-রেখা দিয়ে সংযোগ; তালিকার bullet হিসেবে রেখায় জোড়া নোড।
2. OMR বাবল (ক খ গ ঘ): কুইজ, পরীক্ষার টিপস, সঠিক উত্তর (অ্যাম্বারে ভরে ওঠে)।
3. Graph-paper grid: পটভূমিতে।

## Scene grounds
1. **Navy scene** (hook, statement, উদাহরণ, ending): `bgNavyRadial` + grid + ধীরে ভাসা `glowBlue`/`glowAmber` + glass card (rgba(43,83,132,.35), inset 1px rgba(169,196,230,.25), blur)।
2. **Paper scene** (সংজ্ঞা, তালিকা, শান্ত ব্যাখ্যা): `paperSoft` + হালকা grid + সাদা card (radius 28px, নরম ছায়া), "সংজ্ঞা" লেবেল brandSoft pill-এ।

## Shapes
Card radius 28px · pill 999px · ছায়া: hairline ring + নরম drop · safe margin ≥96px (9:16-এ উপর-নিচে ≥160px)।
