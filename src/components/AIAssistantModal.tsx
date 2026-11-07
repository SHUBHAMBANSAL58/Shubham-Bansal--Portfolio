import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  Search,
  ExternalLink,
  RotateCcw,
  Cpu,
  Zap,
  Layers,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { AnalyticsEvents } from '../utils/firebaseAnalytics';
import { doc, setDoc } from 'firebase/firestore';
import { db as firestore } from '../lib/firebase';

interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
  modelUsed?: string;
}

export type AssistantRole = 'portfolio_guide' | 'technical_architect' | 'fast_qa';
export type GeminiModel = 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'assistant',
  content: `Hello! I am Shubham Bansal's AI Assistant powered by Google Gemini. I am grounded in his verified portfolio data, project architectures, verified internships (CodSoft, CodeAlpha, Thiranex), and credentials.

You can ask me about his technical stack, case studies, or switch roles for deeper architecture reviews or rapid Q&A. How can I assist you today?`,
  timestamp: 'Just now',
  modelUsed: 'gemini-3.8-flash',
};

const PROMPT_SUGGESTIONS: Record<AssistantRole, string[]> = {
  portfolio_guide: [
    'Who is Shubham Bansal?',
    'What internships has he completed?',
    'Tell me about SkillSync AI',
    'What verified credentials does he hold?',
    'How do I contact him?'
  ],
  technical_architect: [
    'Explain the 4-tier architecture of SkillSync AI',
    'How does his Agile Kanban tool manage task state?',
    'What database schema does the E-commerce Store use?',
    'Compare MongoDB vs SQLite in his projects'
  ],
  fast_qa: [
    'Is Shubham open to internships right now?',
    'What is his email address?',
    'Which college is he attending?',
    'List his top 3 frontend skills'
  ],
};

