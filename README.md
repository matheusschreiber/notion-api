# Notion API workspace

## Description

This is a project that handles the notion api, by query for databases like calendars and to-do list, and also modifies them according to user preferences

## Disclaimer

You can change the environment variables on the `.env` file, after you've setted the integration configuration explained by the notion docs, which you can find here: https://developers.notion.com/

The environment variables works as follow:

> NEXT_PUBLIC_NOTION_API_URL=https://api.notion.com/v1/databases

> NEXT_PUBLIC_NOTION_VERSION=2022-02-22  (notion version)

> NEXT_PUBLIC_NOTION_TASKS_DATABASE_ID= `<id_of_the_tasks_page>` (get it from url on notion tab)

> NEXT_PUBLIC_NOTION_CALENDAR_DATABASE_ID=`<id_of_the_calendar_page>` (get it from url on notion tab)

> NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN= `<id_from_notion_dev_website>` 

> NEXT_PUBLIC_LOGIN_KEY=`<any_hash_you_desire>`    (i used crypto to hash a password and then pasted the hash result here)

## Demonstration of use

### Creating a task
 
https://user-images.githubusercontent.com/87976167/161363345-42667b28-6a52-46d1-ae3a-10efb7d293dd.mp4

### Creating an event

https://user-images.githubusercontent.com/87976167/161363414-883767e7-5587-4397-acb0-c68560c08f68.mp4

### Editing/Removing a task

https://user-images.githubusercontent.com/87976167/161363400-8d02ebbb-6136-4a10-bd2c-58d98775be26.mp4

### Removing an event

https://user-images.githubusercontent.com/87976167/161363417-f181bcc7-9827-4be9-957c-95e28656ce5c.mp4




