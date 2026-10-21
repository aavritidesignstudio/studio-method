# Studio Method roadmap

The journey from idea to a live app and website, and the skill for each stage. ✅ = in the first cut (0.1.0).
Build the next one with `forge`; lessons from real projects arrive through `harvest`.

## 1. Idea and design
| Skill | Pack | What it does |
|---|---|---|
| ✅ mockup-lab | core | Clickable phone or website mockup with sample data, agreed before any code |
| brand-kit | site | Logo, colour tokens (light + dark), type pair, app icon, splash and favicon set from one brief |
| copy-deck | core | Product copy in every language from one source: tone, banned words, UI strings, store and site text |

## 2. Start and build
| Skill | Pack | What it does |
|---|---|---|
| ✅ studio-start | core | New project from scratch (asks app/site/AI/services) or adopt an existing repo |
| ✅ stack-guide | services | How Supabase, Cloudflare, Vercel, email, Google sign-in, EAS and AI providers fit together |
| ✅ env-setup | services | Env var wizard: names, where each comes from, secrets pasted by the user, local/cloud swap |
| auth-setup | services | Google sign-in end to end (consoles, deep links, Supabase), demo accounts, account deletion |
| ai-proxy | services | AI calls through an edge function: keys server-side, rate limits, cost caps, model choice, fallbacks |
| push-and-reminders | app | FCM/APNs setup, local reminders, channels and sounds, exact alarms, deep links from a notification |
| media-storage | services | Photos/voice/files on R2 with signed URLs, thumbnails, upload progress, clean-up jobs |
| i18n | app | Bilingual from day one: copy files, fonts for non-Latin scripts, layout checks, store/site locales |
| offline-sync | app | Query cache persistence, optimistic updates, retry queues, conflict rules |

## 3. Quality
| Skill | Pack | What it does |
|---|---|---|
| ✅ device-qa | app | Emulator/phone QA protocol: RAM, demo accounts, focus checks, keyboard-open test, screenshots |
| ✅ perf-pass | app | Measure → split the cost → fix → re-measure, with a before/after table |
| security-pass | services | RLS audit, secrets scan, edge-function auth, storage rules, dependency alerts |
| a11y-pass | app/site | Labels, contrast in both themes, font scaling, screen-reader walk-through, reduced motion |
| test-plan | core | Smallest useful tests per feature (logic checks, one end-to-end path), what to run before a release |

## 4. Money
| Skill | Pack | What it does |
|---|---|---|
| payments-app | app | In-app subscriptions on Play (and App Store): Play Billing via a wrapper such as RevenueCat or the native library, paywall mockup, server-side entitlement check, test tracks, refunds. Store rules: digital goods in the app use the store's billing (check current policy and regional alternative-billing rules) |
| payments-web | services | Website checkout with Stripe or Razorpay (UPI for India): products, webhooks to Supabase, invoices, tax basics |
| pricing-page | site | Plans, free vs paid, FAQ, honest comparisons; ties to payments-web or the store links |

## 5. Website live
| Skill | Pack | What it does |
|---|---|---|
| ✅ site-builder | site | Story-led home, live demos from mockups, updates page, waitlist, Vercel deploy |
| seo | site | Titles and descriptions, Open Graph images, sitemap, robots, structured data (SoftwareApplication, FAQ), Search Console, Core Web Vitals, internal links, per-language pages |
| go-live | site | Domain on Cloudflare DNS → Vercel, SSL, www/apex redirects, email records (SPF/DKIM/DMARC), a pre-launch checklist and a rollback plan |
| legal-pages | site | Privacy policy, terms and delete-account page written from a code audit of what the app really collects |
| analytics | site/app | Privacy-friendly analytics, launch funnels, consent where required |
| waitlist-to-beta | site | Waitlist emails, beta invites, closed-testing links, launch announcement |

## 6. App in the store
| Skill | Pack | What it does |
|---|---|---|
| ✅ store-listing-kit | app | Designed screenshots (light + dark), feature graphic, listing copy, review page with downloads |
| ✅ release-ritual | app | Play build or OTA, AAB permission check, release log, What's new, website update entry |
| play-console-setup | app | Create the app, content rating, target audience, Data safety, app access for reviewers, closed testing (current tester and day rules), production rollout |
| app-store-release | app | iOS: certificates via EAS, TestFlight, App Store Connect listing and review notes |

## 7. Run and grow
| Skill | Pack | What it does |
|---|---|---|
| crash-watch | app | Crash and error reporting (e.g. Sentry), source maps for OTA bundles, alert rules |
| support-desk | services | Support email aliases, in-app feedback, canned replies, a weekly digest |
| cost-watch | services | Quotas and bills across EAS, Supabase, R2, Vercel, email, AI; alerts before limits |
| admin-console | site | The owner's settings and switches in one protected page, from the project's admin-ideas list |
| growth-loops | site | Referral links, share cards, store rating prompts at the right moment |

## 8. The method itself
| Skill | Pack | What it does |
|---|---|---|
| ✅ working-contract, catch-up, check-out, teach, optimize-repo, github-to-gitlab, playbook | core | How we work |
| ✅ harvest | core | Lessons from any project back into the method, owner-approved |
| ✅ forge | core | Build or improve a skill in the method repo |
| web-method | core | Variant of studio-start for web-only products (Next.js or Vite, no app) |
| hooks | core | Optional hooks: session-start "due" reminders (repo clean, release notes), commit-message checks |
