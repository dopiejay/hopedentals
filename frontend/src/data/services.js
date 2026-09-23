import {
  StethoscopeIcon,
  SyringeIcon,
  GemIcon,
  ShieldIcon,
  TreatIcon,
  BabyIcon,
} from '../components/Icons';

export const services = [
  {
    slug: 'general-dentistry',
    icon: StethoscopeIcon,
    title: 'General Dentistry',
    desc: 'Routine dental care and preventive treatment — consultations, examinations, cleanings, fillings, and gum care.',
    color: 'from-hope-teal/20 to-hope-accent/10',
    iconColor: 'text-hope-navy bg-hope-teal/10',
    img: '/images/general.jpg',
    intro:
      'General dentistry focuses on the prevention, diagnosis, and treatment of common dental conditions. Regular visits keep your teeth and gums healthy, catching small problems before they grow into bigger, more expensive ones.',
    includes: [
      { title: 'Dental Consultation', desc: 'A relaxed first conversation about your concerns and goals.' },
      { title: 'Routine Examinations', desc: 'A full look at your teeth, gums, and oral health.' },
      { title: 'Teeth Cleaning', desc: 'Removal of plaque and tartar that brushing cannot reach.' },
      { title: 'Fillings', desc: 'Repairs for cavities and damaged teeth.' },
      { title: 'Gum Care', desc: 'Treatment and guidance for healthy, stable gums.' },
    ],
    whoFor:
      'General dental care is suitable for children, teenagers, and adults — whether you are due for a routine examination, want preventive care, or have a specific concern such as a toothache or sensitivity.',
    steps: [
      { title: 'Consultation', desc: 'We listen to your concerns and examine your oral health.' },
      { title: 'Assessment', desc: 'Any necessary examinations or imaging are carried out on site.' },
      { title: 'Treatment Plan', desc: 'The team explains what was found and recommends treatment.' },
      { title: 'Care & Follow-Up', desc: 'Treatment is provided gently, with follow-up where needed.' },
    ],
    whyUs: [
      { title: 'Patient-Centred', desc: 'Comfortable, reassuring care at our Chichiri clinic.' },
      { title: 'Experienced Team', desc: 'Dentists and dental therapists dedicated to your care.' },
      { title: 'Convenient Location', desc: 'Chichiri Shopping Centre, Blantyre.' },
    ],
    faqs: [
      {
        q: 'How often should I have a dental check-up?',
        a: 'Many patients benefit from a check-up every six months, but the right interval depends on your individual oral health. We will recommend a schedule that suits you.',
      },
      {
        q: 'Does treatment hurt?',
        a: 'We use gentle techniques and always make sure you are comfortable before any treatment begins.',
      },
      {
        q: 'How much does it cost?',
        a: 'Costs depend on the treatment you actually need, which we can only confirm after an assessment. You will receive clear pricing before anything begins.',
      },
    ],
  },
  {
    slug: 'orthodontics',
    icon: SyringeIcon,
    title: 'Orthodontics',
    desc: 'Straighter teeth and improved alignment with traditional braces and orthodontic care, for children and adults.',
    color: 'from-blue-100/60 to-sky-50/40',
    iconColor: 'text-blue-700 bg-blue-100/60',
    img: '/images/orthodontics.jpg',
    intro:
      'Orthodontics straightens teeth and improves how your upper and lower teeth meet. Treatment at Hope Dental Surgery uses traditional braces and careful follow-up, planned visit by visit for patients of all ages.',
    includes: [
      { title: 'Orthodontic Consultation', desc: 'A discussion of your concerns and what you would like to achieve.' },
      { title: 'Traditional Braces', desc: 'Reliable, precise correction for a wide range of alignment issues.' },
      { title: 'Adjustments & Follow-Up', desc: 'Short regular visits keep treatment moving as planned.' },
      { title: 'Retainers', desc: 'Keeping teeth in their new positions after treatment.' },
    ],
    whoFor:
      'Orthodontic treatment is available for children, teenagers, and adults dealing with crowded, spaced, or misaligned teeth, or bite concerns that affect comfort and function.',
    steps: [
      { title: 'Consultation', desc: 'We discuss your concerns and what you would like to achieve.' },
      { title: 'Assessment', desc: 'Records and examination inform the diagnosis.' },
      { title: 'Treatment Planning', desc: 'The approach, timeline estimate, and options are explained.' },
      { title: 'Fitting', desc: 'Your braces are fitted comfortably.' },
      { title: 'Adjustments', desc: 'Short regular visits keep treatment moving as planned.' },
      { title: 'Retention & Review', desc: 'Retainers and reviews protect your result long term.' },
    ],
    whyUs: [
      { title: 'All Ages Welcome', desc: 'Children, teenagers, and adult patients are all treated.' },
      { title: 'Visit-by-Visit Tracking', desc: 'Progress is monitored closely so plans stay on course.' },
      { title: 'Expert Team', desc: 'A dedicated orthodontic and clinical team.' },
    ],
    faqs: [
      {
        q: 'Am I too old for braces?',
        a: 'No. Teeth can be moved safely at any age, and many of our orthodontic patients are adults. An assessment will confirm the best option for your case.',
      },
      {
        q: 'How long does treatment take?',
        a: 'It varies from case to case depending on what needs correcting. After your assessment we will give you an estimated timeline before anything begins.',
      },
      {
        q: 'Do braces hurt?',
        a: 'Most patients feel mild soreness for a few days after fitting and adjustments. It settles quickly, and we will show you how to stay comfortable.',
      },
    ],
  },
  {
    slug: 'restorative-dentistry',
    icon: GemIcon,
    title: 'Restorative Dentistry',
    desc: 'Crowns, bridges, and dentures that restore damaged or missing teeth — built to match your natural smile.',
    color: 'from-purple-100/60 to-pink-50/40',
    iconColor: 'text-purple-700 bg-purple-100/60',
    img: '/images/crowns-bridges.jpg',
    intro:
      'Restorative dentistry repairs and replaces teeth that are damaged or missing, restoring both function and appearance. The team crafts crowns, bridges, and dentures shaped to match your natural bite and shade.',
    includes: [
      { title: 'Crowns', desc: 'Caps that restore and protect damaged or heavily filled teeth.' },
      { title: 'Bridges', desc: 'A fixed solution to replace one or more missing teeth.' },
      { title: 'Dentures', desc: 'Removable replacements for partial or full tooth loss.' },
      { title: 'Tooth Restoration', desc: 'Repairs that bring damaged teeth back to full strength.' },
    ],
    whoFor:
      'Restorative dentistry suits patients with cracked, root-treated, or heavily filled teeth, as well as those missing one or more teeth who want to restore comfort, function, and confidence.',
    steps: [
      { title: 'Consultation', desc: 'We assess the tooth or teeth that need restoring.' },
      { title: 'Preparation', desc: 'The tooth is shaped and impressions are taken.' },
      { title: 'Lab Crafting', desc: 'Your restoration is made to match your natural teeth.' },
      { title: 'Fitting & Review', desc: 'Your restoration is fitted, adjusted, and reviewed.' },
    ],
    whyUs: [
      { title: 'Crafted Restorations', desc: 'Restorations shaped to match your natural smile.' },
      { title: 'Natural Results', desc: 'Shades and shapes matched to your smile.' },
      { title: 'Durable Materials', desc: 'Restorations built to last.' },
    ],
    faqs: [
      {
        q: 'How long do crowns and bridges last?',
        a: 'With good care, crowns and bridges can last many years. We will give you honest expectations and aftercare advice during your consultation.',
      },
      {
        q: 'Is the procedure painful?',
        a: 'We make sure you are comfortable throughout, and most patients describe the process as straightforward.',
      },
    ],
  },
  {
    slug: 'oral-surgery',
    icon: ShieldIcon,
    title: 'Oral Surgery',
    desc: 'Tooth extraction and other oral surgical procedures carried out safely and gently.',
    color: 'from-emerald-100/60 to-teal-50/40',
    iconColor: 'text-emerald-700 bg-emerald-100/60',
    img: '/images/xray.jpg',
    intro:
      'Oral surgery covers the removal of teeth and other surgical procedures within the mouth. Whether a simple extraction or a more complex surgical removal, treatment is planned carefully and performed with your comfort in mind.',
    includes: [
      { title: 'Tooth Extraction', desc: 'Removal of damaged or problematic teeth.' },
      { title: 'Surgical Extraction', desc: 'More complex extractions carried out safely.' },
      { title: 'Other Surgical Procedures', desc: 'Further oral surgical care as recommended.' },
    ],
    whoFor:
      'Oral surgery suits patients with severely damaged, impacted, or problematic teeth that cannot be saved by other treatment.',
    steps: [
      { title: 'Consultation', desc: 'We examine the area and plan the procedure.' },
      { title: 'Treatment', desc: 'The procedure is carried out with your comfort in mind.' },
      { title: 'Aftercare', desc: 'Clear guidance to help you recover smoothly.' },
    ],
    whyUs: [
      { title: 'Experienced Team', desc: 'Surgical care from a skilled clinical team.' },
      { title: 'Gentle Approach', desc: 'Comfort and reassurance throughout.' },
    ],
    faqs: [
      {
        q: 'Will I feel pain?',
        a: 'Local anaesthetic is used so the area is numb during treatment, and we give you clear aftercare guidance for a comfortable recovery.',
      },
    ],
  },
  {
    slug: 'implant-dentistry',
    icon: TreatIcon,
    title: 'Implant Dentistry',
    desc: 'Dental implants that replace missing teeth with a strong, natural-looking, long-term solution.',
    color: 'from-amber-100/60 to-orange-50/40',
    iconColor: 'text-amber-700 bg-amber-100/60',
    img: '/images/cosmetic.jpg',
    intro:
      'Dental implants replace missing teeth with a titanium post placed in the jaw, topped with a natural-looking crown. They offer a strong, lasting alternative to removable teeth and are restored to match your smile.',
    includes: [
      { title: 'Dental Implants', desc: 'A permanent foundation for a replacement tooth.' },
      { title: 'Implant Restoration', desc: 'The crown or restoration fitted on top of the implant.' },
    ],
    whoFor:
      'Implant dentistry suits adults missing one or more teeth who prefer a fixed, long-term solution and have healthy gums and sufficient jawbone.',
    steps: [
      { title: 'Consultation', desc: 'We assess your jaw, gums, and suitability for implants.' },
      { title: 'Placement', desc: 'The implant is placed during a planned procedure.' },
      { title: 'Healing', desc: 'The implant is given time to integrate with the bone.' },
      { title: 'Restoration', desc: 'Your natural-looking crown is fitted on top.' },
    ],
    whyUs: [
      { title: 'Long-Term Solution', desc: 'A strong, durable way to replace missing teeth.' },
      { title: 'Natural Look', desc: 'Restorations matched to your smile.' },
    ],
    faqs: [
      {
        q: 'Am I a candidate for implants?',
        a: 'Suitability depends on your jawbone and overall health. An assessment will confirm whether implants are right for you.',
      },
    ],
  },
  {
    slug: 'childrens-dentistry',
    icon: BabyIcon,
    title: "Children's Dentistry",
    desc: 'Gentle, patient dental care designed to make children feel safe and comfortable at every visit.',
    color: 'from-teal-100/60 to-cyan-50/40',
    iconColor: 'text-teal-700 bg-teal-100/60',
    img: '/images/child.jpg',
    intro:
      "Children's dentistry focuses on keeping young smiles healthy from the very first tooth. We create relaxed, friendly visits that help children feel at ease, while building good oral-health habits that last a lifetime.",
    includes: [
      { title: 'Children\u2019s Examinations', desc: 'Age-appropriate check-ups of teeth and gums.' },
      { title: 'Preventive Care', desc: 'Cleanings and fluoride care for growing teeth.' },
      { title: 'Gentle Treatment', desc: 'Fillings and care delivered with patience and reassurance.' },
      { title: 'Habits & Guidance', desc: 'Advice on brushing, diet, and early alignment.' },
    ],
    whoFor:
      'Children\u2019s dentistry suits infants, toddlers, and school-age children building healthy dental habits, as well as parents who want a team their children can grow to trust.',
    steps: [
      { title: 'Welcome Visit', desc: 'A friendly first visit focused on feeling comfortable.' },
      { title: 'Examination', desc: 'A gentle look at teeth, gums, and development.' },
      { title: 'Preventive Care', desc: 'Cleaning and protection for growing teeth.' },
      { title: 'Guidance', desc: 'Simple advice for parents and children at home.' },
    ],
    whyUs: [
      { title: 'Patient with Kids', desc: 'Calm, reassuring visits designed for children.' },
      { title: 'Whole Family Care', desc: 'One clinic your whole family can visit.' },
    ],
    faqs: [
      {
        q: 'When should a child first see a dentist?',
        a: 'An early visit is a great idea once the first teeth appear or around the first birthday. It builds familiarity long before any treatment is needed.',
      },
      {
        q: 'How do you help anxious children?',
        a: 'We take time to explain and keep visits relaxed and gentle, letting children move at their own pace so they feel in control.',
      },
    ],
  },
];
