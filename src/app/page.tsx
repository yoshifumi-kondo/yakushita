import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <title>Home</title>
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
