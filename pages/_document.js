import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head lang="en">
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>
            <body>
                <div className="screen">
                    <div className='screen-contents'>
                        <Main />
                    </div>
                </div>
                <NextScript />
            </body>
        </Html>
    )
}
