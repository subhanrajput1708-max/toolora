import {
  CaseConverterTool,
  CharacterCounterTool,
  DuplicateLineRemoverTool,
  LineCounterTool,
  TextCleanerTool,
  TextDiffCheckerTool,
  WordCounterTool,
  WordFrequencyCounterTool,
} from './TextWritingTools';
import {
  HtmlEntityConverterTool,
  QrCodeGeneratorTool,
  SlugGeneratorTool,
  UrlEncoderDecoderTool,
} from './WebInternetTools';
import {
  AgeCalculatorTool,
  DateDifferenceCalculatorTool,
  DiscountCalculatorTool,
  PercentageCalculatorTool,
  TimeCalculatorTool,
  UnitConverterTool,
} from './EverydayCalculatorTools';
import {
  GradientGeneratorTool,
  LoremIpsumGeneratorTool,
  ReadingTimeCalculatorTool,
  TextReverserTool,
} from './FileProductivityTools';

export function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case 'word-counter':
      return <WordCounterTool />;
    case 'case-converter':
      return <CaseConverterTool />;
    case 'text-cleaner':
      return <TextCleanerTool />;
    case 'duplicate-line-remover':
      return <DuplicateLineRemoverTool />;
    case 'character-counter':
      return <CharacterCounterTool />;
    case 'text-diff-checker':
      return <TextDiffCheckerTool />;
    case 'line-counter':
      return <LineCounterTool />;
    case 'word-frequency-counter':
      return <WordFrequencyCounterTool />;
    case 'slug-generator':
      return <SlugGeneratorTool />;
    case 'url-encoder-decoder':
      return <UrlEncoderDecoderTool />;
    case 'html-entity-converter':
      return <HtmlEntityConverterTool />;
    case 'qr-code-generator':
      return <QrCodeGeneratorTool />;
    case 'percentage-calculator':
      return <PercentageCalculatorTool />;
    case 'discount-calculator':
      return <DiscountCalculatorTool />;
    case 'age-calculator':
      return <AgeCalculatorTool />;
    case 'date-difference-calculator':
      return <DateDifferenceCalculatorTool />;
    case 'unit-converter':
      return <UnitConverterTool />;
    case 'time-calculator':
      return <TimeCalculatorTool />;
    case 'lorem-ipsum-generator':
      return <LoremIpsumGeneratorTool />;
    case 'reading-time-calculator':
      return <ReadingTimeCalculatorTool />;
    case 'text-reverser':
      return <TextReverserTool />;
    case 'gradient-generator':
      return <GradientGeneratorTool />;
    default:
      return null;
  }
}
