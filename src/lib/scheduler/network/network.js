import axios from "axios";

const GET_TASKS_URL = process.env.REACT_APP_GET_TASKS_URL;
const GET_SCHEDULED_TASKS_URL = process.env.REACT_APP_GET_SCHEDULED_TASKS_URL;
const PUT_UPDATE_TASK = process.env.REACT_APP_PUT_UPDATE_TASK;
const POST_UPDATE_TASK = process.env.REACT_APP_POST_UPDATE_TASK;
const DELETE_UPDATE_TASK = process.env.REACT_APP_DELETE_UPDATE_TASK;


export var getTasks = async () => {
  var response;
  response = await getService(GET_TASKS_URL);
  return response;
};

export var getScheduledTasks = async () => {
  var response;
  response = await getService(GET_SCHEDULED_TASKS_URL);
  return response;
};

export var updateTask = async (task) => {
  var response;
  var url = PUT_UPDATE_TASK.replace("{taskId}", task.id);
  response = await putService(url, task);
  return response;
};

export var addTask = async (task) => {
  var response;
  response = await postService(POST_UPDATE_TASK, task);
  return response;
};

export var deleteTask = async (taskId) => {
  var response;
  var url = DELETE_UPDATE_TASK.replace("{taskId}", taskId);
  response = await deleteService(url, taskId);
  return response;
};



var getService = async (url) => {
  var response = {
    body: null,
    httpStatusCode: null,
    errorCode: null,
    errorMessage: null,
  };

  await axios
    .get(url)
    .then((res) => {
      response.body = res.data;
      response.httpStatusCode = 200;
      response.errorCode = null;
      response.errorMessage = null;
      return response;
    })
    .catch((e) => {
      response.body = null;
      response.httpStatusCode = 500;
      response.errorCode = "ERR-500";
      response.errorMessage = e;
      return response;
    });
  return response;
};

var postService = async (url, body) => {
  var response = {
    body: null,
    httpStatusCode: null,
    errorCode: null,
    errorMessage: null,
  };

  await axios
    .post(url, body)
    .then((res) => {
      response.body = res.data;
      response.httpStatusCode = 200;
      response.errorCode = null;
      response.errorMessage = null;
      return response;
    })
    .catch((e) => {
      response.body = null;
      response.httpStatusCode = 500;
      response.errorCode = "ERR-500";
      response.errorMessage = e;
      return response;
    });
  return response;
};

var putService = async (url, body) => {
  var response = {
    body: null,
    httpStatusCode: null,
    errorCode: null,
    errorMessage: null,
  };

  await axios
    .put(url, body)
    .then((res) => {
      response.body = res.data;
      response.httpStatusCode = 200;
      response.errorCode = null;
      response.errorMessage = null;
      return response;
    })
    .catch((e) => {
      response.body = null;
      response.httpStatusCode = 500;
      response.errorCode = "ERR-500";
      response.errorMessage = e;
      return response;
    });
  return response;
};

var deleteService = async (url, body) => {
  var response = {
    body: null,
    httpStatusCode: null,
    errorCode: null,
    errorMessage: null,
  };

  await axios
    .put(url, body)
    .then((res) => {
      response.body = res.data;
      response.httpStatusCode = 200;
      response.errorCode = null;
      response.errorMessage = null;
      return response;
    })
    .catch((e) => {
      response.body = null;
      response.httpStatusCode = 500;
      response.errorCode = "ERR-500";
      response.errorMessage = e;
      return response;
    });
  return response;
};
