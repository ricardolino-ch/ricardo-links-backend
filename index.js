const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const links = [
  {
    "title": "Benutzerkonto öffnen",
    "url": "http://admin.internal.ricardo.ch/redirect/legacy/myPages/{{ticket.requester.email}}",
    "color": "green"
  },
  {
    "title": "Mein Verkaufen öffnen",
    "url": "https://admin.internal.ricardo.ch/de/member/{{ticket.requester.externalId}}/my-ricardo-redirect",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Mein Kaufen öffnen",
    "url": "https://admin.internal.ricardo.ch/member/{{ticket.requester.externalId}}/my-ricardo-redirect?destination=%2Fmy-ricardo%2Fbuying%2Foffers/",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Angebot in Orders öffnen (long)",
    "url": "https://admin.internal.ricardo.ch/orders?displayedFilters={}&filter={\"offerNumber\":\"{{ticket.custom_field_45173725}}\"}&order=ASC&page=1&perPage=10&sort=id",
    "color": "green"
  },
  {
    "title": "Angebot in Orders öffnen (short)",
    "url": "https://admin.internal.ricardo.ch/orders?displayedFilters={}&filter={\"orderNumber\":\"{{ticket.custom_field_45173725}}\"}&order=ASC&page=1&perPage=10&sort=id",
    "color": "green"
  },
  {
    "title": "Gebühren öffnen",
    "url": "https://admin.internal.ricardo.ch/member/{{ticket.requester.externalId}}/my-ricardo-redirect?destination=/bookkeeping",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Bewertung prüfen",
    "url": "https://admin.internal.ricardo.ch/orders?displayedFilters={}&filter={\"offerNumber\":\"{{ticket.custom_field_45173725}}\"}&order=ASC&page=1&perPage=10&sort=id",
    "color": "green"
  },
  {
    "title": "Ratings öffnen",
    "url": "https://admin.internal.ricardo.ch/de/member/{{ticket.requester.externalId}}/ratings/",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "MemberLog",
    "url": "https://admin.internal.ricardo.ch/de/member/{{ticket.requester.externalId}}/log/",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Alle Artikel öffnen",
    "url": "https://admin.internal.ricardo.ch/articles?displayedFilters=\"\"&filter={\"seller\":\"{{ticket.requester.externalId}}\"}&order=ASC&page=1&perPage=25&sort=title",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Artikel Log öffnen",
    "url": "https://admin.internal.ricardo.ch/articles/{{ticket.custom_field_45173725}}/show",
    "condition": "ticket.custom_field_45173725 != null",
    "color": "green"
  },
  {
    "title": "E-Mail in Sendgrid prüfen",
    "url": "https://app.sendgrid.com/email_activity?email={{ticket.requester.email}}",
    "color": "green"
  },
  {
    "title": "Artikel Limite",
    "url": "https://eu-west-1a.online.tableau.com/#/site/homegate/views/SpecificSellerListingLimit/SpecificMemberListingLimit?:iid=4&User%20Id={{ticket.requester.externalId}}",
    "condition": "ticket.requester.externalId != null",
    "color": "green"
  },
  {
    "title": "Adresspflege Post",
    "url": "https://service.post.ch/zopa/app2/public/ui/view/master?lang=de&jbdq2z5z3ztnxhp3pmtgzbxgfi=jhtmjklmuyqrsj2j3gylwzho2y7zkkstbcnc5km7ctuwc7zebs5y",
    "color": "green"
  },
  {
    "title": "Security / Fraud Meldung per Telefon",
    "url": "https://form.jotform.com/243191706405352?id_melder={{ticket.requester.externalId}}&e-mail={{ticket.requester.email}}",
    "color": "orange"
  },
  {
    "title": "Mahn-E-Mail versenden",
    "url": "https://form.jotform.com/250412508439050?artikelnummer={{ticket.custom_field_45173725}}&deineEmail={{ticket.requester.email}}",
    "color": "orange"
  },
  {
    "title": "Get PIR",
    "url": "https://di-police-investigation-report-svc.internal.ricardo.ch/?customer_number={{ticket.requester.externalId}}",
    "color": "orange"
  },
  {
    "title": "Onfido Prüfung",
    "url": "https://dashboard.onfido.com/library?query={{ticket.requester.externalId}}%40ricardo.ch&filters%5Bcreated_at%5D=1745359200000-1753221599999",
    "color": "orange"
  },
  {
    "title": "SEON",
    "url": "https://admin.seon.io/transactions?searchTerm={{ticket.requester.email}}",
    "color": "orange"
  },
  {
    "title": "Auth0 Logs",
    "url": "https://manage.auth0.com/dashboard/eu/ricardo-prod/logs?q={{ticket.requester.email}}",
    "color": "orange"
  },
  {
    "title": "Stichworte-Liste",
    "url": "https://docs.google.com/spreadsheets/d/1i7DGOiEmfPIfptBqBF8HZs1dfU920E2h3yaFkgfkUrs/edit#gid=0",
    "color": "green"
  },
  {
    "title": "Referenznummer generieren",
    "url": "http://www.durch.ch/vesr.php?no={{ticket.requester.externalId}}",
    "color": "green"
  },
  {
    "title": "Dispute öffnen",
    "url": "https://admin.internal.ricardo.ch/orders?displayedFilters={}&filter={\"orderNumber\":\"{{ticket.custom_field_45173725}}\"}&order=ASC&page=1&perPage=10&sort=id",
    "color": "red"
  },
  {
    "title": "Adyen Transaktionen",
    "url": "https://ca-live.adyen.com/ca/ca/payments/modifySearch.shtml?query=merchantReference%3A%22{{ticket.custom_field_45173725}}%22",
    "color": "red"
  },
  {
    "title": "Adyen Account Holders",
    "url": "https://ca-live.adyen.com/ca/ca/accounts/accountHolders.shtml",
    "color": "red"
  },
  {
    "title": "Rücksendung erfassen",
    "url": "https://docs.google.com/spreadsheets/d/1i5Ya_OucOdEfLpxH5mJ-9S_KiQSrVOseedLrtvN10NM/edit#gid=0",
    "color": "red"
  }
];

app.get("/links", (req, res) => {
  res.json(links);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Ricardo Backend läuft auf Port", port);
});
