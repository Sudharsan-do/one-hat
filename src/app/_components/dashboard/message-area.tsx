import { AnimatePresence, motion } from "framer-motion";

export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
}

export interface Suggestion {
    id: string;
    text: string;
    icon: string;
}

function MessageBubble({ message }: { message: Message }) {
    return (
        <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8"
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    message.role === "user" 
                        ? "bg-blue-500 text-white" 
                        : "bg-teal-500 text-white"
                }`}>
                    {message.role === "user" ? "U" : "AI"}
                </div>
                
                {/* Message Content */}
                <div className="flex-1 min-w-0">
                    <div className="mb-1">
                        <span className="text-sm font-medium text-gray-900">
                            {message.role === "user" ? "You" : "AI Assistant"}
                        </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Typing Indicator Component
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white">
                    AI
                </div>
                <div className="flex-1 min-w-0">
                    <div className="mb-1">
                        <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Trending Suggestions Component
function TrendingSuggestions({
    suggestions,
    onSuggestionClick,
}: {
    suggestions: Suggestion[];
    onSuggestionClick: (suggestionText: string) => void;
}) {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Trending Health Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        onClick={() => onSuggestionClick(suggestion.text)}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors border border-teal-200 hover:border-teal-300"
                    >
                        <span className="mr-1">{suggestion.icon}</span>
                        {suggestion.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Welcome Screen Component
function WelcomeScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to your AI Health Assistant</h3>
            <p className="text-gray-500 max-w-md">Ask me anything about your health, symptoms, or wellness tips. I&apos;m here to help!</p>
        </div>
    );
}

// Input Area Component
export function InputArea({
    input,
    setInput,
    handleSubmit,
    isTyping,
    suggestions,
    onSuggestionClick,
}: {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isTyping: boolean;
    suggestions: Suggestion[];
    onSuggestionClick: (suggestionText: string) => void;
}) {
    return (
        <div className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-4xl px-4 py-4">
                <TrendingSuggestions 
                    suggestions={suggestions} 
                    onSuggestionClick={onSuggestionClick}
                />
                <div>
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        void handleSubmit(e);
                                    }
                                }}
                                placeholder="Ask me about your health..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                rows={1}
                                style={{ minHeight: '44px' }}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-teal-500 text-white transition-colors hover:bg-teal-600 disabled:bg-gray-300"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Press Enter to send, Shift+Enter for new line
                    </div>
                </div>
            </div>
        </div>
    );
}

// Messages Area Component
export function MessagesArea({
    messages,
    isTyping,
    messagesEndRef,
}: {
    messages: Message[];
    isTyping: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <div className="mx-auto max-w-4xl px-4 py-6">
                {messages.length === 0 && <WelcomeScreen />}

                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && <TypingIndicator />}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}