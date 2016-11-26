# pramool (Demo)
**Introduction**

Pramool is a auction website where responce your bid in the real-time
by web socket.

There are 3 main features for now.

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

what's next for me?
- About security & web token(JWT)
- Payment gateway
- Test drive deverlopment

**How to Start** 

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
