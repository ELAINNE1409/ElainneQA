# US 001 - Sort the posts

# 1. Tests

> **Test 1:** 

**Description:**

As a member, I want to ensure that user posts are sorted in ascending order based on the number of votes. AC1 

**Preconditions:**

1. The app has multiple user posts with varying vote counts.

**Test Steps:**

1. Retrieve the list of user posts from the app.
2. Sort user posts based on the number of votes in ascending order.
3. Check that user posts are sorted in ascending order based on the number of votes.

**Expected Result:**

- User posts should be ordered in ascending order, starting with the posts with the fewest votes.
- The order of seats must comply with AC1.

> **Test 2:** 

**Description:**

As a user, I want to see the number of votes for each post. AC2

**Preconditions:**

1. The app has several user posts with known vote counts.

**Test Steps:**

1. Retrieve the list of user posts from the app.

**Expected Result:**

- Each user post should display the number of votes next to it.
The vote counts displayed must be accurate and match the actual vote counts.

> **Test 3:** 

**Description:**

As a member, I want to make sure that posts with an equal number of votes are sorted in order of publication, with the most recent appearing first. AC3

**Preconditions:**

1. The app has multiple posts from users with equal vote counts.

**Test Steps:**

1. Retrieve the list of user posts from the app.
2. Sort the posts of users with equal vote count in the order in which they were posted.

**Expected Result:**

- Posts from users with the same number of votes should be sorted based on the order in which they were posted, with the most recent appearing first.
- Screening must comply with AC3.






