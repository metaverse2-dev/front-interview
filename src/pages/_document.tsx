import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import { Header } from "@/component/common/Header";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{"Todo List"}</title>
      </Head>
      <body>
        <Header/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
