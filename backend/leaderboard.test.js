import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    leaderboard_load: {
      executor: "constant-arrival-rate",
      rate: 100,          // 👈 100 requests
      timeUnit: "1s",     // 👈 per second = 100 RPS
      duration: "30s",    // test duration
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],      // <1% failures
    http_req_duration: ["p(95)<500"],    // 95% < 500ms
  },
};

export default function () {
  const res = http.get("http://localhost:4000/api/leaderboard");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(0.01);
}
