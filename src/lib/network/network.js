import axios from "axios";

const GET_TASKS_URL = "http://localhost:8080/tasks/";
const GET_SCHEDULED_TASKS_URL = "http://localhost:8080/tasks/scheduled-tasks";



export var getTasks = async () =>  {
  var response;
  response = await axios.get(GET_TASKS_URL).then((res) => {
    return res.data;
  })
  .catch((e) => {
    console.log(e);
    return e;
  });
  return response;
};


export var getScheduledTasks = async () =>  {
  var response;
  response = await axios.get(GET_SCHEDULED_TASKS_URL).then((res) => {
    return res.data;
  })
  .catch((e) => {
    console.log(e);
    return e;
  });
  return response;
};