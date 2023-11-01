# US 012: Delete a user

# 1. Tests

> **Test 1:** Check that it is not possible to comment on a post when not logged in. - AC1.

**Description:**

The user must be authenticated to comment on a post.

**Preconditions:**

1.
2.

**Test steps:**

1.

**Expected result:**

-

> **Test 2:** Check that it is not possible to submit a comment when requested data is not filled in. - AC2, AC5

**Description:**
The comment field must be filled in. An empty comment (0 characters) must be considered invalid.

**Preconditions:**

1. The user must be logged in.
2. There is at least an existing post in the forum.

**Test steps:**

1. Click on the post. After that, the post details must be displayed.
2. Leave the comment box empty.
3. Click on "Post comment" option.

**Expected result:**

- Red pop-up notification: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was 0. (cowboyhatface)"
- The comment is not posted.

> **Test 3:** Check that a comment with less than 20 characters is considered invalid - AC2, AC5.

**Description:**
A valid comment must have between 20 and 10000 characters. So, a comment with less than 20 characters mustn't be accepted.

**Preconditions:**

1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**

- Comment (less than 20 characters)

**Test steps:**

1. Click on the post. After that, the post details must be displayed.
2. Fill in the comment box.
3. Click on "Post comment" option.

**Expected result:**

- Red pop-up notification: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was "X". (cowboyhatface)"
- The comment is not posted.

> **Test 4:** Check that a comment with more than 20 and less than 10000 characters is considered valid. - AC2, AC4

**Description:**
A valid comment must have between 20 and 10000 characters. So, a comment with between 20 and 10000 characters must be accepted.

**Preconditions:**

1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
.\* Comment (between 20 and 10000 characters)

**Test steps:**

1. Click on the post. After that, the post details must be displayed.
2. Fill in the comment box.
3. Click on "Post comment" option.

**Expected result:**

- Green pop-up notification: "Done-zo! (cowboyhatface)"
- The post must become visible in the comments section of the post.
