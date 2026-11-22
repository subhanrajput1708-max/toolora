import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Compass,
  Maximize2,
  MessageSquareText,
  Minus,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import {
  TOOLORA_ASSISTANT_GREETING,
  TOOLORA_ASSISTANT_NAME,
  TOOLORA_ASSISTANT_SUBTITLE,
  TOOLORA_SUGGESTED_QUESTIONS,
} from '../data/knowledgeBase';
import { ALL_TOOLS, type ToolCategoryId } from '../data/tools';
import { useAiChat } from '../context/AiChatContext';
import {
  generateAssistantReply,
  type AssistantActionLink,
  type AssistantConversationContext,
} from '../utils/assistantEngine';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: AssistantActionLink[];
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: TOOLORA_ASSISTANT_GREETING,
};

function renderFormattedInline(text: string): React.ReactNode[] {
  // Parse safe internal Markdown links [Label](/path/) and **bold** / *italic* spans without raw HTML
  const tokenRegex = /(\[[^\]]+\]\(\/[a-zA-Z0-9\-/?=&_#]*\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\((\/[a-zA-Z0-9\-/?=&_#]*)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        nodes.push(
          <Link
            key={`${match.index}-${href}`}
            to={href}
            className="inline-flex items-center gap-0.5 font-semibold text-[#12345A] underline decoration-[#16C6C9] decoration-2 underline-offset-2 hover:text-[#0C8588] transition-colors"
          >
            <span>{label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0FA7AA] inline shrink-0" aria-hidden="true" />
          </Link>
        );
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`${match.index}-b`} className="font-semibold text-[#12345A]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={`${match.index}-i`} className="italic text-[#39506B]">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function FormattedAssistantMessage({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);

  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-[#1E3552]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" aria-hidden="true" />;
        }

        const bulletMatch = /^[-*•]\s+(.+)$/.exec(trimmed);
        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#0FA7AA] font-bold mt-0.5" aria-hidden="true">
                •
              </span>
              <span className="flex-1 min-w-0 break-words">
                {renderFormattedInline(bulletMatch[1])}
              </span>
            </div>
          );
        }

        const numberedMatch = /^(\d+\.)\s+(.+)$/.exec(trimmed);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className="font-mono text-xs font-semibold text-[#0C8588] mt-0.5 tabular-nums shrink-0">
                {numberedMatch[1]}
              </span>
              <span className="flex-1 min-w-0 break-words">
                {renderFormattedInline(numberedMatch[2])}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} className="break-words">
            {renderFormattedInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export function TooloraAiChat() {
  const { isOpen, openChat, toggleChat, closeChat, queuedPrompt, clearQueuedPrompt } = useAiChat();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [contextState, setContextState] = useState<AssistantConversationContext>({
    lastToolSlug: null,
    lastCategoryId: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const lastSubmitStampRef = useRef<{ text: string; at: number } | null>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat]);

  const handlePromptSend = (rawText: string) => {
    const trimmed = rawText.trim();
    const now = Date.now();

    // Prevent accidental rapid double-click duplicate submissions within 250ms
    if (
      lastSubmitStampRef.current &&
      lastSubmitStampRef.current.text === trimmed &&
      now - lastSubmitStampRef.current.at < 250
    ) {
      return;
    }
    lastSubmitStampRef.current = { text: trimmed, at: now };

    setIsMinimized(false);

    if (!trimmed) {
      const reply = generateAssistantReply('', contextState);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.id.startsWith('empty-hint-')) {
          return prev;
        }
        return [
          ...prev,
          {
            id: `empty-hint-${now}`,
            role: 'assistant',
            content: reply.markdown,
            actions: reply.actions,
          },
        ];
      });
      inputRef.current?.focus();
      return;
    }

    const reply = generateAssistantReply(trimmed, contextState);
    const nextToolSlug: string | null = reply.matchedToolSlug ?? contextState.lastToolSlug ?? null;
    const nextCategoryId: ToolCategoryId | null =
      reply.matchedCategoryId ?? contextState.lastCategoryId ?? null;

    setContextState({
      lastToolSlug: nextToolSlug,
      lastCategoryId: nextCategoryId,
    });

    const userMsg: ChatMessage = {
      id: `user-${now}-${Math.random().toString(36).slice(2, 6)}`,
      role: 'user',
      content: trimmed,
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-${now}-${Math.random().toString(36).slice(2, 6)}`,
      role: 'assistant',
      content: reply.markdown,
      actions: reply.actions,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  useEffect(() => {
    if (isOpen && queuedPrompt) {
      const prompt = queuedPrompt;
      clearQueuedPrompt();
      setIsMinimized(false);
      handlePromptSend(prompt);
    }
  }, [isOpen, queuedPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePromptSend(input);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setContextState({ lastToolSlug: null, lastCategoryId: null });
    setInput('');
    inputRef.current?.focus();
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Minimized Compact Bar (preserves conversation while collapsed) */}
      {isOpen && isMinimized && (
        <div
          role="region"
          aria-label={`Minimized ${TOOLORA_ASSISTANT_NAME}`}
          className="fixed bottom-20 right-3 sm:right-6 z-50 w-[min(320px,calc(100vw-1.5rem))] bg-[#12345A] text-white rounded-xl border border-[#2B5D96] shadow-xl px-3.5 py-2.5 flex items-center justify-between gap-2"
        >
          <button
            type="button"
            onClick={() => {
              setIsMinimized(false);
              openChat();
            }}
            className="flex items-center gap-2 min-w-0 text-left flex-1"
          >
            <Compass className="w-4 h-4 text-[#16C6C9] shrink-0" aria-hidden="true" />
            <span className="font-display font-semibold text-xs sm:text-sm truncate">
              {TOOLORA_ASSISTANT_NAME} ({Math.max(0, messages.length - 1)} msgs)
            </span>
          </button>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              aria-label={`Expand ${TOOLORA_ASSISTANT_NAME}`}
              title="Expand chat"
              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#C1D0E1] hover:text-white hover:bg-[#1A4678]"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMinimized(false);
                closeChat();
                triggerRef.current?.focus();
              }}
              aria-label={`Close ${TOOLORA_ASSISTANT_NAME}`}
              title="Close chat"
              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#C1D0E1] hover:text-white hover:bg-[#1A4678]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Assistant Panel */}
      {isOpen && !isMinimized && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label={`${TOOLORA_ASSISTANT_NAME} — ${TOOLORA_ASSISTANT_SUBTITLE}`}
          className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[min(620px,calc(100dvh-6.5rem))] flex flex-col bg-white rounded-2xl border border-[#C8D7E8] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#12345A] text-white px-4 py-3.5 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-[#1A4678] border border-[#2B5D96] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-sm text-white truncate">
                  {TOOLORA_ASSISTANT_NAME}
                </h2>
                <p className="text-[11px] text-[#DCE6F2] truncate">{TOOLORA_ASSISTANT_SUBTITLE}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClearChat}
                disabled={messages.length <= 1}
                aria-label="Clear conversation"
                title="Clear conversation"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#C1D0E1] hover:text-white hover:bg-[#1A4678] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                aria-label={`Minimize ${TOOLORA_ASSISTANT_NAME}`}
                title="Minimize chat"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#C1D0E1] hover:text-white hover:bg-[#1A4678] transition-colors"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  closeChat();
                  triggerRef.current?.focus();
                }}
                aria-label={`Close ${TOOLORA_ASSISTANT_NAME}`}
                title="Close chat"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#C1D0E1] hover:text-white hover:bg-[#1A4678] transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Message History */}
          <div
            aria-live="polite"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8FBFF]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#12345A] text-white px-3.5 py-2.5 text-sm leading-relaxed break-words shadow-xs">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[94%] rounded-2xl rounded-bl-sm bg-white border border-[#DCE5F0] px-3.5 py-3 shadow-xs space-y-3">
                    <FormattedAssistantMessage content={msg.content} />
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="pt-2 border-t border-[#EDF2F7] flex flex-wrap gap-2">
                        {msg.actions.map((action) => (
                          <Link
                            key={`${msg.id}-${action.to}-${action.label}`}
                            to={action.to}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                              action.variant === 'primary'
                                ? 'bg-[#12345A] text-white hover:bg-[#1A4678]'
                                : 'bg-[#F5F8FC] border border-[#C8D7E8] text-[#12345A] hover:border-[#16C6C9] hover:bg-white'
                            }`}
                          >
                            <span>{action.label}</span>
                            <ArrowUpRight
                              className={`w-3.5 h-3.5 ${
                                action.variant === 'primary' ? 'text-[#16C6C9]' : 'text-[#0FA7AA]'
                              }`}
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Suggested Prompt Chips */}
            {showSuggestions && (
              <div className="pt-1 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5B708B]">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TOOLORA_SUGGESTED_QUESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handlePromptSend(suggestion)}
                      className="text-left text-xs font-medium text-[#12345A] bg-white border border-[#C8D7E8] hover:border-[#16C6C9] hover:bg-[#EEF6FB] rounded-lg px-2.5 py-1.5 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Composer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-[#DCE5F0] shrink-0"
          >
            <div className="flex items-end gap-2">
              <label htmlFor="toolora-assistant-input" className="sr-only">
                Ask Toolora Assistant a question
              </label>
              <textarea
                id="toolora-assistant-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSend(input);
                  }
                }}
                placeholder={`Ask about any of our ${ALL_TOOLS.length} tools...`}
                className="flex-1 min-h-[42px] max-h-28 resize-none rounded-xl border border-[#C8D7E8] bg-[#F8FBFF] px-3 py-2.5 text-sm text-[#10243E] placeholder:text-[#6B809A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="h-[42px] w-[42px] inline-flex items-center justify-center rounded-xl bg-[#12345A] text-white hover:bg-[#1A4678] transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-[#5B708B]">
              Instant local guide to all {ALL_TOOLS.length} tools · Enter to send
            </p>
          </form>
        </section>
      )}

      {/* Floating Assistant Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (isOpen && isMinimized) {
            setIsMinimized(false);
          } else {
            toggleChat();
          }
        }}
        aria-expanded={isOpen && !isMinimized}
        aria-label={
          isOpen && !isMinimized ? `Close ${TOOLORA_ASSISTANT_NAME}` : `Open ${TOOLORA_ASSISTANT_NAME}`
        }
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 h-12 px-4 rounded-full bg-[#12345A] text-white border border-[#244E7E] shadow-lg hover:bg-[#1A4678] hover:border-[#16C6C9] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16C6C9]"
      >
        <span className="w-7 h-7 rounded-full bg-[#16C6C9]/20 text-[#16C6C9] inline-flex items-center justify-center shrink-0">
          {isOpen && !isMinimized ? (
            <X className="w-4 h-4" aria-hidden="true" />
          ) : (
            <MessageSquareText className="w-4 h-4" aria-hidden="true" />
          )}
        </span>
        <span className="font-display font-semibold text-sm whitespace-nowrap">
          {isOpen && !isMinimized ? 'Close Assistant' : TOOLORA_ASSISTANT_NAME}
        </span>
      </button>
    </>
  );
}
