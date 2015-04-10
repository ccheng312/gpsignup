#!/usr/bin/env bash

# Vagrant uses this file to provision a new virtual machine.
# See Vagrantfile.

echo "Installing NVM"
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc

echo "Installing Node"
nvm install stable
nvm alias default stable

cd /vagrant
echo "Removing node modules"
rm -rf node_modules
echo "Installing dependencies"
npm install
