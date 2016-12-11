# pramool (Demo)
**Screenshot**

![Alt text](http://i.imgur.com/rGB1UzSg.jpg)

![Alt text](http://i.imgur.com/U8GgtUFg.jpg)

# Introduction

Pramool is a auction website where responce your bid in the real-time
by web socket.

Everyone can create sign-in by Log-in button or using My test account below.

**ID:** testing

**Password:** 012345

# Main features.

**Bid**

- **User** will be a follower automatically when user bid a new height price.
- **Seller** can not bid.
- **User** who take a new height price can not bid repeatedly untill other user bid a new height price.
- If **User** bid a new height and time remaining less than 15 minutes. The time remaining will be reset to 15 minutes.

**Comment**

- Last comment will be shown at the first comment.
- Last reply will be shown at the Last of parent's comment.

**Notification**

- Notice to **Seller** when user comment.
- Notice to **Seller** when product was create.
- Notice to **All follower** and **Seller** when user take a price new bid.
- Notice to **All follower** and **Seller** when product was deleted.
- Notice to **Commentator** when user reply.

**Search by name of product**

- Located on top header. ( case insensitive )

**Add & Edit your auction product**

- Add product by Add product button in auction page or dropdown lists for mobile.

**Change your avatar**

- Change it by button in dashboard page.

**Follow this auction**

- Follow the auction that you interest by Follow button in product detail page.

what's next for me?
- About security & web token(JWT)
- Payment gateway
- Test drive deverlopment

# How to Start 

1. Clone the repo
```git clone https://github.com/promin04/pramool.git```

2. Install bower
```npm install bower -g```

3. Install backend package with npm
```npm install```

4. Install frontend package with bower
```bower install```

5. Install frontend package with bower
```npm install webpack -g```

6. Run ```webpack```

7. Run ```node .```
