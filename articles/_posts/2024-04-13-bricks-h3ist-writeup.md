---
layout: post
title: "Tryhack3M: Brick Heist"
date: 2024-04-13
categories: [writeup,"blockchain","Wordpress","Miners","Threat hunting"]
thumbnail: "assets/images/bricks/thumb.jpg"
---
This is a Writeup for the room [Brick Heist](https://tryhackme.com/r/room/tryhack3mbricksheist), for the platform [Tryhackme](https://tryhackme.com), I just resolved april 13th (before the deploy)



During the reconnaissance phase, the Nmap scan revealed open ports, although nothing particularly relevant was found. 
<img src="/assets/images/bricks/ports.png" alt="ports">
Then, a forced-browsing scan, uncover the Wordpress Structure running in the HTTPS service.
<img src="/assets/images/bricks/bricks.png" alt="index">

Further enumeration focused on the Wordpress version and plugins, with the discovery of the plugin *Bricks*. A quick research revealed a vulnerability in the Bricks Builder WordPress plugin, documented under CVE-2024-25600. [I stumbled upon an intriguing webpage that not only detailed the flaw within the plugin but also provided information about the CVE itself.](https://www.securityweek.com/websites-hacked-via-vulnerability-in-bricks-builder-wordpress-plugin/)

<img src="/assets/images/bricks/cvedescription.png" alt="cvedescription">

Then I searched for more info about the CVE, and found a github PoC [exploit](https://raw.githubusercontent.com/Chocapikk/CVE-2024-25600/main/exploit.py) that allows unauthenticated RCE (Remote Command Execution) so basically by running the exploit we can now get a shell, and that is what I did

<img src="/assets/images/bricks/exploitgh.png" alt="readme">
<img src="/assets/images/bricks/rce.png" alt="rce">

#### What is the content of hidden .txt file?

With access gained, I went to the web page and retreive the `hidden .txt file`, the content is in the common Tryhackme flag format *THM{.}*


#### What is the name of the suspicious process ?

Moving beyond access escalation, the focus shifted to identifying suspicious processes. After careful observation, two processes were identified:

<img src="/assets/images/bricks/ps1.png" alt="processes">

#### What is the service related to the process?

To determine the service associated with the identified processes, the following command was executed:

```
systemctl status --all | grep -B 5 <PID>
```

and, if we're seeing the output with attention, the service is:

<img src="/assets/images/bricks/ps2.png" alt="service">
The output revealed a service related to cryptocurrency mining.

There is a hint on it, so its easier to find it (?)

<img src="/assets/images/bricks/service.png" alt="servicehint">



#### What is the config file for the miner?

Upon navigating to the process directory, I examined each file, and among them, one file stood out as particularly intriguing:

<img src="/assets/images/bricks/miner.png" alt="miner">

This file contained a wealth of crucial information. Based on its contents, it became evident that this file served as the configuration file for the mining operation. With ID and the Cryptocurrency that is using: Bitcoin


#### What wallet address is mining to?

Within the configuration file, an ID was found, which was then processed using CyberChef to reveal a SegWit Bitcoin Wallet Address. 
<img src="/assets/images/bricks/cyberchef.png" alt="cyberchef">

By splitting it in half the output and selecting one part, the wallet address was successfully extracted.

#### The wallet address is relatet to transactions to which threat groups?

A search for transactions associated with the wallet address led to the identification of threat groups linked to a non-SegWit Bitcoin address. 
<img src="/assets/images/bricks/blockchain.png" alt="blockchain">
<img src="/assets/images/bricks/bchain2.png" alt="b2">
<br>
<img src="/assets/images/bricks/wallet.png" alt="wallet">


Further research revealed the specific threat group mentioned in the question.

<img src="/assets/images/bricks/group.png" alt="group">
