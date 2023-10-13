
# US 005 – Vote on a comment

# 1. Tests 

>**Test 1:** Check that a logged-out user cannot access the vote functionality - AC1.

**Description:**

The user must not be able to interact with the vote functionality when not authenticated or logged out.

**Preconditions:**

1. User is not logged in to the forum website;
2. Visitor is on the forum website's homepage;
3. Vote icons are displayed on the left side of the comment post.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the upvote icon.
4. Check the counter.

**Expected result:**

* The vote functionality does not work for a logged out user;
*  A message appears saying that authentication is required;
* The visitor cannot see the upvote recorded and the counter does not increase by one.


>**Test 2:** Check that the user is able to upvote a comment - AC2.

**Description:**

The counter must increase by a maximum of one when a comment is upvoted.

**Preconditions:**

1. User is logged in to the forum website;
2. The user has not upvoted the comment before;
3. User is on the forum website's homepage;
4. Vote icons are displayed on the left side of the comment post.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the upvote icon.
4. Check the counter 

**Expected result:**

* The user can see the upvote recorded;
* The counter increases by one.

>**Test 3:** Check that the user is able to downvote a comment - AC3.

**Description:**

The counter must decrease by one when a comment is downvoted.

**Preconditions:**

1. User is logged in to the forum website.
2. The user has not downvoted the comment before;
3. User is on the forum website's homepage;
4. Vote icons are displayed on the left side of the comment post.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the downvote icon.
4. Check the counter.

**Expected result:**

* The user can see the downvote recorded;
* The counter decreases by one.

>**Test 4:** Check that the user is able to revert a vote on a comment - AC4.

**Description:**

The counter must return to its previous value when the vote is reverted.

**Preconditions:**

1. User is logged in to the forum website;
2. The user has either upvoted or downvoted a comment before;
3. User is on the forum website's homepage;
4. Vote icons are displayed on the left side of the comment post.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the upvote or downvote icon, depending on the previous vote.
4. Check the counter.

**Expected result:**

* The user can see the vote reverted.

>**Test 5:**  Check that the user is able to change the vote from upvote to downvote - AC2, AC3, AC4.

**Description:**

The counter must decrease by two when we upvote a comment and then change the vote to a downvote.

**Preconditions:**

1. User is logged in to the forum website.
2. User is on the forum website's homepage;
3. Vote icons are displayed on the left side of the comment post.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the upvote icon.
4. Check the counter.
5. Click on the upvote icon again.
6. Check the counter.
7. Click on the downvote icon.
8. Check the counter.

**Expected result:**

* The user is able to change the vote from upvote to downvote successfully;

>**Test 6:**  Check that the user is able to change the vote from downvote to upvote - AC2, AC3, AC4.

**Description:**

The counter must increase by one when we downvote a comment and then change the vote to an upvote.

**Preconditions:**

1. User is logged in to the forum website.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on the downvote icon.
4. Check the counter.
5. Click on the downvote icon again.
6. Check the counter.
7. Click on the upvote icon.
8. Check the counter.

**Expected result:**

* The user is able to change the vote from downvote to upvote successfully;


>**Test 7:** Check that the user is able to vote on more than one comment - AC2, AC3.

**Description:**

The counter must be correctly updated for each comment when we vote on more than one comment at a time, on the same page.

**Preconditions:**

1. User is logged in to the forum website.

**Test steps:**

1. Click on a post.
2. Click on a comment.
3. Click on a vote icon.
4. Check the counter.
5. Click on a different comment.
6. Click on a vote icon.
7. Check the counter.
    
**Expected result:**

* The user can see the vote recorded for each comment successfully.
