import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

const API_URL = "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency";
const yourAPIKey = "0e78e61f2fmsh2b5744d9dbe86d5p17e05ajsn6a23cb375ca2";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const have = req.body.country1;
  const want = req.body.country2;
  const amount = req.body.amount;
  const response = await axios.get(API_URL, {
    headers: {
      "X-RapidAPI-Key": yourAPIKey,
    },
    params: {
      have,
      want,
      amount,
    }
  });
  const result = response.data;
  console.log(result);
  try {
    res.render("index.ejs", {
      value: JSON.stringify(result.new_amount)
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});