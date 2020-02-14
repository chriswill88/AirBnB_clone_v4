#!/usr/bin/env bash
# script to configure task 1
# create web_dynamic
mkdir web_dynamic

# copy files into web_dynamic
cp -r web_flask/static web_dynamic
cp web_flask/templates/100-hbnb.html web_dynamic
cp web_flask/__init__.py web_dynamic
cp web_flask/100-hbnb.py web_dynamic

# Rename 
mv web_dynamic/100-hbnb.py web_dynamic/0-hbnb.py
mv web_dynamic/100-hbnb.html web_dynamic/0-hbnb.html

# update 0-hbnb.py replace existing route to /0-hbnb/
# will be done outside this function
echo "All Done"
