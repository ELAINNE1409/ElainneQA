# US 006 - Comment on a post

# 1. Tests 

>**Test 1:** Check that it is not possible to comment on a post when not logged in. - AC1

**Description:**

The user must be authenticated to comment on a post.

**Preconditions:**
1. The user must be logged out.
2. There is at least an existing post in the forum.

**Test steps:** 
1. Click on the post. After that, the post details must be displayed.
2. Type a comment.
3. Click on "Post comment" option.     

**Expected result:**
* An insuccess notification must be displayed requiring authentication.


>**Test 2:** Check that a comment with between 20 and 10000 characters is considered valid. - AC2, AC4

**Description:**
A valid comment must have between 20 and 10000 characters. So, a comment with between 20 and 10000 characters must be accepted.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
.* Comment (between 20 and 10000 characters)

**Test steps:** 
1. Click on the post. After that, the post details must be displayed.
2. Fill in the comment box.
3. Click on "Post comment" option.    

**Expected result:**
* Green pop-up notification: "Done-zo! (cowboyhatface)"
* The post must become visible in the comments section of the post.


>**Test 3:** Check that a comment with less than 20 characters is considered invalid. - AC2, AC5

**Description:**
A valid comment must have between 20 and 10000 characters. So, a comment with less than 20 characters mustn't be accepted.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (less than 20 characters)

**Test steps:** 
1. Click on the post. After that, the post details must be displayed.
2. Fill in the comment box.
3. Click on "Post comment" option.    

**Expected result:**
* Red pop-up notification: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was "X". (cowboyhatface)"
* The comment is not posted.


>**Test 4:** Check that a comment with more than 10000 characters is considered invalid. - AC2, AC5

**Description:**
A valid comment must have between 20 and 10000 characters. So, a comment with more than 10000 characters mustn't be accepted.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (more than 10000 characters)

**Test steps:** 
1. Click on the post. After that, the post details must be displayed.
2. Fill in the comment box.
3. Click on "Post comment" option.    

**Expected result:**
* Red pop-up notification: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was "X". (cowboyhatface)"
* The comment is not posted.


>**Test 5:** Check that it is not possible to submit a comment when requested data is not filled in. - AC2, AC5

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
* Red pop-up notification: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was 0. (cowboyhatface)"
* The comment is not posted.


>**Test 6:** Check that it is possible to use bold formatting option. - AC3, AC4

**Description:**
Text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Bold formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (between 20 and 10000 characters)

**Test steps:**
1. Click on the post. After that, the post details must be displayed. 
2. Fill in the comment box.
3. Select a part of the text and select the option bold for that part.    
4. Click on "Post comment" button.

**Expected result:**
* Green pop-up notification "Done-zo! (cowboyhatface)"
* The comment must become visible in the comments section of the post.
* Comment is displayed with selected part in bold.


>**Test 7:** Check that it is possible to use italic formatting option. - AC3, AC4

*Description:**
Text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Italic formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (between 20 and 10000 characters)

**Test steps:**
1. Click on the post. After that, the post details must be displayed. 
2. Fill in the comment box.
3. Select a part of the text and select the option italic for that part.    
4. Click on "Post comment" button.

**Expected result:**
* Green pop-up notification "Done-zo! (cowboyhatface)"
* The comment must become visible in the comments section of the post.
* Comment is displayed with selected part in italic.


>**Test 8:** Check that it is possible to use underline formatting option. - AC3, AC4

**Description:**
Text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Underline formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (between 20 and 10000 characters)

**Test steps:**
1. Click on the post. After that, the post details must be displayed. 
2. Fill in the comment box.
3. Select a part of the text and select the option underline for that part.    
4. Click on "Post comment" button.

**Expected result:**
* Green pop-up notification "Done-zo! (cowboyhatface)"
* The comment must become visible in the comments section of the post.
* Comment is displayed with selected part underlined.


>**Test 9:** Check that it is possible to use hyperlink formatting option. - AC3, AC4

**Description:**
Text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Hyperlink formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (between 20 and 10000 characters)

**Test steps:**
1. Click on the post. After that, the post details must be displayed. 
2. Fill in the comment box.
3. Select a part of the text and select the option hyperlink for that part.    
4. Click on "Post comment" button.

**Expected result:**
* Green pop-up notification "Done-zo! (cowboyhatface)"
* The comment must become visible in the comments section of the post.
* Comment is displayed with selected part with hyperlink.


>**Test 10:** Check that it is possible to use code formatting option. - AC3, AC4

**Description:**
Text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Code formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. There is at least an existing post in the forum.

**Input:**
* Comment (between 20 and 10000 characters)

**Test steps:**
1. Click on the post. After that, the post details must be displayed. 
2. Fill in the comment box.
3. Select a part of the text and select the option code format for that part.    
4. Click on "Post comment" button.

**Expected result:**
* Green pop-up notification "Done-zo! (cowboyhatface)"
* The comment must become visible in the comments section of the post.
* Comment is displayed in code format.






