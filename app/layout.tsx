import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Script
            id="umami"
            async
            defer
            data-website-id="1eda7ce5-23e7-4f91-b95b-e6c0f9c3635c"
            strategy="afterInteractive"
          >
            {`
              function initUmami() {
                ${umamiScript}
              }
              initUmami();
            `}
          </Script>
          {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mb-auto">{children}</main>
            </SearchProvider>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}

const umamiScript =
  '!function(){"use strict";(t=>{const{screen:{width:e,height:a},navigator:{language:r},location:n,document:i,history:c}=t,{hostname:s,href:o,origin:u}=n,{currentScript:l,referrer:d}=i,h=o.startsWith("data:")?void 0:t.localStorage;if(!l)return;const m="data-",f=l.getAttribute.bind(l),p=f(m+"website-id"),g=f(m+"host-url"),y=f(m+"tag"),b="false"!==f(m+"auto-track"),v="true"===f(m+"exclude-search"),w=f(m+"domains")||"",S=w.split(",").map((t=>t.trim())),N=`${(g||"https://api-gateway.umami.dev"||l.src.split("/").slice(0,-1).join("/")).replace(//$/,"")}/api/send`,T=`${e}x${a}`,A=/data-umami-event-([w-_]+)/,x=m+"umami-event",O=300,U=t=>{if(t){try{const e=decodeURI(t);if(e!==t)return e}catch(e){return t}return encodeURI(t)}},j=t=>{try{const{pathname:e,search:a,hash:r}=new URL(t,n.href);t=e+a+r}catch(t){}return v?t.split("?")[0]:t},k=()=>({website:p,hostname:s,screen:T,language:r,title:U(q),url:U(W),referrer:U(_),tag:y||void 0}),E=(t,e,a)=>{a&&(_=W,W=j(a.toString()),W!==_&&setTimeout(K,O))},L=()=>!p||h&&h.getItem("umami.disabled")||w&&!S.includes(s),$=async(t,e="event")=>{if(L())return;const a={"Content-Type":"application/json"};void 0!==B&&(a["x-umami-cache"]=B);try{const r=await fetch(N,{method:"POST",body:JSON.stringify({type:e,payload:t}),headers:a}),n=await r.text();return B=n}catch(t){}},I=()=>{D||(K(),(()=>{const t=(t,e,a)=>{const r=t[e];return(...e)=>(a.apply(null,e),r.apply(t,e))};c.pushState=t(c,"pushState",E),c.replaceState=t(c,"replaceState",E)})(),(()=>{const t=new MutationObserver((([t])=>{q=t&&t.target?t.target.text:void 0})),e=i.querySelector("head > title");e&&t.observe(e,{subtree:!0,characterData:!0,childList:!0})})(),i.addEventListener("click",(async t=>{const e=t=>["BUTTON","A"].includes(t),a=async t=>{const e=t.getAttribute.bind(t),a=e(x);if(a){const r={};return t.getAttributeNames().forEach((t=>{const a=t.match(A);a&&(r[a[1]]=e(t))})),K(a,r)}},r=t.target,i=e(r.tagName)?r:((t,a)=>{let r=t;for(let t=0;t<a;t++){if(e(r.tagName))return r;if(r=r.parentElement,!r)return null}})(r,10);if(!i)return a(r);{const{href:e,target:r}=i,c=i.getAttribute(x);if(c)if("A"===i.tagName){const s="_blank"===r||t.ctrlKey||t.shiftKey||t.metaKey||t.button&&1===t.button;if(c&&e)return s||t.preventDefault(),a(i).then((()=>{s||(n.href=e)}))}else if("BUTTON"===i.tagName)return a(i)}}),!0),D=!0)},K=(t,e)=>$("string"==typeof t?{...k(),name:t,data:"object"==typeof e?e:void 0}:"object"==typeof t?t:"function"==typeof t?t(k()):k()),R=t=>$({...k(),data:t},"identify");t.umami||(t.umami={track:K,identify:R});let B,D,W=j(o),_=d.startsWith(u)?"":d,q=i.title;b&&!L()&&("complete"===i.readyState?I():i.addEventListener("readystatechange",I,!0))})(window)}();'
