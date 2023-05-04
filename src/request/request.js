import axios from "axios";
import jsonp from "jsonp";
axios.defaults.withCredentials = true;

function getRequestUrl(params) {
  const baseUrl = process.env.VUE_APP_BASE_URL;
  return `${params.baseUrl ? params.baseUrl : baseUrl}${params.url}`;
}

function extend(dst) {
  for (let i = 1, ii = arguments.length; i < ii; i++) {
    let obj = arguments[i];
    if (obj) {
      let keys = Object.keys(obj);
      for (let j = 0, jj = keys.length; j < jj; j++) {
        let key = keys[j];
        dst[key] = obj[key];
      }
    }
  }
  return dst;
}

/**
 * @description:jsonp url拼接参数
 * @param {Object} data
 * @returns {String}
 */
function paramJsonp(data) {
  let url = "";

  for (var k in data) {
    if (Object.property.hasOwnProperty.call(data, k)) {
      let value = data[k] !== undefined ? data[k] : "";

      url += "&" + k + "=" + encodeURIComponent(value);
    }
  }
  return url ? url.substring(1) : "";
}

/**
 * @description:jsonp
 * @param {String} url
 * @param {Object} data
 * @param {Object} option
 */
function getJsonpData(url, data, option) {
  url += (url.indexOf("?") < 0 ? "?" : "&") + paramJsonp(data);
  return new Promise((resolve, reject) => {
    jsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * @description:post
 * @param {Object} config
 */
function post(config) {
  return new Promise(function (resolve, reject) {
    extend(config, {
      method: "post",
    });
    axios(config).then(
      (rep) => {
        resolve(rep);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * @description:PUT
 * @param {Object} config
 */
function put(config) {
  return new Promise(function (resolve, reject) {
    extend(config, {
      method: "PUT",
    });
    axios(config).then(
      (rep) => {
        resolve(rep);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * @description:get
 * @param {Object} config
 */
function get(config) {
  return new Promise(function (resolve, reject) {
    extend(config, {
      method: "GET",
    });
    axios(config)
      .then((rep) => {
        resolve(rep);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @description:delete
 * @param {Object} config
 */
function Delete(config) {
  return new Promise(function (resolve, reject) {
    extend(config, {
      method: "DELETE",
    });
    axios(config).then(
      (rep) => {
        resolve(rep);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * @description: handlePostFormdata
 * @param {Object} params
 */
function handlePostFormdata(params) {
  let fd = new FormData();
  for (let i in params) {
    if (params[i] instanceof Array) {
      for (let j = 0; j < params[i].length; j++) {
        for (let k in params[i][j]) {
          if (Object.property.hasOwnProperty.call(params[i][j], k)) {
            let key = "";
            let val = "";
            key = i + "[" + j + "]" + "." + k;
            val = params[i][j][k];
            fd.append(key, val);
          }
        }
      }
    } else {
      fd.append(i, params[i]);
    }
  }
  return fd;
}

/**
 * @description: handlePostFormURLENCODED
 * @param {Object} params
 */
function handlePostFormURLENCODED(params) {
  let str = "";
  for (let i in params) {
    if (Object.property.hasOwnProperty.call(params, i)) {
      str = str + i + "=" + params[i];
      str += "&";
    }
  }
  str = str.slice(0, str.length - 1);
  return str;
}

/**
 * @description: handlePutFormData
 * @param {Object} params
 */
function handlePutFormData(params, option) {
  let headers = { "Content-Type": "application/json;charset=UTF-8" };
  if (option.method === "PUT_FORDATA") {
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    headers = { "Content-Type": "application/x-www-form-urlencoded" };
    params = formData;
  }
  return { headers, params };
}

function request(url, params, option) {
  params = params || {};
  option = option || {};
  let config = {};
  let methodStr = option.method;
  option.method =
    typeof methodStr === "string" ? methodStr.toUpperCase() : methodStr;

  config = extend(
    {
      method: "JSONP",
    },
    option
  );
  let reqData = {};

  switch (option.method) {
    case "POST_FORMDATA":
      const fd = handlePostFormdata(params);
      reqData = {
        url: url,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: fd,
      };
      config = extend(config, reqData);
      return post(config).then((res) => {
        return res;
      });

    case "POST_FORM_URLENCODED":
      const str = handlePostFormURLENCODED(params);
      reqData = {
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: str,
      };
      config = extend(config, reqData);
      return post(config).then((res) => {
        return res;
      });
    case "POST_JSON":
    case "POST":
      if (option.method === "POST_JSON") {
        params = JSON.stringify(params);
      }
      reqData = {
        url: url,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      };
      config = extend(config, reqData);
      return post(config).then((res) => {
        return res;
      });

    case "PUT_FORDATA":
    case "PUT":
      const { headers, params } = handlePutFormData(params, option);
      reqData = {
        url: url,
        headers: headers,
        data: params,
      };
      config = extend(config, reqData);
      return put(config).then((res) => {
        return res;
      });
    case "DELETE":
      reqData = {
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      };
      config = extend(config, reqData);
      return Delete(config).then((res) => {
        return res;
      });
    case "GET":
      reqData = {
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      };
      config = extend(config, reqData);
      return get(config).then((res) => {
        return res;
      });
    case "JSONP":
      return getJsonpData(url, params, null).then((res) => {
        return res;
      });
    default:
      console.error("请求方式有误，请检查您的请求方式");
      break;
  }
}

let REQ = {
  getRequestUrl, //拼接url
  request, //请求
};
export default REQ;
