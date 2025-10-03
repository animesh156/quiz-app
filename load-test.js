import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 100,       // 100 virtual users (parallel requests)
  duration: "1s", // run test for 1 second
};

export default function () {
  let res = http.get("http://localhost:4000/leaderboard"); 

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
