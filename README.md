# ProjectFlowFinder
## About Project
This is a **Team Management project** Where a user can create a Project in a Project-Hub is Admin of that Project. He invites the other users as members to that Project. Here Admin assigns some tasks to users.
That members access only assigned tasks and make change of task from start to onprocessing and done. In this we included the chat system through this we make conversatio between member and Admin of a project.
Here we implemented and **actions** page to view the complete actions that had be done by the members of project to verify when they started and when they closed their tasks based on date and time.
Here we generate **ApiKeky**,**access_token** and **Refresh_token** for both authentication and authorization also. Here we have **OTP** verification through **Email** only.

## Technologies
1. **React.js:** we use this technology to develope complete our user interface to interact with our Web Application.
   * **redux-toolkit:** Used this for global state management in my application.
   * **react-use-websocket:** By using this to create websocket connection in react.js and to provide the chat system.
   * **Notificationcontext:** This is custome notification context to maintain the global notification system in react.js
2. **Django:** we used this technology to develope our complete backend code.
   * **djangorestframework(DRF):** DRF makes it easier to create RESTful API's by providing the classes and functions to abstract the repetation of code.
   * **restframework_simplejwt:** By using this to perform the both authetication and authorization by generating the **api_key**,**refresh_token** and **access_token**.
   * **django.core.mail** This used to create email sending in django
3. **MySql:** By using this MYSQL to store the complete information of users,project,chat messages and project status.
