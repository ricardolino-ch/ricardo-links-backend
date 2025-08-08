const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const links = [
  {
    title: "Benutzerkonto öffnen",
    url: "http://admin.internal.ricardo.ch/redirect/legacy/myPages/{{ticket.requester.email}}",
    color: "green"
  },
  {
    title: "Mein Verkaufen öffnen",
    url: "https://admin.internal.ricardo.ch/de/member/{{ticket.requester.externalId}}/my-ricardo-redirect",
    condition: "ticket.requester.externalId != null",
    color: "green"
  }
  // weitere Links folgen
];

app.get("/links", (req, res) => {
  res.json(links);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Ricardo Backend läuft auf Port", port);
});
