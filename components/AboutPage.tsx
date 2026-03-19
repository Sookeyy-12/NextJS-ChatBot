import React from 'react';
import Link from 'next/link';

function AboutPage() {
    return (
        <div className='flex justify-center items-center h-full w-full bg-[#0f1117] px-4'>
            <div className='bg-[#1c1c22] border border-[#2a2a33] rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-6'>
                {/* Avatar */}
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center'>
                    <span className='text-3xl font-bold text-white'>SK</span>
                </div>

                {/* Name */}
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-[#e5e7eb] mb-1'>Suket Kamboj</h1>
                    <p className='text-[#6b7280]'>Full Stack Developer · India</p>
                </div>

                {/* Divider */}
                <div className='w-full h-px bg-[#2a2a33]'></div>

                {/* Links */}
                <div className='w-full flex flex-col gap-3'>
                    <Link
                        href='https://linkedin.com/in/suket-kamboj-212416255'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-full py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg text-center transition-colors'
                    >
                        LinkedIn
                    </Link>
                    <Link
                        href='https://github.com/sookeyy-12/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-full py-2 px-4 bg-[#2a2a33] hover:bg-[#393939] text-[#e5e7eb] font-medium rounded-lg text-center transition-colors'
                    >
                        GitHub
                    </Link>
                </div>

                {/* Footer note */}
                <p className='text-xs text-[#6b7280] text-center'>
                    Built with Next.js and Gemini API
                </p>
            </div>
        </div>
    );
}

export default AboutPage;
