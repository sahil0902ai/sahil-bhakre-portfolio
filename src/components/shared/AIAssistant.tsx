'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronDown, MessageSquare, Terminal } from 'lucide-react';
import { generateAssistantResponse, ChatMessage } from '@lib/aiAssistant';

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'Which technologies do you use?',
  'Tell me about your projects',
  'Explain your development process',
  'Recommend the best solution for my business',
  'Summarize your experience & background',
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: '👋 Hi! I am Sahil\'s **AI Portfolio Assistant**. I am trained on Sahil\'s real engineering case studies, tech stack, and services.\n\nHow can I help your team today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate RAG retrieval & streaming token delay
    setTimeout(() => {
      const { responseText, topicTitle } = generateAssistantResponse(query);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topicRef: topicTitle,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: '👋 Chat reset! I am ready to answer any questions about Sahil\'s AI automation systems, Playwright scrapers, Next.js 15 web apps, or client pricing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Portfolio Assistant"
          className="relative group p-4 rounded-full bg-accent-gradient text-text-primary shadow-2xl flex items-center justify-center border border-accent-primary/40 hover:shadow-glow transition-all btn-micro"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-success animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-success" />
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Glassmorphic Modal Window / Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[620px] h-[80vh] rounded-2xl border border-border-subtle bg-bg-surface/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden no-print"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-border-subtle/50 bg-bg-inset/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                    AI Portfolio Assistant <Sparkles className="h-3.5 w-3.5 text-accent-primary" />
                  </h3>
                  <span className="text-[10px] font-mono text-accent-success block">RAG Trained & Ready</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-inset transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  aria-label="Close Assistant"
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-inset transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-left">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className={`space-y-1 max-w-[82%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-accent-gradient text-text-primary rounded-tr-none font-medium'
                          : 'bg-bg-inset border border-border-subtle/60 text-text-secondary rounded-tl-none'
                      }`}
                    >
                      {msg.text.split('\n').map((line, lIdx) => {
                        // Formatting basic Markdown bold & links
                        const formattedLine = line
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-accent-primary underline font-semibold">$1</a>');

                        return (
                          <p key={lIdx} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mb-1 last:mb-0" />
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[9px] font-mono text-text-muted">
                      <span>{msg.timestamp}</span>
                      {msg.topicRef && (
                        <span className="text-accent-primary font-semibold border-l border-border-subtle/50 pl-1.5">
                          {msg.topicRef}
                        </span>
                      )}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-bg-inset border border-border-subtle text-text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Animation Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg-inset border border-border-subtle/60 text-text-muted rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] font-mono ml-2">Searching knowledge base...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="p-3 border-t border-border-subtle/40 bg-bg-inset/30 space-y-2">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Suggested Questions</span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isTyping}
                    className="px-2.5 py-1 rounded-full border border-border-subtle bg-bg-surface text-[10px] text-text-secondary hover:text-text-primary hover:border-accent-primary transition-colors text-left btn-micro"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-border-subtle/50 bg-bg-inset flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, tech stack, or pricing..."
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-ring transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || isTyping}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-accent-gradient text-text-primary hover:shadow-glow transition-all disabled:opacity-50 btn-micro shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
