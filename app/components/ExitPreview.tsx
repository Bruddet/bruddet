import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "~/utils/i18n";

export function ExitPreview() {
  const [inIframe, setInIframe] = useState(true);
  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);
  const { t } = useTranslation();
  const location = useLocation();

  return inIframe ? null : (
    <div className="pointer-events-none fixed z-50 inset-0 flex h-screen w-screen items-end justify-end p-2">
      <form
        className="pointer-events-auto"
        action="/resource/preview"
        method="POST"
      >
        <input type="hidden" name="redirectUrl" value={location.pathname} />
        <button
          className="bg-black p-4 leading-none font-bold text-white"
          type="submit"
        >
          {t(exitText.buttonText)}
        </button>
      </form>
    </div>
  );
}

const exitText = {
  buttonText: {
    en: "Exit preview mode",
    nb: "Avlsutt forhåndsvisning",
  },
};
