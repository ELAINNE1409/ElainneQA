# US 001 - Sort the posts

## 1. Requirements Engineering


### 1.1. User Story Description


As a visitor, I want to sort the posts based on their popularity, unpopularity or creation date.


### 1.2. Customer Specifications and Clarifications


**From the specifications document:**

The functionality to sort the posts is available to both users and visitors.

> **Answer:** 
>  The purpose of sorting the posts is to allow the visitor to  discover the most popular, unpopular or recent information.

> **Question:** 
>  How can the visitor sort the posts?
>
> **Answer:**
>  The visitor can sort the posts by selecting "Popular", "Unpopular" or "New".

> **Question:**
>  Is the sorting option available for all visitors?
>
> **Answer:**
>  Yes, the sorting options is available for all visitors.


### 1.3. Acceptance Criteria


* **AC1:** The sort functionality doesn't require an authentication.
* **AC2:** The visitor must be able to sort the posts based on three criteria: Popular, Unpopular and New.


### 1.4. Found out Dependencies

* There is a dependency to existing posts, so that the visitor can sort them.

### 1.5 Input and Output Data


**Input Data:**

	
* Selected data:
	* Sort option: Popular, Unpopular or New, from the user interface.


**Output Data:**

* List of posts, sorted based on the selected option (Popular, Unpopular or New).



### 1.6. System Sequence Diagram (SSD)


![System Sequence Diagram](svg/us001-system-sequence-diagram.svg)


### 1.7 Other Relevant Remarks

* By default, the main page appears based on the sorting option "Popular".

### 1.8 Bugs

#### **Bug #1**: Incorrect post sorting. (AC2) (only back-end)

##### **Description:**

In backend test environment, the posts are not sorted correctly when sorting by new is selected.

##### **Approach:**

Investigate and debug the code responsible for post sorting.
Validations should be done in the back-end and the front-end.



| Acceptance Criteria | Front-End | Back-End |
| -------- | -------- | -------- |
| AC1 | No bugs found | No bugs found |
| AC2 | No bugs found | Bug found - incorrect sorting in backend testing |


##### **Fixed bugs:**

#### **Bug #1**: Incorrect post sorting. (AC2) (only back-end)

**Back-end:** The sorting was being done by the primary key of the post, instead of the creation date. The validation was corrected and the sorting is now done by the creation date.

[Link to the commit](https://github.com/Departamento-de-Engenharia-Informatica/switch-qa-23-project-switch-qa-23-4/commit/7cb425140ada8f3f9293f6ed65d0884b51fd2840)

=======

### 1.9. Sequence Diagram

![Sequence Diagram](../03.sequence-diagram/svg/us001-sequence-diagram.svg)