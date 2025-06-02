"use client";
import { useState, useRef, useEffect } from "react";
import { InputArea, MessagesArea, type Message, type Suggestion } from "~/app/_components/dashboard/message-area";
import Sidebar from "~/app/_components/dashboard/side-bar";
import { Header } from "~/app/_components/dashboard/header";
import { VideosContent } from "~/app/_components/dashboard/videos-content";
// Videos Content Component


// Main Component
export default function DoctorChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState("ai-chat");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Placeholder function to fetch trending suggestions
    const fetchTrendingSuggestions = async (): Promise<Suggestion[]> => {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: "1", text: "Winter flu symptoms", icon: "🤒" },
            { id: "2", text: "Healthy sleep habits", icon: "😴" },
            { id: "3", text: "Exercise for beginners", icon: "💪" },
            { id: "4", text: "Stress management tips", icon: "🧘" },
            { id: "5", text: "Nutrition guidelines", icon: "🥗" },
            { id: "6", text: "Mental health support", icon: "🧠" }
        ];
    };

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Fetch trending suggestions on component mount
        fetchTrendingSuggestions().then(setSuggestions);
    }, []);

    const handleSubmit: (e: React.FormEvent) => Promise<void> = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: "This is a placeholder AI response. Replace with actual API integration.",
                role: "assistant",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestionClick = (suggestionText: string): void => {
        setInput(suggestionText);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                <Header 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeTab={activeTab}
                />

                {/* Content Area */}
                {activeTab === "ai-chat" ? (
                    <>
                        <MessagesArea 
                            messages={messages}
                            isTyping={isTyping}
                            messagesEndRef={messagesEndRef}
                        />
                        <InputArea 
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                            suggestions={suggestions}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    </>
                ) : (
                    <VideosContent />
                )}
            </div>
        </div>
    );
}