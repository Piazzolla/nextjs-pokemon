import Head from "next/head"
import { FC } from "react"

type Props = {
    children: React.ReactNode,
    title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
    console.log(title);
  return (
    <>
        <Head>
            <title>{ title || "Pokemon App"}</title>
            <meta name="author" content="Fernando Herrera" />
            <meta name="description" content={`Informacion sobre el pokemon ${ title }`} />
            <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
        </Head>
        { /* nAVBAR */ }
        <main>
            <h1>Layout</h1>
            { children }
        </main>
    </>
  )
}

