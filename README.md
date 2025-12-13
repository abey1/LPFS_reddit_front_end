#### in this project i will attempt to carry out agile software development methodology to develop a reddit front end clone as one of my deliverables at learning people full stack web development learning path...

---

# EPIC

### As a user i want to browse Reddit content through a clean frontend interface. Furthermore i want to view posts, comments, communities, and search various topics of my liking.

| Feature                  | User Stories Included | API Endpoints Used                     |
| ------------------------ | --------------------- | -------------------------------------- |
| Home Feed                | 1.1                   | `/.json`                               |
| Subreddit Browsing       | 2.1, 2.2              | `/r/{sub}/json`, `/r/{sub}/abour.json` |
| Post Details             | 3.1                   | `/r/{sub}/comments/{postId}.json`      |
| Comments                 | 4.1                   | same as above                          |
| Popular Subreddits       | 5.1                   | `/subreddits/popular.json`             |
| Search                   | 6.1                   | `/search.json?q=`                      |
| Pagination               | 7.1                   | `?after=`                              |
| Loading & Error Handling | 8.1, 8.2              | -                                      |

---

## Technical stuff

| Prefix | Meaning     |
| ------ | ----------- |
| `t1`   | Comment     |
| `t2`   | Post (link) |
| `t5`   | Subreddit   |
| `t2`   | User        |

---

## Feature 1: Home Feed Display

### User Story 1.1 - View Homepage Posts

**As a** user
**I want** to see Reddit's front-page posts
**So that** I can browse the latest and trending content

#### Acceptance Criteria

- Posts must be fetched from `https://www.reddit.com/.json`
- Each post should show:
  - Title
  - Thumbnail
  - Subreddit name
  - Author
  - Upvotes
  - Time posted
- A loading indicator must appear while data is loading
- Error message shown on request failure

#### API Used

- `GET https://www.reddit.com/.json`

---

## Feature 2: Subreddit Browsing

### User Story 2.1 - View Subreddit Posts

**As a** user
**I want** to browse posts within a subreddit
**So that** I can focus on content i'm interested in

#### Acceptance Criteria

- Fetch posts from: `https://www.reddit.com/r/{subreddit}.json`
- Display:
  - Subreddit title
  - Description (from about.json)
  - List of posts
- Show loading spinner and error state

#### API Used

- `GET https://www.reddit.com/r/{subreddit}.json`
- `GET https://www.reddit.com/r/{subreddit}/about.json`

### User Story 2.2 - sort subreddit posts

**As a** user
**I want** to sort subreddit posts
**So that** I can view Hot, New, or Top posts

#### Acceptance Criteria

- Sorting options:
  - Hot &rarr; `?sort=hot`
  - New &rarr; `?sort=new`
  - Top &rarr; `?sort=top`
- System fetches correct API based on selected sort
- UI updates immediately

#### API Used

Examples:

- `https://www.reddit.com/r/{subreddit}.json?sort=hot`
- `https://www.reddit.co/r/{subreddit}.json?sort=new`
- `https://www.reddit.co/r/{subreddit}.json?sort=top`

---

## Feature 3: View Post Details

### User Story 3.1 - View Post Content

**As a** user
**I want** to view a single post
**So that** I can read full content

#### Acceptance Criteria

- Fetch post + comments from:
  `https://www.reddit.com/r/{sub}/comments/{postId}.json`
- Display
  - Title
  - Text Body
  - Link or media preview
  - Subreddit name
  - Upvotes and metadata
- Handle missing media Gracefully

#### API Used

- `GET https://www.reddit/com/r/{subreddit}/comments/{postId}.json`

---

## Feature 4 : Comment System

### User Story 4.1 - View Comments

**As a** user
**I want** to read comments on a post
**So that** I can follow discussions

#### Acceptance criteria

- comments must be loaded from comments array (index 1 of response)
- Nested comments must be rendered recursively
- Show:
  - Author
  - Score
  - Time posted
  - Comment body
- Handle deleted comments
- Loading indicator must appear while fetching

#### API Used

- `GET https://www.reddit.com/r/{sub}/comments{postId}.json`

---

## Feature 5 : Popular Subreddits List

### User Story 5.1 - Browse Populat Subreddits

**As a** user
**I want** to see popular subreddits
**So that** I can discover new communities

#### Acceptance Criteria

- Fetch subreddits from: `https://www.reddit.com/subreddits/popular.json`
- Display:
  - Subreddit name
  - Description
  - Icons/thumbnails (if available)
- Clicking a subreddit navigate to `/t/{sub}`

#### API Used

- `GET https://www.reddit.com/subreddits/popular.json`

---

## Feature 6 : Search Functionality

### User Story 6.1 - Search Posts

**As a** user
**I want** to search for posts
**So that** I can find information based on keywords

#### Acceptance Criteria

- User enters a search term
- Results fetched from : `https://www.reddit.com/search.json?q={query}`
- Display posts
- show empty state for no results
- show loading and error states

#### API Used

- `GET https://www.reddit.com/search.json?q={query}`

---

## Feature 7 : Pagination / Infinite Scroll

### User Story 7.1 - Load More Posts

**As a** user
**I want** to load more posts while scrolling
**So that** I can browse continuously

#### Acceptance Criteria

- Use `after` token from reddit API
- Append new posts to current list
- Trigger new fetch on scroll or button
- show loading indicator during pagination

#### API Example

- `https://www.reddit.com/r/reactjs.json?after=t3_xyz123`

---

## Feature 8 : Error & Loading Handling

### User Story 8.1 - Display Loading Indicators

**As a** user
**I want** clear feedback while content is loading
**So that** I i know the system is working

#### Acceptance Criteria

- Show loading spinners on:
  - Home feed
  - Subreddit feed
  - Post page
  - Search results
- Hide spinner after data arrives

---

### User Story 8.2: - Display Error Messages

**As a** user
**I want** meaningful error messages
**So that** I understand when something goes wrong

#### Acceptance Criteria

- Errors shown for:
  - Invalid subreddit (404)
  - Network failure
  - Empty results
- Provide "Retry" button