const STORAGE_KEY = 'sb_gemini_chat_history_v2';
const SESSION_ID_KEY = 'sb_gemini_chat_session_id';

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // Fallback to default
      }
    }
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [role, setRole] = useState<AssistantRole>('portfolio_guide');
  const [model, setModel] = useState<GeminiModel>('gemini-3.8-flash');
  const [enableSearchGrounding, setEnableSearchGrounding] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let currentSessionId = localStorage.getItem(SESSION_ID_KEY);
      if (!currentSessionId) {
        currentSessionId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem(SESSION_ID_KEY, currentSessionId);
      }
      setSessionId(currentSessionId);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Ignore quota errors
      }
    }
  }, [messages]);

  // Sync scroll on open and message changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, messages, isTyping]);

  // Adjust model automatically when role switches (fast_qa defaults to gemini-3.1-flash-lite)
  const handleRoleChange = (newRole: AssistantRole) => {
    setRole(newRole);
    if (newRole === 'fast_qa') {
      setModel('gemini-3.1-flash-lite');
    } else if (newRole === 'technical_architect') {
      setModel('gemini-4-argon');
    } else {
      setModel('gemini-3.8-flash');
    }
  };

  const handleClearChat = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setErrorBanner(null);
  };

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    setErrorBanner(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update messages array with user's question
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Build server request payload with conversation history
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          role,
          model,
          enableSearch: enableSearchGrounding,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `HTTP error ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingSources: data.groundingSources || [],
        searchQueries: data.searchQueries || [],
        modelUsed: data.modelUsed || model,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Telemetry & Firestore session tracking
      AnalyticsEvents.trackAskAIAssistantClicked();

      if (sessionId) {
        try {
          const sessionRef = doc(firestore, 'chatSessions', sessionId);
          setDoc(
            sessionRef,
            {
              sessionId,
              role,
              model: data.modelUsed || model,
              messagesCount: updatedMessages.length + 1,
              lastMessageSnippet: queryText.slice(0, 150),
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          ).catch((e) => console.debug('Firestore session update note:', e));
        } catch {
          // Non-blocking
        }
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errMsg = err instanceof Error ? err.message : 'Connection interrupted.';
      setErrorBanner(errMsg);

      // Graceful offline assistant fallback grounded in core portfolio facts
      const fallbackReply = `I encountered a network issue communicating with the live Gemini endpoint (${errMsg}).

Here is Shubham's verified information:
• Role: Aspiring Full Stack Developer & AI Enthusiast (2nd Year B.Tech CSE, IMS Engineering College, AKTU).
• Core Stack: React.js, Node.js, Express.js, MongoDB, SQLite, Python, Tailwind CSS.
• Internships: CodSoft, CodeAlpha, Thiranex, and MyGov India.
• Contact: bansalshubham182@gmail.com | LinkedIn: linkedin.com/in/shubham-bansal-600099424.`;

      const fallbackMsg: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'offline-grounded-fallback',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gemini-chat-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[680px] max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="gemini-chat-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Gemini Portfolio Chatbot
                </h2>
                <span className="text-[10px] font-mono font-medium text-indigo-700 dark:text-cyan-300 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-cyan-950/80 border border-indigo-200 dark:border-cyan-800/50">
                  Multi-Turn
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grounded in Shubham Bansal's verified resume, repositories & web data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearChat}
              title="Clear conversation history"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Clear chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Gemini chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Persona Role & Model Controls Strip */}
        <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          {/* Persona Roles */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 font-medium mr-1">
              Role:
            </span>
            <button
              type="button"
              onClick={() => handleRoleChange('portfolio_guide')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                role === 'portfolio_guide'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Portfolio Guide</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('technical_architect')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                role === 'technical_architect'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Architect</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('fast_qa')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                role === 'fast_qa'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fast Q&A</span>
            </button>
          </div>

          {/* Model Selector & Google Search Grounding Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Model Badge / Dropdown */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-0.5">
              <Cpu className="w-3 h-3 text-indigo-500" />
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as GeminiModel)}
                className="bg-transparent text-[11px] font-mono text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                aria-label="Select Gemini model"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (General + Search)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                <option value="gemini-4-argon">gemini-4-argon (Complex Tasks)</option>
              </select>
            </div>

            {/* Google Search Grounding Toggle */}
            <button
              type="button"
              onClick={() => setEnableSearchGrounding(!enableSearchGrounding)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors border cursor-pointer ${
                enableSearchGrounding
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
              title={enableSearchGrounding ? 'Google Search Grounding active' : 'Click to enable Google Search Grounding'}
            >
              <Globe className="w-3 h-3 text-emerald-500" />
              <span>Search Grounding: {enableSearchGrounding ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Error Banner if applicable */}
        {errorBanner && (
          <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
              <span>{errorBanner}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorBanner(null)}
              className="text-[11px] font-medium underline hover:text-rose-900 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Chat History Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 sm:p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm whitespace-pre-wrap'
                }`}
              >
                {/* Content */}
                <div className="space-y-2">{msg.content}</div>

                {/* Grounding Sources (Search Grounding Results) */}
                {msg.groundingSources && msg.groundingSources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-1.5">
                      <Search className="w-3 h-3" />
                      <span>Google Search Grounding Sources:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingSources.slice(0, 4).map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors shadow-2xs"
                        >
                          <span className="truncate max-w-[180px]">{source.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Timestamp and Model Used */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-1 text-[10px] opacity-70 font-mono">
                  <span>{msg.timestamp}</span>
                  {msg.modelUsed && (
                    <span className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10">
                      {msg.modelUsed}
                    </span>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-mono pl-10 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span>
                Gemini {model} {enableSearchGrounding && model === 'gemini-3.8-flash' ? 'grounding with Google Search...' : 'generating reasoning response...'}
              </span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Suggested:
          </span>
          {PROMPT_SUGGESTIONS[role].map((suggestion, sIdx) => (
            <button
              key={sIdx}
              type="button"
              onClick={() => handleSend(suggestion)}
              disabled={isTyping}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                role === 'technical_architect'
                  ? 'Ask for architecture breakdown, data flow, or system comparisons...'
                  : role === 'fast_qa'
                  ? 'Ask a quick question about Shubham...'
                  : 'Ask about Shubham\'s skills, projects, or live web info...'
              }
              className="flex-1 px-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Strict Disclosure */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Multi-turn Gemini AI Chatbot · Grounded in verified portfolio & Google Search data</span>
            </span>
            <span>Active Model: {model}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
