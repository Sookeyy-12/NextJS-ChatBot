'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
    });
    return (
        <div className="chat flex flex-col w-full max-w-screen-sm py-24 mx-auto stretch bg-black">
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
                        <div className={`chat-bubble ${m.role === 'user' ? 'bg-slate-800' : 'bg-slate-900'}`}>
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                    </>
                    )}
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    className="fixed bottom-0 w-full max-w-screen-sm p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}