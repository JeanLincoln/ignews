import Document, {Html, Head, Main, NextScript} from '../../node_modules/next/document'

export default class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <title>ig.news</title>
                </Head>
                <body>
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        )
    }
}