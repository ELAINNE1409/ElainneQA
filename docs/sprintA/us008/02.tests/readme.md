# US 008 - View post 

# 1. Tests 


>**Test 1:** Check the post title destination - AC1.

**Description:** 

The visitor must be redirected to the post details when the post title is selected.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.

**Test steps:**

1. Select post title.
2. Check the post details.

**Expected result:**

* The visitor is redirected to the post details when the post title is selected.


>**Test 2:** Check the post's comments details - AC2.

**Description:** 

The visitor should be able to access the details of any comment associated with the post through the option "creation date".

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.

**Test steps:**

1. Select post title.
2. Choose one post comment.
3. Select creation date.
4. Check the comment details.

**Expected result:**

* The visitor is redirected to the comment details when the creation date is selected.


>**Test 3:** Check the link destination - AC3.

**Description:**

When the visitor selects the link, must be redirected to the correct place.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.

**Test steps:**

1. Select post title.
2. Check the post details.
3. Select the link.
4. Check the link destination.

**Expected result:** 

* The link redirects the visitor to the correct place.


>**Test 4** Verify the destination of an invalid link - AC3.

**Description:**

When the link is incorrect or not valid, the visitor is redirected to a page similar to details page, but with the title "undefined".

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.

**Test steps:**

1. Select post title.
2. Check the link details page.
3. Select link.
4. Check the link destination.

**Expected result:** 

* The visitor is redirected to a page similar to details page, but with the title "undefined".


>**Test 5:** Check multiple posts details - AC1.

**Description:** 

The visitor should be able to access the details of any post through the option "post title", after returning to the forum homepage.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.
3. The visitor is on the post details page.

**Test Steps**

1. Select "Back to all discussions".
2. Select another post title.
3. Check the post details.

**Expected result:**

* "Back to all discussions" redirects the visitor to the forum homepage;
* When selecting a different post title, the visitor is redirected to the post details as expected.


>**Test 6:** Check multiple comment details - AC2.

**Description:** 

The visitor should be able to access the comment details of any post through the option "creation date", after returning to the forum homepage.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing comment in the forum.
3. The visitor is on the comment details page.

**Test steps:**

1. Select "Back to [post title]".
2. Check the post details.
3. Select another comment creation date.
4. Check the comment details.

**Expected result:**

* "Back to [post title]" redirects the visitor to the post details;
* When selecting a different comment creation date, the visitor is redirected to the comment details as expected.
