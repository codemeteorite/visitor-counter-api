import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/visitors", async (req, res) => {
  const response = await fetch(
    "https://analyticsdata.googleapis.com/v1beta/properties/YOUR_PROPERTY_ID:runReport",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GA_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        metrics: [{ name: "totalUsers" }]
      })
    }
  );

  const data = await response.json();
  const count = data.rows?.[0]?.metricValues?.[0]?.value || 0;

  res.json({ count });
});

app.listen(3000, () => console.log("API running on port 3000"));
