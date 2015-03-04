#!/bin/bash

wget -O ~/hugo.tar.gz https://github.com/spf13/hugo/releases/download/v0.13/hugo_0.13_linux_amd64.tar.gz
tar -C ~/ -zxvf ~/hugo.tar.gz
cp ~/hugo_0.13_linux_amd64/hugo_0.13_linux_amd64 ~/bin/hugo
chmod +x ~/bin/hugo