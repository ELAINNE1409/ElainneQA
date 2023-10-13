# US 004 – Vote on a post

# 1. Tests 

>**Test 1:** Verify that a visitor cannot access the voting functionality - AC1.

**Description:**

The user should not be able to interact with the voting functionality when they are not logged in or logged out.

**Preconditions:**

1. The user is not logged in to the forum website;
2. The visitor is on the home page of the forum website;
3. Voting icons are displayed on the left side of a post's.

**Test steps:**

1. Click on a post.
2. Click the upvote icon.
3. Check the counter.

**Expected result:**

* The voting functionality does not work for a logged out user;
* A message appears saying that authentication is required;
* The visitor cannot see the registered ascending vote and the counter does not increase by one.

>**Test 2:** Check if the user is able to vote a post - AC2.

**Description:**

The counter should increase by a maximum of one when a post is voted on.

**Preconditions:**

1. The user is logged in to the forum website;
2. The user has not voted on a post before;
3. The user is on the home page of the forum website;
4. Voting icons are displayed on the left side of a post's.

**Test steps:**

1. Click on a post.
2. Click the upvote icon.
3. Check the counter.

**Expected result:**

* The user can see the recorded upvote;
* The counter increases by one.

>**Test 3:** Check if the user is able to downvote on a post - AC3.

**Description:**

The counter should decrease by one when a post is demoted.

**Preconditions:**

1. The user is logged in to the forum website.
2. The user has not rejected the post before;
3. The user is on the home page of the forum website;
4. The voting icons are displayed on the left side of the post.

**Test steps:**

1. Click on a post.
2. Click the downvote icon.
3. Check the counter.

**Expected result:**

* The user can see the registered downvote;
* The counter decreases by one.

>**Test 4:** Check if the user is able to revert a vote on a post - AC4.

**Description:**

The counter must return to its previous value when the vote is reversed.

**Preconditions:**

1. The user is logged in to the forum website;
2. The user has voted or revoted a post before;
3. The user is on the home page of the forum website;
4. Voting icons are displayed on the left side of a post's.

**Test steps:**

1. Click on a post.
2. Click the ascending or descending vote icon, depending on the previous vote.
3. Check the counter.

**Expected result:**

* The user can see the reverted vote.

>**Test 5:** Verify that the user is able to change the vote from upvote to downvote - AC2, AC3, AC4.

**Description:**
 
The counter should decrease by two when we vote in favor of a post and then change the vote to a negative vote.

**Preconditions:**

1. The user is logged in to the forum website.
2. The user is on the home page of the forum website;
3. Voting icons are displayed on the left side of a post's.

**Test steps:**

1. Click on a post.
2. Click the upvote icon.
4. Check the counter.
5. Click the upvote icon again.
6. Check the counter.
7. Click the downvote icon.
8. Check the counter.

**Expected result:**

* The user is able to change the vote from upvote to downvote successfully;

>**Test 6:** Verify that the user is able to change the vote from downvote to upvote - AC2, AC3, AC4.

**Description:**

The counter should increase by one when we vote against a post and then change the vote to a positive vote.

**Preconditions:**

1. The user is logged in to the forum website.

**Test steps:**

1. Click on a post.
2. Click the downvote icon.
3. Check the counter.
4. Click the downvote icon again.
5. Check the counter.
6. Click the upvote icon.
7. Check the counter.

**Expected result:**

* The user is able to change the vote from downvote to upvote successfully;

>**Test 7:** Check if the user is able to vote on more than one post - AC2, AC3.

**Description:**

The counter should be updated correctly for each post when we vote on more than one post at the same time, on the same page.

**Preconditions:**

1. The user is logged in to the forum website.

**Test steps:**

1. Click on a post.
2. Click the voting icon.
3. Check the counter.
4. Click a different post.
5. Click the voting icon.
6. Check the counter.
    
**Expected result:**

* The user can see the recorded vote for each post successfully.


