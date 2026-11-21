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
      'Because LCS builds a two-dimensional comparison grid, very large files over ~3,000 lines per side may feel slower.',
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
        input: 'Guide to the Best Tools for Writers',
        output: 'guide-best-tools-writers',
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
        input: 'https://toolorahub.site/tools/?q=word%20counter&category=text',
        output: 'Decoded URL + table showing q = "word counter" and category = "text"',
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
        input: '<div class="card">Tools & Guides © 2026</div>',
        output: '&lt;div class=&quot;card&quot;&gt;Tools &amp; Guides &copy; 2026&lt;/div&gt;',
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
      'Discount percentage clamped cleanly between 0% and 100%',
      'Formats all currency outputs to two decimal places',
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
    ],
  },
  'age-calculator': {
    introduction:
      'The Age Calculator computes exact chronological age in years, months, and days from any date of birth to today or a custom future/past reference date, along with total months, weeks, days lived, birth weekday, and a next-birthday countdown.',
    howItWorks:
      'Calendar age is calculated by comparing year, month, and day fields directly rather than dividing by an approximate 365.25 days. When the target day is earlier in the month than the birth day, it borrows the exact number of days from the preceding calendar month (28, 29, 30, or 31 days depending on leap years).',
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
      'Accurate calendar-aware Years, Months, and Days breakdown',
      'Custom "Age at Date" selector to check age on past or future milestones',
      'Total Months, Total Weeks, Total Days, and Next Birthday countdown tiles',
      'Identifies the exact day of the week you were born',
    ],
    limitations: [
      'Uses your device’s local calendar date by default without birth-hour timezone adjustments.',
      'For February 29 leap-year birthdays in non-leap years, JavaScript rolls February 29 to March 1 when computing the next birthday countdown.',
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
    ],
  },
  'date-difference-calculator': {
    introduction:
      'The Date Difference Calculator measures the exact duration between two calendar dates in total days, weeks, calendar years/months/days, weekdays (Monday–Friday), and weekend days.',
    howItWorks:
      'Total elapsed days are computed from midnight local timestamps between the earlier and later dates (automatically handling reversed date selection). A day-by-day calendar walk then counts weekdays (Mon–Fri) and weekend days (Sat–Sun) accurately across month boundaries and leap years.',
    examples: [
      {
        label: 'Full Year 2026 Span',
        input: 'Start 2026-01-01 to End 2026-12-31 (Include end date checked)',
        output: '365 total days · 52 weeks, 1 day · 261 weekdays · 104 weekend days',
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
      'Handles leap years and varying month lengths accurately',
      'Works regardless of whether Start Date is earlier or later than End Date',
    ],
    limitations: [
      'Weekdays strictly count Monday through Friday and do not subtract regional or national public holidays.',
      'Extremely wide multi-century spans may loop across many days to count weekdays.',
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
          'Outputs are rounded to up to 6 decimal places with unnecessary trailing zeros removed.',
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
      'Overnight shift toggle for late-night to morning spans',
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
          '200 WPM is the most widely used baseline for general web articles, while 150 WPM works well for dense technical guides.',
      },
      {
        question: 'How is the Display Badge rounded?',
        answer:
          'Any non-empty text rounds to at least "1 min read" and otherwise rounds to the nearest whole minute.',
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
    ],
  },
};
