export interface ToolExample {
  label: string;
  input: string;
  output: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDetailContent {
  introduction: string;
  howItWorks: string;
  examples: ToolExample[];
  features: string[];
  limitations: string[];
  faqs: ToolFaq[];
}

export const TOOL_DETAILS: Record<string, ToolDetailContent> = {
  'word-counter': {
    introduction:
      'The Word Counter measures word counts, character totals, sentence counts, paragraph breaks, and estimated reading or speaking durations in real time. Writers, students, and editors use it to check assignment limits, newsletter pacing, and article length before publishing.',
    howItWorks:
      'Words are counted by trimming leading and trailing whitespace and splitting on contiguous whitespace characters. Sentences are detected by splitting at terminal punctuation (. ! ?) followed by whitespace or the end of text, while paragraphs are separated by blank lines. Reading time assumes 200 words per minute (WPM), and speaking time assumes 130 WPM.',
    examples: [
      {
        label: 'Short Blog Intro',
        input: 'Simple tools save time.\n\nWrite clearly and check your pacing.',
        output: '11 words · 59 characters · 2 sentences · 2 paragraphs · 4s reading time',
      },
      {
        label: 'Draft Length Check',
        input: '600-word article pasted from a document',
        output: '600 words · 3m 0s reading time (200 WPM) · 4m 37s speaking time (130 WPM)',
      },
    ],
    features: [
      'Live counters for words, characters with/without spaces, sentences, paragraphs, and lines',
      'Built-in reading time (200 WPM) and presentation speaking time (130 WPM) estimates',
      'Sample text loader for quick testing',
      'One-click summary copy for sharing editorial metrics',
    ],
    limitations: [
      'Hyphenated terms (such as "well-known") are counted as a single whitespace-delimited word.',
      'Abbreviations ending with a period mid-sentence (like "Dr." or "e.g.") can increase the sentence count slightly.',
      'Reading speed varies by subject complexity; use the Reading Time Calculator if you want to customize WPM.',
    ],
    faqs: [
      {
        question: 'Does the Word Counter include spaces in the character count?',
        answer:
          'Yes, the main Characters tile includes spaces and punctuation, while the adjacent No Spaces tile shows the character count excluding all whitespace.',
      },
      {
        question: 'How is reading time calculated?',
        answer:
          'Reading time divides your total word count by an average silent reading pace of 200 words per minute and rounds up to the nearest second.',
      },
      {
        question: 'Are my typed drafts saved on a server?',
        answer:
          'No. Counting runs locally in your browser memory and resets whenever you clear the box or close the tab.',
      },
    ],
  },
  'case-converter': {
    introduction:
      'The Case Converter transforms capitalization and identifier styles across paragraphs, headings, and variable names in one click. It saves manual retyping when fixing accidental Caps Lock text, standardizing article headlines, or formatting developer identifiers.',
    howItWorks:
      'Standard prose modes transform characters using locale-safe uppercase/lowercase mapping and sentence-boundary regex rules. Identifier formats (camelCase, PascalCase, snake_case, and kebab-case) first split camel-cased boundaries and non-alphanumeric separators into clean word tokens before rejoining them.',
    examples: [
      {
        label: 'Headline to kebab-case',
        input: 'Simple Tools for Everyday Work',
        output: 'simple-tools-for-everyday-work',
      },
      {
        label: 'ALL CAPS to Sentence case',
        input: 'CHECK YOUR DRAFT BEFORE SENDING. SAVE TIME DAILY.',
        output: 'Check your draft before sending. Save time daily.',
      },
    ],
    features: [
      'Nine conversion formats: Sentence case, lowercase, UPPERCASE, Title Case, camelCase, PascalCase, snake_case, kebab-case, and alternating case',
      'In-place editing so you can chain or tweak text after converting',
      'Live character and word count footer',
      'One-click Copy Text and Clear controls',
    ],
    limitations: [
      'Title Case capitalizes the first letter of every word rather than skipping short articles/prepositions per AP or Chicago style.',
      'Acronyms inside Sentence case (such as "HTML" or "NASA") are lowercased and may need manual restoration.',
    ],
    faqs: [
      {
        question: 'Which format should I pick for file names or CSS classes?',
        answer:
          'kebab-case and snake_case are commonly used for readable filenames and CSS class names because they replace spaces with hyphens or underscores.',
      },
      {
        question: 'How does Sentence case detect new sentences?',
        answer:
          'It capitalizes the first letter of the text and the first letter following a period, exclamation mark, or question mark.',
      },
      {
        question: 'Can I convert multi-line lists all at once?',
        answer:
          'Yes. Paste multiple lines into the box and apply UPPERCASE, lowercase, or Title Case across the entire selection at once.',
      },
    ],
  },
  'text-cleaner': {
    introduction:
      'The Text Cleaner strips stray whitespace, blank lines, smart quotes, HTML tags, and unwanted punctuation from text copied out of PDFs, emails, spreadsheets, or web pages. It helps restore clean plain text before pasting into documents or content editors.',
    howItWorks:
      'Each enabled toggle applies a deterministic regular-expression pass in sequence: first stripping HTML tags if selected, normalizing typographic curly quotes and dashes to ASCII equivalents, optionally removing punctuation, trimming line edges, collapsing repeated spaces/tabs, and removing empty lines or joining line breaks.',
    examples: [
      {
        label: 'HTML & Extra Spaces Cleanup',
        input: '  <p>Hello   world!</p>\\n\\n  “Smart quotes”  ',
        output: 'Hello world!\\n"Smart quotes"',
      },
      {
        label: 'Flatten Multi-Line PDF Copy',
        input: 'Line one breaks\\nearly here.',
        output: 'Line one breaks early here. (with "Join all line breaks" checked)',
      },
    ],
    features: [
      'Seven independent cleanup checkboxes you can combine freely',
      'Live side-by-side Cleaned Output preview without altering your original input',
      'Character reduction counter showing how much clutter was removed',
      'Sample messy text button for immediate testing',
    ],
    limitations: [
      'Stripping HTML tags removes tag wrappers cleanly but does not decode named entities like &amp;—use the HTML Entity Converter if entities remain.',
      'Enabling "Remove punctuation" strips periods, commas, and symbols indiscriminately across the entire passage.',
    ],
    faqs: [
      {
        question: 'What does "Normalize smart quotes" change?',
        answer:
          'It converts curly single/double quotation marks and en/em dashes into standard straight ASCII quotes and hyphens.',
      },
      {
        question: 'Why does text copied from PDFs have awkward line breaks?',
        answer:
          'PDF files store fixed line positions rather than flowing paragraphs. Enabling "Join all line breaks" merges those hard breaks into continuous lines.',
      },
      {
        question: 'Does Text Cleaner modify my original pasted text?',
        answer:
          'No. Your original input stays on the left while the cleaned preview updates on the right so you can toggle options safely.',
      },
    ],
  },
  'duplicate-line-remover': {
    introduction:
      'The Duplicate Line Remover scans line-separated lists—such as email exports, keyword lists, tags, or log entries—and keeps only the first unique occurrence of each line while reporting how many duplicates were removed.',
    howItWorks:
      'Your input is split on newline boundaries. Each line is optionally trimmed and normalized to lowercase for comparison inside a JavaScript Set, preserving the original casing of the first match encountered. Afterward, you can keep the original sequence or sort results alphabetically (A–Z or Z–A).',
    examples: [
      {
        label: 'Case-Insensitive List Deduplication',
        input: 'Apple\\nBanana\\napple\\nOrange\\nBanana',
        output: 'Apple\\nBanana\\nOrange (2 duplicates removed)',
      },
      {
        label: 'Sorted Unique Tags',
        input: 'css\\nhtml\\ncss\\njavascript',
        output: 'css\\nhtml\\njavascript (with Sort A–Z enabled)',
      },
    ],
    features: [
      'Toggleable case sensitivity and line-edge whitespace trimming',
      'Option to skip blank lines automatically',
      'Original order preservation or A–Z / Z–A alphabetical sorting',
      'Downloadable .txt export and removed-line counter',
    ],
    limitations: [
      'Comparison operates strictly on complete lines; duplicate words within the same line are not removed.',
      'Very large files (hundreds of thousands of lines) depend on available browser tab memory.',
    ],
    faqs: [
      {
        question: 'When should I turn on "Case sensitive"?',
        answer:
          'Enable case sensitivity for case-specific identifiers such as file paths, passwords, or URL slugs where "Item" and "item" are distinct.',
      },
      {
        question: 'Which version of a duplicate line is kept when case sensitivity is off?',
        answer:
          'The first matching occurrence in your list is preserved with its original capitalization, and later variants are skipped.',
      },
      {
        question: 'Can I download the cleaned list?',
        answer:
          'Yes, click Download .txt to save unique-lines.txt directly to your device.',
      },
    ],
  },
  'character-counter': {
    introduction:
      'The Character Counter gives an exact breakdown of character totals, non-space characters, letters, digits, punctuation, and UTF-8 byte length, alongside visual progress bars for common SEO and messaging character limits.',
    howItWorks:
      'Unicode letter and digit counts use Unicode property regex classes (\\p{L} and \\p{N}) so accented and non-Latin characters are categorized accurately. UTF-8 byte size is measured with the browser’s TextEncoder API, which counts multi-byte characters and emojis at their true UTF-8 byte weight.',
    examples: [
      {
        label: 'SEO Meta Description Check',
        input: 'Free online tools for writing, URLs, and everyday math.',
        output: '56 characters · 47 without spaces · 56 UTF-8 bytes (35% of 160-char SEO limit)',
      },
      {
        label: 'Multi-Byte Character Check',
        input: 'Cafe ☕',
        output: '6 UTF-16 characters · 8 UTF-8 bytes (☕ uses 3 bytes in UTF-8)',
      },
    ],
    features: [
      'Six character metrics: total, no spaces, letters, digits, punctuation, and UTF-8 bytes',
      'Progress bars for SEO Title (60), Meta Description (160), SMS (160), and Short Post (280)',
      'Clear red over-limit warning when a threshold is exceeded',
      'One-click Copy Text and Clear actions',
    ],
    limitations: [
      'Some multi-codepoint emojis (such as ZWJ sequences) count as multiple JS string code units in the total character field.',
      'Search engines actually truncate titles by pixel width (~580px) as well as character count; 60 characters is a practical guideline.',
    ],
    faqs: [
      {
        question: 'Why can UTF-8 bytes be higher than the character count?',
        answer:
          'Standard ASCII characters take 1 byte in UTF-8, whereas accented letters, non-Latin scripts, and emojis take 2 to 4 bytes each.',
      },
      {
        question: 'What happens if my text exceeds one of the target limits?',
        answer:
          'The corresponding progress bar turns red and marks the counter as "(Over limit)" so you know to trim the copy.',
      },
      {
        question: 'Are spaces counted in SEO meta descriptions and social posts?',
        answer:
          'Yes, almost all platforms count spaces and punctuation toward their maximum character limits.',
      },
    ],
  },
  'text-diff-checker': {
    introduction:
      'The Text Diff Checker compares two versions of plain text line by line to highlight exactly which lines were added, removed, or left unchanged. It is useful for reviewing document revisions, configuration edits, or list updates.',
    howItWorks:
      'The tool splits both inputs into lines and builds a Longest Common Subsequence (LCS) dynamic programming table to find the minimal line-by-line alignment between Original and Modified texts. Optional toggles normalize whitespace or lowercase lines during comparison without hiding the real text.',
    examples: [
      {
        label: 'Config Update Review',
        input: 'Original: "Port 3000" vs Modified: "Port 8080"',
        output: '1 removed (- Port 3000), 1 added (+ Port 8080), unchanged lines preserved with line numbers',
      },
      {
        label: 'Draft Line Addition',
        input: 'Inserting a new bullet item between existing lines',
        output: 'Added line highlighted in green with its new right-hand line number',
      },
    ],
    features: [
      'True LCS line-by-line alignment with dual left/right line numbers',
      'Added (+), removed (-), and unchanged summary counters',
      'Ignore whitespace and Ignore case comparison toggles',
      'One-click Swap Texts button to reverse Original and Modified panels',
    ],
    limitations: [
      'Highlights differences at the line level rather than character-by-character within a single modified line.',
      'For inputs whose unmatched section exceeds 1,200,000 comparison cells, the tool automatically switches to a fast linear comparison fallback so your browser stays responsive.',
    ],
    faqs: [
      {
        question: 'What do the two line-number columns mean?',
        answer:
          'The first column shows the line number from the Original text, and the second column shows the line number from the Modified text.',
      },
      {
        question: 'When should I check "Ignore whitespace"?',
        answer:
          'Use it when two drafts have identical wording but one was copied with extra indentation or trailing spaces.',
      },
      {
        question: 'Why does changing one word mark the whole line as removed and added?',
        answer:
          'Because this tool performs line-level diffing, any line whose text changed appears as a removed old line paired with an added new line.',
      },
    ],
  },
  'line-counter': {
    introduction:
      'The Line Counter reports total lines, populated (non-empty) lines, blank lines, longest line character length, and average words per line, with an optional numbered preview for inspecting lists or structured text.',
    howItWorks:
      'Text is split at standard LF (\\n) and CRLF (\\r\\n) newline boundaries. Lines containing only whitespace are classified as blank lines, while lines with at least one visible character count toward non-empty lines and average words per line.',
    examples: [
      {
        label: 'Structured List Check',
        input: 'Item A\\n\\nItem B\\nItem C',
        output: '4 total lines · 3 non-empty · 1 blank · longest line 6 ch',
      },
      {
        label: 'Multi-Line Paragraph Stats',
        input: 'Three sentences placed on separate lines',
        output: 'Exact line-by-line numbering from 1 to 3 in the preview pane',
      },
    ],
    features: [
      'Five instant metrics: Total Lines, Non-Empty, Blank Lines, Longest Line, and Avg Words/Line',
      'Toggleable numbered line preview clearly labeling "(blank line)" rows',
      'Copy Counts button for quick summary sharing',
      'Handles both Windows (CRLF) and Unix (LF) line endings',
    ],
    limitations: [
      'A trailing newline at the very end of pasted text adds one blank line to the total count.',
      'Soft visual wrapping inside the textarea does not count as extra lines—only true newline characters count.',
      'To keep rendering fast, the optional numbered preview displays up to the first 500 lines while summary statistics cover the entire text.',
    ],
    faqs: [
      {
        question: 'Does word-wrapping inside the text box create extra lines?',
        answer:
          'No. Only actual line breaks (Enter/Return or newline characters) increment the line count.',
      },
      {
        question: 'How are blank lines handled in "Avg Words / Line"?',
        answer:
          'Blank lines are excluded from the average words calculation so empty spacing does not skew the density of populated lines.',
      },
      {
        question: 'Can I view line numbers for lists longer than 500 lines?',
        answer:
          'The summary counters always measure all pasted lines accurately, while the in-browser numbered preview caps visual rows at 500 to prevent scrolling lag.',
      },
    ],
  },
  'word-frequency-counter': {
    introduction:
      'The Word Frequency Counter ranks every word in a passage by how often it appears and what percentage of the counted words it represents. Writers use it to spot overused phrases, and editors use it to check term balance.',
    howItWorks:
      'Words are extracted using Unicode alphanumeric matching ([\\p{L}\\p{N}\']+) converted to lowercase. When enabled, common English stop words ("the", "and", "is", etc.) and words shorter than your minimum length threshold are excluded before aggregating counts and percentage shares.',
    examples: [
      {
        label: 'Repeated Phrase Check',
        input: 'Simple tools help teams do simple everyday work cleanly.',
        output: '"simple": 2 (25.0%), remaining unique content words: 1 each (12.5%)',
      },
      {
        label: 'Minimum Length Filtering',
        input: 'Setting min length to 4+ chars',
        output: 'Filters out short 1–3 letter words like "to", "in", or "for" automatically',
      },
    ],
    features: [
      'Sortable ranking by occurrence count (highest first, then alphabetical)',
      'Toggle to exclude common English stop words',
      'Minimum word length selector (1+ to 4+ characters)',
      'One-click CSV export (Word, Count, Share %)',
    ],
    limitations: [
      'Built-in stop-word filtering covers common English function words; non-English stop words are not automatically filtered.',
      'Display table renders the top 60 words for fast browsing, while the exported CSV includes all counted words.',
    ],
    faqs: [
      {
        question: 'Are uppercase and lowercase versions of a word combined?',
        answer:
          'Yes. All words are normalized to lowercase so "Tools" and "tools" count together.',
      },
      {
        question: 'What does the CSV export contain?',
        answer:
          'It downloads word-frequency.csv with columns for Word, Count, and Share (%) across every matching word.',
      },
      {
        question: 'How are contractions like "don’t" handled?',
        answer:
          'Internal apostrophes are preserved as part of the word, while stray leading or trailing apostrophes around quoted words are trimmed cleanly.',
      },
    ],
  },
  'slug-generator': {
    introduction:
      'The URL Slug Generator converts article headlines, product titles, and page names into clean, lowercase, URL-safe slugs ready for blogs, e-commerce catalogs, or static site folders.',
    howItWorks:
      'Input text first goes through Unicode NFD normalization to strip diacritics and accents (for example, "café" becomes "cafe"), removes apostrophes, splits non-alphanumeric gaps into words, optionally strips common stop words, joins tokens with hyphens or underscores, and trims cleanly to your maximum length.',
    examples: [
      {
        label: 'Blog Post Title',
        input: 'How to Build Clean, Readable Website URLs in 2026!',
        output: 'how-to-build-clean-readable-website-urls-in-2026',
      },
      {
        label: 'With Stop Words Removed',
        input: 'Tips on the Best Tools for Writers',
        output: 'tips-best-tools-writers',
      },
    ],
    features: [
      'Choice of hyphen (-) or underscore (_) word separators',
      'Accented character normalization (NFD folding) and punctuation cleanup',
      'Optional stop-word removal and configurable max length limit',
      'Live full URL preview before copying',
    ],
    limitations: [
      'Non-Latin scripts without ASCII equivalents (such as Arabic, Cyrillic, or CJK characters) are stripped during ASCII slug normalization.',
      'Truncating by max length stops at an exact character count and may cut the final word short.',
    ],
    faqs: [
      {
        question: 'Should I use hyphens or underscores in website URLs?',
        answer:
          'Hyphens are generally preferred for public web URLs because search engines treat hyphens as word separators.',
      },
      {
        question: 'Does the Slug Generator check if a URL already exists on my site?',
        answer:
          'No. It formats the slug string locally; you should confirm uniqueness within your CMS or file structure.',
      },
      {
        question: 'How are accented letters like "café" or "résumé" handled?',
        answer:
          'Unicode NFD normalization automatically strips accent marks and folds characters cleanly to "cafe" and "resume".',
      },
    ],
  },
  'url-encoder-decoder': {
    introduction:
      'The URL Encoder/Decoder safely percent-encodes text for query strings and links, or decodes messy percent-encoded URLs back into readable text while breaking out any query parameters into a structured table.',
    howItWorks:
      'Component mode uses standard JavaScript encodeURIComponent and decodeURIComponent, encoding reserved URL symbols such as spaces (%20), ampersands (%26), slashes (%2F), and question marks (%3F). Full URI mode uses encodeURI and decodeURI to preserve structural URL characters while encoding spaces and unsafe characters. Query strings are parsed via URLSearchParams.',
    examples: [
      {
        label: 'Encode a Query Parameter',
        input: 'word counter & text cleaner',
        output: 'word%20counter%20%26%20text%20cleaner (Component mode)',
      },
      {
        label: 'Decode & Parse Link',
        input: 'https://toolorahub.site/tools/?q=word%20counter&category=text-writing',
        output: 'Decoded URL + table showing q = "word counter" and category = "text-writing"',
      },
    ],
    features: [
      'Switch cleanly between Encode URL and Decode URL modes',
      'Component vs. Full URI handling selector',
      'Automatic Detected Query String Parameters table',
      'Swap & Flip Mode button for round-trip verification',
    ],
    limitations: [
      'Malformed percent sequences (such as a lone "%" not followed by two hex digits) trigger a clear decoding error rather than guessing.',
      'Query parameter parsing uses standard URLSearchParams, which treats "+" inside query values as a space.',
    ],
    faqs: [
      {
        question: 'When should I choose Component mode instead of Full URI mode?',
        answer:
          'Use Component mode when encoding a value that goes inside a query parameter (like ?url=...), and Full URI mode when encoding an entire web address that already contains https:// and slashes.',
      },
      {
        question: 'Why do I see an invalid sequence error when decoding?',
        answer:
          'Decode errors appear if the input has an incomplete percent code (for example %2 or %ZZ) or invalid UTF-8 byte sequence.',
      },
      {
        question: 'Which characters stay unencoded in Full URI mode?',
        answer:
          'Full URI mode preserves structural delimiters such as :, /, ?, &, =, and #, so full links remain valid and clickable.',
      },
    ],
  },
  'html-entity-converter': {
    introduction:
      'The HTML Entity Converter escapes reserved HTML characters (<, >, &, quotes) and common symbols into HTML entities—or decodes entity-heavy HTML snippets back into plain readable text.',
    howItWorks:
      'Encoding maps HTML reserved characters and common symbols (copyright, trademark, currencies, dashes, and optional non-breaking spaces) directly to standard named or numeric entities. Decoding uses the browser’s native HTML parser via a detached textarea element to decode both named (&amp;, &mdash;) and numeric (&#39;, &#x20AC;) entities safely without executing scripts.',
    examples: [
      {
        label: 'Escape Code Snippet for Documentation',
        input: '<div class="card">Tools & Utilities © 2026</div>',
        output: '&lt;div class=&quot;card&quot;&gt;Tools &amp; Utilities &copy; 2026&lt;/div&gt;',
      },
      {
        label: 'Decode HTML Entities',
        input: '5 &lt; 10 &amp; 10 &gt; 5',
        output: '5 < 10 & 10 > 5',
      },
    ],
    features: [
      'Two-way Encode to Entities and Decode to Text modes',
      'Optional space-to-&nbsp; conversion toggle during encoding',
      'Decodes named, decimal (&#123;), and hexadecimal (&#x1F;) entities',
      'Live conversion preview with one-click Copy Output',
    ],
    limitations: [
      'Encoding targets standard HTML reserved characters and common punctuation/currency symbols; obscure extended Unicode characters remain as literal UTF-8.',
      'Decoded output is shown as plain text inside a readonly textarea and never rendered as live HTML.',
    ],
    faqs: [
      {
        question: 'Why do I need to escape < and > before putting code on a web page?',
        answer:
          'Browsers interpret literal < and > characters as HTML tags. Converting them to &lt; and &gt; displays the characters visibly as text.',
      },
      {
        question: 'Is decoding untrusted HTML strings safe here?',
        answer:
          'Yes. Decoding uses a detached textarea value without inserting markup into the active page DOM, so scripts cannot run.',
      },
      {
        question: 'When should I enable "Encode spaces as &nbsp;"?',
        answer:
          'Use non-breaking spaces when you want HTML formatting to preserve intentional indentation or prevent two adjacent words from wrapping onto separate lines.',
      },
    ],
  },
  'qr-code-generator': {
    introduction:
      'The QR Code Generator creates crisp, scannable QR codes locally in your browser for website links, contact notes, Wi-Fi instructions, or short text—with customizable size, colors, error correction, and both PNG and SVG downloads.',
    howItWorks:
      'Using the QRCode generator library directly inside your browser, your text is encoded into binary QR modules with Reed-Solomon error-correction parity blocks (L 7%, M 15%, Q 25%, or H 30%). The tool renders both a raster PNG data URL and a scalable vector SVG markup simultaneously.',
    examples: [
      {
        label: 'Website Link for Print Flyers',
        input: 'https://toolorahub.site/',
        output: 'High-contrast #12345A on #FFFFFF QR code downloadable as scalable SVG',
      },
      {
        label: 'High Error Correction Badge',
        input: 'Event check-in link with Level H (30%)',
        output: 'Denser QR pattern that remains scannable even with minor surface wear',
      },
    ],
    features: [
      'Generates both raster PNG (160–512 px) and crisp vector SVG downloads',
      'Customizable foreground and background hex colors',
      'Selectable error correction levels (L, M, Q, H)',
      'Real-time preview updates as you type or adjust colors',
    ],
    limitations: [
      'Creates static QR codes directly containing your text or URL—it does not provide scan analytics or editable short-link redirects.',
      'Low-contrast color pairs (such as light teal on white) may fail to scan on phone cameras; keep the foreground significantly darker than the background.',
    ],
    faqs: [
      {
        question: 'Should I download PNG or SVG for printed materials?',
        answer:
          'Download SVG for posters, brochures, or business cards because vector paths scale cleanly to any print resolution without blur. PNG works well for slides and documents.',
      },
      {
        question: 'Do TooloraHub QR codes expire?',
        answer:
          'No. Static QR codes encode the URL or text directly inside the pattern, so they work as long as your destination link remains active.',
      },
      {
        question: 'Which error correction level should I choose?',
        answer:
          'Medium (15%) works well for clean screens and printouts. Choose Quartile (25%) or High (30%) if the printed label might get scratched or folded.',
      },
    ],
  },
  'percentage-calculator': {
    introduction:
      'The Percentage Calculator combines the three most common everyday percentage calculations on one screen: finding X% of a number, finding what percentage X is of Y, and calculating percentage increase or decrease between two values.',
    howItWorks:
      'Mode 1 computes (X / 100) × Y. Mode 2 computes (X / Y) × 100 (requiring a non-zero Y). Mode 3 computes ((To - From) / |From|) × 100, displaying a positive "+" sign for growth and a negative "-" sign for reductions.',
    examples: [
      {
        label: 'Calculate a 15% Tip or Share',
        input: 'What is 15% of 240?',
        output: '36',
      },
      {
        label: 'Measure Growth Between Quarters',
        input: 'From 120 to 150',
        output: '+25%',
      },
    ],
    features: [
      'All three percentage modes accessible simultaneously without switching tabs',
      'Handles positive, negative, and decimal inputs',
      'Individual Copy button next to each calculated result',
      'Clean rounding up to 4 decimal places without trailing zeros',
    ],
    limitations: [
      'Division by zero when Y = 0 (Mode 2) or From = 0 (Mode 3) displays a dash ("—") because percentage ratio from zero is undefined.',
      'For sequential retail discounts plus sales tax, use the dedicated Discount Calculator.',
    ],
    faqs: [
      {
        question: 'What is the difference between percentage change and percentage points?',
        answer:
          'Moving from 10% to 15% is a +5 percentage point difference, which Mode 3 reports as a +50% relative increase.',
      },
      {
        question: 'How many decimal places are shown?',
        answer:
          'Whole numbers display without decimals, while fractional answers round cleanly to up to 4 decimal places.',
      },
      {
        question: 'Can I calculate decimal or negative percentages?',
        answer:
          'Yes. All three percentage modes support decimals and negative inputs, and clearing a field resets the output to "—" instead of treating empty text as zero.',
      },
    ],
  },
  'discount-calculator': {
    introduction:
      'The Discount Calculator works out your discounted subtotal, exact amount saved, optional sales tax, and final out-of-pocket price across multiple currency symbols.',
    howItWorks:
      'Savings are calculated as Original Price × (Discount % / 100). That savings amount is subtracted from the Original Price to obtain the discounted subtotal. If a sales tax percentage is entered, tax is computed on the discounted subtotal and added to produce the Final Price.',
    examples: [
      {
        label: '25% Store Markdown',
        input: 'Original $120.00, Discount 25%, Tax 0%',
        output: 'Final Price: $90.00 · You Save: $30.00',
      },
      {
        label: 'Discount Plus 8% Sales Tax',
        input: 'Original $100.00, Discount 20%, Tax 8%',
        output: 'After Discount: $80.00 · Tax: $6.40 · Final Price: $86.40',
      },
    ],
    features: [
      'Displays Final Price, You Save, After Discount subtotal, and Tax Amount',
      'Supports USD ($), EUR (€), GBP (£), PKR, and INR (₹) display symbols',
      'Validates out-of-range discounts (>100%) and negative inputs with clear inline notices',
      'One-click Copy Breakdown and Reset to Default actions',
    ],
    limitations: [
      'Calculates a single percentage discount rather than stacked coupon codes (apply stacked percentages sequentially).',
      'Applies sales tax to the post-discount price, which matches most regions, though a few jurisdictions tax pre-coupon list price.',
    ],
    faqs: [
      {
        question: 'Is sales tax applied before or after the discount?',
        answer:
          'This calculator applies sales tax to the discounted price (Original Price minus Discount), which is the standard practice for store markdowns.',
      },
      {
        question: 'How do I calculate two stacked discounts, like 20% off plus an extra 10%?',
        answer:
          'First find the price after 20% off, then enter that new subtotal as the Original Price with a 10% discount.',
      },
      {
        question: 'Does selecting EUR, GBP, PKR, or INR convert currency exchange rates?',
        answer:
          'No. Switching currencies changes the display prefix symbol for your entered numbers without fetching live foreign-exchange rates.',
      },
    ],
  },
  'age-calculator': {
    introduction:
      'The Age Calculator computes exact chronological age in years, months, and days from any date of birth to today or a custom future/past reference date, along with total months, weeks, days lived, birth weekday, and a next-birthday countdown.',
    howItWorks:
      'Calendar age is calculated using normalized UTC calendar dates rather than local millisecond offsets or approximate 365.25-day averages. When the target day is earlier in the month than the birth day, it borrows the exact number of days from the preceding calendar month (28, 29, 30, or 31 days depending on leap years).',
    examples: [
      {
        label: 'Standard Age Check',
        input: 'Born 1998-06-15, Age at 2026-11-21',
        output: '28 years, 5 months, 6 days · Born on a Monday',
      },
      {
        label: 'Upcoming Birthday Countdown',
        input: 'Reference date two weeks before birth anniversary',
        output: 'Shows exact days remaining until the next birthday',
      },
    ],
    features: [
      'Accurate UTC calendar-aware Years, Months, and Days breakdown',
      'Custom "Age at Date" selector to check age on past or future milestones',
      'Total Months, Total Weeks, Total Days, and Next Birthday countdown tiles',
      'Identifies the exact day of the week you were born',
    ],
    limitations: [
      'Uses pure calendar dates without birth-hour timezone offsets.',
      'For February 29 leap-year birthdays in non-leap years, calendar arithmetic observes the birthday celebration date on March 1.',
    ],
    faqs: [
      {
        question: 'Why does the Age Calculator show months and days instead of just dividing by 365?',
        answer:
          'Months vary between 28 and 31 days and leap years have 366 days, so calendar-aware month borrowing gives an exact anniversary match.',
      },
      {
        question: 'Can I calculate how old someone will be on a future date?',
        answer:
          'Yes. Change the "Age at Date" input to any future calendar date to see the exact projected age.',
      },
      {
        question: 'Does Daylight Saving Time cause off-by-one errors in total days?',
        answer:
          'No. Day differences are computed in normalized UTC dates so 23-hour and 25-hour Daylight Saving transition days never skew the day count.',
      },
    ],
  },
  'date-difference-calculator': {
    introduction:
      'The Date Difference Calculator measures the exact duration between two calendar dates in total days, weeks, calendar years/months/days, weekdays (Monday–Friday), and weekend days.',
    howItWorks:
      'Total elapsed days are computed from normalized UTC calendar dates (automatically handling reversed date order). Weekdays and weekend days are calculated in constant O(1) time from whole weeks plus remainder day offsets across any century, including leap years and inclusive end-date calendar rollover.',
    examples: [
      {
        label: 'Full Year 2026 Span',
        input: 'Start 2026-01-01 to End 2026-12-31 (Include end date checked)',
        output: '365 total days (1y 0m 0d) · 52 weeks, 1 day · 261 weekdays · 104 weekend days',
      },
      {
        label: 'Two-Week Sprint Window',
        input: 'Monday to Friday two weeks later (inclusive)',
        output: '12 days · 10 weekdays · 2 weekend days',
      },
    ],
    features: [
      'Reports Total Days, Calendar Span (y/m/d), Weekdays, Weekend Days, and Total Hours',
      'Optional "Include end date (+1 day)" toggle for inclusive scheduling',
      'Instant constant-time weekday calculation across even multi-century date ranges',
      'Works regardless of whether Start Date is earlier or later than End Date',
    ],
    limitations: [
      'Weekdays strictly count Monday through Friday and do not subtract regional or national public holidays.',
      'Very wide historical ranges before 1582 use proleptic Gregorian calendar arithmetic.',
    ],
    faqs: [
      {
        question: 'When should I enable "Include end date (+1 day)"?',
        answer:
          'Check this box for hotel stays, event durations, or work schedules where both the start day and end day count as active days.',
      },
      {
        question: 'Does it matter if I enter the later date first?',
        answer:
          'No. The calculator automatically measures the absolute span between the two dates.',
      },
      {
        question: 'Why does January 1 to December 31 with "Include end date" show 1y 0m 0d?',
        answer:
          'Including the end day covers the full final day through the end of December 31, completing one full calendar year.',
      },
    ],
  },
  'unit-converter': {
    introduction:
      'The Unit Converter translates values between metric, US customary, and imperial units across eight everyday categories: Length, Weight/Mass, Temperature, Area, Volume, Speed, Data Storage, and Time.',
    howItWorks:
      'Linear categories convert the input value into a common SI/base unit using exact standard conversion factors (for instance, 1 inch = 0.0254 m and 1 lb = 0.45359237 kg) and then divide by the target unit’s factor. Temperature applies exact affine formulas between Celsius, Fahrenheit, and Kelvin.',
    examples: [
      {
        label: 'Running Distance',
        input: '10 km to miles',
        output: '6.213712 miles',
      },
      {
        label: 'Oven Temperature',
        input: '180 °C to Fahrenheit',
        output: '356 °F',
      },
    ],
    features: [
      'Eight categories: Length, Weight, Temperature, Area, Volume, Speed, Data Storage, and Time',
      'Instant live conversion as you type or switch units',
      'One-click Swap Units button to reverse direction',
      'Copy Result button for transferring converted numbers cleanly',
    ],
    limitations: [
      'Volume units (gallons, cups, fluid ounces) use US customary definitions rather than UK Imperial measures.',
      'Data Storage uses binary IEC multiples (1 KB = 1,024 bytes, 1 MB = 1,024 KB) rather than decimal SI storage marketing units (1,000).',
    ],
    faqs: [
      {
        question: 'Why does 1 GB equal 1,024 MB here instead of 1,000 MB?',
        answer:
          'Operating systems and memory measurements traditionally use binary powers of 1,024 (2^10), which is the convention used in our Data Storage tab.',
      },
      {
        question: 'How many decimal places are displayed?',
        answer:
          'Standard outputs round cleanly up to 6 decimal places without trailing zeros, while very small cross-scale results (such as milligrams to metric tons) preserve significant digits automatically.',
      },
      {
        question: 'What happens if I enter a temperature below absolute zero?',
        answer:
          'The Unit Converter still displays the mathematical value but highlights a notice whenever the input drops below -273.15 °C (0 K).',
      },
    ],
  },
  'time-calculator': {
    introduction:
      'The Time Calculator offers two modes: adding or subtracting durations (hours, minutes, seconds) and calculating elapsed time between a start clock time and an end clock time (with overnight shift support).',
    howItWorks:
      'In Duration Math mode, both inputs are converted to total seconds (hours × 3600 + minutes × 60 + seconds), added or subtracted, and normalized back into HH:MM:SS, decimal hours, total minutes, and total seconds. Clock Time mode converts HH:MM inputs to minutes since midnight and adds 24 hours automatically if overnight is checked or if the end time is earlier than the start time.',
    examples: [
      {
        label: 'Add Two Work Sessions',
        input: '02:45:30 + 01:35:45',
        output: '04:21:15 · 4.35 decimal hours · 261.3 minutes',
      },
      {
        label: 'Shift Duration Check',
        input: '09:15 to 17:45',
        output: '8 hours, 30 minutes · 8.50 decimal hours',
      },
    ],
    features: [
      'Two dedicated tabs: Add/Subtract Durations and Time Between Clock Times',
      'Outputs normalized HH:MM:SS alongside decimal hours for timesheets',
      'Supports negative duration differences when subtracting a larger duration',
      'Overnight shift indicator showing Same calendar day vs. Crosses midnight (next day)',
    ],
    limitations: [
      'Clock Time mode measures a single 24-hour cycle (up to 24 hours); for multi-day durations, use the Date Difference Calculator.',
      'Decimal hours are rounded to 2 decimal places (for example, 20 minutes = 0.33 hours).',
    ],
    faqs: [
      {
        question: 'Why are decimal hours useful alongside HH:MM:SS?',
        answer:
          'Billing sheets and payroll systems typically multiply hourly rates by decimal hours (such as 8.50 hrs rather than 8:30).',
      },
      {
        question: 'What happens if I subtract a larger time from a smaller time?',
        answer:
          'The calculator prefixes the result with a minus sign (e.g., -00:45:00) so you can see the exact deficit.',
      },
      {
        question: 'Does Clock Time mode support overnight work shifts?',
        answer:
          'Yes. If the end clock time is earlier than the start time or you check "End time is on the next day", the elapsed time rolls smoothly across midnight.',
      },
    ],
  },
  'lorem-ipsum-generator': {
    introduction:
      'The Lorem Ipsum Generator produces clean placeholder paragraphs, sentences, or individual words for page mockups, typography tests, and layout wireframes—either as plain text or wrapped in HTML <p> tags.',
    howItWorks:
      'Using a curated classic Latin word bank, the generator assembles structured sentences (11–17 words with capitalized openings and periods) and four-sentence paragraphs. You can choose between 1 and 50 units, optionally begin with the classic "Lorem ipsum dolor sit amet..." opening, and download the result as a .txt file.',
    examples: [
      {
        label: 'HTML Wireframe Copy',
        input: '2 paragraphs, "Wrap with <p> tags" enabled',
        output: '<p>Lorem ipsum...</p>\\n\\n<p>Second paragraph...</p>',
      },
      {
        label: 'Short Card Headline Test',
        input: '8 words, plain text',
        output: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
      },
    ],
    features: [
      'Generate 1 to 50 paragraphs, sentences, or words',
      'Optional classic "Lorem ipsum dolor sit amet..." first sentence toggle',
      'Plain text or HTML <p> tag wrapping',
      'Copy Placeholder Text and Download .txt actions',
    ],
    limitations: [
      'Produces neutral Latin filler words rather than realistic English domain copy; replace placeholder copy before publishing live sites.',
      'Quantity is capped at 50 blocks per generation to keep browser rendering instant.',
    ],
    faqs: [
      {
        question: 'When should I use HTML <p> wrapping?',
        answer:
          'Enable <p> tags when pasting placeholder blocks directly into an HTML template or code editor.',
      },
      {
        question: 'Why use Lorem Ipsum instead of repeating one sentence?',
        answer:
          'Varied word lengths mimic natural paragraph wrapping and prevent artificial visual patterns while reviewing layouts.',
      },
      {
        question: 'Is the generated placeholder copy free to use in client mockups?',
        answer:
          'Yes. Classic Latin placeholder text is free to use inside design wireframes, typography previews, and staging templates.',
      },
    ],
  },
  'reading-time-calculator': {
    introduction:
      'The Reading Time Calculator estimates how long an article, newsletter, or script will take to read silently or deliver aloud, with adjustable Words Per Minute (WPM) presets and custom speed input.',
    howItWorks:
      'The calculator counts whitespace-delimited words in your draft and divides by your selected reading pace (Slow 150 WPM, Average 200 WPM, Fast 260 WPM, or any custom speed from 60 to 600 WPM). Speaking time is calculated separately at a conversational 130 WPM presentation pace.',
    examples: [
      {
        label: 'Blog Article Estimate',
        input: '1,000-word tutorial at Average (200 WPM)',
        output: 'Reading Time: 5 min 0 sec · Display Badge: "5 min read" · Speaking Time: 7 min 42 sec',
      },
      {
        label: 'Technical Documentation Pace',
        input: '600 words at Slow (150 WPM)',
        output: 'Reading Time: 4 min 0 sec',
      },
    ],
    features: [
      'Three quick WPM presets (150, 200, 260 WPM) plus custom WPM field',
      'Shows exact minutes/seconds, rounded "X min read" label, and 130 WPM speaking time',
      'Live Total Words counter as you edit your draft',
      'One-click Copy Estimate summary button',
    ],
    limitations: [
      'Estimates reflect word count only; embedded code snippets, tables, or diagrams in a finished page add extra visual study time.',
      'Speaking time assumes steady pacing without long pauses for Q&A or slide transitions.',
    ],
    faqs: [
      {
        question: 'Which WPM setting is standard for blog "min read" labels?',
        answer:
          '200 WPM is the most widely used baseline for general web articles, while 150 WPM works well for dense technical documentation.',
      },
      {
        question: 'How is the Display Badge rounded?',
        answer:
          'Any non-empty text rounds to at least "1 min read" and otherwise rounds to the nearest whole minute.',
      },
      {
        question: 'How is speaking time calculated separately from reading time?',
        answer:
          'Presentation speaking time uses a steady conversational pace of 130 words per minute regardless of your silent reading WPM slider.',
      },
    ],
  },
  'text-reverser': {
    introduction:
      'The Text Reverser flips text in four distinct ways: reversing every character, reversing the order of words, reversing letters inside each individual word while keeping word positions intact, or reversing the order of lines.',
    howItWorks:
      'Character reversal uses Array.from(input) before reversing so surrogate-pair Unicode characters and emojis stay intact instead of splitting mid-character. Word-order and line-order modes split on whitespace or newline boundaries, while per-word flipping applies reversal inside each non-whitespace token.',
    examples: [
      {
        label: 'Reverse Word Order',
        input: 'Simple tools save time',
        output: 'time save tools Simple',
      },
      {
        label: 'Flip Each Word',
        input: 'Simple tools',
        output: 'elpmiS sloot',
      },
    ],
    features: [
      'Four reversal modes: Reverse All Characters, Reverse Word Order, Flip Each Word, and Reverse Line Order',
      'Unicode-safe character splitting via Array.from',
      'Use Output as Input button to chain or undo reversals',
      'Copy Reversed Text and Clear actions',
    ],
    limitations: [
      'In "Reverse Word Order" mode, multiple spaces between words are collapsed into single spaces.',
      'Complex multi-codepoint emojis combined with zero-width joiners may still reorder their internal components.',
    ],
    faqs: [
      {
        question: 'What is the difference between "Reverse Word Order" and "Flip Each Word"?',
        answer:
          'Reverse Word Order puts the last word first without scrambling spelling, whereas Flip Each Word keeps the words in sequence while spelling each word backwards.',
      },
      {
        question: 'When is "Reverse Line Order" useful?',
        answer:
          'It quickly turns a chronologically ordered list (oldest at top) into reverse-chronological order (newest at top).',
      },
      {
        question: 'Can I undo or reverse the text back again?',
        answer:
          'Yes. Click "Use Output as Input" to swap the output back into the top box and reverse it again immediately.',
      },
    ],
  },
  'gradient-generator': {
    introduction:
      'The CSS Gradient Generator lets you build custom linear or radial CSS gradients with up to five color stops, live angle adjustment, curated presets, clean CSS rule copying, and high-resolution PNG image export.',
    howItWorks:
      'Color stops are sorted by percentage position (0–100%) and compiled into standard CSS linear-gradient(<angle>deg, ...) or radial-gradient(circle, ...) syntax. Clicking Download PNG paints the exact mathematical gradient vector onto a 1200 × 800 HTML5 canvas and exports a lossless PNG file.',
    examples: [
      {
        label: 'TooloraHub Brand Linear Gradient',
        input: 'Linear 135°, #12345A at 0%, #16C6C9 at 100%',
        output: 'background: linear-gradient(135deg, #12345A 0%, #16C6C9 100%);',
      },
      {
        label: 'Three-Stop Radial Glow',
        input: 'Radial mode with three color stops',
        output: 'background: radial-gradient(circle, #color1 0%, #color2 50%, #color3 100%);',
      },
    ],
    features: [
      'Linear (0°–360° angle slider) and Radial gradient modes',
      '2 to 5 customizable color stops with hex pickers and position sliders',
      'Built-in presets for instant starting palettes',
      'Copy clean CSS background declaration or Download 1200 × 800 PNG',
    ],
    limitations: [
      'Radial gradients use a centered circle shape rather than custom elliptical focal offsets.',
      'Exported PNG files use a fixed 1200 × 800 (3:2) canvas dimension.',
    ],
    faqs: [
      {
        question: 'Can I paste the generated CSS directly into Tailwind or regular CSS?',
        answer:
          'Yes. Copy the CSS rule into any stylesheet class, or paste the linear-gradient(...) value inside a style attribute or Tailwind arbitrary value.',
      },
      {
        question: 'How many color stops can I add?',
        answer:
          'You can configure between 2 and 5 color stops, and drag each stop’s slider independently from 0% to 100%.',
      },
      {
        question: 'What resolution does "Download PNG" export?',
        answer:
          'Every exported PNG swatch renders at 1200 × 800 pixels with smooth color interpolation matching your live CSS preview.',
      },
    ],
  },
  'line-break-formatter': {
    introduction:
      'The Line Break Formatter cleans up awkward line wraps pasted from PDFs or emails, expands tight paragraphs into double-spaced text, inserts breaks after sentences, or wraps long prose to a fixed character column width.',
    howItWorks:
      'Depending on the selected formatting mode, the utility normalizes CRLF endings to LF, collapses single line breaks inside paragraphs while preserving blank-line paragraph gaps, adds newline breaks after terminal punctuation (. ! ?), or performs greedy word wrapping at your chosen column width (40–120 characters).',
    examples: [
      {
        label: 'Unwrap Broken PDF Lines',
        input: 'This sentence was\\nsplit across two lines.',
        output: 'This sentence was split across two lines.',
      },
      {
        label: 'One Sentence Per Line',
        input: 'First idea. Second idea! Third idea?',
        output: 'First idea.\\nSecond idea!\\nThird idea?',
      },
    ],
    features: [
      'Five formatting modes: Join Single Breaks (keep paragraphs), Join All Breaks, Paragraph Spacing, One Sentence Per Line, and Fixed-Width Word Wrap',
      'Adjustable character wrap width slider/input (40–120 characters)',
      'Live input and output line counts for comparison',
      'One-click Copy Output and Download .txt export',
    ],
    limitations: [
      'Fixed-width word wrapping breaks on word spaces; single tokens longer than the column width stay intact on their own line.',
      'Sentence-per-line mode treats standard periods followed by whitespace as sentence ends, which may split after abbreviations like "e.g.".',
    ],
    faqs: [
      {
        question: 'What is the difference between "Join Single Breaks" and "Join All Breaks"?',
        answer:
          'Join Single Breaks merges accidental mid-sentence wraps while preserving blank lines between separate paragraphs, whereas Join All Breaks flattens the entire selection into one continuous line.',
      },
      {
        question: 'Who uses fixed-width wrapping?',
        answer:
          'Plain-text newsletter writers, developers writing README notes, and email editors often wrap prose at 72 or 80 characters for readability.',
      },
      {
        question: 'Does it modify my original text on the left?',
        answer:
          'No. The formatted result updates live in the preview box on the right so you can compare modes safely.',
      },
    ],
  },
  'list-sorter-randomizer': {
    introduction:
      'The List Sorter & Randomizer organizes line-separated items alphabetically (A–Z or Z–A), numerically, or by character length, shuffles lists into an unbiased random order, removes empty rows, and optionally adds numbering or bullet prefixes.',
    howItWorks:
      'Lines are split cleanly, optionally trimmed and filtered to remove blank entries, and transformed using locale-aware comparison (`localeCompare` with numeric collation), length sorting, or a Fisher-Yates unbiased shuffle seeded by `crypto.getRandomValues` when available.',
    examples: [
      {
        label: 'Numeric Ascending Sort',
        input: '100\\n25\\n5\\n40',
        output: '5\\n25\\n40\\n100',
      },
      {
        label: 'Numbered Alphabetical List',
        input: 'Oranges\\nApples\\nBananas',
        output: '1. Apples\\n2. Bananas\\n3. Oranges',
      },
    ],
    features: [
      'Six ordering modes: A–Z, Z–A, Numeric Low–High, Numeric High–Low, Shortest–Longest, and Random Shuffle',
      'Optional case-insensitive sorting, whitespace trimming, and blank-line removal',
      'Format output as plain lines, numbered list (1. 2. 3.), or Markdown bullets (- )',
      'Copy Output and Download .txt actions',
    ],
    limitations: [
      'Numeric sort parses leading numeric values (`Number()` / float); non-numeric text lines fall back below sorted numbers.',
      'Randomize Shuffle changes the output order each time you click Shuffle Again.',
    ],
    faqs: [
      {
        question: 'Why does Numeric sort differ from A–Z sort?',
        answer:
          'Standard alphabetical sorting puts "10" before "2" because "1" precedes "2". Numeric sort compares true number values so 2 comes before 10.',
      },
      {
        question: 'Is the list shuffle unbiased?',
        answer:
          'Yes. It runs a modern Fisher-Yates shuffle across every element in the list rather than a biased comparison sort.',
      },
      {
        question: 'Can I add numbers to my list without changing its order?',
        answer:
          'Yes. Pick "Keep Original Order" and enable Numbered List formatting to add 1., 2., 3. prefixes directly.',
      },
    ],
  },
  'average-calculator': {
    introduction:
      'The Average Calculator parses any list of numbers separated by commas, spaces, or new lines and instantly computes the arithmetic mean, median, mode, sum, count, minimum, maximum, and range.',
    howItWorks:
      'Valid finite numbers are extracted from your input text and sorted ascending. Mean divides the sum by total count; median takes the middle value (or averages the two middle values for an even count); mode finds the most frequent number(s), reporting "None (all unique)" when every number appears once.',
    examples: [
      {
        label: 'Exam Scores Summary',
        input: '78, 85, 92, 85, 90',
        output: 'Mean: 86 · Median: 85 · Mode: 85 (2x) · Range: 14 (78 to 92)',
      },
      {
        label: 'Even-Count Dataset',
        input: '10 20 30 40',
        output: 'Mean: 25 · Median: 25 · Sum: 100 · Count: 4',
      },
    ],
    features: [
      'Accepts numbers separated by commas, spaces, tabs, semicolons, or newlines',
      'Displays Mean, Median, Mode, Sum, Count, Minimum, Maximum, and Range',
      'Shows sorted dataset preview and flags any ignored non-numeric tokens',
      'One-click Copy Summary button',
    ],
    limitations: [
      'Treats every extracted numeric token equally (unweighted arithmetic mean rather than weighted grading average).',
      'Non-numeric words or currency labels inside the input are ignored and reported cleanly.',
    ],
    faqs: [
      {
        question: 'When should I use Median instead of Mean?',
        answer:
          'Median is helpful when a dataset has extreme outliers—like a single very high home price or salary—that would pull the arithmetic mean upward.',
      },
      {
        question: 'What if two numbers tie for the highest frequency?',
        answer:
          'The calculator reports all tied mode values together (multimodal) along with how many times they appear.',
      },
      {
        question: 'Can I paste decimals and negative numbers?',
        answer:
          'Yes. Positive, negative, and decimal numbers are all supported seamlessly.',
      },
    ],
  },
  'ratio-calculator': {
    introduction:
      'The Ratio Calculator simplifies whole-number ratios to lowest terms using greatest common divisor math, solves missing values in A : B = C : D proportions, and helps resize screen or print dimensions proportionally.',
    howItWorks:
      'Ratio simplification converts decimal/integer inputs into lowest integer terms via Euclidean GCD reduction. Proportion mode solves whichever target variable you select using cross-multiplication (for example, D = (B × C) / A) and flags division-by-zero inputs safely.',
    examples: [
      {
        label: 'Reduce Screen Resolution Ratio',
        input: '1920 : 1080',
        output: 'Simplified Ratio: 16 : 9 (GCD = 120)',
      },
      {
        label: 'Scale Image Width to Height',
        input: '16 : 9 = 1280 : X',
        output: 'X = 720',
      },
    ],
    features: [
      'Mode 1: Simplify any A : B ratio to lowest terms plus decimal quotient',
      'Mode 2: Solve missing C or D in any A : B = C : D proportion',
      'Quick 16:9, 4:3, 1:1, and 3:2 aspect-ratio presets',
      'One-click Copy Result buttons',
    ],
    limitations: [
      'A ratio denominator of zero (e.g., 0 : 10 when solving against B, or A = 0 when solving D) is undefined and displays an inline notice.',
      'Greatest common divisor simplification applies cleanly to integers and finite decimals up to 4 decimal places.',
    ],
    faqs: [
      {
        question: 'How do I resize an image without stretching it?',
        answer:
          'Enter the original width and height as A and B, put your desired new width into C, and solve for D to get the exact matching height.',
      },
      {
        question: 'Can I enter decimal numbers in A or B?',
        answer:
          'Yes. Decimal ratios are scaled by powers of 10 before GCD reduction so 1.5 : 2 simplifies cleanly to 3 : 4.',
      },
      {
        question: 'What is the simplified ratio of 1920 × 1080?',
        answer:
          'Dividing both sides by 120 reduces 1920 : 1080 to the standard widescreen ratio of 16 : 9.',
      },
    ],
  },
  'fraction-percentage-converter': {
    introduction:
      'The Fraction & Percentage Converter translates effortlessly between simplified fractions, mixed numbers, decimals, and percentages—whether you start from a fraction like 3/8, a decimal like 0.375, or a percentage like 37.5%.',
    howItWorks:
      'Fractions divide numerator by denominator (`n / d`) and multiply by 100 for percent while reducing `n/d` by their greatest common divisor. Decimals and percentages convert into rational integers scaled by 10^k (with repeating-decimal tolerance limits rounded cleanly) and reduce to lowest terms plus mixed-number format.',
    examples: [
      {
        label: 'Fraction to Decimal & Percent',
        input: '3 / 8',
        output: 'Decimal: 0.375 · Percentage: 37.5% · Simplified: 3/8',
      },
      {
        label: 'Percentage to Fraction',
        input: '125%',
        output: 'Decimal: 1.25 · Simplified Fraction: 5/4 · Mixed Number: 1 1/4',
      },
    ],
    features: [
      'Three instant starting modes: From Fraction, From Decimal, From Percentage',
      'Automatic GCD simplification and mixed-number separation',
      'Prevents zero denominators with clear inline validation',
      'Shows step-by-step arithmetic conversion notes',
    ],
    limitations: [
      'Irrational or very long repeating decimals (like 0.3333333) are converted as exact finite fractions (e.g. 3333333/10000000) unless entered as 1/3.',
      'Denominator cannot be zero in Fraction mode.',
    ],
    faqs: [
      {
        question: 'How do I convert an improper fraction into a mixed number?',
        answer:
          'Enter a numerator larger than the denominator (such as 7/4)—the Mixed Number card automatically displays 1 3/4.',
      },
      {
        question: 'How do you convert a fraction to a percentage manually?',
        answer:
          'Divide the numerator by the denominator to get a decimal, then multiply by 100 (for instance, 3 ÷ 4 = 0.75 × 100 = 75%).',
      },
      {
        question: 'Are negative values supported?',
        answer:
          'Yes. Negative numerators, decimals, and percentages are preserved accurately across all output formats.',
      },
    ],
  },
  'bmi-calculator': {
    introduction:
      'The BMI Calculator computes adult Body Mass Index using either Metric (kilograms and centimeters) or US Imperial (pounds, feet, and inches) measurements and displays standard WHO weight-category ranges.',
    howItWorks:
      'Metric BMI uses weight (kg) divided by height squared (m²). US Imperial BMI converts feet and inches to total inches and computes `703 × weight (lbs) / height (in)²`. Standard adult categories classify <18.5 as Underweight, 18.5–24.9 as Normal Weight, 25.0–29.9 as Overweight, and ≥30.0 as Obesity, alongside the corresponding 18.5–24.9 healthy weight span for your height.',
    examples: [
      {
        label: 'Metric Adult Calculation',
        input: 'Weight 70 kg · Height 175 cm',
        output: 'BMI: 22.9 (Normal Weight) · Healthy range for 175 cm: 56.7 – 76.3 kg',
      },
      {
        label: 'US Imperial Calculation',
        input: 'Weight 160 lbs · Height 5 ft 9 in',
        output: 'BMI: 23.6 (Normal Weight)',
      },
    ],
    features: [
      'Switch seamlessly between Metric (cm, kg) and US Imperial (ft/in, lbs)',
      'Visual BMI scale bar showing standard adult category bands',
      'Calculates approximate healthy weight range (BMI 18.5–24.9) for your height',
      'Clear informational medical disclaimer and Copy Summary button',
    ],
    limitations: [
      'Standard adult BMI does not distinguish between muscle mass and body fat, nor adjust for age, sex, ethnicity, pregnancy, or athletic build.',
      'Provided strictly for general wellness reference—consult a qualified healthcare professional before making medical or dietary decisions.',
    ],
    faqs: [
      {
        question: 'Does the BMI formula differ between men and women?',
        answer:
          'The standard WHO adult BMI formula is identical for men and women, though individual body composition and health risk assessments depend on factors a doctor evaluates.',
      },
      {
        question: 'Why might an athlete show a high BMI?',
        answer:
          'Because muscle tissue is dense and BMI only considers total weight and height, muscular individuals may score in the overweight range despite low body fat.',
      },
      {
        question: 'Are children and teenagers evaluated on the same scale?',
        answer:
          'No. Children and teens under 20 require age-and-sex percentile growth charts rather than fixed adult BMI cutoffs.',
      },
    ],
  },
  'fuel-trip-cost-calculator': {
    introduction:
      'The Fuel & Trip Cost Calculator estimates how much fuel a road trip will require, the total fuel expense, the fuel cost per kilometer or mile, and how much each passenger pays when splitting costs.',
    howItWorks:
      'In Metric mode, fuel consumed equals `(Distance / 100) × L/100km`. In US Imperial mode, fuel consumed equals `Distance (miles) / MPG`. Fuel needed is multiplied by unit fuel price for Total Fuel Cost and divided evenly across the number of passengers.',
    examples: [
      {
        label: 'Metric Road Trip',
        input: '450 km · 7.5 L/100km · $1.65/L · 3 passengers',
        output: 'Fuel Needed: 33.75 L · Total Cost: $55.69 · $18.56 per person',
      },
      {
        label: 'US Highway Trip',
        input: '300 miles · 32 MPG · $3.60/gal · 2 passengers',
        output: 'Fuel Needed: 9.38 gal · Total Cost: $33.75 · $16.88 per person',
      },
    ],
    features: [
      'Metric (km, L/100km, price/L) and US Imperial (miles, MPG, price/gallon) unit modes',
      'Supports optional Round Trip (×2 distance) toggle',
      'Computes fuel volume needed, total fuel bill, cost per passenger, and cost per 100 km/miles',
      'Selectable display currency symbols and Copy Trip Summary',
    ],
    limitations: [
      'Assumes steady fuel consumption across the entire route; city traffic, hills, roof racks, and AC usage increase real-world fuel use.',
      'Does not include highway tolls, parking fees, or vehicle maintenance costs.',
    ],
    faqs: [
      {
        question: 'How do I plan a return journey quickly?',
        answer:
          'Enter your one-way distance and check the "Round trip (×2 distance)" option to double mileage and fuel cost automatically.',
      },
      {
        question: 'What if I know km per liter (km/L) instead of L/100km?',
        answer:
          'Divide 100 by your km/L figure (for example, 15 km/L equals 100 ÷ 15 = 6.67 L/100km).',
      },
      {
        question: 'Can we split fuel among friends?',
        answer:
          'Yes. Adjust the Passengers field to see the exact equal share per traveler.',
      },
    ],
  },
  'tip-calculator': {
    introduction:
      'The Tip Calculator works out restaurant or service gratuities, total bill amounts, and fair per-person splits across any group size, with quick preset buttons and optional whole-unit bill rounding.',
    howItWorks:
      'Tip Amount equals `Bill Amount × (Tip % / 100)`. Total Bill sums the pre-tip bill and tip. Dividing both Tip and Total Bill by Number of People gives exact per-person totals, with optional "Round per-person total up" convenience rounding.',
    examples: [
      {
        label: 'Dinner Split Among Friends',
        input: '$140.00 bill · 18% tip · 4 people',
        output: 'Tip: $25.20 · Total: $165.20 · $41.30 per person ($6.30 tip each)',
      },
      {
        label: 'Quick 15% Tip Check',
        input: '$64.00 bill · 15% tip · 1 person',
        output: 'Tip: $9.60 · Total: $73.60',
      },
    ],
    features: [
      'One-tap tip presets (10%, 15%, 18%, 20%, 25%) plus custom tip % input',
      'Bill splitter supporting 1 to 100 people',
      'Optional currency symbol selector (USD, EUR, GBP, PKR, INR)',
      'Optional round-up total toggle and Copy Split Summary',
    ],
    limitations: [
      'Calculates percentage on the bill figure you enter—whether pre-tax or post-tax depends on the subtotal you type in.',
      'Individual splits assume equal division across all guests.',
    ],
    faqs: [
      {
        question: 'Should I tip on the pre-tax subtotal or after-tax total?',
        answer:
          'Most etiquette guides suggest tipping on the pre-tax food and drink subtotal, though you can enter whichever total appears on your receipt.',
      },
      {
        question: 'Can I calculate a zero-tip even split?',
        answer:
          'Yes. Set Tip % to 0 and set People to your group count to divide a regular bill evenly.',
      },
      {
        question: 'Does changing the currency convert exchange rates?',
        answer:
          'No. Switching currencies changes only the displayed currency symbol.',
      },
    ],
  },
  'loan-emi-calculator': {
    introduction:
      'The Loan EMI Calculator estimates fixed monthly Equated Monthly Installment (EMI) payments, total interest charges, and total loan cost over the full repayment term using standard compound amortization math.',
    howItWorks:
      'Monthly rate `r = (Annual Rate / 100) / 12` over `n` months. When `r > 0`, `EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)`. For zero-interest installment plans (`r = 0`), `EMI = P / n`. A year-by-year amortization summary tracks principal reduction and remaining balance.',
    examples: [
      {
        label: 'Auto Loan Estimate',
        input: '$20,000 principal · 6.5% APR · 5 years (60 months)',
        output: 'Monthly EMI: $391.32 · Total Interest: $3,479.38 · Total Payable: $23,479.38',
      },
      {
        label: 'Short 0% Installment Plan',
        input: '$1,200 principal · 0% APR · 12 months',
        output: 'Monthly EMI: $100.00 · Total Interest: $0.00',
      },
    ],
    features: [
      'Supports loan tenure entered in Years or Months',
      'Instant breakdown of Monthly EMI, Total Interest, Total Payable, and Principal vs. Interest share bar',
      'Year-by-year payoff summary table',
      'Selectable currency display symbols and Copy Summary button',
    ],
    limitations: [
      'Estimates fixed-rate amortized principal-and-interest payments only; excludes origination fees, property taxes, mortgage insurance, or variable rate resets.',
      'Provided strictly for planning estimates—verify official figures with your lender before signing any agreement.',
    ],
    faqs: [
      {
        question: 'What does EMI stand for?',
        answer:
          'Equated Monthly Installment—the fixed monthly payment covering both interest and a portion of loan principal until the balance reaches zero.',
      },
      {
        question: 'Why does early loan repayment pay mostly interest?',
        answer:
          'Because monthly interest is charged on the remaining principal balance, early payments have a larger interest share that shrinks steadily as principal drops.',
      },
      {
        question: 'Does this support 0% interest financing?',
        answer:
          'Yes. Setting the annual interest rate to 0% divides the principal evenly across the total number of months.',
      },
    ],
  },
  'compound-interest-calculator': {
    introduction:
      'The Compound Interest Calculator projects savings or investment growth over time, comparing compound interest (annual, quarterly, or monthly compounding) with an equivalent simple interest baseline and optional monthly contributions.',
    howItWorks:
      'Starting principal compounds according to `P × (1 + r/n)^(n·t)`, while optional monthly deposits accrue month by month using standard future-value compounding aligned with your chosen compounding period. Simple interest baseline is shown alongside as `P + Contributions + Simple Interest on Principal`.',
    examples: [
      {
        label: 'Initial Deposit Without Monthly Additions',
        input: '$5,000 principal · 7% annual rate · 10 years · Monthly compounding',
        output: 'Future Balance: $10,048.31 · Total Interest: $5,048.31',
      },
      {
        label: 'Monthly Savings Plan',
        input: '$1,000 start + $200/mo · 6% APR · 5 years · Monthly',
        output: 'Total Principal & Deposits: $13,000.00 · Ending Balance: $15,302.85',
      },
    ],
    features: [
      'Supports initial principal plus optional recurring monthly contributions',
      'Compounding frequency choices: Annually, Quarterly, Monthly, or Daily (365/yr)',
      'Side-by-side comparison against Simple Interest baseline',
      'Year-by-year growth schedule table and Copy Summary button',
    ],
    limitations: [
      'Assumes constant nominal return rate and consistent contributions without taxes, account fees, or inflation adjustments.',
      'Educational projection only—not investment or financial advice.',
    ],
    faqs: [
      {
        question: 'How does compounding frequency change returns?',
        answer:
          'More frequent compounding (monthly vs. annually) adds earned interest back into the balance sooner so subsequent interest earns on a slightly larger base.',
      },
      {
        question: 'Can I calculate growth on a lump sum without monthly additions?',
        answer:
          'Yes. Leave Monthly Contribution at 0 to compute pure lump-sum compound interest.',
      },
      {
        question: 'What is shown in the Total Contributions column?',
        answer:
          'It sums your initial deposit plus every monthly contribution made, making it easy to separate money you added from earned compound interest.',
      },
    ],
  },
  'profit-margin-calculator': {
    introduction:
      'The Profit Margin Calculator computes gross profit, gross profit margin percentage, and markup percentage from item cost and selling price—or calculates the required selling price directly from your cost and target margin or markup.',
    howItWorks:
      'From Cost and Revenue: `Profit = Selling Price - Cost`, `Gross Margin % = (Profit / Selling Price) × 100`, and `Markup % = (Profit / Cost) × 100`. From Target Margin %: `Selling Price = Cost / (1 - Margin% / 100)`. From Target Markup %: `Selling Price = Cost × (1 + Markup% / 100)`.',
    examples: [
      {
        label: 'Retail Product Margin Check',
        input: 'Item Cost $40 · Selling Price $60',
        output: 'Gross Profit: $20.00 · Gross Margin: 33.33% · Markup: 50.00%',
      },
      {
        label: 'Set Price for 40% Target Margin',
        input: 'Item Cost $30 · Target Margin 40%',
        output: 'Recommended Selling Price: $50.00 · Profit: $20.00 · Equivalent Markup: 66.67%',
      },
    ],
    features: [
      'Three modes: From Cost & Revenue, From Cost & Target Margin %, and From Cost & Target Markup %',
      'Prevents impossible ≥100% margin targets with clear validation notices',
      'Optional quantity multiplier for batch revenue and profit',
      'Currency selector and one-click Copy Summary',
    ],
    limitations: [
      'Computes unit gross margin before overhead expenses, shipping subsidies, payment processing fees, or income taxes.',
      'Target Margin must be strictly below 100% because margin equals profit divided by total revenue.',
    ],
    faqs: [
      {
        question: 'What is the difference between Profit Margin and Markup?',
        answer:
          'Profit Margin divides profit by the selling price (revenue), while Markup divides profit by your cost. For a $40 cost sold at $60, profit ($20) is a 33.33% margin but a 50% markup.',
      },
      {
        question: 'Why cannot gross margin reach 100% if cost is above zero?',
        answer:
          'If your item costs more than $0, cost always makes up part of the selling price, so profit ($Revenue - Cost) stays strictly less than 100% of revenue.',
      },
      {
        question: 'Can I estimate batch profits across multiple units?',
        answer:
          'Yes. Set Quantity above 1 to see total batch cost, total revenue, and combined gross profit.',
      },
    ],
  },
  'add-days-to-date': {
    introduction:
      'The Add/Subtract Days Calculator determines the exact calendar date forward or backward from any starting date—supporting calendar days, weeks, months, years, or Monday–Friday business days.',
    howItWorks:
      'Calendar day and week offsets use normalized UTC date arithmetic so Daylight Saving changes never cause off-by-one shifts. Month and year offsets clamp cleanly to the last day of shorter target months (e.g., Jan 31 + 1 month lands on Feb 28 or Feb 29). Business-day mode skips Saturdays and Sundays.',
    examples: [
      {
        label: '90-Day Project Deadline',
        input: 'Start 2026-01-15 + 90 Calendar Days',
        output: 'Wednesday, April 15, 2026',
      },
      {
        label: '10 Business Days Shipping Window',
        input: 'Start 2026-11-23 + 10 Business Days (Mon–Fri)',
        output: 'Monday, December 7, 2026 (14 calendar days elapsed)',
      },
    ],
    features: [
      'Add or Subtract calendar Days, Weeks, Months, Years, or Business Days (Mon–Fri)',
      'Instant UTC-safe date calculations free of DST shift bugs',
      'Displays full formatted result date, weekday name, ISO date string, and calendar day offset',
      'Quick preset chips (+7d, +14d, +30d, +90d, +1y) and Copy Date button',
    ],
    limitations: [
      'Business Days mode excludes Saturdays and Sundays only and does not skip regional or national public holidays.',
      'Month additions starting on the 29th–31st clamp to the final valid day of shorter destination months.',
    ],
    faqs: [
      {
        question: 'How does Business Days mode handle weekends?',
        answer:
          'It steps across calendar days and counts only Monday through Friday toward your target offset, automatically jumping over Saturdays and Sundays.',
      },
      {
        question: 'What happens if I add 1 month to January 31?',
        answer:
          'Because February does not have 31 days, the date clamps cleanly to February 28 (or February 29 in leap years) instead of overflowing into March.',
      },
      {
        question: 'Can I calculate dates in the past?',
        answer:
          'Yes. Switch Operation to "Subtract (-)" to count backward by any number of days, weeks, months, years, or business days.',
      },
    ],
  },
  'week-number-calculator': {
    introduction:
      'The Week Number Calculator identifies the official ISO-8601 week number (Weeks 1–53), the Monday–Sunday calendar span for that week, the ordinal day of the year, remaining days in the year, quarter, and leap-year status.',
    howItWorks:
      'Following ISO-8601, Week 1 of an ISO week-numbering year is always the week containing January 4 (equivalently, the first week with at least four days in the new year, starting Monday). Note that the first or last couple days of a calendar year can belong to Week 52/53 of the previous year or Week 1 of the next ISO year.',
    examples: [
      {
        label: 'Standard Mid-Year Week',
        input: '2026-07-15',
        output: 'ISO Week 29 of 2026 · Span: Jul 13 – Jul 19, 2026 · Day 196 of 365 · Q3',
      },
      {
        label: 'Year-Boundary ISO Rule',
        input: '2027-01-01 (Friday)',
        output: 'ISO Week 53 of 2026 · Span: Dec 28, 2026 – Jan 3, 2027',
      },
    ],
    features: [
      'Exact ISO-8601 week calculation (Weeks 1–53) and ISO week-year tracking',
      'Displays Monday start date and Sunday end date for the active week',
      'Shows Day of Year, Days Remaining, Quarter (Q1–Q4), and Leap Year badge',
      'Interactive ISO Week lookup slider/input plus Copy Summary',
    ],
    limitations: [
      'Uses the international ISO-8601 standard (Monday-start weeks). US-style Sunday-start week counting can differ by 1 at year boundaries.',
    ],
    faqs: [
      {
        question: 'Why can January 1 show Week 52 or Week 53 of the prior year?',
        answer:
          'Under ISO-8601, weeks run Monday through Sunday and belong to the year containing the week’s Thursday. If January 1 falls on Friday, Saturday, or Sunday, those days belong to the final ISO week of the preceding year.',
      },
      {
        question: 'When does a year have 53 ISO weeks?',
        answer:
          'A year has 53 ISO weeks whenever January 1 falls on a Thursday, or in leap years starting on Wednesday or Thursday.',
      },
      {
        question: 'Which day starts every ISO week?',
        answer:
          'Every ISO-8601 week always begins on Monday and ends on Sunday.',
      },
    ],
  },
  'countdown-timer': {
    introduction:
      'The Countdown Timer helps time workouts, presentations, cooking, study blocks, or meetings with quick preset durations, custom Hours/Minutes/Seconds entry, a visual progress bar, and an optional browser audio chime.',
    howItWorks:
      'Instead of drifting via naive `setInterval` ticks, the timer records a target end timestamp (`Date.now() + remainingMs`) and computes remaining time on each update cycle. When sound alerts are turned on, finishing triggers a soft chime using the browser’s native Web Audio API without external audio downloads.',
    examples: [
      {
        label: '10-Minute Presentation Countdown',
        input: '00:10:00 preset',
        output: 'Live MM:SS readout, completion ETA, and smooth visual progress indicator',
      },
      {
        label: 'Custom Multi-Hour Timer',
        input: '1 hr 30 min 00 sec',
        output: '01:30:00 countdown with Pause, Resume, +1 Min, and Reset controls',
      },
    ],
    features: [
      'One-click presets (1m, 3m, 5m, 10m, 15m, 30m) plus custom HH/MM/SS inputs',
      'Drift-resistant timestamp tracking with Pause, Resume, +1m quick add, and Reset',
      'Visual completion percentage bar and completion notice',
      'Optional Web Audio finish chime (toggleable Mute / Sound On)',
    ],
    limitations: [
      'Keeping the browser tab open is required for sound chimes; closing the tab clears the running timer.',
      'Some mobile browsers require tapping Start (a user gesture) before allowing Web Audio chimes to play.',
    ],
    faqs: [
      {
        question: 'Does the timer stay accurate if my browser throttles background tabs?',
        answer:
          'Yes. Because remaining seconds are derived from real system target timestamps (`targetEndTime - Date.now()`), returning to the tab catches up immediately without drift.',
      },
      {
        question: 'Do I need to allow notifications for sound to play?',
        answer:
          'No notification permission is needed—the chime plays directly via your browser’s built-in Web Audio API whenever Sound is enabled.',
      },
      {
        question: 'Can I add an extra minute while it is running?',
        answer:
          'Yes. Click "+1 min" anytime to extend the active countdown without stopping it.',
      },
    ],
  },
  'length-converter': {
    introduction:
      'The Length Converter translates any distance or measurement simultaneously across millimeters, centimeters, meters, kilometers, inches, feet, yards, miles, and nautical miles on a single view.',
    howItWorks:
      'Every input converts into meters using exact international definitions (`1 inch = 0.0254 m`, `1 foot = 0.3048 m`, `1 yard = 0.9144 m`, `1 mile = 1609.344 m`, `1 nautical mile = 1852 m`) and then divides simultaneously across all nine output units.',
    examples: [
      {
        label: 'Height or Package Measurement',
        input: '180 centimeters',
        output: '1.8 m · 70.866142 in · 5.905512 ft',
      },
      {
        label: '5K Race Distance',
        input: '5 kilometers',
        output: '5,000 m · 3.106856 miles · 5,468.066492 yards',
      },
    ],
    features: [
      'Simultaneous live comparison across 9 metric, imperial, and nautical units',
      'Exact international foot and inch factors (1 in = 25.4 mm)',
      'Quick Copy button on every unit card',
      'Zero page reloads and instant unit switching',
    ],
    limitations: [
      'Displays up to 6 decimal places for readability; ultra-tiny sub-nanometer differences may round.',
      'Uses international miles and feet rather than legacy US Survey Foot definitions.',
    ],
    faqs: [
      {
        question: 'How many centimeters are in an inch?',
        answer:
          'By international definition since 1959, 1 inch equals exactly 2.54 centimeters (25.4 millimeters).',
      },
      {
        question: 'Why show all units at once instead of one From/To box?',
        answer:
          'Comparing feet, inches, centimeters, and meters side by side saves extra clicks when checking shipping labels, room sizes, or race distances.',
      },
      {
        question: 'What is a nautical mile?',
        answer:
          'Used in aviation and maritime navigation, 1 international nautical mile equals exactly 1,852 meters (~1.15078 statute miles).',
      },
    ],
  },
  'weight-converter': {
    introduction:
      'The Weight Converter transforms weights and masses cleanly across milligrams, grams, kilograms, metric tons, ounces, pounds, and UK stone in one simultaneous comparison table.',
    howItWorks:
      'Every measurement scales through grams using exact international avoirdupois standards (`1 lb = 453.59237 g`, `1 oz = 28.349523125 g`, `1 stone = 14 lbs = 6350.29318 g`, `1 metric ton = 1,000,000 g`) and formats cleanly.',
    examples: [
      {
        label: 'Kitchen Recipe Weight',
        input: '500 grams',
        output: '0.5 kg · 17.636981 oz · 1.102311 lbs',
      },
      {
        label: 'Luggage Allowance Check',
        input: '50 pounds',
        output: '22.679619 kg · 800 oz · 3.571429 stone',
      },
    ],
    features: [
      'Simultaneous conversion across mg, g, kg, metric tons, oz, lbs, and UK stone',
      'Exact international avoirdupois pound definition (0.45359237 kg)',
      'Clean significant-digit formatting even across very large or small scales',
      'Individual Copy buttons for each weight unit',
    ],
    limitations: [
      'Uses standard avoirdupois ounces/pounds (everyday food, shipping, and body weight) rather than troy ounces used for precious metals.',
      'Metric Ton refers to 1,000 kg (1 tonne), not a US short ton (2,000 lbs).',
    ],
    faqs: [
      {
        question: 'How many pounds are in one kilogram?',
        answer:
          'One kilogram equals approximately 2.204623 avoirdupois pounds.',
      },
      {
        question: 'How much is 1 stone in pounds and kilograms?',
        answer:
          'One UK stone equals exactly 14 pounds, which is approximately 6.350293 kilograms.',
      },
      {
        question: 'Does this use troy ounces?',
        answer:
          'No. It uses standard everyday avoirdupois ounces (16 oz = 1 lb ≈ 28.3495 g).',
      },
    ],
  },
  'temperature-converter': {
    introduction:
      'The Temperature Converter translates values simultaneously across Celsius (°C), Fahrenheit (°F), and Kelvin (K), displays the exact mathematical formulas used, and highlights helpful everyday reference benchmarks.',
    howItWorks:
      'Any input converts first to Celsius (`(F - 32) × 5/9` or `K - 273.15`) and then outputs all three scales cleanly rounded up to 4 decimal places. Inputs falling below absolute zero (-273.15 °C / 0 K) display an informational physics notice while still computing the arithmetic result.',
    examples: [
      {
        label: 'Weather Conversion',
        input: '25 °C',
        output: '77 °F · 298.15 K',
      },
      {
        label: 'Oven Baking Setting',
        input: '350 °F',
        output: '176.6667 °C · 449.8167 K',
      },
    ],
    features: [
      'Instant 3-way readout for Celsius (°C), Fahrenheit (°F), and Kelvin (K)',
      'Quick reference preset chips (Absolute Zero, Water Freezes, Room Temp, Body Temp, Water Boils)',
      'Displays conversion formulas and flags sub-absolute-zero inputs',
      'Copy buttons next to each scale',
    ],
    limitations: [
      'Physical temperatures cannot fall below 0 Kelvin (-273.15 °C); values below that threshold remain mathematical conversions only.',
    ],
    faqs: [
      {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        answer:
          '-40 °C equals exactly -40 °F—try clicking or entering -40 to see both scales match!',
      },
      {
        question: 'How do you convert Celsius to Kelvin?',
        answer:
          'Simply add 273.15 to the Celsius temperature (for example, 0 °C = 273.15 K).',
      },
      {
        question: 'What is normal average human body temperature?',
        answer:
          'Approximately 37 °C, 98.6 °F, or 310.15 K (available as a one-click preset above).',
      },
    ],
  },
  'data-storage-converter': {
    introduction:
      'The Data Storage Converter calculates equivalent file sizes and drive capacities across Bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB—and lets you switch freely between Binary (1024) and Decimal SI (1000) conventions.',
    howItWorks:
      'In Binary (IEC 1024) mode, every step multiplies by 1,024 (`1 KiB = 1,024 Bytes`), matching how operating systems report RAM and file sizes. In Decimal SI (1000) mode, every step multiplies by 1,000 (`1 KB = 1,000 Bytes`), matching hard-drive and SSD box capacities.',
    examples: [
      {
        label: 'Check Why a 1 TB Drive Shows ~931 GiB',
        input: '1 TB (1000^4 bytes) = 1,000,000,000,000 Bytes',
        output: '1,000 GB in Decimal SI · ~931.32 GiB in Binary',
      },
      {
        label: 'Bits to Megabytes',
        input: '8,388,608 Bits in Binary mode',
        output: '1,048,576 Bytes · 1,024 KiB · 1 MiB',
      },
    ],
    features: [
      'Instant toggle between Binary (IEC 1024) and Decimal SI (1000) modes',
      'Covers Bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB simultaneously',
      'Copy buttons on every unit row',
      'Handles decimal values cleanly across scales',
    ],
    limitations: [
      'Measures storage sizes rather than network bandwidth transfer rates (though Bits/Bytes conversions work identically).',
    ],
    faqs: [
      {
        question: 'Why does a 500 GB SSD show less space inside my computer?',
        answer:
          'Drive makers advertise Decimal SI gigabytes (1 GB = 1,000,000,000 bytes), whereas Windows and many tools display Binary gibibytes (1 GiB = 1,073,741,824 bytes), making 500 GB appear around 465 GiB.',
      },
      {
        question: 'How many bits make one byte?',
        answer:
          'One standard byte consists of 8 bits.',
      },
      {
        question: 'Which mode should I use for software memory?',
        answer:
          'Keep Binary (1024) selected for RAM, virtual memory, and OS file explorer sizes.',
      },
    ],
  },
  'color-converter': {
    introduction:
      'The Color Converter translates CSS colors smoothly between HEX, RGB, and HSL formats, shows a live color swatch preview, and calculates real-time WCAG relative luminance contrast ratios against white (#FFFFFF) and dark navy (#10243E).',
    howItWorks:
      'HEX values (3-digit shorthand `#ABC` or 6-digit `#AABBCC`) parse into 0–255 RGB channels and convert algorithmically to Hue (0–360°), Saturation (0–100%), and Lightness (0–100%). WCAG contrast uses the official sRGB linearization formula (`(L1 + 0.05) / (L2 + 0.05)`) to indicate AA (4.5:1) and AAA (7.0:1) legibility.',
    examples: [
      {
        label: 'TooloraHub Teal Accent',
        input: '#16C6C9',
        output: 'rgb(22, 198, 201) · hsl(181, 80%, 44%) · 7.91:1 contrast vs #10243E',
      },
      {
        label: 'Navy Primary Brand Shade',
        input: '#12345A',
        output: 'rgb(18, 52, 90) · hsl(212, 67%, 21%) · 12.6:1 contrast vs #FFFFFF',
      },
    ],
    features: [
      'Edit by native color picker, HEX input (#RGB or #RRGGBB), RGB sliders/inputs, or HSL values',
      'Instant copyable CSS strings for hex, rgb(), and hsl()',
      'Live WCAG 2.1 contrast score cards against white and dark ink',
      'Accessible swatch preview with sample foreground text',
    ],
    limitations: [
      'Supports opaque sRGB colors (HEX/RGB/HSL without alpha transparency channel).',
      'Invalid incomplete HEX strings keep the last valid color preview until 3 or 6 valid hex digits are entered.',
    ],
    faqs: [
      {
        question: 'What WCAG contrast ratio should body text meet?',
        answer:
          'WCAG Level AA recommends at least 4.5:1 for normal body text (and 3.0:1 for large headings ≥18pt), while Level AAA targets 7.0:1.',
      },
      {
        question: 'Does the HEX box accept 3-character shorthand like #F80?',
        answer:
          'Yes. 3-character hex codes expand automatically (so #F80 becomes #FF8800).',
      },
      {
        question: 'Why might HSL saturation drop to 0% on grays?',
        answer:
          'Pure grays (where Red = Green = Blue) have no hue saturation, so saturation is 0% regardless of lightness.',
      },
    ],
  },
  'number-base-converter': {
    introduction:
      'The Number Base Converter translates whole numbers smoothly across Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16) using arbitrary-precision BigInt arithmetic so even large 64-bit numbers never lose precision.',
    howItWorks:
      'Your input is validated against the allowed digits for the selected source base (ignoring optional spaces or standard prefixes like `0x`, `0b`, or `0o`), parsed directly into a JavaScript `BigInt`, and formatted simultaneously into bases 2, 8, 10, and 16 (with grouped 4-bit binary spacing option for readability).',
    examples: [
      {
        label: 'Byte Mask Conversion',
        input: 'Decimal 255',
        output: 'Binary: 1111 1111 · Octal: 377 · Hexadecimal: FF',
      },
      {
        label: 'Hexadecimal Color Channel',
        input: 'Hex 7F',
        output: 'Decimal: 127 · Binary: 1111111 · Octal: 177',
      },
    ],
    features: [
      'Instant conversion between Binary (2), Octal (8), Decimal (10), and Hexadecimal (16)',
      'BigInt precision—supports 64-bit and larger integers without rounding errors',
      'Accepts optional prefixes (0b, 0o, 0x) and spaces gracefully',
      'Grouped 4-bit binary formatting toggle and Copy buttons per base',
    ],
    limitations: [
      'Converts non-negative whole integers only (floating-point fractions and signed two’s complement negative values are not supported).',
    ],
    faqs: [
      {
        question: 'Why does this use BigInt instead of regular JavaScript numbers?',
        answer:
          'Standard JavaScript numbers lose integer accuracy above 2^53 - 1, whereas BigInt converts 64-bit, 128-bit, and larger integers without rounding.',
      },
      {
        question: 'Can I paste hex values with 0x in front?',
        answer:
          'Yes. Standard prefixes like 0x, 0b, and 0o are stripped automatically when matching the selected input base.',
      },
      {
        question: 'What happens if I type "9" while Binary is selected?',
        answer:
          'Invalid characters for the active base show a helpful inline validation notice immediately instead of showing misleading output.',
      },
    ],
  },
  'pomodoro-timer': {
    introduction:
      'The Pomodoro Timer structures work and study into focused intervals paired with short and long breaks, featuring customizable phase durations, completed-session tracking, and optional browser sound alerts.',
    howItWorks:
      'Pick Focus (default 25 min), Short Break (5 min), or Long Break (15 min), or adjust any phase length from 1 to 90 minutes. Countdown time tracks against real target timestamps so browser tab backgrounding never introduces drift, and finishing a Focus block increments your in-session Pomodoro counter.',
    examples: [
      {
        label: 'Classic Focus Sprint',
        input: '25 min Focus -> 5 min Short Break',
        output: 'Logs 1 completed focus session and lets you start the break cleanly',
      },
      {
        label: 'Extended Deep Work',
        input: '45 min custom Focus + 10 min Break',
        output: 'Accurate countdown with Pause, Resume, Skip Phase, and Sound toggle',
      },
    ],
    features: [
      'Focus, Short Break, and Long Break modes with customizable minute lengths',
      'Session counter tracking completed focus intervals',
      'Drift-free system clock timing with Pause, Reset, and Skip Phase buttons',
      'Optional gentle Web Audio finish chime',
    ],
    limitations: [
      'Completed session count stays in active browser memory and resets when you refresh or close the tab.',
      'Requires keeping the browser tab open to hear the finish chime.',
    ],
    faqs: [
      {
        question: 'What is the traditional Pomodoro cycle?',
        answer:
          'Classic Pomodoro alternates 25 minutes of uninterrupted focus with a 5-minute break, followed by a longer 15–30 minute break after every four focus sessions.',
      },
      {
        question: 'Can I customize the 25/5/15 minute defaults?',
        answer:
          'Yes. Use the duration inputs below the timer to set any custom Focus, Short Break, or Long Break length between 1 and 90 minutes.',
      },
      {
        question: 'Does it keep working if I switch tabs to write or code?',
        answer:
          'Yes. Because timing compares against real target timestamps, switching back updates the countdown accurately right away.',
      },
    ],
  },
  'stopwatch': {
    introduction:
      'The Online Stopwatch measures elapsed durations down to hundredths of a second (`MM:SS.CC`) and lets you capture unlimited lap splits showing both individual lap times and cumulative elapsed totals.',
    howItWorks:
      'When running, elapsed duration accumulates using high-resolution `performance.now()` deltas so browser frame pauses or sleep interruptions do not drift the clock. Recording a lap stores the difference since the previous lap alongside total elapsed time, and highlights your fastest and slowest laps once two or more laps are logged.',
    examples: [
      {
        label: 'Interval Workout Splits',
        input: 'Lap 1 at 00:42.15 · Lap 2 at 01:21.90',
        output: 'Lap 1: 00:42.15 (Total 00:42.15) · Lap 2: 00:39.75 (Total 01:21.90)',
      },
      {
        label: 'Speech Rehearsal Timing',
        input: 'Start -> Lap at each slide section -> Stop',
        output: 'Copyable lap table showing exact time spent per section',
      },
    ],
    features: [
      'High-resolution `performance.now()` elapsed timing (MM:SS.CC)',
      'Unlimited lap split recording with both Lap Time and Total Time columns',
      'Highlights fastest and slowest recorded laps automatically (2+ laps)',
      'One-click Copy Laps summary and Reset controls',
    ],
    limitations: [
      'Elapsed state and recorded laps stay in current tab memory and clear if the browser tab is closed or reloaded.',
    ],
    faqs: [
      {
        question: 'What is the difference between Lap Time and Total Time?',
        answer:
          'Lap Time measures only the interval since your previous lap click, whereas Total Time tracks the cumulative duration since you first pressed Start.',
      },
      {
        question: 'Can I pause and later resume without losing recorded laps?',
        answer:
          'Yes. Pausing freezes both the main clock and current lap offset until you click Resume or Reset.',
      },
      {
        question: 'How do I save my lap times?',
        answer:
          'Click "Copy Laps" to copy a neatly formatted list of every lap split and cumulative timestamp to your clipboard.',
      },
    ],
  },
  'checklist-maker': {
    introduction:
      'The Checklist Maker lets you build interactive to-do, packing, or launch checklists right in your browser, check items off as you go, import multi-line lists in bulk, and export clean Markdown (`- [x]`) or plain text.',
    howItWorks:
      'Every item keeps an ID, label, and boolean checked status in reactive client state. A progress bar computes `(checked / total) × 100%`, and one-click export formats items either as GitHub-flavored Markdown tasks (`- [ ]` / `- [x]`) or plain text lines.',
    examples: [
      {
        label: 'Pre-Launch QA List',
        input: 'Test mobile nav, Verify sitemap, Check links',
        output: '- [x] Test mobile nav\\n- [ ] Verify sitemap\\n- [ ] Check links',
      },
      {
        label: 'Bulk Paste Lines',
        input: 'Paste 5 lines separated by Enter',
        output: 'Adds all 5 items immediately as interactive checkboxes',
      },
    ],
    features: [
      'Single-item input plus bulk multi-line paste import',
      'Live progress counter and completion percentage bar',
      'Quick actions: Check All, Uncheck All, and Clear Completed',
      'Copy as Markdown Tasks or Download .txt file',
    ],
    limitations: [
      'Runs purely in your active browser session without accounts or cloud syncing; copy or download your checklist before closing if you want to keep a permanent copy.',
    ],
    faqs: [
      {
        question: 'How can I add 10 checklist items quickly?',
        answer:
          'Click "Bulk Paste Lines", paste your multi-line list, and add all lines at once instead of typing one item at a time.',
      },
      {
        question: 'What does Markdown export look like?',
        answer:
          'Unchecked items export as `- [ ] Task` and checked items export as `- [x] Task`, ready for GitHub, Notion, or Obsidian.',
      },
      {
        question: 'Is my checklist saved to a server?',
        answer:
          'No. Everything remains strictly inside your browser tab memory.',
      },
    ],
  },
  'simple-task-planner': {
    introduction:
      'The Simple Task Planner organizes your day’s work with High, Medium, and Low priority levels, live All/Active/Completed filters, completion summaries, and plain-text export—without requiring any sign-up.',
    howItWorks:
      'Tasks store title, priority (`high`, `medium`, `low`), and completion status in React state. Filtering updates views without losing hidden items, and sorting/display clearly badges priorities so urgent work stands out immediately.',
    examples: [
      {
        label: 'Prioritized Daily Plan',
        input: '[High] Publish update, [Medium] Reply to emails, [Low] Clean bookmarks',
        output: 'Filterable board showing 3 tasks sorted or badged cleanly by priority',
      },
      {
        label: 'Export Summary',
        input: 'Click Copy Plan',
        output: '[HIGH] [x] Publish update\\n[MEDIUM] [ ] Reply to emails...',
      },
    ],
    features: [
      'Priority levels (High, Medium, Low) with clear visual indicators',
      'Filter tabs for All, Active, and Completed tasks plus High-priority count',
      'Toggle task priority or completion state inline anytime',
      'Copy Plan and Download .txt export actions',
    ],
    limitations: [
      'Designed as a lightweight scratchpad planner inside the current browser tab rather than a persistent cloud project manager.',
    ],
    faqs: [
      {
        question: 'Can I change a task’s priority after adding it?',
        answer:
          'Yes. Use the priority selector on any existing task row to promote or lower it between High, Medium, and Low.',
      },
      {
        question: 'Can I sort tasks automatically so High priority appears first?',
        answer:
          'Yes. Click "Sort by Priority" to reorder active tasks cleanly from High to Low.',
      },
      {
        question: 'How do I keep a copy of today’s tasks?',
        answer:
          'Click Copy Plan or Download .txt to save your prioritized list locally.',
      },
    ],
  },
  'notes-formatter': {
    introduction:
      'The Notes Formatter turns rough meeting notes, voice transcripts, or messy bullet fragments into structured Markdown bullets, numbered action steps, task checkboxes, or clean headings and paragraphs.',
    howItWorks:
      'First, lines are normalized—stripping stray existing markers (`-`, `*`, `•`, `1.`, `[ ]`) so re-formatting never creates double prefixes like `- - item`. Next, the selected output style formats every populated line cleanly into Markdown bullets, numbered steps, checklists, title-cased section bullets, or joined prose paragraphs.',
    examples: [
      {
        label: 'Messy Bullets to Numbered Steps',
        input: '* Review draft\\n- Fix typos\\n• Publish page',
        output: '1. Review draft\\n2. Fix typos\\n3. Publish page',
      },
      {
        label: 'Notes to Markdown Checklist',
        input: 'Send invoice\\nConfirm delivery date',
        output: '- [ ] Send invoice\\n- [ ] Confirm delivery date',
      },
    ],
    features: [
      'Five clean formats: Markdown Bullets (-), Numbered Steps (1.), Task Checkboxes (- [ ]), Blockquote (>), and Clean Paragraphs',
      'Automatically strips stale bullet/number prefixes before reformatting',
      'Optional trim spaces and remove blank lines toggles',
      'Copy Formatted Notes and Download .md / .txt buttons',
    ],
    limitations: [
      'Operates line-by-line rather than parsing complex nested Markdown tables or multi-level indentation hierarchies.',
    ],
    faqs: [
      {
        question: 'What happens if my pasted notes already have mixed • and - bullets?',
        answer:
          'Notes Formatter strips existing mixed markers automatically before applying your chosen clean format so you never end up with "- • text".',
      },
      {
        question: 'Can I download the output as a Markdown file?',
        answer:
          'Yes. Click Download .md to save formatted-notes.md directly to your computer.',
      },
      {
        question: 'What does Clean Paragraphs mode do?',
        answer:
          'It strips list prefixes and collapses extra whitespace so bullet points become clean plain-text paragraphs.',
      },
    ],
  },
  'random-number-generator': {
    introduction:
      'The Random Number Generator draws unbiased integers within any custom Min and Max bounds—for a single draw or bulk lists up to 100 numbers—with optional uniqueness (no duplicates), ascending sorting, and quick dice/coin presets.',
    howItWorks:
      'Random integers are drawn using `crypto.getRandomValues` rejection sampling (avoiding modulo bias) when browser Web Crypto is available. In Unique mode, draws use partial Fisher-Yates sampling across valid integer ranges up to 100,000 numbers wide—or a Set-backed unbiased loop for wider spans.',
    examples: [
      {
        label: 'Lottery / Raffle Style Unique Picks',
        input: 'Min 1 · Max 50 · Count 6 · Unique ON · Sort ON',
        output: 'Six sorted unique random integers between 1 and 50',
      },
      {
        label: '6-Sided Dice Roll',
        input: 'Preset D6 (Min 1, Max 6, Count 1)',
        output: 'Unbiased integer from 1 to 6',
      },
    ],
    features: [
      'Unbiased rejection-sampled Web Crypto integer generation',
      'Single draw or bulk batches (1–100 numbers per roll)',
      'Toggleable "Unique numbers only" and ascending sort',
      'Quick presets for Coin Flip (1–2), D6 Dice (1–6), 1–100, and 6-of-49 Picks',
    ],
    limitations: [
      'Maximum quantity per run is 100 numbers, and in Unique mode the quantity cannot exceed `(Max - Min + 1)` distinct integers.',
    ],
    faqs: [
      {
        question: 'Why does Unique mode stop if Count exceeds Max - Min + 1?',
        answer:
          'There are only (Max - Min + 1) distinct whole numbers inside a range—for example, you cannot draw 15 unique numbers between 1 and 10.',
      },
      {
        question: 'Are the generated numbers truly unpredictable?',
        answer:
          'Yes. Uses `window.crypto.getRandomValues` with rejection sampling so every number in your range has an equal probability without modulo bias.',
      },
      {
        question: 'Are negative Min/Max bounds supported?',
        answer:
          'Yes. You can generate random integers across negative ranges too (for instance, -50 to 50).',
      },
    ],
  },
  'password-generator': {
    introduction:
      'The Password Generator creates strong, unpredictable random passwords directly inside your browser using the Web Crypto API (`crypto.getRandomValues`), complete with customizable length, character pools, entropy estimates, and one-click copy.',
    howItWorks:
      'Rejection sampling on `crypto.getRandomValues` selects characters uniformly from your enabled pools (Uppercase, Lowercase, Numbers, Symbols) and ensures at least one character from every selected pool appears in the password via a cryptographic Fisher-Yates shuffle. Shannon-style pool entropy is computed as `length × log2(poolSize)`.',
    examples: [
      {
        label: 'Strong Everyday Login',
        input: 'Length 16 · Upper + Lower + Numbers + Symbols',
        output: 'e.g., 16-character mixed password (~105 bits entropy)',
      },
      {
        label: 'Readable Wi-Fi Passcode',
        input: 'Length 12 · Exclude Ambiguous (0/O/1/l/I)',
        output: 'Clear characters easy to read aloud or type on smart TVs',
      },
    ],
    features: [
      'Cryptographically secure browser generation (`crypto.getRandomValues`)—never uses `Math.random()`',
      'Adjustable length (6–64 characters) and toggleable character sets',
      'Guarantees at least one character from each active pool',
      'Exclude ambiguous look-alike characters (0, O, 1, l, I) option + entropy indicator',
    ],
    limitations: [
      'Passwords stay solely in your current browser tab memory and are never transmitted or logged anywhere; copy and save them immediately into a trusted password manager.',
      'Excluding all character pools is prevented automatically (at least one pool remains enabled).',
    ],
    faqs: [
      {
        question: 'Are generated passwords sent over the internet or stored by TooloraHub?',
        answer:
          'Never. Every character is generated locally inside your browser using your operating system’s Web Crypto random source and disappears as soon as you clear or leave the page.',
      },
      {
        question: 'How long should a strong password be?',
        answer:
          'At least 12–16 random characters mixing uppercase, lowercase, digits, and symbols provides strong resistance against brute-force guessing.',
      },
      {
        question: 'What does "Exclude ambiguous characters" skip?',
        answer:
          'It omits visually confusing characters like zero (0) vs capital O, and one (1) vs lowercase L (l) and capital I.',
      },
    ],
  },
  'json-formatter-validator': {
    introduction:
      'The JSON Formatter & Validator parses raw or minified JSON locally in your browser, reports exact syntax validity or line/column parse errors, beautifies indentation (2 or 4 spaces), minifies whitespace, and optionally sorts object keys alphabetically.',
    howItWorks:
      'Inputs are parsed using native `JSON.parse()`. Valid JSON renders with configurable indentation (`JSON.stringify(data, null, indent)`) or zero-whitespace minification, optionally walking nested objects recursively to sort keys alphabetically while preserving array order. Syntax errors report helpful position diagnostics.',
    examples: [
      {
        label: 'Beautify Compact API Payload',
        input: '{"name":"TooloraHub","tools":50,"free":true}',
        output: 'Indented multi-line JSON with clear key/value alignment',
      },
      {
        label: 'Catch Trailing Comma Syntax Error',
        input: '{"items": [1, 2, ]}',
        output: 'Invalid JSON alert flagging unexpected token near line 1',
      },
    ],
    features: [
      'Instant Valid / Invalid JSON status badge with descriptive error details',
      'Beautify (2-space or 4-space indentation) and Minify modes',
      'Optional recursive "Sort Object Keys Alphabetically" toggle',
      'Payload stats (keys, array items, input vs output byte sizes) plus Copy & Download .json',
    ],
    limitations: [
      'Validates strict RFC 8259 JSON—JavaScript-style comments (`//`), single-quoted strings, and trailing commas are flagged as invalid JSON.',
      'Very large numbers exceeding IEEE-754 safe integer precision (`> 2^53 - 1`) are rounded by native `JSON.parse()`.',
    ],
    faqs: [
      {
        question: 'Why does JSON flag a comma before a closing bracket `}` or `]`?',
        answer:
          'Unlike JavaScript objects, strict JSON syntax does not allow trailing commas after the final item inside objects or arrays.',
      },
      {
        question: 'Does sorting keys change array element ordering?',
        answer:
          'No. "Sort Object Keys" sorts keys inside objects alphabetically while keeping every array’s element order intact.',
      },
      {
        question: 'Is my JSON payload uploaded anywhere to validate?',
        answer:
          'No. Parsing, validation, formatting, and downloading happen entirely inside your browser.',
      },
    ],
  },
};
