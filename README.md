# HSC Study · কনটেন্ট ও ব্র্যান্ড

HSC Study (hscstudy.com)-র ব্র্যান্ডের ফাইল আর শেখার কনটেন্ট (explainer ভিডিও, থাম্বনেইল, সোশ্যাল পোস্ট) এক জায়গায়।
প্ল্যাটফর্মের কোড আলাদা repo-তে: `WebSolutionCare/hscstudy-platform`।

## কী কোথায়
| ফোল্ডার | কী আছে |
|---|---|
| `.claude/skills/` | দুটো skill: ভিডিও স্ক্রিপ্ট আর ভিডিও প্রোডাকশন। এই repo-তে খোলা প্রতিটা Claude সেশন নিজে থেকেই পায় |
| `brand/logo/` | লোগো প্যাক: SVG, PNG, ফেভিকন, অ্যাপ আইকন, ব্যবহারের নির্দেশিকা |
| `brand/facebook/` | ফেসবুক কভার, প্রোফাইল ছবি, পরিচিতি পোস্ট (সোর্স HTML সহ) |
| `brand/video/` | ভিডিওর motion brand-এর নমুনা |
| `videos/` | প্রতিটা ভিডিওর ফোল্ডার: `videos/{বিষয়}/{অধ্যায়}/{টপিক}/` |
| `templates/` | অনুমোদিত Remotion template (প্রথম ভিডিওর পর), আর পুরোনো লম্বা প্রম্পট |
| `docs/textbook-notes/` | NCTB পাঠ্যবইয়ের অনুচ্ছেদভিত্তিক নোট |

## একটা ভিডিও বানানোর ধাপ
1. **স্ক্রিপ্ট সেশন** (এই repo-তে): *"hscstudy-video-script দিয়ে বানাও — বিষয়: ICT, অধ্যায় ৩, টপিক: দশমিক থেকে বাইনারি"* + বইয়ের পাতা।
2. **Google AI Studio:** স্ক্রিপ্ট থেকে ভয়েস (সবসময় একই কণ্ঠ) → `voiceover.mp3`।
3. **ElevenLabs:** ভয়েস থেকে SRT → `voiceover.srt`।
4. **ভিডিও সেশন** (এই repo-তে): *"hscstudy-video-production দিয়ে ভিডিও বানাও"* + `voiceover.srt`, `voiceover.mp3`, `script.txt`, `message.txt`।
   Preview দেখে সংশোধন → "রেন্ডার করো"।
5. সব ফাইল সেই টপিকের ফোল্ডারে রাখুন, ভিডিওর লিংক `video-link.txt`-এ।

## নিয়ম বদলাতে চাইলে
- রং, font, লোগো, motif: দুটো skill-এর `references/brand.md` (দুটোই একসাথে বদলাবেন)
- বিষয়ভিত্তিক নিয়ম: দুটো skill-এর `references/subjects.md`
- ভাষা ও TTS: `.claude/skills/hscstudy-video-script/references/language-and-tts.md`
- কোনো ভিডিও খুব ভালো হলে তার ফাইলগুলো `.claude/skills/hscstudy-video-script/examples/`-এ যোগ করুন।

বিস্তারিত নিয়ম: `CLAUDE.md`।
