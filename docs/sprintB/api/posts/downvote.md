# Action

**Method:** POST


# Description

Downvote a post, as a user.

# Request parameters

* **URL**

    * http://localhost:5001/api/v1/posts/downvote


>
* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | It is required for the user to downvote a post.  |


* **Body**

```json
{   
    "slug": "8224755-post-2"
}
```	

# Possible response codes and results


## Successful responses

>Response for a downvote a post request, when the user is logged in and all the request parameters are correct.
  

* **Status**

| Code   | Description           | 
|--------|-----------------------|
| 200    | OK                    |  


* **Body**

```text
  
OK

```

## Client error responses

>Response for a downvote a post request, when user is not logged in.


* **Status**

| Code    | Description    | 
|---------|----------------|
| 403     | Forbidden      | 


* **Body**

```json
{   
    "message":"Token signature expired."
}
```

>Response for a downvote a post request, when access token signature failed.

* **Status**

| Code    | Description    | 
|---------|----------------|
| 403     | Forbidden      | 

* **Body**

```json
{   
    "message":"Token signature expired."
}
```

>Response for a downvote a post request, when access token length equals zero.

* **Status**

| Code    | Description    | 
|---------|----------------|
| 403     | Forbidden      | 


* **Body**

```json
{   
    "message":"No access token provided"
}
```

>Response for a downvote a post request, when the post slug is not found (does not exist (a), has a length of zero characters (b) or the slug was not on the body of the request (c)).

* **Status**

| Code    | Description    | Response Message         |
|---------|----------------|--------------------------|
| 404     | Not Found      | {"message":"Couldn't find a post by slug {5507659-post-4}."} - (a) |
| 404     | Not Found      | {"message":"Couldn't find a post by slug {}."} - (b) |
| 404     | Not Found      | {"message":"Couldn't find a post by slug {undefined}."} - (c)  |


* **Body**

(a):
```json
{   
    "message":"Couldn't find a post by slug {5507659-post-4}."
}
```

(b):
```json
{   
    "message":"Couldn't find a post by slug {}."
}
```

(c):
```json
{   
    "message":"Couldn't find a post by slug {undefined}."
}
```


## Server error responses




## Reference to related use cases and acceptance criteria


**User Story 04:** Vote on a post

**Acceptance Criteria 1:** The user must be authenticated to vote on a post.
**Acceptance Criteria 3:** The user can downvote a post, decreasing the counter by one.
**Acceptance Criteria 4:** The user must be able to revert the vote.


## Notes

* When a user downvotes a post for the first time, the counter is increased by one in the backend but the user is not registered as a downvoter of the post in the database. When the same user tries to downvote for the second time, the downvote is considered successful in the backend (bug), but the counter does not change in the backend but decreases in the frontend (bug).