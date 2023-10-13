# US 003 - Create a post

# 1. Tests 

>**Test 1:** Check that it is not possible to create a post when not logged in - AC1.

**Description:**

The user must be authenticated to create a post.

**Preconditions:**
1. The user must be logged out.
2. The option "submit" must be visible on the forum homepage.

**Test steps:** 
1. Click on "submit" option.     

**Expected result:**

* An insuccess notification is displayed, requiring authentication.
* Creating a post is not possible, the page for creating new posts is not displayed.


>**Test 2:** Check that it is possible to submit a post when all requested data is filled in - AC2, AC7.

* *a) Text post*
* *b) Link post*

**Description:**
All requested data (title and text/link) must be filled in. It must be possible to submit a post with all the input boxes filled in. 

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters) or Link (between 8 and 500 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed. 
2. Fill in the title and the text/link box.  
3. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".


>**Test 3:** Check that it is not possible to submit a post when none of the requested data is filled in - AC2, AC8.

* *a) Text post*
* *b) Link post*

**Description:**
All requested data must be filled in. It must not be possible to submit a post with all the input boxes empty. 

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed.
3. Leave the title and the text boxes empty.  
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, requiring to fill in all the input boxes.
* The post is not created. 


>**Test 4:** Check that it is not possible to submit a post when the title box is not filled in - AC2, AC8.

* *a) Text post*
* *b) Link post*

**Description:**
All required fields must be filled in. It must not be possible to submit a post with the title box empty.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Text (between 20 and 10000 characters) OR Link (between 8 and 500 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed. 
2. Leave the title box empty.
3. Fill in the text box. 
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, requiring to fill in the title box.
* The post is not created.


>**Test 5:** Check that it is not possible to submit a post when the text/link box is not filled in - AC2, AC8.

* *a) Text post*
* *b) Link post*

**Description:**
All required fields must be filled in. It must not be possible to submit a post with the text/link box empty.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed.  
2. Fill in the title box.
3. Leave the text/link box empty.
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, requiring to fill in the text/link box.
* The post is not created.


>**Test 6:** Check that it is possible to submit a post when a title has between 2 and 85 characters - AC3, AC7.

* *a) Text post*
* *b) Link post*

**Description:**
A valid title must have between 2 and 85 characters. 

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters) or Link (between 8 and 500 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed.   
2. Fill in the title box.
3. Fill in the text/link box.
4. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".


>**Test 7:** Check that it is not possible to submit a post when a title has less than 2 characters - AC3, AC8.

* *a) Text post*
* *b) Link post*

**Description:**
A valid title must have between 2 and 85 characters. Less than 2 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (less than 2 characters).
* Text (between 20 and 10000 characters) or Link (between 8 and 500 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed.
2. Fill in the title box.
3. Fill in the text/link box.
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.


>**Test 8:** Check that it is not possible to submit a post when a title has more than 85 characters - AC3, AC8.

* *a) Text post*
* *b) Link post*

**Description:**
A valid title must have between 2 and 85 characters. More than 85 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (more than 85 characters)
* Text (between 20 and 10000 characters) or Link (between 8 and 500 characters)

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Select the post type (text or link). After that, the corresponding input box should be displayed.
2. Fill in the title box.
3. Fill in the text/link box.
4. Click on the "Submit post" button.      

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.


>**Test 9:** Check that it is possible to submit a text post when the text has between 20 and 10000 characters - AC4, AC7.

**Description:**
For a text post type, a valid text must have between 20 and 10000 characters. A text with between 20 and 10000 characters must be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Fill in the title box.
3. Fill in the text box.
4. Click on the "Submit post" button. 

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".


>**Test 10:** Check that it is not possible to submit a text post when the text has less than 20 characters - AC4, AC8.

**Description:**
For a text post type, a valid text must have between 20 and 10000 characters. A text with less than 20 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (less than 20 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Fill in the title box.
3. Fill in the text box.
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.


>**Test 11:** Check that it is not possible to submit a text post when the text has more than 10000 characters - AC4, AC8.

**Description:**
For a text post type, a valid text must have between 20 and 10000 characters. A text with more than 10000 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (more than 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Fill in the title box.
3. Fill in the text box.
4. Click on the "Submit post" button.    

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.


>**Test 12:** Check that it is possible to use bold formatting option - AC5, AC7.

**Description:**
For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Bold formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed. 
2. Fill in the title box.
3. Fill in the text box.  
4. Select a part of the text and click on the bold option.
5. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".
* The text appears with selected part in bold.


>**Test 13:** Check that it is possible to use italic formatting option - AC5, AC7.

**Description:**
For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Italic formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed. 
2. Fill in the title box.
3. Fill in the text box.  
4. Select a part of the text and click on the italic option.
5. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".
* The text appears with selected part in italic.


>**Test 14:** Check that it is possible to use underline formatting option - AC5, AC7.

**Description:**
For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Underline formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.  
2. Fill in the title box.
3. Fill in the text box.  
4. Select a part of the text and click on the underline option.
5. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".
* The text appears with selected part underlined.


>**Test 15:** Check that it is possible to use hyperlink formatting option - AC5, AC7.

**Description:**
For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Hyperlink formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed.  
2. Fill in the title box.
3. Fill in the text box.  
4. Select a part of the text and click on the hyperlink option.
5. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".
* The selected text assumes the hyperlink format.


>**Test 16:** Check that it is possible to use code formatting option - AC5, AC7.

**Description:**
For a text post type, text formatting options must be available and accessible (bold, italic, underline, hyperlink and code formatting). Code formatting option must be functional.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Text (between 20 and 10000 characters).

**Test steps:** 
1. Click on "submit". After that, the page for creating new posts must be displayed. 
2. Fill in the title box.
3. Fill in the text box.  
4. Select a part of the text and click on the code format option.
5. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".
* The text assumes the code format.


>**Test 17:** Check that it is possible to create a link post when it has between 8 and 500 characters - AC8, AC7.

**Description:**
For a link post type, a valid link must have between 8 and 500 characters. A link with between 8 and 500 characters must be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Link (between 8 and 500 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Fill in the title box.
3. Click on "Link" post type. The corresponding input box must be displayed.
3. Fill in the link box.
4. Click on the "Submit post" button.    

**Expected result:**
* A success notification is displayed.
* The user must be redirected to the forum homepage, where the post becomes visible in the posts section "New".


>**Test 18:** Check that it is possible to create a link post with less than 8 characters - AC6, AC8.

**Description:**
For a link post type, a valid link must have between 8 and 500 characters. A link with less than 8 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Link (less than 8 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed. 
2. Fill in the title box.
3. Click on "Link" post type. The corresponding input box must be displayed.
3. Fill in the link box.
4. Click on the "Submit post" button.   

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.


>**Test 19:** Check that it is not possible to create a link post with more than 500 characters - AC6, AC8.

**Description:**
For a link post type, a valid link must have between 8 and 500 characters. A link with more than 500 characters must not be accepted.

**Preconditions:**
1. The user must be logged in.
2. The option "submit" must be visible on the forum homepage.
3. "Text" post type is selected by default.

**Input:**
* Title (between 2 and 85 characters).
* Link (less than 8 characters).

**Test steps:**
1. Click on "submit". After that, the page for creating new posts must be displayed.
2. Fill in the title box.
3. Click on "Link" post type. The corresponding input box must be displayed.
3. Fill in the link box.
4. Click on the "Submit post" button.   

**Expected result:**
* An insuccess notification is displayed, guiding the user to correct the input data.
* The post is not created.
