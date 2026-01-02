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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
