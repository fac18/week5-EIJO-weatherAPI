# Weather API app - where are you going?

![building](https://api.travis-ci.com/fac18/week5-EIJO-weatherAPI.svg?branch=master)

---

![](https://i.imgur.com/o6vsXLw.png)

---

### 💾 Installation Guide

1. Clone the repo `git@github.com:fac18/week5-EIJO-weatherAPI.git`

2. Run `npm install` in the command line

3. Run `npm start` to power up a local server

4. See site on localhost:5000 in your browser

### Día 1️⃣
![White boarding](https://i.imgur.com/xG400JX.jpg)

---

### Ideas:
- Weather or transport
- Weather of your destination and how to get there
- drop down menu populated with you destination cities
- change the background and add weather inspired animation

Simple stuff, right?

---

![](https://media.giphy.com/media/DeJ2ifS2V2zlu/giphy.gif)

![](https://media.giphy.com/media/48UoqdKrAjhXG/giphy.gif)

---

TFL api - Skyscanner requires vetting
https://api-portal.tfl.gov.uk/admin/applications/1409618767019

Open weather api
https://openweathermap.org/api


---

### Al final de día 2️⃣

We made it back mother fuckersssss!
![](https://i.imgur.com/0TW4KfD.png)

---

## The journey: aprendemos!
![](https://media.giphy.com/media/AIu31RdBsis5a/giphy.gif)

![](https://media.giphy.com/media/H5PGB6TmmJfs4/giphy.gif)

---

Getting Travis set-up: realised very soon we needed the owner to authorise travis on the repo, but once it was set-up if you had a travis account you could see all the repos you're apart of.

- so technically you can spy on other people's builds

---

We got it set up on Slack so that we were notified at each build even if you don't have a travis account and dashboard

- add app in slack (takes you to slack site)
- choose channel for notifications
- add code to .travis.yml file

```json=
language: node_js
node_js:
  - "node"
notifications:
  slack: foundersandcoders:vCDquX9W7QOCHGAQzf3esLif
  ```

---

![](https://i.imgur.com/lQ2XfDg.png)

---

- By the end of day 1 we had our CSS and HTML sorted and a skeleton for building the API.
- And so we started day two very positive: let's do two api calls!
- both calls were working but we could only send an ugly object to the front end
- we also hit our limit on the tfl api at 3pm
- for three hours we wrestled with this problem - why was an object being sent (making a new page with it's contents) but our console.logs in the api call weren't working??

---

![](https://media.giphy.com/media/3oz8xUFUB65tXgvHwI/giphy.gif)

---

### Las lecciones:

- add your front end js to your html!!!! 💡
- try to rewrite rather than take legacy code from other projects
- console.log everything

![](https://media.giphy.com/media/7Ie8S8jLLGCAM/giphy.gif)

---
