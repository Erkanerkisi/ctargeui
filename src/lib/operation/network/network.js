import axios from "axios";

const GET_OPERATIONS_URL = process.env.REACT_APP_GET_OPERATIONS_URL;
const PUT_UPDATE_OPERATION = process.env.REACT_APP_PUT_UPDATE_OPERATION;
const POST_UPDATE_OPERATION = process.env.REACT_APP_POST_UPDATE_OPERATION;
const DELETE_UPDATE_OPERATION = process.env.REACT_APP_DELETE_UPDATE_OPERATION;
const POST_BATCH_OPERATION = process.env.REACT_APP_POST_BATCH_OPERATION;

export var postBatchOperation = async (op) => {
  var response;
  response = await postService(POST_BATCH_OPERATION, op);
  return response;
};

export var getOperations = async () => {
  var response;
  response = await getService(GET_OPERATIONS_URL);
  return response;
};

export var updateOperation = async (op) => {
  var response;
  var url = PUT_UPDATE_OPERATION.replace("{operationId}", op.id);
  response = await putService(url, op);
  return response;
};

export var addOperation = async (op) => {
  var response;
  response = await postService(POST_UPDATE_OPERATION, op);
  return response;
};

export var deleteOperation = async (op) => {
  var response;
  var url = DELETE_UPDATE_OPERATION.replace("{operationId}", op);
  response = await deleteService(url, op);
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
