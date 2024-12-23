import React from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect';

type Props = {}

function AboutPage({ }: Props) {
    return (
        <div className='flex justify-center items-center flex-col h-full text-white'>
            <div className='text-2xl'>
                Hey There!
            </div>
            <div className='text-4xl'>
                I am Suket Kamboj
            </div><br></br>
            <div className='text-xl'>
                A 21-year-old Developer from India.
            </div>
            <div className='text-xl'>
                Connect with me on my <a className='text-orange-300' href='https://linkedin.com/in/suket-kamboj-212416255'>Linkedin</a> or check out my <a className='text-orange-300' href='https://github.com/sookeyy-12/'>Github</a>.
            </div><br></br>
            <div className='text-xl'>
                P.S. I am still building this page.
            </div>
        </div>
    )
}

export default AboutPage;
