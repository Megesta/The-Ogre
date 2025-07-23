# The-Ogre: An Ordinary Discord bot

## Description
**Hello!** I am `Magesta`, a **Discord** user who thought they mean something for this world. You can contact me through my **Discord** profile: `_magesta` or `Magesta#0590`. I usually don't do something special, but this time everything is different. This bot should have been an introduction to `Java Script`. Honestly, I really enjoyed making it and decided to make it a real bot with its own server. Now you can find it as a moderation bot on my server called `Magesta's Cave`, where I store my portfolio stuff and also sell some of them. If you want to join, contact me, because this server is closed.

## How to install
I can't allow you to see my own ID's, so you won't be able to see my `config.json`. Though, you still can create your own `config` file. Just go to `configExample.json` file and set up all the properties. Then, rename it to `config.json` and you're good to go!
Maybe you'll also have to install `Node.js`, `Discord.js` and **linter** into the folder, so everything works fine.
To add more commands, add `.js` files to `commands` folder, same goes for `events`. Use already created files as a reference.

## Functionality
This bot wasnt meant to do many different things, but now it does a lot. I'll list some of the main functions it does at the moment you're reading this:
* Adds many different slash commands, such as `/ping`, `/award`, `/purge`;
* Lists all the server interactions in a separate channel and provides all the neccessary info with it;
* Adds many "fun" commands, so users can also have fun while chatting.
* **Note that this bot supports only one role at a time! If you plan to make multi-role server then this bot is not for you!**

## Changelogs
### 22.07.2025, aka 22, Jule of 2025, Tuesday.
* Made a **GitHub** page of my bot, where you can find the source code;
* Connected the **GitHub** page to my own PC through **GitHub Deckstop**;
* Cooked this `README.md` file so you'd know what to expect;
* Cooked the `LICENSE.md` file so you don't care about being chased by me with wooden club;
* Configured the `.gitignore` file and entered `config.json` name to it;
* Created the `configExample.json` file and filled it with data;
* Downloaded `Eslint`, `Node.js`, `Discord,js` to my file and excluded them;
* Created `scripts` directory, where all the non-launchable scripts will be located;
* Created `commands` directory in `scripts` and set it up so each file in it automatically connects to the related slash;
* Created `events` directory in `scripts` and set it up so each file in it automatically connects to the related event;
* Cooked up a `commands-load.js` file, that is used to update and upload all the slash commands to server. *Run it with **node** manually*;
* Added common commands, such as `ping.js` and `reload.js`.
### 23.07.2025, aka 23, Jule of 2025, Wednessday.
* Remade `/ping` command, now it shows all types of latency instead of random negative numbers;
* Fixed deprecated `ephemeral` property with message flags;
* Added role checks to `reload.js`, so only **Administrators** can reload commands;
* Added a `/logoff` command, so **Administrators** can finish bot's session at any time;
* Added ability to log all the server actions to logs, if there are ones;
* Added a `/purge` command, so **Moderators** and **Administrators** can bulk delete messages;
* Added a `/award` command, so **Administrators** can award roles to other users; **Moderators** are also allowed to award, but only member roles;
* Added a `/report` command, so users can report offensive messages, which **Moderators** and **Administrators** can use to track and ban.
# And that's it! I showed you all the actions I did to make this bot to its release!