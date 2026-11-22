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
import {
  LineBreakFormatterTool,
  ListSorterRandomizerTool,
} from './NewTextTools';
import {
  AverageCalculatorTool,
  BmiCalculatorTool,
  CompoundInterestCalculatorTool,
  FractionPercentageConverterTool,
  FuelTripCostCalculatorTool,
  LoanEmiCalculatorTool,
  ProfitMarginCalculatorTool,
  RatioCalculatorTool,
  TipCalculatorTool,
} from './NewCalculatorFinanceTools';
import {
  AddDaysToDateTool,
  ColorConverterTool,
  CountdownTimerTool,
  DataStorageConverterTool,
  LengthConverterTool,
  NumberBaseConverterTool,
  TemperatureConverterTool,
  WeekNumberCalculatorTool,
  WeightConverterTool,
} from './NewDateTimeConversionTools';
import {
  ChecklistMakerTool,
  JsonFormatterValidatorTool,
  NotesFormatterTool,
  PasswordGeneratorTool,
  PomodoroTimerTool,
  RandomNumberGeneratorTool,
  SimpleTaskPlannerTool,
  StopwatchTool,
} from './NewProductivityWebTools';

export function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    // Existing 22 tools (preserved cleanly)
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

    // 28 New Tools
    case 'line-break-formatter':
      return <LineBreakFormatterTool />;
    case 'list-sorter-randomizer':
      return <ListSorterRandomizerTool />;
    case 'average-calculator':
      return <AverageCalculatorTool />;
    case 'ratio-calculator':
      return <RatioCalculatorTool />;
    case 'fraction-percentage-converter':
      return <FractionPercentageConverterTool />;
    case 'bmi-calculator':
      return <BmiCalculatorTool />;
    case 'fuel-trip-cost-calculator':
      return <FuelTripCostCalculatorTool />;
    case 'tip-calculator':
      return <TipCalculatorTool />;
    case 'loan-emi-calculator':
      return <LoanEmiCalculatorTool />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculatorTool />;
    case 'profit-margin-calculator':
      return <ProfitMarginCalculatorTool />;
    case 'add-days-to-date':
      return <AddDaysToDateTool />;
    case 'week-number-calculator':
      return <WeekNumberCalculatorTool />;
    case 'countdown-timer':
      return <CountdownTimerTool />;
    case 'length-converter':
      return <LengthConverterTool />;
    case 'weight-converter':
      return <WeightConverterTool />;
    case 'temperature-converter':
      return <TemperatureConverterTool />;
    case 'data-storage-converter':
      return <DataStorageConverterTool />;
    case 'color-converter':
      return <ColorConverterTool />;
    case 'number-base-converter':
      return <NumberBaseConverterTool />;
    case 'pomodoro-timer':
      return <PomodoroTimerTool />;
    case 'stopwatch':
      return <StopwatchTool />;
    case 'checklist-maker':
      return <ChecklistMakerTool />;
    case 'simple-task-planner':
      return <SimpleTaskPlannerTool />;
    case 'notes-formatter':
      return <NotesFormatterTool />;
    case 'random-number-generator':
      return <RandomNumberGeneratorTool />;
    case 'password-generator':
      return <PasswordGeneratorTool />;
    case 'json-formatter-validator':
      return <JsonFormatterValidatorTool />;
    default:
      return null;
  }
}
