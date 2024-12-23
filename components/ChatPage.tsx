import React, { useEffect, useRef } from 'react';
import { useChat } from "ai/react";

import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {}

function ChatPage({ }: Props) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
    });

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(event);
        const target = event.target;
        target.style.height = 'auto';
        target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
    };

    return (
        <div className='flex justify-center  h-full w-full overflow-scroll mb-5'>
            <div className="chat flex flex-col w-full max-w-screen-lg py-24 mx-auto stretch">
                {messages.map(m => (
                    <div key={m.id} className={`whitespace-pre-wrap m-5 ${m.role === 'user' ? 'chat-end' : 'chat-start'}`}>

                        {m.toolInvocations ? (
                            <>
                                <div className='chat-header'>
                                    {m.role === 'user' ? 'User' : 'AI'}
                                </div>
                                <div className='chat-bubble'>
                                    <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='chat-header'>
                                    {m.role === 'user' ? 'User' : 'AI'}
                                </div>

                                <div className={`chat-bubble ${m.role === 'user' ? 'bg-[#262626]' : 'bg-[#393939]'}`}>
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || "");
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
                <form onSubmit={handleSubmit} className='flex justify-center'>
                    <input
                        className="fixed bottom-0 w-full max-w-screen-sm p-2 m-3 border border-gray-300 rounded shadow-xl"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChatPage;