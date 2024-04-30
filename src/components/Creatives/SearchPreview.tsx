import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import { Trans } from "@lingui/macro";
import { Box } from "@mui/material";

interface Props {
  title: string;
  body: string;
  targetUrl: string;
}

function SearchUrlDisplay({ url }: { url: URL }) {
  const pathSegments = url.pathname
    .split("/")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return [url.host, ...pathSegments].join(" > ");
}

// search uses a html base fontSize of 20px on desktop, and we use 16px.
// so where search uses "rem", we need to convert those to px,
// since we don't want to change our base fontSize which rem
// relies on.
function searchRemToPx(rem: number): string {
  return `${rem * 20}px`;
}

export function SearchPreview({ title, body, targetUrl }: Props) {
  const url = new URL(targetUrl);

  return (
    <Box
      sx={{
        // the css variables defined by search
        "--main-font": '"Inter", Helvetica, sans-serif',
        "--color-divider-subtle": "#eceef2",
        "--color-serp-bar-bg": "#ffffff",
        "--color-serp-breadcrumbs": "#9599a9",
        "--color-serp-divider-subtle-container": "#eceef2",
        "--color-serp-header-background": "#ffffff",
        "--color-serp-snippet-background": "#ffffff",
        "--color-primitive-gray-10": "#ebeef0",
        "--color-text-secondary": "#3f4e55",
        "--border-radius-m": "8px",
        "--border-radius-xl": "16px",
        "--spacing-s": searchRemToPx(0.2),
        "--spacing-l": searchRemToPx(0.6),
        "--spacing-xl": searchRemToPx(0.8),
        "--spacing-2xl": searchRemToPx(1.2),
        "--title-max-width": "86%",
        "--icon-s": "18px",
        "--text-sm": searchRemToPx(0.65),

        // and the styles
        fontSize: searchRemToPx(0.8),
        fontFamily: "var(--main-font)",
        fontWeight: 400,
        fontStyle: "normal",
        textRendering: "optimizeLegibility",
        boxSizing: "inherit",
        backgroundColor: "var(--color-serp-snippet-background)",
        borderRadius: "var(--border-radius-xl)",
        border: "1px solid var(--color-divider-subtle)",
        padding: "var(--spacing-2xl)",
        position: "relative",

        width: "622px",
      }}
    >
      <Box>
        <Box
          component="a"
          href={targetUrl}
          target="_blank"
          rel="noreferrer noopener"
          sx={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          <Box
            className="url"
            sx={{
              fontSize: searchRemToPx(0.95),
              fontStyle: "normal",
              lineHeight: searchRemToPx(1.3),
              letterSpacing: "normal",
              textRendering: "optimizeLegibility",
              textDecoration: "none",
              overflowWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "var(--title-max-width, inherit)",
              gap: "var(--spacing-s)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              className="site-wrapper"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "var(--spacing-l)",
              }}
            >
              <Box
                className="favicon-wrapper"
                sx={{
                  "--wrapper-size": "30px",
                  backgroundColor: "var(--color-primitive-gray-10)",
                  borderRadius: "var(--border-radius-m)",
                  height: "var(--wrapper-size)",
                  width: "var(--wrapper-size)",
                  minWidth: "var(--wrapper-size)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Box
                className="site"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    color: "var(--color-text-secondary)",
                    fontSize: searchRemToPx(0.7),
                    lineHeight: "20px",
                  }}
                >
                  {url.hostname}
                </Box>
                <Box
                  component="cite"
                  sx={{
                    alignItems: "center",
                    color: "var(--color-serp-breadcrumbs)",
                    display: "flex",
                    fontSize: "var(--text-sm)",
                    fontStyle: "normal",
                    lineHeight: "22px",
                    marginTop: searchRemToPx(-0.15),
                    maxWidth: "90%",
                    overflow: "visible",
                  }}
                >
                  <SearchUrlDisplay url={url} />
                </Box>
              </Box>
            </Box>
            <Box
              className="title"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className="snippet-content"
        sx={{
          marginTop: "var(--spacing-s)",
          overflow: "hidden",
          color: "var(--color-text-secondary)",
          display: "block",
        }}
      >
        <Box
          className="snippet-description"
          sx={{
            fontSize: searchRemToPx(0.7),
            fontStyle: "normal",
            fontWeight: 400,
            letterSpacing: "-.1px",
            lineHeight: searchRemToPx(1.1),
            textRendering: "optimizeLegibility",
            marginBottom: "0",
            wordWrap: "break-word",
            overflow: "hidden",
          }}
        >
          {body}
        </Box>
      </Box>
      <Box
        className="alabel"
        sx={{
          position: "absolute",
          top: "calc(var(--spacing-2xl) + 3px)",
          right: "var(--spacing-2xl)",
          borderRadius: "var(--border-radius-m)",
          height: "22px",
          opacity: 0.6,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          className="label"
          sx={{
            fontFamily: "var(--main-font)",
            fontSize: "var(--text-sm)",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: searchRemToPx(1.05),
            letterSpacing: "normal",
            color: "#000000",
          }}
        >
          <Trans>Sponsored</Trans>
        </Box>
      </Box>
    </Box>
  );
}
