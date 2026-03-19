'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from "ai/react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconSend } from "@tabler/icons-react";

function ChatPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        maxSteps: 5,
    });

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [isComposing, setIsComposing] = useState(false);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const form = target.form;
            if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
        }
    };

    const isEmpty = messages.length === 0;

    return (
        <div className='flex flex-col h-full w-full bg-[#0f1117] relative'>
            {/* Messages container */}
            <div className='flex-1 overflow-y-auto flex flex-col'>
                {isEmpty ? (
                    // Empty state
                    <div className='flex-1 flex flex-col items-center justify-center gap-4'>
                        <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center'>
                            <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-semibold text-[#e5e7eb]'>How can I help you today?</h2>
                        <p className='text-sm text-[#6b7280]'>Powered by Gemini</p>
                    </div>
                ) : (
                    // Messages
                    <div className='flex flex-col gap-4 py-6 px-4'>
                        {messages.map((m) => (
                            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    m.role === 'user'
                                        ? 'bg-[#1a2744]'
                                        : 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb]'
                                }`}>
                                    {m.role === 'user' ? (
                                        <span className='text-xs font-semibold text-[#e5e7eb]'>You</span>
                                    ) : (
                                        <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' />
                                        </svg>
                                    )}
                                </div>

                                {/* Message bubble */}
                                <div className={`max-w-xl px-4 py-3 rounded-2xl ${
                                    m.role === 'user'
                                        ? 'bg-[#1a2744] border border-[#2a4a7c]'
                                        : 'bg-[#1c1c22] border border-[#2a2a33]'
                                }`}>
                                    {m.toolInvocations ? (
                                        <div className='text-xs text-[#6b7280] whitespace-pre-wrap font-mono'>
                                            Tool call: {m.toolInvocations[0]?.toolName}
                                        </div>
                                    ) : (
                                        <div className='text-[#e5e7eb] text-sm leading-relaxed'>
                                            <ReactMarkdown
                                                components={{
                                                    code({ inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                style={vscDarkPlus}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                {...props}
                                                                customStyle={{
                                                                    margin: '8px 0',
                                                                    borderRadius: '6px',
                                                                }}
                                                            >
                                                                {String(children).replace(/\n$/, "")}
                                                            </SyntaxHighlighter>
                                                        ) : (
                                                            <code className='bg-[#0f1117] px-1.5 py-0.5 rounded text-[#3b82f6] font-mono text-xs' {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                                                    ul: ({ children }) => <ul className='list-disc list-inside mb-2'>{children}</ul>,
                                                    ol: ({ children }) => <ol className='list-decimal list-inside mb-2'>{children}</ol>,
                                                    li: ({ children }) => <li className='mb-1'>{children}</li>,
                                                }}
                                            >
                                                {m.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input area - floating pill */}
            <div className='flex justify-center items-end px-4 py-4 bg-gradient-to-t from-[#0f1117] to-transparent'>
                <form onSubmit={handleSubmit} className='w-full max-w-2xl'>
                    <div className='flex items-end gap-2 bg-[#1c1c22] border border-[#2a2a33] rounded-full px-4 py-2 focus-within:border-[#3b82f6] transition-colors'>
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)}
                            placeholder='Message...'
                            rows={1}
                            className='flex-1 bg-transparent text-[#e5e7eb] placeholder-[#6b7280] outline-none resize-none max-h-24 text-sm'
                            style={{ minHeight: '24px' }}
                        />
                        <button
                            type='submit'
                            disabled={isLoading || !input.trim()}
                            className='flex-shrink-0 w-8 h-8 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#6b7280] disabled:cursor-not-allowed transition-colors flex items-center justify-center'
                            title='Send message'
                        >
                            <IconSend className='w-4 h-4 text-white' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatPage;