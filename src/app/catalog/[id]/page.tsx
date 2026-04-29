import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import MobileHeader from "@/components/site/MobileHeader";
import Footer from "@/components/site/Footer";
import MobileFooter from "@/components/site/MobileFooter";
import { MobilePartnerCTA } from "@/components/site/MobileBlocks";
import { Icons } from "@/components/site/Icons";
import { getLocale } from "@/lib/locale-server";
import { t, pickProductName, pickProductShort, pickProductLong, pickCategoryName } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();
  const locale = getLocale();

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      categories: { include: { category: true } },
    },
  });
  if (!product) notFound();

  const cover = product.images[0]?.url ?? "/design/bumper.png";
  const name = pickProductName(product, locale);
  const shortDesc = pickProductShort(product, locale);
  const longDesc = pickProductLong(product, locale);

  const specs: Array<[string, string | null]> = [
    [t("specPartNumber", locale), product.partNumber],
    [t("specArticle", locale),    product.article],
    [t("specColor", locale),      product.color],
    [t("specMaterial", locale),   product.material],
  ];
  const visibleSpecs = specs.filter(([, v]) => v && v.trim() !== "");
  const categoryNames = product.categories.map((pc) => pickCategoryName(pc.category, locale)).join(", ");

  return (
    <>
      {/* DESKTOP */}
      <div className="hd-desktop" style={{ background: "#fff", minWidth: 1440 }}>
        <Header current="catalog" locale={locale} />

        <div style={{ padding: "18px 70px", borderBottom: "1px solid var(--hd-hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 16 }}>
            <Link href="/catalog" style={{ opacity: 0.6 }}>{t("catalog", locale)}</Link>
            <span style={{ opacity: 0.6 }}>/</span>
            <span>{name}</span>
          </div>
        </div>

        <section style={{
          background: "var(--hd-panel)", padding: "50px 70px 64px 70px",
          display: "grid", gridTemplateColumns: "550px 1fr", gap: 60,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              width: 550, height: 470, borderRadius: 8,
              background: "#fff", border: "1px solid var(--hd-hairline)",
              backgroundImage: `url(${cover})`,
              backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }} />
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {product.images.slice(0, 6).map((img) => (
                  <div key={img.id} style={{
                    width: 80, height: 80, borderRadius: 8,
                    background: "#fff", border: "1px solid var(--hd-hairline)",
                    backgroundImage: `url(${img.url})`,
                    backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                  }} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: "44px" }}>{name}</h1>

            {product.article && (
              <div style={{ marginTop: 14, fontSize: 15, display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "rgba(0,0,0,0.6)" }}>{t("article", locale)}</span>
                <span style={{
                  padding: "4px 10px", borderRadius: 6,
                  background: "#fff", border: "1px solid var(--hd-hairline)", fontWeight: 500,
                }}>{product.article}</span>
              </div>
            )}

            {shortDesc && (
              <p style={{ marginTop: 24, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.7)", maxWidth: 580 }}>
                {shortDesc}
              </p>
            )}

            {(visibleSpecs.length > 0 || categoryNames) && (
              <ul style={{
                marginTop: 36, marginBottom: 0, paddingLeft: 18,
                display: "flex", flexDirection: "column", gap: 10, fontSize: 16,
              }}>
                {visibleSpecs.map(([k, v]) => (
                  <li key={k} style={{ color: "rgba(0,0,0,0.7)" }}>
                    <span style={{ marginRight: 6 }}>{k}</span>
                    <span style={{ color: "#000", fontWeight: 500 }}>{v}</span>
                  </li>
                ))}
                {categoryNames && (
                  <li style={{ color: "rgba(0,0,0,0.7)" }}>
                    <span style={{ marginRight: 6 }}>{t("specCategories", locale)}</span>
                    <span style={{ color: "#000", fontWeight: 500 }}>{categoryNames}</span>
                  </li>
                )}
              </ul>
            )}

            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
              <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: 380, height: 52, borderRadius: 40,
                background: "var(--hd-green)", color: "#fff", fontSize: 16, fontWeight: 500,
              }}>{t("order", locale)}</a>

              <SocialIcon><Icons.Instagram size={18} /></SocialIcon>
              <SocialIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7Z" />
                </svg>
              </SocialIcon>
              <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={socialIconStyle}>
                <Icons.Whatsapp size={20} color="#00BC19" />
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 70px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 80 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{t("aboutProduct", locale)}</h2>
            {longDesc ? (
              longDesc.split(/\n\s*\n/).map((para, i) => (
                <p key={i} style={{ marginTop: 18, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.7)" }}>{para}</p>
              ))
            ) : (
              <p style={{ marginTop: 18, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.6)" }}>
                {t("productDescPlaceholder", locale)}
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <FeatureRow Icon={Icons.Box}     title="Free Shipping"    body="You will love at great low prices" />
            <FeatureRow Icon={Icons.Card}    title="Flexible Payment" body="Pay with Multiple Credit Cards" />
            <FeatureRow Icon={Icons.Truck}   title="Fast Delivery"    body="Experience the joy of fast shipping" />
            <FeatureRow Icon={Icons.Headset} title="Premium Support"  body="Outstanding premium support" />
          </div>
        </section>

        <section style={{ padding: "40px 70px 100px 70px" }}>
          <h2 style={{ margin: 0, fontSize: 48, fontWeight: 500, lineHeight: "52px", letterSpacing: "-0.01em" }}>
            {t("readyToOrder", locale)}
          </h2>

          <div style={{
            marginTop: 40, display: "grid", gridTemplateColumns: "440px 1fr", gap: 60, alignItems: "start",
          }}>
            <div style={{
              width: 440, height: 330, borderRadius: 10, overflow: "hidden",
              backgroundImage: "url(/design/partner-men.jpg)",
              backgroundSize: "cover", backgroundPosition: "center",
            }} />
            <div>
              <h3 style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: "34px" }}>
                {t("confirmCompat", locale)}
              </h3>
              <p style={{ marginTop: 14, fontSize: 15, lineHeight: "20px", color: "rgba(0,0,0,0.7)", maxWidth: 620 }}>
                {t("confirmCompatBody", locale)}
              </p>
              <Link href="/#contacts" style={{
                marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10,
                height: 52, padding: "0 30px", borderRadius: 40,
                background: "var(--hd-green)", color: "#fff", fontSize: 16, fontWeight: 500,
              }}>
                {t("goToForm", locale)} <Icons.ArrowRight size={18} color="#fff" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* MOBILE */}
      <div className="hd-mobile" style={{ background: "#fff" }}>
        <MobileHeader locale={locale} />

        <section style={{ background: "var(--hd-panel)", padding: "20px" }}>
          <div style={{
            width: "100%", aspectRatio: "1 / 1", borderRadius: 8,
            background: "#fff", border: "1px solid var(--hd-hairline)",
            backgroundImage: `url(${cover})`,
            backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          }} />
          {product.images.length > 1 && (
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.images.slice(0, 5).map((img) => (
                <div key={img.id} style={{
                  width: 56, height: 56, borderRadius: 6,
                  background: "#fff", border: "1px solid var(--hd-hairline)",
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
              ))}
            </div>
          )}

          <h1 style={{ margin: "22px 0 0 0", fontSize: 24, fontWeight: 500 }}>{name}</h1>

          {product.article && (
            <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.6)" }}>{t("article", locale)}</span>
              <span style={{
                padding: "3px 9px", borderRadius: 6,
                background: "#fff", border: "1px solid var(--hd-hairline)", fontWeight: 500,
              }}>{product.article}</span>
            </div>
          )}

          {shortDesc && (
            <p style={{ marginTop: 14, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.7)" }}>{shortDesc}</p>
          )}

          {(visibleSpecs.length > 0 || categoryNames) && (
            <ul style={{
              marginTop: 14, marginBottom: 0, paddingLeft: 18,
              display: "flex", flexDirection: "column", gap: 6, fontSize: 13,
            }}>
              {visibleSpecs.map(([k, v]) => (
                <li key={k} style={{ color: "rgba(0,0,0,0.7)" }}>
                  {k} <span style={{ color: "#000", fontWeight: 500 }}>{v}</span>
                </li>
              ))}
              {categoryNames && (
                <li style={{ color: "rgba(0,0,0,0.7)" }}>
                  {t("specCategories", locale)} <span style={{ color: "#000", fontWeight: 500 }}>{categoryNames}</span>
                </li>
              )}
            </ul>
          )}

          <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={{
            marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", height: 44, borderRadius: 40,
            background: "var(--hd-green)", color: "#fff", fontSize: 14, fontWeight: 500,
          }}>{t("order", locale)}</a>

          <div style={{
            marginTop: 14, display: "flex", alignItems: "center", gap: 12, justifyContent: "center",
          }}>
            <SocialIconSmall><Icons.Instagram size={16} /></SocialIconSmall>
            <SocialIconSmall>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7Z" />
              </svg>
            </SocialIconSmall>
            <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={socialIconSmallStyle}>
              <Icons.Whatsapp size={18} color="#00BC19" />
            </a>
          </div>
        </section>

        <section style={{ padding: "30px 20px" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{t("aboutProduct", locale)}</h2>
          {longDesc ? (
            longDesc.split(/\n\s*\n/).map((para, i) => (
              <p key={i} style={{ marginTop: 10, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.7)" }}>{para}</p>
            ))
          ) : (
            <p style={{ marginTop: 10, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.6)" }}>
              {t("productDescPlaceholder", locale)}
            </p>
          )}

          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
            <FeatureRowMobile Icon={Icons.Box}     title="Free Shipping"    body="You will love at great low prices" />
            <FeatureRowMobile Icon={Icons.Card}    title="Flexible Payment" body="Pay with Multiple Credit Cards" />
            <FeatureRowMobile Icon={Icons.Truck}   title="Fast Delivery"    body="Experience the joy of fast shipping" />
            <FeatureRowMobile Icon={Icons.Headset} title="Premium Support"  body="Outstanding premium support" />
          </div>
        </section>

        <MobilePartnerCTA
          locale={locale}
          heading={t("readyToOrder", locale)}
          subheading={t("confirmCompat", locale)}
          body={t("confirmCompatBody", locale)}
        />

        <MobileFooter locale={locale} />
      </div>
    </>
  );
}

const socialIconStyle: React.CSSProperties = {
  width: 38, height: 38, borderRadius: "50%",
  background: "#fff", border: "1px solid var(--hd-hairline)",
  display: "grid", placeItems: "center", color: "#000",
};
const socialIconSmallStyle: React.CSSProperties = {
  width: 34, height: 34, borderRadius: "50%",
  background: "#fff", border: "1px solid var(--hd-hairline)",
  display: "grid", placeItems: "center", color: "#000",
};

function SocialIcon({ children }: { children: React.ReactNode }) {
  return <span style={socialIconStyle}>{children}</span>;
}
function SocialIconSmall({ children }: { children: React.ReactNode }) {
  return <span style={socialIconSmallStyle}>{children}</span>;
}

function FeatureRow({
  Icon, title, body,
}: {
  Icon: (p: { size?: number; color?: string }) => JSX.Element;
  title: string; body: string;
}) {
  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        border: "1px solid var(--hd-hairline)",
        display: "grid", placeItems: "center", flex: "0 0 44px",
      }}><Icon size={22} color="#000" /></div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: 6, fontSize: 15, lineHeight: "20px", color: "rgba(0,0,0,0.6)" }}>{body}</div>
      </div>
    </div>
  );
}
function FeatureRowMobile({
  Icon, title, body,
}: {
  Icon: (p: { size?: number; color?: string }) => JSX.Element;
  title: string; body: string;
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6,
        border: "1px solid var(--hd-hairline)",
        display: "grid", placeItems: "center", flex: "0 0 36px",
      }}><Icon size={18} color="#000" /></div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: 3, fontSize: 12, lineHeight: "16px", color: "rgba(0,0,0,0.6)" }}>{body}</div>
      </div>
    </div>
  );
}
