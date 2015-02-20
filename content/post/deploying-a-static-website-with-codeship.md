+++
archive = ["2015", "2015/01"]
categories = ["blog"]
date = "2015-02-20T23:23:17+01:00"
description = ""
draft = true
image = "foofoofffoofoo"
keyword = "deployment, codeship"
slug = "deploying-a-static-website-with-codeship"
tags = ["deployment"]
title = "Deploying a static website with Codeship"
+++

Every time i start a new project one of the first things i try to achieve is continuous deployment if the project allows it.
A static generated website, in this case my own blog, is a perfect small example case which can be deployed instantly. 
For a static website the essential step is if it actually generates a website on build, if that succeeds we can continue and deploy the selected version.
After some comparison with some other continuous integration tools i chose Codeship and used it too achieve a push too deploy setup for my deployment.

## Setting up your server

