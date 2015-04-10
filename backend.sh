#!/usr/bin/env bash

# Vagrant uses this file to provision a new virtual machine.
# See Vagrantfile.

echo "Installing yum packages..."

echo '[mongodb-org-3.0]
name=MongoDB Repository
baseurl=http://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1' > /etc/yum.repos.d/mongodb-org-3.0.repo


yum groupinstall -y 'development tools'
yum install -y \
        mongodb-org \
        git

echo "Starting MongoDB on default port 27017"
service mongod start