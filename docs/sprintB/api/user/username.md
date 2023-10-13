# Action

**Method:**  Get 

**URL:** http://localhost:5001/api/v1/users/:username

# Description

Used to obtain user by username.

# Request parameters

* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | This header is mandatory to get the user's status.  Failure to do so will cause an error.|

* **Body**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Username | String                  | User's username |



# Possible response codes and results

## Successful responses

>Response for a successful request with a valid username .
  

| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 200  | OK                    |  OK    | 


## Client error responses

>Response for a get user by username request, when the user is logged in bur the acess token expired or is not correct.
>Response for a get user by username request, when an unexistent acess token.

* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 403    | Forbidden                   |


* **Body**

```json
{
    "message": "Token signature expired."
}
```



* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 403    | Forbidden                   |

* **Body**

```json
{
    "message": "No access token provided."
}
```


## Server error responses

>Response for a get user by username request, when the offset parameter is not null. 

* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 500    | Internal Server Error                  |    


* **Body**

```json 
{ 
    "message": "An unexpected error occurred."
}
```


## Reference to related use cases and acceptance criteria


**User Story 09:** Check account details.

**Acceptance Criteria 1:** When the username is selected, the visitor is directed to a page with the account details.

**Acceptance Criteria 2:** The account details should display the username and the message "Nothing here just yet :p". 


## Comments

- This endpoint has a verb GET but use a body request. This is not a good practice. The body request should be used in POST, PUT and DELETE verbs. In this case, the username should be passed in the URL.