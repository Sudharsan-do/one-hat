import { AnimatePresence, motion } from "framer-motion";

export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
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

// Generate Video Button Component
function GenerateVideoButton({ 
    isGeneratingVideo, 
    onGenerateVideo 
}: { 
    isGeneratingVideo: boolean; 
    onGenerateVideo: () => void; 
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
        >
            <button
                onClick={onGenerateVideo}
                disabled={isGeneratingVideo}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isGeneratingVideo ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Video...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Generate New Video
                    </>
                )}
            </button>
        </motion.div>
    );
}

// Chat Finalized Message Component
function ChatFinalizedMessage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                            Chat session completed! Your video is being generated.
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                            You can start a new conversation by generating a new video.
                        </p>
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
    isDisabled,
}: {
    suggestions: Suggestion[];
    onSuggestionClick: (suggestionText: string) => void;
    isDisabled: boolean;
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
                        disabled={isDisabled}
                        className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border ${
                            isDisabled
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 hover:border-teal-300"
                        }`}
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
    isFinalized,
}: {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isTyping: boolean;
    suggestions: Suggestion[];
    onSuggestionClick: (suggestionText: string) => void;
    isFinalized: boolean;
}) {
    return (
        <div className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-4xl px-4 py-4">
                <TrendingSuggestions 
                    suggestions={suggestions} 
                    onSuggestionClick={onSuggestionClick}
                    isDisabled={isFinalized}
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
                                placeholder={isFinalized ? "Chat session completed. Generate a new video to continue..." : "Ask me about your health..."}
                                disabled={isFinalized}
                                className={`w-full resize-none rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-1 ${
                                    isFinalized
                                        ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                        : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                }`}
                                rows={1}
                                style={{ minHeight: '44px' }}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!input.trim() || isTyping || isFinalized}
                                className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                                    !input.trim() || isTyping || isFinalized
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-teal-500 text-white hover:bg-teal-600"
                                }`}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        {isFinalized 
                            ? "Generate a new video to start a new conversation"
                            : "Press Enter to send, Shift+Enter for new line"
                        }
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
    isFinalized,
    isGeneratingVideo,
    onGenerateVideo,
}: {
    messages: Message[];
    isTyping: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    isFinalized: boolean;
    isGeneratingVideo: boolean;
    onGenerateVideo: () => void;
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

                {/* Chat Finalized Message */}
                {isFinalized && <ChatFinalizedMessage />}

                {/* Generate Video Button - Show when finalized */}
                {isFinalized && (
                    <GenerateVideoButton
                        isGeneratingVideo={isGeneratingVideo}
                        onGenerateVideo={onGenerateVideo}
                    />
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}