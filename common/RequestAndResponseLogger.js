const router = require("express").Router();
const Util = require("./Util");

router.use(async (req, res, next) => {
  req.data = Util.obj_merge(req.query, req.body);
  req.begin_timestamp = new Date();
  let send = res.send;
  res.send = async function (body) {
    let end = new Date();
    try {
      let response = {};
      try {
        response = JSON.parse(body);
      } catch (error) {}
      if (response.hasOwnProperty("error") && !response.error) {
        delete response.data;
      }
      let log = {
        request_url: (
          req.protocol +
          "://" +
          req.get("host") +
          req.originalUrl
        ).split("?")[0],
        request_method: req.method,
        request_start_time: req.begin_timestamp,
        request_end_time: end,
        process_timestamp: end.getTime() - req.begin_timestamp.getTime(),
        remote_addr: Util.get_ipv4_addr(req.socket.remoteAddress),
        referer: req.get("referer"),
        user_agent: req.get("user-agent"),
        req_params: JSON.stringify(req.params),
        req_data: req.method == "GET" ? req.query : req.body,
        res_data: JSON.stringify(response),
      };
      if (log.req_data.password) {
        log.req_data.password = "**********";
      }
      log.req_data = JSON.stringify(log.req_data);
      log.total_request_process_time =
        Util.date_diff_toString(log.request_end_time, log.request_start_time) +
        " " +
        (log.process_timestamp % 1000) +
        "msc";
      log.request_status = !response.error ? "Success" : "Error";
      delete log.process_timestamp;
      console.log("log", log);
    } catch (error) {
      console.log(error);
    } finally {
      send.call(this, body);
    }
  };
  next();
});

module.exports = router;
