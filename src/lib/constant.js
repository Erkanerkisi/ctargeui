export const data = [
    {
      "id": 1,
      "beanName": "simpleScheduler",
      "taskName": "Task 1 is call something that very important",
      "lockDuration": 60,
      "headers": [
        {
          "id": 1,
          "key": "operation-code",
          "value": "deneme-header"
        },
        {
          "id": 2,
          "key": "content-type",
          "value": "application/json"
        }
      ],
      "body": null,
      "depencdency": null,
      "cron": [
        {
          "id": 1,
          "cronValue": "0 * * * * *"
        }
      ]
    },
    {
      "id": 2,
      "beanName": "coreScheduler",
      "taskName": "Task 2 is call something that very important",
      "lockDuration": 60,
      "headers": [
        {
          "id": 1,
          "key": "operation-code",
          "value": "deneme-header2"
        },
        {
          "id": 2,
          "key": "content-type",
          "value": "application/json"
        }
      ],
      "body": null,
      "depencdency": null,
      "cron": [
        {
          "id": 1,
          "cronValue": "10 * * * * *"
        }
      ]
    },
    {
      "id": 3,
      "beanName": "simpleScheduler",
      "taskName": "Task 3 is call something that very important",
      "lockDuration": 60,
      "headers": [
        {
          "id": 1,
          "key": "operation-code"
          ,
          "value": "deneme-header3"
        }
      ],
      "body": {
          "id" : 1,
          "body" : "{}"
      },
      "depencdency": null,
      "cron": [
        {
          "id": 1,
          "cronValue": "20 * * * * *"
        }
      ]
    }
  ]