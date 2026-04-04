export type Section = 
  | { type: 'text'; title?: string; body: string; num?: string }
  | { type: 'metrics'; items: { value: string; label: string; desc: string }[] }
  | { type: 'quote'; text: string; cite: string }
  | { type: 'process'; items: { num: string; title: string; desc: string }[] }
  | { type: 'image'; url: string; caption?: string; fullBleed?: boolean; placeholder?: boolean }
  | { type: 'grid'; images: string[]; columns: 2 | 3 };

export interface CaseStudyData {
  id: string;
  name: string;
  nameItalic: string;
  tags: string[];
  type: string;
  year: string;
  scope: string;
  platform: string;
  img: string;
  description: string;
  group: 'gojek' | 'other';
  sections: Section[];
  nextProjectId: string;
  nextProjectName: string;
}

export const projects: CaseStudyData[] = [
  {
    id: '01',
    name: 'GoTransit Pre-Booking Experience',
    nameItalic: '',
    tags: ['Transit', 'Mobility'],
    type: 'Lead Product Designer',
    year: '2024–2025',
    scope: 'UX Research, Product Strategy, Interaction Design',
    platform: 'iOS · Android',
    img: '/images/Gotransit_Thumb.png',
    group: 'gojek',
    description: 'How fixing the wrong mental model moved more people through Jakarta — and kept a product alive.',
    sections: [
      {
        type: 'text',
        num: '01',
        title: 'The Feature Nobody Used',
        body: `Late 2023. GoTransit launched multimodal booking. GoRide to the station, KRL train, GoRide out the other end. One order. One payment. First mile to last mile, connected inside Gojek.

It should have changed how Jakarta moved.

It didn't.

Users kept doing what they always did. Open GoTransit. Buy a train ticket. Leave. Book a GoRide separately, somewhere else. The multimodal feature was live, technically working, and practically invisible.`
      },
      {
        type: 'image',
        url: '/images/transit/Intro.png',
        caption: 'GoTransit homepage screenshot, 2023',
        placeholder: false
      },
      {
        type: 'text',
        num: '02',
        title: 'Why This Mattered',
        body: `GoTransit carried a real partnership cost to sell KRL tickets on Gojek. A train ticket priced in the low thousands of rupiah barely moved the margin. GoRide did. Every multimodal booking was where the unit economics worked. Every train-only booking was a missed opportunity the product couldn't afford.

The business target: **~900K multimodal bookings per month** to reach breakeven. We were nowhere near it.

The instinct from the product team was upsell prompts. Surface GoRide after a KRL booking. Fast to ship. Reasonable.

My read was different. Upsell mechanics work when users understand the product and need a nudge. They don't work when users have already decided what the product is for — and decided wrong.`
      },
      {
        type: 'text',
        num: '02',
        title: 'Not a conversion problem. A comprehension problem.',
        body: `The team's instinct: upsell prompts, GoRide nudges inside the KRL flow, quick experiments. Fast to ship. Reasonable signal.

We brought a different read. The **87% drop was happening before users entered the flow** — at intent, not checkout. Upsell prompts work when users understand the product. They don't work when the product is projecting the wrong identity.

Field research confirmed it. We rode KRL during peak hours, shadowed commuters end-to-end, watched users plan journeys in real conditions. The same pattern, everywhere:

- Users saw the train banner → concluded *"this is for buying tickets"*
- The multimodal entry point read as an add-on, not the primary interaction
- **Gojek** = rides. **GoTransit** = train tickets. Not journeys. Not planning.

The UI wasn't creating this belief — it was **cementing one that already existed.**`
      },
      {
        type: 'image',
        url: '',
        caption: 'Heuristic audit — annotated assumptions on the existing homepage',
        placeholder: true
      },
      {
        type: 'quote',
        text: '"GoTransit was signalling the identity of a train ticketing tool inside an ecosystem built for journeys. No amount of upsell prompting would fix a perception problem baked into the first thing users saw."',
        cite: '— Problem statement, GoTransit · 2024'
      },
      {
        type: 'process',
        items: [
          { num: '01', title: 'Reframe', desc: 'Funnel + field research diagnosed the 87% drop as comprehension, not conversion. Locked the problem statement.' },
          { num: '02', title: 'Align', desc: 'Built a 2-year design vision. Scoped Phase 1 to the first fold only — search, masthead, service grid.' },
          { num: '03', title: 'Test', desc: '2 rounds, 22 participants, two contexts: planners at home vs. commuters near a KRL station.' },
          { num: '04', title: 'Ship', desc: 'New homescreen: two-field journey planner, narrative 3D masthead, reordered service grid.' }
        ]
      },
      {
        type: 'text',
        num: '03',
        title: 'What we tested and what we learned.',
        body: `We tested across two distinct user contexts — because **where you are shapes what you need:**

### At home or office — planning mindset
- Open to booking 2–3 legs together
- Had cognitive space to understand the full journey
- Responded well to identity reframing

### Near a KRL station — execution mindset
- Already committed to the train, booking under time pressure
- Defaulted to single-leg regardless of the UI
- The homepage couldn't reframe intent at this point

**Key testing findings:**

- 8 of 12 participants described the new search as "booking a trip" (vs. "finding a station" before)
- The standard 2D masthead wasn't holding attention — frames read as isolated illustrations, not a narrative
- Moving to **monochromatic 3D illustrations** with a step indicator: 9 of 10 described the carousel as showing "steps" or "a journey"
- Copy variant *"Book your full journey — GoRide + KRL"* outperformed warmer alternatives for new users`
      },
      {
        type: 'image',
        url: '',
        caption: 'Design explorations — masthead iterations from 2D to 3D',
        placeholder: true
      },
      {
        type: 'text',
        num: '04',
        title: 'What shipped.',
        body: `**Two-field journey planner** — location-detected, origin + destination. Copy framing the interaction as trip planning, not ticket lookup. Engineering aligned on the dual-field architecture after we showed it was the only structure that communicated journey intent.

**Narrative masthead** — horizontal carousel, monochromatic 3D illustrations, five frames: home → GoRide → station gate → train → GoRide at the other end. A new visual direction for GoTransit and for Gojek's illustration language.

**Reordered service grid** — multimodal entry point leads. Individual ticket purchases move to secondary position.`
      },
      {
        type: 'image',
        url: '',
        caption: 'Final homescreen — before and after',
        placeholder: true
      },
      {
        type: 'text',
        num: '05',
        title: 'What moved.',
        body: `Post-launch on iOS:

- **+48% CTR** on the multimodal search bar — users who previously ignored the entry point were clicking in
- **+12% multimodal booking conversion** — the signal travelled all the way through the funnel
- **−3.5% individual ticket conversion** — users shifting to the multimodal path

That last number is the one worth pausing on. A drop in single-leg bookings isn't a regression — it's **low-margin behavior redirecting to higher-margin behavior.** That's what it looks like when design changes a mental model, not just a click rate.

The decisions that mattered most in this project happened before Figma — reading the 87% drop correctly, pushing into an OKR conversation heading toward upsell prompts, and building alignment for a phased strategy when the easier path was to ship a banner.

*Want the full case study including research methodology, design explorations, and testing detail? [Reach out →](mailto:md17nadeem@gmail.com)*`
      }
    ],
    nextProjectId: '02',
    nextProjectName: 'Agoda Design System'
  },
  {
    id: '02',
    name: 'GoCar CADF',
    nameItalic: 'Cancellation After Driver Found',
    tags: ['Ride-hailing', 'Retention', 'Android & iOS'],
    type: 'Lead Product Designer',
    year: '2023',
    scope: 'UX Research, Experimentation, Systems Design',
    platform: 'Android · iOS',
    img: '/images/CADF_Preview.jpg',
    group: 'gojek',
    description: 'Reducing cancellations from 25% to 16% in Bali by closing the gap between what the system knew and what the user could see.',
    sections: [
      {
        type: 'text',
        num: '01',
        title: 'Scaling design across *200+ components.*',
        body: 'A comprehensive design system built to scale across multiple platforms and teams at Agoda. This project focused on creating a unified visual language and a robust set of reusable components.'
      },
      {
        type: 'metrics',
        items: [
          { value: '40%', label: 'Dev Speed ↑', desc: 'Faster component implementation' },
          { value: '12', label: 'Teams', desc: 'Active teams using the system' },
          { value: '200+', label: 'Components', desc: 'Documented and reusable' },
          { value: '100%', label: 'Consistency', desc: 'Across all platforms' }
        ]
      },
      {
        type: 'text',
        num: '02',
        title: 'Fragmented experiences and *slow cycles.*',
        body: 'Agoda faced significant design debt and inconsistency. Teams were reinventing components, leading to fragmented user experiences and slow development cycles.'
      },
      {
        type: 'quote',
        text: '"We spend more time arguing about button styles than solving user problems."',
        cite: '— Senior Product Manager, Agoda'
      }
    ],
    nextProjectId: '03',
    nextProjectName: 'Gojek Driver App'
  },
  {
    id: '03',
    name: "Snippets — Gojek's Stories",
    nameItalic: '',
    tags: ['Zero to One', 'Platform', 'iOS · Android'],
    type: 'Lead Product Designer',
    year: '2022 – 2024',
    scope: 'Zero to One, Platform Design, Growth',
    platform: 'iOS · Android',
    img: '/images/cadf/snippetsthumb.png',
    group: 'gojek',
    description: 'Designing Gojek\'s in-app Stories channel from scratch — from inbox replacement to a live commerce and revenue-generating platform.',
    sections: [
      {
        type: 'text',
        num: '01',
        title: 'Empowering the *backbone* of the platform.',
        body: 'The Gojek Driver app is the primary tool for millions of driver partners. This project focused on streamlining the order acceptance and pickup flow to reduce stress and improve efficiency during peak hours.'
      },
      {
        type: 'metrics',
        items: [
          { value: '2M+', label: 'Drivers', desc: 'Active partners impacted' },
          { value: '15%', label: 'Pickup Time ↓', desc: 'Faster coordination' },
          { value: '92%', label: 'Satisfaction', desc: 'Driver sentiment score' }
        ]
      }
    ],
    nextProjectId: '04',
    nextProjectName: 'Bank Jago'
  },
  {
    id: '04',
    name: 'Driver to Customer Chat',
    nameItalic: '',
    tags: ['Platform', 'Communication', 'iOS · Android'],
    type: 'Lead Product Designer',
    year: '2021 – 2023',
    scope: 'Platform Design, Feature 0→1',
    platform: 'iOS · Android',
    img: '/images/transit/D2C.png',
    group: 'gojek',
    description: 'Consolidating order communication and in-app support into a single two-sided channel — for drivers and customers across Gojek.',
    sections: [
      {
        type: 'text',
        num: '01',
        title: 'One surface for every conversation.',
        body: 'Before GoChat, driver-to-customer communication was fragmented — phone calls that exposed personal numbers, no structured way to raise order issues, and no shared space where operational messages and support lived together. GoChat consolidated all of it.'
      },
      {
        type: 'metrics',
        items: [
          { value: '4+', label: 'Feature areas', desc: 'Calling · Tipping · Templates · Help' },
          { value: '2yrs', label: 'Platform lifecycle', desc: '0→1 through scale' },
          { value: '2-sided', label: 'Product', desc: 'Driver app + Customer app' }
        ]
      }
    ],
    nextProjectId: '01',
    nextProjectName: 'GoTransit Pre-Booking Experience'
  }
];
