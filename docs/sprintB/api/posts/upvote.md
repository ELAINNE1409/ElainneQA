# Action

**Method:** POST

**URL:** http://localhost:5001/api/v1/posts/upvote


# Description

Upvote a post, as a user.


# Request parameters

>
* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | It is required for the user to upvote a post. |


* **Body**

```json
{   
    "slug": "5507659-post-3"
}
```


# Possible response codes and results


## Successful responses

>Response for an upvote a post request, when the user is logged in and all the request parameters are correct.
 
  
* **Status**

| Code   | Description           | 
|--------|-----------------------|
| 200    | OK                    |  


* **Body**

```text
  
OK

```

## Client error responses

>Response for an upvote a post request, when the user is not logged in.

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

>Response for an upvote a post request, when the access token signature expired.

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

>Response for an upvote a post request, when access token length equals zero.

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

>Response for an upvote a post request, when the post slug is not found (does not exist (a), has a length of zero characters (b) or the slug was not on the body of the request (c)).

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
**Acceptance Criteria 2:** The user can upvote a post, increasing the counter by one.
**Acceptance Criteria 4:** The user must be able to revert the vote.


## Notes

* When a user upvotes a post for the first time, the counter is increased by one in the backend but the user is not registered as an upvoter of the post in the database. When the same user tries to upvote for the second time, the upvote is considered successful in the backend (bug), but the counter does not change in the backend and decreases in the frontend (bug). 
* Sometimes it is possible to upvote 2 times in a row, increasing the counter by 2. The vote counting behavior is not consistent.
