const test = require("tape");
const router = require("./router");
const supertest = require('supertest');

test("Tape works as expected", t => {
  t.equals(1, 1, "Tape is working!");
  t.end();
});

test("Testing our home route", (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    })
})

test("Check status code is 404 when unknown-uri is entered", (t) => {
  supertest(router)
    .get("/random")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "unknown uri", "response should contain unknown uri");
      t.end();
    })
})

// test("Endpoint search", (t) => {
//   supertest(router)
//     .get('/search')
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end((err, res) => {
//       t.error(err);
//       t.equal(, )
//     })
// })