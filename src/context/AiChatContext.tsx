import { createContext, useContext, useState, type ReactNode } from 'react';

interface AiChatContextValue {
  isOpen: boolean;
  openChat: (prefillPrompt?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  queuedPrompt: string | null;
  clearQueuedPrompt: () => void;
}

const AiChatContext = createContext<AiChatContextValue | null>(null);

export function AiChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [queuedPrompt, setQueuedPrompt] = useState<string | null>(null);

  const openChat = (prefillPrompt?: string) => {
    if (prefillPrompt && prefillPrompt.trim()) {
      setQueuedPrompt(prefillPrompt.trim());
    }
    setIsOpen(true);
  };

  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);
  const clearQueuedPrompt = () => setQueuedPrompt(null);

  return (
    <AiChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        queuedPrompt,
        clearQueuedPrompt,
      }}
    >
      {children}
    </AiChatContext.Provider>
  );
}

export function useAiChat(): AiChatContextValue {
  const ctx = useContext(AiChatContext);
  if (!ctx) {
    return {
      isOpen: false,
      openChat: () => undefined,
      closeChat: () => undefined,
      toggleChat: () => undefined,
      queuedPrompt: null,
      clearQueuedPrompt: () => undefined,
    };
  }
  return ctx;
}
