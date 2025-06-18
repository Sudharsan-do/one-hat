"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    InputArea,
    MessagesArea,
    type Message,
    type Suggestion,
} from "~/app/_components/dashboard/message-area";
import Sidebar from "~/app/_components/dashboard/side-bar";
import { Header } from "~/app/_components/dashboard/header";
import { VideosContent } from "~/app/_components/dashboard/videos-content";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

interface SendMessageResponse {
    message: string;
    finalized: boolean;
}


const TRENDING_SUGGESTIONS: Suggestion[] = [
    { id: "1", text: "Winter flu symptoms", icon: "🤒" },
    { id: "2", text: "Healthy sleep habits", icon: "😴" },
    { id: "3", text: "Exercise for beginners", icon: "💪" },
    { id: "4", text: "Stress management tips", icon: "🧘" },
    { id: "5", text: "Nutrition guidelines", icon: "🥗" },
    { id: "6", text: "Mental health support", icon: "🧠" },
];

const fetchTrendingSuggestions = async (): Promise<Suggestion[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return TRENDING_SUGGESTIONS;
};

export default function DoctorChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("ai-chat");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isFinalized, setIsFinalized] = useState<boolean>(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { data: fetchedMessages } = api.messages.fetchMessages.useQuery();
    const sendMessageMutation = api.messages.send.useMutation({
        onSuccess: (data: SendMessageResponse) => {
            const aiResponse: Message = {
                id: `${Date.now() + 1}`,
                content: data.message,
                role: "assistant",
            };
            setMessages((prev) => [...prev, aiResponse]);
            if (data.finalized) {
                setIsFinalized(true);
                toast.success(
                    "Your video will be ready soon. Check My videos tab for updates."
                );
            }
            setIsTyping(false);
        },
        onError: (error) => {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message. Please try again later.");
            setIsTyping(false);
        },
    });
    const deleteMessagesMutation = api.messages.deleteMessages.useMutation({
        onSuccess: () => {
            setMessages([]);
            setIsFinalized(false);
            setInput("");
            toast.success("Video generation started! Starting new chat...");
            setIsGeneratingVideo(false);
        },
        onError: (error) => {
            console.error("Failed to generate video:", error);
            toast.error("Failed to generate video. Please try again.");
            setIsGeneratingVideo(false);
        },
    });
    const scrollToBottom = useCallback((): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    const handleSubmit = useCallback(async (e: React.FormEvent<Element>): Promise<void> => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isFinalized) return;
        const userMessage: Message = {
            id: `${Date.now()}`,
            content: trimmedInput,
            role: "user",
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        sendMessageMutation.mutate(trimmedInput);
    }, [input, isFinalized, sendMessageMutation]);
    const handleGenerateVideo = useCallback(async (): Promise<void> => {
        setIsGeneratingVideo(true);
        setMessages([]);
        deleteMessagesMutation.mutate();
    }, [deleteMessagesMutation]);
    const handleSuggestionClick = useCallback((suggestionText: string): void => {
        if (!isFinalized) {
            setInput(suggestionText);
        }
    }, [isFinalized]);
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);
    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);
    useEffect(() => {
        let isMounted = true;
        const loadSuggestions = async () => {
            try {
                const data = await fetchTrendingSuggestions();
                if (isMounted) {
                    setSuggestions(data);
                }
            } catch (error) {
                console.error("Failed to load suggestions:", error);
                if (isMounted) {
                    setSuggestions(TRENDING_SUGGESTIONS);
                }
            }
        };
        void loadSuggestions();
        return () => {
            isMounted = false;
        };
    }, []);
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div className="flex flex-1 flex-col">
                <Header 
                    setSidebarOpen={setSidebarOpen} 
                    activeTab={activeTab} 
                />
                {activeTab === "ai-chat" ? (
                    <>
                        <MessagesArea
                            messages={messages}
                            isTyping={isTyping}
                            messagesEndRef={messagesEndRef}
                            isFinalized={isFinalized}
                            isGeneratingVideo={isGeneratingVideo}
                            onGenerateVideo={handleGenerateVideo}
                        />
                        <InputArea
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                            suggestions={suggestions}
                            onSuggestionClick={handleSuggestionClick}
                            isFinalized={isFinalized}
                        />
                    </>
                ) : (
                    <VideosContent />
                )}
            </div>
        </div>
    );
}