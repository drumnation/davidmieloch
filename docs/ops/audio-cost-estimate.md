# Audio Narration Cost Estimate

Generated: 2026-06-05T04:38:54.510Z

## Summary

- Scope: 20 currently published davidmieloch.com article pages.
- Paid generation performed: no.
- Pricing assumption: Speechify public API pricing page lists pay-as-you-go at $10 per 1M characters.
- Cost basis: SSML characters, because that is the generated payload sent to Speechify.
- Plain script characters: 189,779
- SSML characters: 232,895
- Estimated listening time: 203.5 minutes
- Speechify chunks: 22
- Estimated total cost: $2.33
- Estimated remaining from $5 credit: $2.67

## Chunking

- judgment-over-keystrokes: 38,165 SSML chars across 2 chunks.
- what-i-learned-building-a-photoshop-in-the-browser: 22,193 SSML chars across 2 chunks.

## Article Estimates

| Article | Status | SSML chars | Chunks | Minutes | Est. cost |
| --- | --- | ---: | ---: | ---: | ---: |
| judgment-over-keystrokes | needs-script-approval | 38,165 | 2 | 30.4 | $0.3816 |
| what-i-learned-building-a-photoshop-in-the-browser | needs-script-approval | 22,193 | 2 | 19.3 | $0.2219 |
| your-ai-isnt-hallucinating-its-lying | needs-script-approval | 18,224 | 1 | 17.2 | $0.1822 |
| reality-needs-observers | needs-script-approval | 16,218 | 1 | 13.3 | $0.1622 |
| the-overnight-shift | needs-script-approval | 15,069 | 1 | 14.1 | $0.1507 |
| every-company-is-sitting-on-sunken-treasure | needs-script-approval | 13,441 | 1 | 11.8 | $0.1344 |
| the-foreman | needs-script-approval | 12,677 | 1 | 11.8 | $0.1268 |
| why-character-choice-matters-in-agent-design | needs-script-approval | 12,155 | 1 | 11.1 | $0.1215 |
| the-golden-hammer | needs-script-approval | 11,041 | 1 | 10.0 | $0.1104 |
| the-factory | needs-script-approval | 10,830 | 1 | 9.2 | $0.1083 |
| the-moving-target | needs-script-approval | 10,415 | 1 | 10.0 | $0.1042 |
| how-to-make-your-ai-code-look-human | needs-script-approval | 9,057 | 1 | 7.2 | $0.0906 |
| pixel-precision-in-developer-tools-what-i-learned-building-designer-cloud | needs-script-approval | 8,192 | 1 | 7.4 | $0.0819 |
| developing-with-a-team-of-ai-s | needs-script-approval | 8,100 | 1 | 8.0 | $0.0810 |
| academic-research-is-a-software-patch-and-i-finally-have-a-way-to-install-it | needs-script-approval | 7,983 | 1 | 6.9 | $0.0798 |
| building-with-brain-garden-real-world-lessons-in-practical-ai | needs-script-approval | 7,917 | 1 | 6.4 | $0.0792 |
| alphabetize-your-code | needs-script-approval | 3,358 | 1 | 2.5 | $0.0336 |
| reuse-your-code-authoring-your-own-universal-library-with-webpack | needs-script-approval | 2,989 | 1 | 2.5 | $0.0299 |
| why-you-should-encapsulate-your-javascript-conditionals-in-a-function | needs-script-approval | 2,626 | 1 | 2.5 | $0.0263 |
| the-beauty-of-es6s-object-destructuring-assignment | needs-script-approval | 2,245 | 1 | 1.9 | $0.0225 |

## Safe Next Step

Review and approve the generated `audio.md` files before any paid generation. The pipeline refuses to call Speechify unless `audio:approve <slug>` has been run and `audio:generate <slug> --spend-approved` is used.
