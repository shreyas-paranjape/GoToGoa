#!/usr/bin/env bash

sudo apt-get update
adduser $USER --disabled-password
gpasswd -a  $USER sudo
su - $USER
mkdir .ssh && chmod 700 .ssh
echo $KEY > .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
exit


