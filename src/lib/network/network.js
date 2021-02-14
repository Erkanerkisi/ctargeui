import axios from "axios";

const GET_TASKS_URL = "http://localhost:8080/tasks/";
const GET_SCHEDULED_TASKS_URL = "http://localhost:8080/tasks/scheduled-tasks";
const PUT_UPDATE_TASK = "http://localhost:8080/tasks/task/{taskId}";
const POST_UPDATE_TASK = "http://localhost:8080/tasks/task/";
const DELETE_UPDATE_TASK = "http://localhost:8080/tasks/task/{taskId}";


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
