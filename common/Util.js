class Util {
  static getSuccessResponse(data, message = null) {
    return {
      success: true,
      code: 200,
      message: message,
      data: data,
    };
  }

  static getErrorResponse(error, message = null) {
    if (typeof error === "object") {
      return {
        success: false,
        code: 422,
        message: message,
        error: error,
      };
    } else {
      return {
        success: false,
        code: 500,
        message: message,
        error: error,
      };
    }
  }

  static getApiErrorResponse(error, message = null) {
    return {
      success: false,
      code: 500,
      message: error[0].message,
      error: error,
    };
  }


  // Merges req.query and req.body
  static obj_merge(request_query_body) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        request_query_body[prop] = source[prop];
      }
    });
    return request_query_body;
  }

  // Converts two Date(time) difference in human redable format
  static date_diff_toString(date1, date2) {
    var diff = Math.abs(this.date_diff(date1, date2, "S"));
    var out = "" + (diff % 60) + "s";
    diff = Math.floor(diff / 60);
    if (diff >= 60) {
      out = "" + (diff % 60) + "m " + out;
      diff = Math.floor(diff / 60);
      if (diff >= 24) {
        out = "" + (diff % 24) + "h " + out;
        diff = Math.floor(diff / 24);
        if (diff > 0) {
          out = "" + diff + "d " + out;
        }
      } else if (diff > 0) {
        out = "" + diff + "h " + out;
      }
    } else if (diff > 0) {
      out = "" + diff + "m " + out;
    }
    return out;
  }

  // Returns IPV4 remote address
  static get_ipv4_addr(mixed) {
    var ipv4 = "";
    (mixed || "").split(":").forEach(function (v) {
      var ip = (v || "").split(".");
      if (ip.length === 4) {
        var f = true;
        ip.forEach(function (i) {
          if (i < 0 || i > 255) {
            f = false;
          }
        });
        if (f) {
          ipv4 = v;
        }
      }
      if (ipv4.length > 0) {
        return false;
      }
    });
    return ipv4;
  }
}

module.exports = Util;
