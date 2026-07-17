Action: Live-server for index

Action: Review Console Error
app.js:9 GET http://127.0.0.1:5502/class21/js/PerformanceCards.js net::ERR_ABORTED 404 (Not Found)

Action: Bug detected
Bug #1:
index.html
line 147 <script src="./js/app.js"></script>
fixed: <script type="module" src="./js/app.js"></script>

Bug #2:
app.js
line 9 import "./PerformanceCards.js";
fixed: import "./Performance.js";

Action: Review Console Error:
FeaturedPerformance.js:14 Uncaught SyntaxError: 'super' keyword unexpected here (at FeaturedPerformance.js:14:9)

Bug #3:
FeaturedPerformance.js
line 14
super(
title,
id,
stage,
artist,
ticketPrice,
ticketsRemaining,
time
);
fixed:
