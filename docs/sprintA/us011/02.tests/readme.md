 # US 011 - Perform a logout

 
# 1. Tests


>**Test 1:** Check that the logout functionality ends the user session - AC1, AC3.

**Description:**

The user should be able to logout of the forum website and terminate the session.

**Preconditions:**

1. User is on the forum website's homepage.
2. User is logged in to the forum website.


**Test steps:**

1. Click on the logout option.
2. Verify the result.

**Expected result:**

* The user is no longer authenticated and logged in.
* The user remains on the same page.
* Pop-up notification appears saying that the user is no longer authenticated and logged in.


>**Test 2:** Check that the user cannot access restricted functionalities of the forum website after logging out - AC2.

**Description:**

The user is not able to access the functionalities of the forum website after logging out.

**Preconditions:**

1. User is on the forum website's homepage.
2. User is logged out of the forum website.


**Test steps:**

1. Vote on a post.
2. Click to create a post.
3. Click on a post.
4. Click on a post coment.
5. Vote on a comment.
6. Comment on a comment.
    

**Expected result:**

* The user cannot vote on a post and a notification appears saying that a sign in is required.
* The user cannot create a post and the submit button is disabled.
* The user cannot comment on a post and a red pop-up notification appears.
* The user cannot comment on a comment and a red pop-up notification appears.