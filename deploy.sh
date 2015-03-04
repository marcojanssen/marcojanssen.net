#!/bin/bash

git submodule init
git submodule update --checkout

cd public

git add --all
git commit -m "$1"
git push origin master

cd ../