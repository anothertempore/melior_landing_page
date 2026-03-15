import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

const APP_STORE_URL = "https://apps.apple.com/app/melior/id6759236940";

export default async function DownloadPage() {
  const ua = (await headers()).get("user-agent")?.toLowerCase() ?? "";
  const isWeChat = ua.includes("micromessenger");

  if (!isWeChat) {
    redirect(APP_STORE_URL);
  }

  const t = await getTranslations("download");

  return (
    <div className="dl-wrap">
      {/* Arrow pointing to top-right ··· button */}
      <svg className="dl-arrow" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path
          d="M60 100 C60 50, 90 30, 110 14"
          stroke="var(--gold-warm)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M105 10 L112 14 L104 18"
          stroke="var(--gold-warm)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <h1 className="dl-brand">Melior</h1>
      <ol className="dl-steps">
        <li>{t("step1")}</li>
        <li>{t("step2")}</li>
        <li>{t("step3")}</li>
      </ol>
      <p className="dl-fallback">{t("fallback")}</p>
    </div>
  );
}
