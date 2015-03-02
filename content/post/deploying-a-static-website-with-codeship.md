+++
archive = ["2015", "2015/01"]
categories = ["blog"]
date = "2015-02-20T23:23:17+01:00"
description = ""
draft = true
image = "codeship.png"
keyword = "deployment, codeship"
slug = "deploying-a-static-website-with-codeship"
tags = ["deployment"]
title = "Deploying a static website with Codeship"
+++

## Setting up your project

Create a new project in Codeship and select your repository from either Github or Bitbucket. After selecting a repository 
we can set our setup and test commands. 

### Test before deploying

If we safely want to deploy our website we first need to check if our website is actually working by testing it. Testing a static website
can be done by building it on demand. If something breaks the test will fail and the deployment will not be executed. 
Depending on the generator you use you could setup and test it as follows.

---------------------------

#### Hugo

##### Setup

~~~ bash
wget -O ~/hugo.tar.gz https://github.com/spf13/hugo/releases/download/v0.13/hugo_0.13_linux_amd64.tar.gz
tar -C ~/ -zxvf ~/hugo.tar.gz
cp ~/hugo_0.13_linux_amd64/hugo_0.13_linux_amd64 ~/bin/hugo
chmod +x ~/bin/hugo
~~~

##### Test

~~~ bash
hugo -b http://yourwebsite.com
~~~

---------------------------

#### Jekyll

##### Setup

~~~ bash
gem install jekyll
~~~

##### Test

~~~ bash
jekyll build
~~~

---------------------------

#### Sculpin

##### Setup

~~~ bash
wget -O ~/sculpin.phar https://download.sculpin.io/sculpin.phar
cp ~/sculpin.phar ~/bin/sculpin
chmod +x ~/bin/sculpin
~~~

##### Test

~~~ bash
sculpin generate --env=prod
~~~

---------------------------

### Deploying

After we made sure the build succeeded we want to automatically deploy our latest build to our webserver. Codeship generates
a ssh key for each project and displays the public key in the general settings. Make sure you add this public key to  
the user you want to use for deployment. In general i always create a `deploy` user which has the appropriate rights to execute the 
needed steps for our deployment. Codeship only deploys to the branches which are setup, by default this is the master branch.
Any other branch will only be tested and regardless of the outcome will never be deployed unless specified.
 
#### Rsync

One of the easiest and simplest forms of deployment is using rsync. This will simply sync the files to your webserver in the specified directory.
Since we don't really have any form of caching needs or dependencies we need to install this will just do fine for the time being.

To use a rsync approach we need to select custom script at the deployment section and use the following setup:

~~~ bash
ssh -t deploy@127.0.0.1 mkdir -p /var/www/yourwebsite.com/releases/$CI_COMMIT_ID
rsync -avz -e "ssh" --rsync-path="rsync" ~/clone/public/ deploy@127.0.0.1:/var/www/yourwebsite.com/releases/$CI_COMMIT_ID
ssh -t deploy@127.0.0.1 rm -f /var/www/yourwebsite.com/releases/current
ssh -t deploy@127.0.0.1 ln -s /var/www/yourwebsite.com/releases/$CI_COMMIT_ID /var/www/yourwebsite.com/releases/current
ssh -t deploy@127.0.0.1 service nginx restart
~~~


