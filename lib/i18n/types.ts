export type Lang = "fr" | "en";

export type StatusTone = "warn" | "fail" | "pass" | "info" | "";

export type ThreadMsg = { from: "dev" | "qa"; body: string; when: string };

export type ProblemTicket = {
  key: string;
  reporter: string;
  status: string;
  statusTone: StatusTone;
  title: string;
  body: string;
  thread: ThreadMsg[];
};

export type WorkflowRow = {
  k: string;
  v: string;
  tag?: "warn" | "fail" | "pass" | "info";
  pass?: boolean;
};

export type WorkflowStep = {
  title: string;
  tag: string;
  desc: string;
  pre?: string;
  code?: boolean;
  rows?: WorkflowRow[];
};

export type OutputTab = {
  id: "verdict" | "spec" | "comment" | "trace" | "screens";
  label: string;
  mono: string;
};

export type CommentSegment = string | { code: string };
export type CommentParagraph = CommentSegment[];

export type SecurityMode = { name: string; desc: string; best: string };

export type StackItem = {
  name: string;
  role: string;
  desc: string;
  mono: string;
};

export type Translations = {
  nav: {
    howItWorks: string;
    outputs: string;
    security: string;
    stack: string;
    pilot: string;
    signIn: string;
    applyPilot: string;
    beta: string;
  };
  hero: {
    pillTag: string;
    pillText: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    meta1: string;
    meta2: string;
    meta3: string;
  };
  showcase: {
    run: string;
    env: string;
    elapsed: string;
    inputLabel: string;
    ticketReporter: string;
    ticketStatus: string;
    ticketTitle: string;
    ticketBody: string;
    handoff: string;
    runner: string;
    pretriageLabel: string;
    stepsCount: string;
    steps: string[];
    stateDone: string;
    stateRunning: string;
    stateQueued: string;
    verdictMuted: string;
    verdictValue: string;
    componentMuted: string;
    artefactsMuted: string;
    artefactsValue: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    sub: string;
    tickets: ProblemTicket[];
    stats: { v: string; l: string }[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: WorkflowStep[];
    raceComment: string;
  };
  outputs: {
    eyebrow: string;
    title: string;
    sub: string;
    tabs: OutputTab[];
    verdictHeadMono: string;
    specHeadMono: string;
    specCom1: string;
    specCom2: string;
    specCom3: string;
    commentHead: string;
    commentSub: string;
    commentName: string;
    commentBot: string;
    commentWhen: string;
    commentParas: CommentParagraph[];
    traceHead: string;
    traceSub: string;
    traceLast: string;
    screensHead: string;
    screensSub: string;
    frameLabels: [string, string, string];
    frameBanner: string;
    frameHot: string;
  };
  security: {
    eyebrow: string;
    title: string;
    sub: string;
    perimeter: string;
    saasLabel: string;
    nodes: {
      jira: string;
      runner: string;
      staging: string;
      workers: string;
      control: string;
    };
    subLines: [string, string, string];
    bridgeTag: string;
    bullets: string[];
    modesLabel: string;
    modes: SecurityMode[];
  };
  stack: {
    eyebrow: string;
    title: string;
    sub: string;
    items: StackItem[];
    notHead: string;
    notItems: string[];
  };
  pilot: {
    eyebrow: string;
    title: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    spots: string;
    listHead: string;
    pilotTag: string;
    list: string[];
    fitLabel: string;
    fitItems: string[];
  };
  contact: {
    pageTitle: string;
    pageSub: string;
    formTitle: string;
    formSub: string;
    fields: {
      name: string;
      email: string;
      company: string;
      role: string;
      teamSize: string;
      stack: string;
      pain: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      role: string;
      teamSize: string;
      stack: string;
      pain: string;
      message: string;
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successSub: string;
    sendAnother: string;
  };
  legal: {
    privacyTitle: string;
    privacyIntro: string;
    termsTitle: string;
    termsIntro: string;
    docsTitle: string;
    docsIntro: string;
    securityPageTitle: string;
    securityPageIntro: string;
    pilotPageTitle: string;
    pilotPageIntro: string;
    lastUpdated: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    product: string;
    company: string;
    trust: string;
    links: {
      howItWorks: string;
      outputs: string;
      security: string;
      stack: string;
      about: string;
      careers: string;
      blog: string;
      contact: string;
      secCompliance: string;
      privacy: string;
      terms: string;
      status: string;
      dpa: string;
    };
    copyright: string;
    build: string;
  };
};
