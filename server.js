import express from "express";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const app = express();

// Convert JSON from Render env into credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = JSON.stringify(
  JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
);

// Create Analytics client
const client = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
});

const PROPERTY_ID = "518221140";

app.get("/visitors", async (req, res) => {
  try {
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      metrics: [{ name: "totalUsers" }],
      dateRanges: [{ startDate: "2015-08-14", endDate: "today" }],

    });

    const count = response.rows?.[0]?.metricValues?.[0]?.value || "0";
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analytics fetch failed" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
