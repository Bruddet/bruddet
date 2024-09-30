import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  redirect,
  useRouteLoaderData,
  useLocation,
} from "@remix-run/react";
import "./styles/app.css";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound";
import { LoaderFunction } from "@remix-run/node";
import {
  getLanguageFromPath,
  LanguageProvider,
  useTranslation,
} from "./utils/i18n";
import {
  BackgroundColorProvider,
  useBackgroundColor,
} from "./utils/backgroundColor";
import { SlugProvider } from "./utils/i18n/SlugProvider";
import NoTranslation from "./components/NoTranslation";
import { lazy, Suspense } from "react";
import { ExitPreview } from "./components/ExitPreview";
import { loadQueryOptions } from "../cms/loadQueryOptions.server";
import NewsletterMarquee from "./components/NewsletterMarquee";
import "./styles/global.css";
import StickyFooter from "./components/StickyFooter";

const LiveVisualEditing = lazy(() => import("./components/LiveVisualEditing"));

type ErrorWithStatus = {
  status?: number;
  statusText?: string;
  data: string;
};

export function ErrorBoundary() {
  const error = useRouteError() as ErrorWithStatus;
  console.error(error);

  function ErrorSwitcher() {
    if (error.data == "No translation found") {
      return <NoTranslation />;
    } else {
      return <PageNotFound />;
    }
  }
  return (
    <>
      <title>404 - OPS</title>
      {error?.status === 404 ? (
        ErrorSwitcher()
      ) : (
        <div>
          <h1>Something went wrong</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      )}
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname, search } = new URL(request.url);
  const { preview } = await loadQueryOptions(request.headers);

  const newPathname = pathname.replace(/\/nb/g, "");

  if (newPathname !== pathname) {
    throw redirect(`${newPathname}${search}`, 301);
  }

  if (pathname.endsWith("/") && pathname.length > 1) {
    throw redirect(`${pathname.slice(0, -1)}${search}`, 301);
  }
  const language = getLanguageFromPath(pathname);

  return {
    language: language,
    preview: preview,
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();
  const { color } = useBackgroundColor();

  return (
    <html lang={language} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        ></link>
        <Meta />
        <Links />
      </head>
      <body className={`${color} min-h-screen h-full flex flex-col`}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { language, preview } = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();

  const pathsWithNewsletter = [
    "/",
    "/meny",
    "/program",
    "/meny",
    "/en",
    "/en/meny",
    "/en/program",
  ];

  if (location.pathname.startsWith("/studio")) {
    return <Outlet />;
  }
  return (
    <LanguageProvider language={language}>
      <BackgroundColorProvider>
        <SlugProvider>
          {preview && (
            <Suspense>
              <LiveVisualEditing />
              <ExitPreview />
            </Suspense>
          )}
          <Header />
          <div className="flex flex-col grow min-h-screen font-serif" id="main">
            <Outlet />
            {pathsWithNewsletter.includes(location.pathname) && (
              <>
                <NewsletterMarquee />
                <StickyFooter />
              </>
            )}
          </div>
        </SlugProvider>
      </BackgroundColorProvider>
    </LanguageProvider>
  );
}
